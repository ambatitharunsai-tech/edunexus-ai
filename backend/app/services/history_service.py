"""Historical views contain recorded dates and observations only."""
from collections import defaultdict
from app.schemas.student import JourneyTimelineEvent


def build_history(student, attendance, assessments, engagements, interventions, domains=()):
    events = []
    def add(record, date_key, kind, title, description):
        if record.get(date_key):
            events.append(JourneyTimelineEvent(id=f"{kind}-{record['id']}", date=str(record[date_key]),
                event_type=kind, title=title, description=description))
    add(student, 'enrollment_date', 'milestone', 'Enrollment', f"Recorded enrollment in {student.get('current_grade', '')}")
    for r in assessments:
        add(r, 'assessment_date', 'academic', r.get('title') or r.get('subject', 'Assessment'),
            f"{r['score']}/{r['max_score']} recorded marks")
    for r in attendance:
        add(r, 'session_date', 'attendance', 'Attendance', f"{r['status'].title()} — {r.get('period', 'full_day')}")
    for r in engagements:
        add(r, 'event_timestamp', 'engagement', r.get('title', 'Engagement'), r.get('description') or r['event_type'])
    for r in interventions:
        add(r, 'start_date', 'intervention', r['title'], f"{r['description']} Status: {r['status']}")
    for r in domains:
        for key, title in [('evaluated_at', 'Placement evaluation'), ('last_assessed_date', 'Skills assessment'), ('recorded_at', 'Domain observation')]:
            if key in r:
                add(r, key, 'milestone', title, 'Recorded domain observation; see component details.')
                break
    att, ass = defaultdict(list), defaultdict(list)
    for r in attendance:
        if r.get('session_date'):
            att[str(r['session_date'])[:10]].append(r['status'] in ('present', 'late'))
    for r in assessments:
        if r.get('assessment_date') and r['max_score'] > 0:
            ass[str(r['assessment_date'])[:10]].append(r['score']/r['max_score']*100)
    points = [{'period': d, 'attendance': round(sum(att[d])/len(att[d])*100, 1) if att[d] else None,
               'score': round(sum(ass[d])/len(ass[d]), 1) if ass[d] else None}
              for d in sorted(set(att) | set(ass))]
    return sorted(events, key=lambda e: e.date, reverse=True), points
