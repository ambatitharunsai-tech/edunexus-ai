"""Canonical data access. Configured persistence never falls back to demo data."""
from copy import deepcopy
from datetime import datetime, timezone
from threading import RLock
from uuid import uuid4
from fastapi import HTTPException
from app.db.client import get_db_client, is_database_configured

TABLES = ('students', 'attendance', 'assessments', 'engagement_events',
          'placement_records', 'skills_records', 'feedback_records',
          'lms_activity_records', 'interventions', 'intervention_outcomes', 'risk_overrides', 'audit_events')
DATA_LOCK = RLock()


_cached_data = None
_cached_time = 0.0


def invalidate_live_cache():
    global _cached_data
    _cached_data = None


def read_live_dataset(force=False):
    global _cached_data, _cached_time
    import time
    now = time.time()
    if not force and _cached_data is not None and (now - _cached_time) < 2.5:
        return deepcopy(_cached_data)

    try:
        client = get_db_client()
        data = {}
        for table in TABLES:
            rows, offset = [], 0
            order_col = 'created_at' if table in ('audit_events', 'interventions', 'intervention_outcomes') else 'id'
            while True:
                batch = client.table(table).select('*').order(order_col).range(offset, offset + 499).execute().data
                if batch is None:
                    raise RuntimeError('No database response')
                rows.extend(batch)
                if len(batch) < 500:
                    break
                offset += 500
            data[table] = rows
        _cached_data = data
        _cached_time = now
        return deepcopy(data)
    except Exception:
        raise HTTPException(503, 'Persistent dataset unavailable. Check database configuration and migrations.')


def commit_records(data, table, records, actor=None, action='UPDATE', delete_ids=None):
    """Commit related writes and audit together; demo commits hold a shared lock."""
    if table not in TABLES or table == 'audit_events':
        raise ValueError('Unsupported mutation table')
    delete_ids = delete_ids or []
    def build_audit(entity_id, audit_action, record=None):
        changed_fields = ('status', 'is_overridden', 'original_tier', 'override_tier', 'override_reason')
        return {
            'id': str(uuid4()),
            'entity_type': table,
            'entity_id': entity_id,
            'action': audit_action,
            'performed_by': actor.user_id if actor and not actor.is_demo_session else None,
            'performed_by_name': actor.email if actor else 'Synthetic import',
            'details': {
                'storage_mode': 'persistent' if is_database_configured() else 'synthetic',
                'actor_id': actor.user_id if actor else None,
                'changes': {k: record[k] for k in changed_fields if record and k in record},
            },
            'created_at': datetime.now(timezone.utc).isoformat(),
        }

    # The database RPC requires exactly one audit row for every create/update/delete.
    # Build delete audits independently so delete-only requests are valid too.
    audits = [build_audit(r['id'], action, r) for r in records]
    audits.extend(build_audit(rid, 'DELETE') for rid in delete_ids)
    if is_database_configured():
        try:
            get_db_client().rpc('edunexus_commit', {
                'p_table': table, 'p_records': records, 'p_audits': audits,
                'p_delete_ids': delete_ids,
            }).execute()
            invalidate_live_cache()
        except Exception:
            raise HTTPException(503, 'Persistent write failed; no demo fallback was performed.')
    else:
        with DATA_LOCK:
            current = data.setdefault(table, [])
            by_id = {str(r['id']): r for r in records}
            current[:] = [deepcopy(by_id.pop(str(r['id']), r)) for r in current
                          if str(r['id']) not in delete_ids]
            current.extend(deepcopy(list(by_id.values())))
            data.setdefault('audit_events', []).extend(audits)
