"""Contracts across ingestion, analytics, governance and storage boundaries."""
from copy import deepcopy
from datetime import date, timedelta, datetime, timezone
from uuid import uuid4
import jwt
import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings
from app.core.auth import get_current_user
from app.services.dashboard_service import dashboard_service
from app.services.csv_service import csv_service, SAMPLE_TEMPLATES
from app.services.student_analytics_service import _compute_student_metrics
from app.services.success_score_engine import SuccessScoreEngine, DEFAULT_DOMAIN_WEIGHTS

@pytest.fixture(autouse=True)
def isolated_dataset():
    old = dashboard_service._cached_synthetic_data
    dashboard_service._cached_synthetic_data = None
    yield
    dashboard_service._cached_synthetic_data = old
    dashboard_service._demo_interventions.clear()


def test_missing_student_domains_remain_unknown():
    m = _compute_student_metrics({'id':str(uuid4()),'student_id':'EMPTY'}, {}, {}, {}, {}, 0)
    assert m['attendance_rate'] is None and m['average_score'] is None
    assert m['risk_score'] is None and m['success_score'] is None
    assert m['academic_risk_tier'] == m['placement_risk_tier'] == m['segment_id'] == 'insufficient_data'
    assert m['review_status'] == 'Awaiting data review'
    assert len(m['success_profile']['missing_domains']) == 7


def test_full_csv_import_and_atomic_rejection(client):
    prefix = f"N{uuid4().hex[:4]}-"
    content = 'student_id,first_name,last_name,current_grade,academic_term\n' + ''.join(f'{prefix}{i},Demo,Student,Year 1,Term 1\n' for i in range(12))
    preview=client.post('/api/v1/csv/preview',json={'data_type':'students','file_content':content}).json()
    assert preview['valid_rows']==12 and len(preview['sample_data'])==8
    result=client.post('/api/v1/csv/import',json={'data_type':'students','file_content':content}).json()
    assert result['inserted']==12 and result['total_processed']==12
    assert client.get(f'/api/v1/students?search={prefix}&page_size=100').json()['total']==12
    invalid=content.replace(f'{prefix}0,Demo','OTHER-0,Demo')+'BAD,,,,\n'
    result=client.post('/api/v1/csv/import',json={'data_type':'students','file_content':invalid}).json()
    assert result['status']=='rejected' and result['imported']==0
    assert client.get('/api/v1/students?search=OTHER-0').json()['total']==0


@pytest.mark.parametrize('kind',list(SAMPLE_TEMPLATES))
def test_all_templates_validate_and_ingest(kind):
    preview=csv_service.validate_and_preview(SAMPLE_TEMPLATES[kind].encode(),'sample.csv',kind)
    assert preview.can_import, preview.errors
    result=csv_service.import_rows(kind,file_content=SAMPLE_TEMPLATES[kind],deduplicate_strategy='overwrite')
    assert result.imported==preview.total_rows
    assert not result.errors


def test_canonical_reference_and_scores_consistent(client):
    code='STU-001'
    student=client.get(f'/api/v1/students/{code}').json()['student']
    result=csv_service.import_rows('attendance',rows=[{'student_id':code,'date':'2026-10-13','status':'present'}],deduplicate_strategy='overwrite')
    assert result.imported==1
    data=dashboard_service._load_synthetic_data()
    assert any(r['student_id']==student['id'] and r['session_date']=='2026-10-13' for r in data['attendance'])
    directory=client.get('/api/v1/students?page_size=100').json()['students']
    dashboard=client.get('/api/v1/dashboard/overview').json()
    scores=[s['success_score'] for s in directory if s['success_score'] is not None]
    assert dashboard['summary']['average_success_score']==round(sum(scores)/len(scores),1)
    for s in directory:
        journey=client.get(f"/api/v1/students/{s['id']}").json()
        assert journey['success_profile']['success_score']==s['success_score']
        assert journey['risk_profile']['overall_risk']==s['risk_tier']
    assert sum(r['count'] for r in dashboard['academic_risk_distribution'])==len(directory)
    assert sum(dashboard['dual_risk_matrix'].values())==len(directory)


def test_persistent_failures_never_fallback(monkeypatch):
    import app.db.client as db
    import app.services.dataset_service as ds
    monkeypatch.setattr(db,'is_database_configured',lambda:True)
    monkeypatch.setattr(ds,'get_db_client',lambda: (_ for _ in ()).throw(RuntimeError('private-secret')))
    with pytest.raises(HTTPException) as exc: dashboard_service._load_synthetic_data()
    assert exc.value.status_code==503 and 'private-secret' not in exc.value.detail


def create_plan(client):
    sid=client.get('/api/v1/students?page_size=1').json()['students'][0]['id']
    response=client.post('/api/v1/interventions',json={'student_id':sid,'title':'Regression support','description':'Human reviewed support plan','intervention_type':'academic_tutoring','start_date':str(date.today())})
    assert response.status_code==201,response.text
    return response.json()


