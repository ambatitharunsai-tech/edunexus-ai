#!/usr/bin/env python3
"""
EduNexus AI — Synthetic Data Seeding Pipeline
Generates 35+ realistic fictional student profiles across multiple semesters,
comprehensive attendance histories, multi-subject assessments, engagement events,
and intervention plans with outcome metrics.

Ethical AI Mandate:
- Exclusively generates fictional student records.
- Stored outcome metrics feature explicit causation disclaimers.
"""

import os
import sys
import json
import uuid
import random
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

# Add backend directory to sys.path so backend schemas/config can be imported if needed
backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from dotenv import load_dotenv

load_dotenv(backend_dir / ".env")

# ── Fictional Persona Data Pools ──────────────────────────────────────

FIRST_NAMES = [
    "Aarav", "Diya", "Rohan", "Ananya", "Vikram", "Ishita", "Kabir", "Meera",
    "Aditya", "Pooja", "Arjun", "Sneha", "Karan", "Tanvi", "Nikhil", "Priya",
    "Siddharth", "Rhea", "Dhruv", "Kavya", "Rahul", "Neha", "Varun", "Simran",
    "Manish", "Shreya", "Akash", "Tara", "Gaurav", "Divya", "Dev", "Ira",
    "Harsh", "Aditi", "Pranav", "Zoya",
]

LAST_NAMES = [
    "Sharma", "Patel", "Mehta", "Iyer", "Reddy", "Verma", "Kapoor", "Nair",
    "Gupta", "Deshmukh", "Chopra", "Joshi", "Bose", "Kulkarni", "Sen", "Pillai",
    "Choudhury", "Bhat", "Malhotra", "Rao", "Singhania", "Mukherjee", "Das", "Saxena",
    "Mishra", "Trivedi", "Banerjee", "Menon", "Agarwal", "Nambiar", "Thakur", "Pandey",
    "Dutta", "Goswami", "Bhattacharya", "Sethi",
]

SUBJECTS = [
    "Mathematics", "Physics", "Chemistry", "Computer Science", "English Literature", "History & Civics"
]

GRADES_AND_TERMS = [
    ("Grade 9", "AY 2024-25 Term 1"),
    ("Grade 10", "AY 2024-25 Term 2"),
    ("Grade 11", "AY 2025-26 Term 1"),
    ("Grade 12", "AY 2025-26 Term 2"),
]

SECTIONS = ["A", "B", "C"]

INTERVENTION_TYPES = [
    ("academic_tutoring", "One-on-One Mathematics & STEM Tutoring", "High"),
    ("attendance_counseling", "Punctuality & Morning Transit Counseling", "Urgent"),
    ("peer_mentoring", "Senior Student Cohort Mentorship", "Medium"),
    ("schedule_adjustment", "Laboratory Block Reassignment", "Low"),
    ("parental_engagement", "Family Academic Partnership Check-in", "High"),
    ("wellness_check", "Stress Management & Exam Preparation Session", "Medium"),
]

STAFF_MEMBERS = [
    "Dr. Arvind Verma (Mathematics)",
    "Counselor Priya Nair (Student Support)",
    "Prof. Sunita Rao (Science Dept)",
    "Advisor Rajesh Kulkarni (Grade Lead)",
]


