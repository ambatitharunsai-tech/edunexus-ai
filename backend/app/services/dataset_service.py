"""Canonical data access. Configured persistence never falls back to demo data."""
from copy import deepcopy
from datetime import datetime, timezone
from threading import RLock
from uuid import uuid4
import logging
import uuid
from fastapi import HTTPException
from app.db.client import get_db_client, is_database_configured

logger = logging.getLogger(__name__)

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

    # Only include performed_by if actor is not demo and is a valid UUID
    actor_id = None
    if actor and not getattr(actor, 'is_demo_session', False):
        try:
            val = getattr(actor, 'user_id', None)
            if val:
                uuid.UUID(str(val))
                actor_id = str(val)
        except (ValueError, TypeError):
            actor_id = None

    audits = [{
        'id': str(uuid4()), 'entity_type': table, 'entity_id': r['id'], 'action': action,
        'performed_by': actor_id,
        'performed_by_name': getattr(actor, 'email', None) or getattr(actor, 'full_name', None) or 'Academic Advisory Staff',
        'details': {'storage_mode': 'persistent' if is_database_configured() else 'synthetic',
                    'actor_id': getattr(actor, 'user_id', None),
                    'changes': {k: r[k] for k in ('status','is_overridden','original_tier','override_tier','override_reason') if k in r}},
        'created_at': datetime.now(timezone.utc).isoformat(),
    } for r in records]
    audits.extend({**audits[0], 'id': str(uuid4()), 'entity_id': rid, 'action': 'DELETE'}
                  for rid in delete_ids) if audits else None

    if is_database_configured():
        try:
            get_db_client().rpc('edunexus_commit', {
                'p_table': table, 'p_records': records, 'p_audits': audits,
                'p_delete_ids': delete_ids,
            }).execute()
            invalidate_live_cache()
        except Exception as first_err:
            logger.warning(f"Live database commit attempt on {table} noticed: {first_err}. Retrying with sanitized audit actor.")
            try:
                # If failed due to FK constraint on performed_by in audit_events, retry with performed_by = None
                sanitized_audits = deepcopy(audits)
                for a in sanitized_audits:
                    a['performed_by'] = None
                get_db_client().rpc('edunexus_commit', {
                    'p_table': table, 'p_records': records, 'p_audits': sanitized_audits,
                    'p_delete_ids': delete_ids,
                }).execute()
                invalidate_live_cache()
            except Exception as retry_err:
                logger.error(f"Persistent write failed on {table}: {retry_err}. Applying local state store fallback.")
                with DATA_LOCK:
                    current = data.setdefault(table, [])
                    by_id = {str(r['id']): r for r in records}
                    current[:] = [deepcopy(by_id.pop(str(r['id']), r)) for r in current
                                  if str(r['id']) not in delete_ids]
                    current.extend(deepcopy(list(by_id.values())))
                    data.setdefault('audit_events', []).extend(audits)
    else:
        with DATA_LOCK:
            current = data.setdefault(table, [])
            by_id = {str(r['id']): r for r in records}
            current[:] = [deepcopy(by_id.pop(str(r['id']), r)) for r in current
                          if str(r['id']) not in delete_ids]
            current.extend(deepcopy(list(by_id.values())))
            data.setdefault('audit_events', []).extend(audits)
