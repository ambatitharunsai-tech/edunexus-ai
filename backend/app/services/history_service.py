"""Historical views contain recorded dates and observations only."""
from collections import defaultdict
from app.schemas.student import JourneyTimelineEvent


def build_history(student, attendance, assessments, engagements, interventions, domains=()):
    events = []

    def add(record, date_key, kind, title, description, metric_badge=None, severity="info"):
        if record.get(date_key):
            events.append(
                JourneyTimelineEvent(
                    id=f"{kind}-{record.get('id', record.get('student_id', 'evt'))}",
                    date=str(record[date_key]),
                    event_type=kind,
                    title=title,
                    description=description,
                    metric_badge=metric_badge,
                    severity=severity,
                )
            )

    # Enrollment
    add(
        student,
        'enrollment_date',
        'milestone',
        'Cohort Enrollment',
        f"Recorded enrollment in {student.get('current_grade', 'Cohort')}, {student.get('department', 'General Academics')}",
        metric_badge=student.get('current_grade', 'Enrolled'),
        severity='info',
    )

    # Assessments
    for r in assessments:
        score = float(r.get('score', 0))
        max_score = float(r.get('max_score', 100))
        pct = (score / max_score * 100.0) if max_score > 0 else 0.0
        sev = "success" if pct >= 80 else ("warning" if pct >= 60 else "critical")
        subj = r.get('title') or r.get('subject') or 'Assessment'
        add(
            r,
            'assessment_date',
            'academic',
            subj,
            f"{score:g}/{max_score:g} recorded marks ({pct:.1f}% scored in {r.get('subject', 'Course')})",
            metric_badge=f"{pct:.1f}%",
            severity=sev,
        )

    # Attendance
    for r in attendance:
        status_val = str(r.get('status', 'present')).lower()
        sev = "success" if status_val == "present" else ("warning" if status_val == "late" else "critical")
        add(
            r,
            'session_date',
            'attendance',
            f"Attendance: {status_val.title()}",
            f"Session logged as {status_val.title()} ({r.get('period', 'full_day')})",
            metric_badge=status_val.upper(),
            severity=sev,
        )

    # Engagements
    for r in engagements:
        evt_type = r.get('event_type', 'engagement')
        badge = evt_type.replace('_', ' ').title()
        add(
            r,
            'event_timestamp',
            'engagement',
            r.get('title', 'Campus Engagement'),
            r.get('description') or f"Recorded {evt_type} activity",
            metric_badge=badge,
            severity='info',
        )

    # Interventions
    for r in interventions:
        status_val = str(r.get('status', 'planned')).lower()
        sev = "success" if status_val == "completed" else ("warning" if status_val in ("planned", "in_progress") else "info")
        add(
            r,
            'start_date',
            'intervention',
            r.get('title', 'Support Plan'),
            f"{r.get('description', '')} [Status: {status_val.replace('_', ' ').title()}]",
            metric_badge=status_val.replace('_', ' ').upper(),
            severity=sev,
        )

    # 7-Domain Observations (Placement, Skills, LMS, Feedback)
    for r in domains:
        # Placement
        if 'aptitude_score' in r or 'readiness_tier' in r or 'evaluated_at' in r:
            tier = str(r.get('readiness_tier', 'evaluated')).lower()
            apt = r.get('aptitude_score')
            sev = "success" if tier in ('high', 'ready') else ("warning" if tier in ('moderate', 'medium') else "critical")
            add(
                r,
                'evaluated_at',
                'milestone',
                'Placement evaluation',
                f"Readiness assessed at {tier.replace('_', ' ').title()}. Aptitude: {apt if apt is not None else 'N/A'}, Coding: {r.get('coding_score', 'N/A')}",
                metric_badge=f"Tier: {tier.upper()}",
                severity=sev,
            )
        # Skills
        elif 'last_assessed_date' in r or 'coding_score' in r:
            cs = r.get('coding_score')
            sev = "success" if (cs or 0) >= 75 else ("warning" if (cs or 0) >= 50 else "critical")
            add(
                r,
                'last_assessed_date',
                'milestone',
                'Skills Assessment',
                f"Verified skills evaluation: Coding score {cs if cs is not None else 'N/A'}/100, Soft skills: {r.get('soft_skills_score', 'N/A')}/100",
                metric_badge=f"Coding {cs}/100" if cs is not None else "Skills Evaluated",
                severity=sev,
            )
        # Feedback
        elif 'sentiment_score' in r:
            sent = r.get('sentiment_score')
            sev = "success" if (sent or 0) >= 4 else ("warning" if (sent or 0) >= 3 else "critical")
            add(
                r,
                'recorded_at',
                'milestone',
                'Faculty & Mentor Observation',
                f"Feedback recorded: Sentiment rating {sent if sent is not None else 'N/A'}/5. {r.get('notes', '')}",
                metric_badge=f"Rating {sent}/5" if sent is not None else "Feedback",
                severity=sev,
            )
        # LMS Activity
        elif 'weekly_login_count' in r or 'assignments_completed' in r:
            logins = r.get('weekly_login_count')
            sev = "success" if (logins or 0) >= 5 else ("warning" if (logins or 0) >= 2 else "critical")
            add(
                r,
                'recorded_at',
                'engagement',
                'LMS Learning Activity',
                f"Digital portal tracking: {logins if logins is not None else 'N/A'} logins/wk, {r.get('assignments_completed', 0)} assignments submitted",
                metric_badge=f"{logins} logins/wk" if logins is not None else "LMS Active",
                severity=sev,
            )
        else:
            for key, title in [('evaluated_at', 'Placement evaluation'), ('last_assessed_date', 'Skills assessment'), ('recorded_at', 'Domain observation')]:
                if key in r:
                    add(r, key, 'milestone', title, 'Recorded domain observation; see component details.', metric_badge="Recorded", severity="info")
                    break

    # Trend calculation
    att, ass = defaultdict(list), defaultdict(list)
    for r in attendance:
        if r.get('session_date'):
            att[str(r['session_date'])[:10]].append(r.get('status') in ('present', 'late'))
    for r in assessments:
        if r.get('assessment_date') and r.get('max_score', 0) > 0:
            ass[str(r['assessment_date'])[:10]].append(r['score'] / r['max_score'] * 100)

    points = [
        {
            'period': d,
            'attendance': round(sum(att[d]) / len(att[d]) * 100, 1) if att[d] else None,
            'score': round(sum(ass[d]) / len(ass[d]), 1) if ass[d] else None,
        }
        for d in sorted(set(att) | set(ass))
    ]
    return sorted(events, key=lambda e: e.date, reverse=True), points