def generate_synthetic_dataset():
    """Generates a complete relational synthetic educational dataset."""
    random.seed(42)  # Deterministic seed for reproducible evaluation datasets

    dataset = {
        "students": [],
        "attendance": [],
        "assessments": [],
        "engagement_events": [],
        "interventions": [],
        "intervention_outcomes": [],
        "audit_events": [],
    }

    base_date = date(2025, 6, 1)

    for i in range(len(FIRST_NAMES)):
        student_uuid = str(uuid.uuid4())
        student_id_str = f"STU-{i + 1:03d}"
        first_name = FIRST_NAMES[i]
        last_name = LAST_NAMES[i]
        email = f"{first_name.lower()}.{last_name.lower()}@edunexus-demo.example"

        grade, term = GRADES_AND_TERMS[i % len(GRADES_AND_TERMS)]
        section = SECTIONS[i % len(SECTIONS)]
        enrollment_date = base_date + timedelta(days=random.randint(0, 30))

        # Categorize students into synthetic behavioural profiles
        if i < 6:
            profile = "high_risk"       # Lower attendance, lower marks
        elif i < 14:
            profile = "moderate_risk"   # Mixed attendance or subject variance
        else:
            profile = "standard"        # Consistent attendance and solid marks

        student_record = {
            "id": student_uuid,
            "student_id": student_id_str,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "date_of_birth": str(date(2008, 1, 1) + timedelta(days=random.randint(0, 1000))),
            "gender": "Female" if i % 2 == 1 else "Male",
            "enrollment_date": str(enrollment_date),
            "current_grade": grade,
            "academic_term": term,
            "section": section,
            "status": "active",
            "notes": f"Synthetic demo profile: {profile} trajectory persona.",
            "created_at": str(datetime.now(timezone.utc)),
            "updated_at": str(datetime.now(timezone.utc)),
        }
        dataset["students"].append(student_record)

        # ── 1. Attendance Generation (30 sessions per student) ────────
        current_session_date = date(2025, 8, 1)
        for d in range(30):
            session_date = current_session_date + timedelta(days=d)
            if session_date.weekday() >= 5:  # Skip weekends
                continue

            if profile == "high_risk":
                status = random.choices(["present", "late", "absent", "excused"], weights=[50, 15, 30, 5])[0]
            elif profile == "moderate_risk":
                status = random.choices(["present", "late", "absent", "excused"], weights=[75, 12, 10, 3])[0]
            else:
                status = random.choices(["present", "late", "absent", "excused"], weights=[92, 5, 2, 1])[0]

            dataset["attendance"].append({
                "id": str(uuid.uuid4()),
                "student_id": student_uuid,
                "session_date": str(session_date),
                "period": "full_day",
                "status": status,
                "remarks": "Morning roll call record" if status != "present" else None,
                "created_at": str(datetime.now(timezone.utc)),
                "updated_at": str(datetime.now(timezone.utc)),
            })

        # ── 2. Assessments Generation (6 evaluations per student) ─────
        assessment_configs = [
            ("Unit Quiz 1", "quiz", date(2025, 8, 15), 20.0),
            ("Laboratory Practical 1", "lab", date(2025, 8, 25), 25.0),
            ("Midterm Examination", "midterm", date(2025, 9, 10), 100.0),
            ("Unit Assignment 2", "assignment", date(2025, 9, 28), 30.0),
            ("Term Project Evaluation", "project", date(2025, 10, 15), 50.0),
            ("Term Final Examination", "final", date(2025, 11, 5), 100.0),
        ]

        for title, a_type, a_date, max_marks in assessment_configs:
            for subj in random.sample(SUBJECTS, 3):  # 3 subjects per student per cycle
                if profile == "high_risk":
                    percentage = random.uniform(42.0, 68.0)
                elif profile == "moderate_risk":
                    percentage = random.uniform(62.0, 82.0)
                else:
                    percentage = random.uniform(78.0, 96.0)

                raw_score = round((percentage / 100.0) * max_marks, 1)
                # Safeguard: never exceed maximum marks
                raw_score = min(raw_score, max_marks)

                dataset["assessments"].append({
                    "id": str(uuid.uuid4()),
                    "student_id": student_uuid,
                    "title": f"{subj} {title}",
                    "subject": subj,
                    "assessment_type": a_type,
                    "term": term,
                    "assessment_date": str(a_date),
                    "score": raw_score,
                    "max_score": max_marks,
                    "weight_percentage": 15.0 if a_type != "final" else 35.0,
                    "feedback": "Evaluation recorded." if raw_score >= 60 else "Additional practice recommended.",
                    "created_at": str(datetime.now(timezone.utc)),
                    "updated_at": str(datetime.now(timezone.utc)),
                })

        # ── 3. Engagement Events (4 events per student) ───────────────
        events = [
            ("lms_login", "Portal Study Session", 45),
            ("library_visit", "Reference Library Check-out", 30),
            ("peer_study", "Collaborative Group Study", 60),
            ("workshop", "Career & Study Skills Workshop", 90),
        ]
        for e_type, e_title, e_dur in events:
            dataset["engagement_events"].append({
                "id": str(uuid.uuid4()),
                "student_id": student_uuid,
                "event_type": e_type,
                "title": e_title,
                "description": f"Logged participation for {first_name}.",
                "duration_minutes": e_dur,
                "event_timestamp": str(datetime(2025, 9, random.randint(1, 28), random.randint(9, 17), tzinfo=timezone.utc)),
                "metadata": {"platform": "EduNexus LMS v2", "verified": True},
                "created_at": str(datetime.now(timezone.utc)),
            })

    # ── 4. Interventions & Outcomes (for students 1 to 8) ──────────────
    for idx in range(8):
        student = dataset["students"][idx]
        int_type, int_title, int_prio = INTERVENTION_TYPES[idx % len(INTERVENTION_TYPES)]
        staff = STAFF_MEMBERS[idx % len(STAFF_MEMBERS)]
        int_uuid = str(uuid.uuid4())

        status = "completed" if idx < 3 else ("in_progress" if idx < 6 else "planned")
        start_d = date(2025, 9, 1) + timedelta(days=idx * 4)
        target_d = start_d + timedelta(days=30)
        actual_d = target_d if status == "completed" else None
        follow_up_d = start_d + timedelta(days=14)

        dataset["interventions"].append({
            "id": int_uuid,
            "student_id": student["id"],
            "title": f"{int_title} — {student['first_name']}",
            "intervention_type": int_type,
            "priority": int_prio.lower(),
            "status": status,
            "description": f"Personalized support strategy designed for {student['first_name']} {student['last_name']}.",
            "goals": "Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.",
            "assigned_staff_name": staff,
            "start_date": str(start_d),
            "target_completion_date": str(target_d),
            "actual_completion_date": str(actual_d) if actual_d else None,
            "follow_up_date": str(follow_up_d),
            "notes": "Action plan reviewed with student and guardian.",
            "created_at": str(datetime.now(timezone.utc)),
            "updated_at": str(datetime.now(timezone.utc)),
        })

        # Outcomes for completed or in-progress interventions
        if status in ("completed", "in_progress"):
            baseline = 64.0 if "attendance" in int_type else 54.0
            post = 78.5 if "attendance" in int_type else 68.0

            dataset["intervention_outcomes"].append({
                "id": str(uuid.uuid4()),
                "intervention_id": int_uuid,
                "metric_name": "attendance_percentage" if "attendance" in int_type else "mathematics_average_score",
                "baseline_value": baseline,
                "post_value": post,
                "target_value": 80.0,
                "measurement_date": str(start_d + timedelta(days=21)),
                "outcome_status": "improved",
                "evidence_notes": f"Observation shows upward trajectory for {student['first_name']} post-session.",
                "causation_disclaimer": (
                    "Observed change reflects correlation during intervention interval; "
                    "causal relationship not established without control study."
                ),
                "created_at": str(datetime.now(timezone.utc)),
                "updated_at": str(datetime.now(timezone.utc)),
            })

    # ── 5. Audit Events ───────────────────────────────────────────────
    for idx in range(10):
        student = dataset["students"][idx]
        dataset["audit_events"].append({
            "id": str(uuid.uuid4()),
            "entity_type": "student",
            "entity_id": student["id"],
            "action": "CREATE",
            "performed_by_name": "KPMG System Seed Ingestion",
            "details": {"student_id": student["student_id"], "mode": "synthetic_seed"},
            "created_at": str(datetime.now(timezone.utc)),
        })

    return dataset


