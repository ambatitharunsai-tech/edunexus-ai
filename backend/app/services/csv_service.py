"""
EduNexus AI — CSV Ingestion & Validation Service
Provides safe, row-level validated ingestion for student records, attendance,
and assessments with documented deduplication, downloadable templates,
and isolated demo dataset reset.

ETHICAL & SECURITY CONTROLS:
1. Strict type, range, and format enforcement.
2. Row-level error logging with 1-based line numbers.
3. Foreign-key cross-referencing against student directory.
4. Bounded limits: 5 MB file size limit, 2,000 maximum row batch size.
5. Absolute isolation: Demo reset cannot overwrite live Supabase database.
"""

import io
import csv
import re
from datetime import datetime, date, timezone
from typing import Dict, Any, List, Optional, Tuple
from uuid import uuid4
from pydantic import BaseModel, Field, ValidationError
from math import isfinite
from fastapi import HTTPException
from app.db.client import is_database_configured
from app.services.dataset_service import DATA_LOCK, commit_records
from app.schemas.student import StudentCreate
from app.schemas.attendance import AttendanceCreate
from app.schemas.assessment import AssessmentCreate
from app.schemas.engagement import EngagementEventCreate
from app.schemas.placement import PlacementCreate
from app.schemas.skills import SkillsCreate
from app.schemas.feedback import FeedbackCreate
from app.schemas.lms import LMSActivityCreate

from app.services.dashboard_service import dashboard_service, SEED_DATA_PATH
from app.services.database_service import database_service

MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB
MAX_ROW_COUNT = 2000

EXPECTED_HEADERS = {
    "students": ["student_id", "first_name", "last_name", "email", "current_grade", "academic_term", "section", "department"],
    "attendance": ["student_id", "date", "status", "remarks"],
    "assessments": ["student_id", "subject", "assessment_type", "score", "max_score", "date"],
    "placement": ["student_id", "aptitude_score", "coding_score", "mock_interview_score", "resume_score", "readiness_tier", "mock_interviews_attended"],
    "skills": ["student_id", "technical_score", "soft_skills_score", "certifications_count", "verified_skills"],
    "feedback": ["student_id", "faculty_sentiment", "student_satisfaction", "academic_term", "mentor_notes"],
    "lms": ["student_id", "weekly_login_count", "module_completion_pct", "assignments_submitted_pct", "forum_posts_count"],
}

SAMPLE_TEMPLATES = {
    "students": (
        "student_id,first_name,last_name,email,current_grade,academic_term,section,department\n"
        "STU-101,Kavita,Iyer,kavita.iyer@edunexus-demo.example,Grade 11,AY 2025-26 Term 1,A,Science & Technology\n"
        "STU-102,Manish,Deshmukh,manish.d@edunexus-demo.example,Grade 11,AY 2025-26 Term 1,B,Commerce & Economics\n"
        "STU-103,Sneha,Pillai,sneha.pillai@edunexus-demo.example,Grade 10,AY 2025-26 Term 1,A,Computer Applications\n"
    ),
    "attendance": (
        "student_id,date,status,remarks\n"
        "STU-001,2026-10-01,present,Laboratory session attended\n"
        "STU-001,2026-10-02,absent,Excused medical note pending\n"
        "STU-002,2026-10-01,present,Classroom lecture\n"
    ),
    "assessments": (
        "student_id,subject,assessment_type,score,max_score,date\n"
        "STU-001,Mathematics,midterm,68.0,100.0,2026-10-05\n"
        "STU-001,Physics,quiz,22.0,25.0,2026-10-07\n"
        "STU-002,Chemistry,midterm,85.0,100.0,2026-10-05\n"
    ),
    "placement": (
        "student_id,aptitude_score,coding_score,mock_interview_score,resume_score,readiness_tier,mock_interviews_attended\n"
        "STU-001,65.0,78.0,70.0,80.0,developing,2\n"
        "STU-002,90.0,95.0,92.0,88.0,placement_ready,3\n"
        "STU-003,50.0,42.0,45.0,60.0,not_ready,0\n"
    ),
    "skills": (
        "student_id,technical_score,soft_skills_score,certifications_count,verified_skills\n"
        "STU-001,75.0,80.0,2,Python;SQL;Docker\n"
        "STU-002,92.0,85.0,4,Java;Spring Boot;Kubernetes;AWS\n"
        "STU-003,55.0,60.0,1,HTML;CSS;Basic JavaScript\n"
    ),
    "feedback": (
        "student_id,faculty_sentiment,student_satisfaction,academic_term,mentor_notes\n"
        "STU-001,78.0,82.0,AY 2025-26 Term 1,Consistent laboratory participation and engaged project work\n"
        "STU-002,88.0,90.0,AY 2025-26 Term 1,Excellent conceptual clarity in computer systems and system design\n"
        "STU-003,62.0,65.0,AY 2025-26 Term 1,Regular attendance but needs structured practice in coding assignments\n"
    ),
    "lms": (
        "student_id,weekly_login_count,module_completion_pct,assignments_submitted_pct,forum_posts_count\n"
        "STU-001,8,75.0,80.0,4\n"
        "STU-002,14,92.0,95.0,9\n"
        "STU-003,4,45.0,50.0,1\n"
    ),
}

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")


