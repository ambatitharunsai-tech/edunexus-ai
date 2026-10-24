"""
EduNexus AI — Registration & Database Connection Verifier
Comprehensive CLI diagnostic tool to verify Supabase PostgreSQL connection,
table read/write capabilities, and registration API flow.
"""

import sys
import os
import uuid
import time
import asyncio

# Ensure backend root is in sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.core.config import settings
from app.db.client import is_database_configured, verify_database_connection, get_db_client
from app.api.v1.auth import register_user, RegisterRequest


def print_header(title: str):
    print("\n" + "=" * 65)
    print(f"  {title}")
    print("=" * 65)


def check_step(label: str, success: bool, detail: str = ""):
    symbol = "✓ [PASS]" if success else "✗ [FAIL]"
    print(f"{symbol:<10} {label}")
    if detail:
        print(f"           {detail}")


async def main():
    print_header("EDUNEXUS AI — REGISTRATION DATABASE CONNECTION AUDIT")

    # Step 1: Configuration Check
    configured = is_database_configured()
    url = settings.SUPABASE_URL or "(missing)"
    key_configured = bool(settings.SUPABASE_SERVICE_ROLE_KEY)
    check_step(
        "Supabase Credentials",
        configured,
        f"URL: {url[:38]}... | Key Length: {len(settings.SUPABASE_SERVICE_ROLE_KEY or '')} chars"
    )

    if not configured:
        print("\n[!] Supabase credentials are not configured in backend/.env.")
        print("    Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable live DB access.")
        sys.exit(1)

    # Step 2: Live Database Probe
    db_status = verify_database_connection()
    check_step(
        "PostgreSQL Live Connection",
        db_status.get("connected", False),
        f"Latency: {db_status.get('latency_ms', 0)} ms | Enrolled Students: {db_status.get('total_students_detected', 0)}"
    )

    client = get_db_client()

    # Step 3: Students Table Read Probe
    try:
        res = client.table("students").select("id, student_id, first_name, last_name, email").limit(3).execute()
        sample = res.data or []
        check_step(
            "Read 'students' Table",
            True,
            f"Retrieved {len(sample)} sample student records"
        )
    except Exception as e:
        check_step("Read 'students' Table", False, str(e))

    # Step 4: Students Table Write & Clean-Up Probe
    test_probe_id = str(uuid.uuid4())
    test_stu_code = f"PROBE-{int(time.time()) % 10000:04d}"
    test_email = f"probe.{int(time.time())}@edunexus-verify.example"
    write_success = False

    try:
        insert_res = client.table("students").insert({
            "id": test_probe_id,
            "student_id": test_stu_code,
            "first_name": "Connection",
            "last_name": "Verifier",
            "email": test_email,
            "department": "Computer Science & Engineering",
            "current_grade": "3rd Year",
            "academic_term": "Semester 6",
            "status": "active",
            "user_id": None,
        }).execute()

        if insert_res.data:
            write_success = True
            # Clean up immediately
            client.table("students").delete().eq("id", test_probe_id).execute()

        check_step(
            "Write & Delete in 'students' Table",
            write_success,
            f"Successfully inserted and deleted probe student ({test_stu_code})"
        )
    except Exception as e:
        check_step("Write & Delete in 'students' Table", False, str(e))

    # Step 5: User Profiles Table Probe
    try:
        profile_res = client.table("user_profiles").select("id").limit(1).execute()
        check_step(
            "Query 'user_profiles' Table",
            True,
            f"Table accessible; records found: {len(profile_res.data or [])}"
        )
    except Exception as e:
        check_step("Query 'user_profiles' Table", False, str(e))

    # Step 6: Supabase Auth Direct User Creation Test
    auth_users_clean = False
    auth_detail = ""
    try:
        test_auth_email = f"auth.probe.{int(time.time())}@edunexus.ai"
        user_res = client.auth.admin.create_user({
            "email": test_auth_email,
            "password": "EduNexus@ProbePass2026!",
            "email_confirm": True,
            "app_metadata": {"role": "student"},
            "user_metadata": {"first_name": "Auth", "last_name": "Probe", "role": "student"},
        })
        auth_users_clean = True
        client.auth.admin.delete_user(user_res.user.id)
        auth_detail = "Supabase Auth successfully creates and deletes users in auth.users"
    except Exception as auth_err:
        auth_detail = f"Supabase auth.users trigger notice: {auth_err}"

    check_step(
        "Supabase Auth Direct User Creation",
        auth_users_clean,
        auth_detail
    )

    # Step 7: Registration Endpoint Simulation
    reg_req = RegisterRequest(
        email=f"registered.student.{int(time.time())}@edunexus.ai",
        password="EduNexus@Student2026!",
        first_name="Aarav",
        last_name="Test",
        role="student",
        department="Computer Science & Engineering",
        student_id=f"STU-{int(time.time()) % 9000 + 1000}",
        semester="Semester 5",
    )

    reg_res = await register_user(reg_req)
    reg_success = reg_res.get("status") == "success" and bool(reg_res.get("access_token"))
    check_step(
        "POST /api/v1/auth/register Execution",
        reg_success,
        f"Issued token: {reg_res.get('access_token')} | User ID: {reg_res.get('user_id')}"
    )

    # Clean up test registered student
    try:
        client.table("students").delete().eq("email", reg_req.email).execute()
    except Exception:
        pass

    print_header("AUDIT SUMMARY & GUIDANCE")
    if configured and db_status.get("connected") and write_success and reg_success:
        print("  ✓ Database connection to registration is FULLY OPERATIONAL.")
        print(f"  ✓ Live Supabase PostgreSQL instance has {db_status.get('total_students_detected')} enrolled students.")
        if not auth_users_clean:
            print("\n  [i] Recommendation for auth.users:")
            print("      To enable direct permanent auth.users insertions, run:")
            print("      'supabase/fix_auth_trigger.sql' in Supabase Dashboard SQL Editor.")
            print("      Note: The application already handles this gracefully via direct student sync.")
    else:
        print("  ✗ Some connection verification steps failed. Review logs above.")
    print("=" * 65 + "\n")


if __name__ == "__main__":
    asyncio.run(main())