def write_sql_and_json_artifacts(dataset, data_dir: Path):
    """Writes both SQL and JSON formats for offline and dashboard execution."""
    data_dir.mkdir(parents=True, exist_ok=True)

    json_path = data_dir / "synthetic_seed.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(dataset, f, indent=2)

    sql_path = data_dir / "seed.sql"
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write("-- =====================================================================\n")
        f.write("-- EduNexus AI — Synthetic Demo Seed SQL\n")
        f.write(f"-- Generated on: {datetime.now(timezone.utc).isoformat()}\n")
        f.write(f"-- Total Students: {len(dataset['students'])}\n")
        f.write("-- =====================================================================\n\n")

        # Students
        f.write("-- 1. Insert Synthetic Students\n")
        for s in dataset["students"]:
            dob = f"'{s['date_of_birth']}'" if s.get("date_of_birth") else "NULL"
            f.write(
                f"INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)\n"
                f"VALUES ('{s['id']}', '{s['student_id']}', '{s['first_name']}', '{s['last_name']}', '{s['email']}', {dob}, '{s['gender']}', '{s['enrollment_date']}', '{s['current_grade']}', '{s['academic_term']}', '{s['section']}', '{s['status']}', '{s['notes']}')\n"
                f"ON CONFLICT (student_id) DO NOTHING;\n"
            )
        f.write("\n")

        # Attendance
        f.write("-- 2. Insert Synthetic Attendance Records\n")
        for a in dataset["attendance"]:
            rem = f"'{a['remarks']}'" if a.get("remarks") else "NULL"
            f.write(
                f"INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)\n"
                f"VALUES ('{a['id']}', '{a['student_id']}', '{a['session_date']}', '{a['period']}', '{a['status']}', {rem})\n"
                f"ON CONFLICT (student_id, session_date, period) DO NOTHING;\n"
            )
        f.write("\n")

        # Assessments
        f.write("-- 3. Insert Synthetic Assessment Evaluations\n")
        for asst in dataset["assessments"]:
            fb = f"'{asst['feedback']}'" if asst.get("feedback") else "NULL"
            f.write(
                f"INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)\n"
                f"VALUES ('{asst['id']}', '{asst['student_id']}', '{asst['title']}', '{asst['subject']}', '{asst['assessment_type']}', '{asst['term']}', '{asst['assessment_date']}', {asst['score']}, {asst['max_score']}, {asst['weight_percentage']}, {fb});\n"
            )
        f.write("\n")

        # Engagement Events
        f.write("-- 4. Insert Engagement Events\n")
        for e in dataset["engagement_events"]:
            meta_str = json.dumps(e["metadata"]).replace("'", "''")
            f.write(
                f"INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)\n"
                f"VALUES ('{e['id']}', '{e['student_id']}', '{e['event_type']}', '{e['title']}', '{e['description']}', {e['duration_minutes']}, '{e['event_timestamp']}', '{meta_str}'::jsonb);\n"
            )
        f.write("\n")

        # Interventions
        f.write("-- 5. Insert Interventions\n")
        for itv in dataset["interventions"]:
            act_d = f"'{itv['actual_completion_date']}'" if itv.get("actual_completion_date") else "NULL"
            f.write(
                f"INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)\n"
                f"VALUES ('{itv['id']}', '{itv['student_id']}', '{itv['title']}', '{itv['intervention_type']}', '{itv['priority']}', '{itv['status']}', '{itv['description']}', '{itv['goals']}', '{itv['assigned_staff_name']}', '{itv['start_date']}', '{itv['target_completion_date']}', {act_d}, '{itv['follow_up_date']}', '{itv['notes']}');\n"
            )
        f.write("\n")

        # Outcomes
        f.write("-- 6. Insert Intervention Outcomes\n")
        for o in dataset["intervention_outcomes"]:
            post = o['post_value'] if o.get('post_value') is not None else "NULL"
            f.write(
                f"INSERT INTO public.intervention_outcomes (id, intervention_id, metric_name, baseline_value, post_value, target_value, measurement_date, outcome_status, evidence_notes, causation_disclaimer)\n"
                f"VALUES ('{o['id']}', '{o['intervention_id']}', '{o['metric_name']}', {o['baseline_value']}, {post}, {o['target_value']}, '{o['measurement_date']}', '{o['outcome_status']}', '{o['evidence_notes']}', '{o['causation_disclaimer']}');\n"
            )
        f.write("\n")

    return json_path, sql_path