class CsvRowError(BaseModel):
    line: int
    column: str
    message: str
    raw_value: Optional[str] = None


class CsvPreviewResponse(BaseModel):
    file_name: str
    data_type: str
    total_rows: int
    valid_rows: int
    failed_rows: int
    errors: List[CsvRowError]
    sample_data: List[Dict[str, str]]
    can_import: bool
    deduplication_strategy: str


class CsvImportResult(BaseModel):
    status: str = "success"
    inserted: int = 0
    updated: int = 0
    rejected: int = 0
    total_processed: int = 0
    storage_mode: str = "synthetic"
    data_type: str
    imported: int
    skipped: int
    failed: int
    errors: List[CsvRowError]
    message: str


EXPECTED_HEADERS["engagement"] = ["student_id", "event_type", "title", "event_timestamp", "duration_minutes", "description"]
SAMPLE_TEMPLATES["engagement"] = "student_id,event_type,title,event_timestamp,duration_minutes,description\nSTU-001,workshop,Python workshop,2026-10-01T10:00:00+05:30,60,Recorded campus workshop\n"
MODELS = {"students": StudentCreate, "attendance": AttendanceCreate, "assessments": AssessmentCreate,
          "engagement": EngagementEventCreate, "placement": PlacementCreate, "skills": SkillsCreate,
          "feedback": FeedbackCreate, "lms": LMSActivityCreate}
TABLE_MAP = {"students":"students", "attendance":"attendance", "assessments":"assessments",
             "engagement":"engagement_events", "placement":"placement_records", "skills":"skills_records",
             "feedback":"feedback_records", "lms":"lms_activity_records"}