@pytest.mark.parametrize('baseline,post,expected',[(0,5,None),(-10,-5,-50.0),(20,30,50.0)])
def test_outcome_history_math_and_audit(client,baseline,post,expected):
    plan=create_plan(client)
    result=client.post(f"/api/v1/interventions/{plan['id']}/outcomes",json={'metric_name':'Observation','baseline_value':baseline,'post_value':post})
    assert result.status_code==201,result.text
    history=client.get(f"/api/v1/interventions/{plan['id']}").json()['outcomes']
    assert len(history)==1 and history[0]['percentage_change']==expected
    assert history[0]['absolute_change']==post-baseline
    assert history[0]['causation_disclaimer']
    assert any(a['entity_id']==history[0]['id'] for a in dashboard_service._load_synthetic_data()['audit_events'])


def test_orphans_lifecycle_dates_and_reset(client):
    orphan=client.post(f'/api/v1/interventions/{uuid4()}/outcomes',json={'metric_name':'Test','baseline_value':0,'post_value':1})
    assert orphan.status_code==404
    plan=create_plan(client); url=f"/api/v1/interventions/{plan['id']}"
    assert client.patch(url,json={'follow_up_date':str(date.today()-timedelta(days=1))}).status_code==422
    assert client.patch(url,json={'status':'completed'}).status_code==409
    assert client.patch(url,json={'status':'in_progress'}).status_code==200
    assert client.patch(url,json={'status':'completed'}).status_code==200
    assert client.patch(url,json={'status':'in_progress'}).status_code==409
    assert client.get('/api/v1/interventions',params={'student_id':plan['student_code']}).json()
    res = client.post('/api/v1/csv/reset-demo')
    if res.status_code == 409:
        assert "disabled in persistent mode" in res.json()["error"]["message"]
    else:
        assert res.status_code == 200
        assert client.get(url).status_code == 404


def test_override_preserves_baseline_and_audits_actor(client):
    base=client.get('/api/v1/students/STU-001/risk-explanation').json()
    payload={'override_tier':'low','reason':'Reviewed recorded circumstances','staff_name':'Forged actor'}
    assert client.post('/api/v1/students/unknown/risk-override',json=payload).status_code==404
    override=client.post('/api/v1/students/STU-001/risk-override',json=payload).json()
    assert override['original_tier']==base['support_priority_tier']
    result=client.get('/api/v1/students/STU-001/risk-explanation').json()
    assert result['composite_risk_score']==base['composite_risk_score']
    assert result['effective_priority_tier']=='low'
    audit=dashboard_service._load_synthetic_data()['audit_events'][-1]
    assert audit['performed_by_name']=='advisor@edunexus.ai'
    assert audit['details']['changes']['override_reason']==payload['reason']
    assert client.delete('/api/v1/students/STU-001/risk-override').status_code==200
    assert not client.get('/api/v1/students/STU-001/risk-explanation').json()['human_override']['is_overridden']


def test_production_auth_and_signed_roles(monkeypatch):
    monkeypatch.setattr(settings,'ENVIRONMENT','prod')
    monkeypatch.setattr(settings,'SUPABASE_JWT_SECRET','test-secret-value-for-regression-tests-only')
    monkeypatch.setattr(settings,'SUPABASE_JWT_ISSUER','https://test.example/auth/v1')
    c=TestClient(app)
    assert c.get('/api/v1/dashboard/overview').status_code==200
    assert c.get('/api/v1/students').status_code==401
    assert c.get('/api/v1/students',headers={'X-User-Role':'admin'}).status_code==401
    assert c.get('/api/v1/students',headers={'Authorization':'Bearer edunexus-demo-advisor-token'}).status_code==401
    now=int(datetime.now(timezone.utc).timestamp())
    claims={'sub':str(uuid4()),'exp':now+300,'iat':now,'iss':settings.SUPABASE_JWT_ISSUER,'aud':'authenticated','user_metadata':{'role':'admin'}}
    token=jwt.encode(claims,settings.SUPABASE_JWT_SECRET,algorithm='HS256')
    assert c.get('/api/v1/students',headers={'Authorization':f'Bearer {token}'}).status_code==403
    claims['app_metadata']={'role':'advisor'}
    token=jwt.encode(claims,settings.SUPABASE_JWT_SECRET,algorithm='HS256')
    assert get_current_user(f'Bearer {token}').role=='advisor'
    for bad in [jwt.encode({**claims,'exp':now-1},settings.SUPABASE_JWT_SECRET,algorithm='HS256'), jwt.encode(claims,'wrong-secret-that-is-long-enough-for-tests',algorithm='HS256')]:
        with pytest.raises(HTTPException) as exc:get_current_user(f'Bearer {bad}')
        assert exc.value.status_code==401


def test_reset_persistent_isolation(monkeypatch):
    import app.services.csv_service as module
    monkeypatch.setattr(module,'is_database_configured',lambda:True)
    with pytest.raises(HTTPException) as exc:csv_service.reset_synthetic_demo_dataset()
    assert exc.value.status_code==409


@pytest.mark.parametrize('value',[0,-1,float('nan'),float('inf')])
def test_invalid_domain_weights(value):
    weights={**DEFAULT_DOMAIN_WEIGHTS,'academic':value}
    with pytest.raises(ValueError):SuccessScoreEngine(weights)