def seed_to_supabase_if_configured(dataset):
    """Attempts live seeding to Supabase if valid credentials are configured."""
    from app.db.client import is_database_configured, get_db_client

    if not is_database_configured():
        print("ℹ️ Live Supabase credentials not yet configured in backend/.env.")
        print("   Generated synthetic seed data has been saved to data/seed.sql and data/synthetic_seed.json.")
        print("   You can execute data/seed.sql directly in the Supabase SQL Editor once your project is active.")
        return False

    print("🚀 Connecting to Supabase with server-side service role...")
    try:
        client = get_db_client()

        # Insert students
        print(f"  • Inserting {len(dataset['students'])} students...")
        client.table("students").upsert(dataset["students"], on_conflict="student_id").execute()

        # Insert attendance in batches of 100
        print(f"  • Inserting {len(dataset['attendance'])} attendance records...")
        for i in range(0, len(dataset["attendance"]), 100):
            batch = dataset["attendance"][i : i + 100]
            client.table("attendance").upsert(batch, on_conflict="student_id,session_date,period").execute()

        # Insert assessments in batches of 100
        print(f"  • Inserting {len(dataset['assessments'])} assessments...")
        for i in range(0, len(dataset["assessments"]), 100):
            batch = dataset["assessments"][i : i + 100]
            client.table("assessments").insert(batch).execute()

        # Insert engagement events
        print(f"  • Inserting {len(dataset['engagement_events'])} engagement events...")
        client.table("engagement_events").insert(dataset["engagement_events"]).execute()

        # Insert interventions
        print(f"  • Inserting {len(dataset['interventions'])} interventions...")
        client.table("interventions").insert(dataset["interventions"]).execute()

        # Insert outcomes
        print(f"  • Inserting {len(dataset['intervention_outcomes'])} outcomes...")
        client.table("intervention_outcomes").insert(dataset["intervention_outcomes"]).execute()

        print("✅ Live Supabase synthetic seeding completed successfully!")
        return True
    except Exception as e:
        print(f"⚠️ Live seeding failed: {e}")
        print("   The SQL seed file at data/seed.sql remains available to run in Supabase SQL Editor.")
        return False


def main():
    print("=" * 70)
    print("EduNexus AI — Synthetic Seed Data Generator")
    print("=" * 70)

    print("1. Generating synthetic educational personas and time series...")
    dataset = generate_synthetic_dataset()

    print(f"   • Students: {len(dataset['students'])}")
    print(f"   • Attendance Records: {len(dataset['attendance'])}")
    print(f"   • Assessments: {len(dataset['assessments'])}")
    print(f"   • Engagement Events: {len(dataset['engagement_events'])}")
    print(f"   • Interventions: {len(dataset['interventions'])}")
    print(f"   • Intervention Outcomes: {len(dataset['intervention_outcomes'])}")
    print(f"   • Audit Events: {len(dataset['audit_events'])}")

    data_dir = Path(__file__).resolve().parent
    print("\n2. Writing offline artifacts...")
    json_path, sql_path = write_sql_and_json_artifacts(dataset, data_dir)
    print(f"   • JSON Seed: {json_path}")
    print(f"   • SQL Seed: {sql_path}")

    print("\n3. Checking live connection...")
    seed_to_supabase_if_configured(dataset)

    print("\nComplete! Seed dataset is ready.")


if __name__ == "__main__":
    main()