class CsvService:
    def get_template(self, data_type):
        if data_type not in SAMPLE_TEMPLATES:
            raise ValueError("Unsupported data type")
        return SAMPLE_TEMPLATES[data_type]

    def _normalize(self, kind, row, students):
        # Empty optional cells mean unknown, never a fabricated numeric measurement.
        raw = {k:str(v).strip() for k,v in row.items() if v is not None and str(v).strip()}
        if kind not in MODELS:
            raise ValueError("Unsupported data type")
        if kind != "students":
            reference = raw.get("student_id", "")
            student = next((s for s in students if reference.lower() in (str(s['id']).lower(),s['student_id'].lower())),None)
            if student is None:
                raise ValueError(f"Student '{reference}' does not exist in student registry.")
            raw['student_id'] = str(student['id'])
        else:
            raw['student_id'] = raw.get('student_id','').upper()
        if kind == "attendance":
            if 'date' in raw: raw['session_date'] = raw.pop('date')
        if kind == "assessments":
            if 'date' in raw: raw['assessment_date'] = raw.pop('date')
            raw.setdefault('title', raw.get('subject', '') + ' ' + raw.get('assessment_type', ''))
            raw.setdefault('term', student['academic_term'])
            if raw.get('score') and raw.get('max_score') and float(raw['score']) > float(raw['max_score']):
                raise ValueError("Score cannot exceed maximum marks")
        if kind == "skills" and 'verified_skills' in raw:
            raw['verified_skills'] = [v.strip() for v in raw['verified_skills'].split(';') if v.strip()]
        numeric_scores = ('aptitude_score','coding_score','mock_interview_score','resume_score','technical_score','soft_skills_score','faculty_sentiment','student_satisfaction','module_completion_pct','assignments_submitted_pct')
        for key in numeric_scores:
            if key in raw and not 0 <= float(raw[key]) <= 100:
                raise ValueError(f"{key} must be between 0 and 100")
        for key in ('certifications_count','weekly_login_count','forum_posts_count','mock_interviews_attended','duration_minutes'):
            if key in raw and int(raw[key]) < 0:
                raise ValueError(f"{key} cannot be negative")
        record = MODELS[kind](**raw).model_dump(mode='json')
        if any(isinstance(v,float) and not isfinite(v) for v in record.values()):
            raise ValueError("Numeric values must be finite")
        return record

    def _key(self, kind, r):
        if kind == 'students': return (r['student_id'].upper(),)
        base = (str(r['student_id']),)
        if kind == 'attendance': return base + (r['session_date'],r.get('period','full_day'))
        if kind == 'assessments': return base + (r['subject'],r['assessment_date'],r['assessment_type'],r['title'])
        if kind == 'engagement': return base + (r['event_type'],r['event_timestamp'],r['title'])
        if kind == 'feedback': return base + (r['academic_term'],)
        return base  # Snapshot domains overwrite the latest matching student snapshot.

    def _validate(self, kind, rows, data):
        if kind not in MODELS: raise ValueError("Unsupported data type")
        if not rows or len(rows)>MAX_ROW_COUNT: raise ValueError("Batch must contain 1–2000 rows")
        normalized, errors, seen = [], [], set()
        for line,row in enumerate(rows,2):
            try:
                record = self._normalize(kind,row,data.get('students',[]))
                key = self._key(kind,record)
                if key in seen: raise ValueError("Duplicate entry detected within this file")
                seen.add(key)
                normalized.append(record)
            except (ValueError, TypeError, KeyError) as exc:
                message = str(exc)
                if isinstance(exc,ValidationError):
                    message = '; '.join(f"{'.'.join(map(str,e['loc']))}: {e['msg']}" for e in exc.errors())
                errors.append(CsvRowError(line=line,column='row',message=message))
        return normalized, errors

    def _parse(self, content, kind):
        if kind not in EXPECTED_HEADERS: raise ValueError("Unsupported data type")
        if len(content.encode('utf-8'))>MAX_FILE_SIZE_BYTES: raise ValueError("File exceeds 5 MB limit")
        reader = csv.DictReader(io.StringIO(content.lstrip('\ufeff')))
        headers = reader.fieldnames or []
        required = {k for k,f in MODELS[kind].model_fields.items() if f.is_required()}
        # Legacy aliases and derivable assessment context preserve existing templates.
        if kind == 'attendance': required.discard('session_date'); required.add('date' if 'session_date' not in headers else 'session_date')
        if kind == 'assessments':
            required -= {'title','term','assessment_date'}
            required.add('date' if 'assessment_date' not in headers else 'assessment_date')
        if not required.issubset(headers):
            raise ValueError('Missing mandatory column headers: '+', '.join(sorted(required-set(headers))))
        if len(set(headers)) != len(headers): raise ValueError('Duplicate column headers')
        rows = []
        for row in reader:
            if None in row or any(v is None for v in row.values()): raise ValueError(f"Malformed CSV at line {reader.line_num}")
            if any(v.strip() for v in row.values()): rows.append(row)
            if len(rows)>MAX_ROW_COUNT: raise ValueError('File exceeds maximum batch limit of 2000 rows')
        return rows

    def validate_and_preview(self,file_bytes,file_name,data_type):
        rows = self._parse(file_bytes.decode('utf-8-sig'),data_type)
        valid, errors = self._validate(data_type,rows,dashboard_service._load_synthetic_data())
        failed_lines = {e.line for e in errors}
        sample = [row for i,row in enumerate(rows,2) if i not in failed_lines][:8]
        return CsvPreviewResponse(file_name=file_name,data_type=data_type,total_rows=len(rows),valid_rows=len(valid),
            failed_rows=len(failed_lines),errors=errors[:100],sample_data=sample,can_import=not errors and bool(valid),
            deduplication_strategy='Skip or overwrite matching canonical record keys; snapshots match student, feedback also matches term.')

    def import_rows(self,data_type,rows=None,deduplicate_strategy='skip',file_content=None,actor=None):
        if deduplicate_strategy not in ('skip','overwrite'): raise ValueError('Unsupported deduplication strategy')
        if file_content is not None: rows = self._parse(file_content,data_type)
        with DATA_LOCK:
            data = dashboard_service._load_synthetic_data()
            normalized, errors = self._validate(data_type,rows or [],data)
            if errors:
                return CsvImportResult(status='rejected',data_type=data_type,imported=0,skipped=0,failed=len(errors),rejected=len(errors),
                    total_processed=len(rows or []),errors=errors,message='Batch rejected; no records changed.')
            table = TABLE_MAP[data_type]
            existing = {self._key(data_type,r):r for r in sorted(data.get(table,[]),key=lambda r:str(r.get('updated_at','')))}
            inserted=updated=skipped=0
            writes=[]
            now=datetime.now(timezone.utc).isoformat()
            for record in normalized:
                previous=existing.get(self._key(data_type,record))
                if previous and deduplicate_strategy=='skip': skipped+=1; continue
                record={**record,'id':previous['id'] if previous else str(uuid4()),'created_at':previous.get('created_at', now) if previous else now}
                if table != 'engagement_events': record['updated_at']=now
                writes.append(record)
                if previous: updated+=1
                else: inserted+=1
            commit_records(data,table,writes,actor)
            mode='persistent' if is_database_configured() else 'synthetic'
            return CsvImportResult(data_type=data_type,imported=inserted+updated,inserted=inserted,updated=updated,skipped=skipped,failed=0,
                errors=[],total_processed=len(rows),storage_mode=mode,message=f'{inserted} inserted, {updated} updated, {skipped} skipped ({mode}).')

    def reset_synthetic_demo_dataset(self):
        if is_database_configured(): raise HTTPException(409,'Demo reset is disabled in persistent mode.')
        with DATA_LOCK:
            dashboard_service._cached_synthetic_data=None
            dashboard_service._demo_interventions.clear()
            data=dashboard_service._load_synthetic_data()
            return {'status':'reset_complete','message':'Synthetic in-memory dataset restored.', 'total_students':len(data.get('students',[])),
                **{key:len(data.get(table,[])) for key,table in [('attendance_records','attendance'),('assessment_records','assessments'),
                    ('engagement_records','engagement_events'),('placement_records','placement_records'),('skills_records','skills_records'),
                    ('feedback_records','feedback_records'),('lms_records','lms_activity_records')]},'reset_at':datetime.now(timezone.utc).isoformat()}

csv_service = CsvService()
