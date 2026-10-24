import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  ShieldAlert,
  Eye,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  Building,
  Hash,
} from 'lucide-react';
import { useAuth } from '../context';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

type InstitutionalRole = 'student' | 'faculty' | 'advisor' | 'admin';

interface DemoPreset {
  label: string;
  role: InstitutionalRole;
  firstName: string;
  lastName: string;
  email: string;
  studentId?: string;
  department: string;
  semester?: string;
}

const demoPresets: DemoPreset[] = [
  {
    label: 'Student Candidate',
    role: 'student',
    firstName: 'Priya',
    lastName: 'Nair',
    email: 'priya.nair@edunexus.ai',
    studentId: 'STU-1025',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
  },
  {
    label: 'Faculty Member',
    role: 'faculty',
    firstName: 'Kavita',
    lastName: 'Iyer',
    email: 'kavita.iyer@edunexus.ai',
    department: 'Information Science & Engineering',
  },
  {
    label: 'Academic Advisor',
    role: 'advisor',
    firstName: 'Vikram',
    lastName: 'Rao',
    email: 'vikram.rao@edunexus.ai',
    department: 'Student Success Division',
  },
  {
    label: 'Administrator',
    role: 'admin',
    firstName: 'Sarah',
    lastName: 'Deshmukh',
    email: 'sarah.deshmukh@edunexus.ai',
    department: 'Campus Governance Office',
  },
];

const departments = [
  'Computer Science & Engineering',
  'Information Science & Engineering',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Data Science & AI',
  'Student Success Division',
  'Campus Governance Office',
];

const semesters = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8',
];

export function RegisterPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<InstitutionalRole>('student');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState(departments[0]);
  const [semester, setSemester] = useState(semesters[0]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consentAgreed, setConsentAgreed] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const supabaseConfigured = typeof isSupabaseConfigured === 'function' && isSupabaseConfigured();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleApplyPreset = (preset: DemoPreset) => {
    setFirstName(preset.firstName);
    setLastName(preset.lastName);
    setEmail(preset.email);
    setRole(preset.role);
    setStudentId(preset.studentId || '');
    setDepartment(preset.department);
    if (preset.semester) setSemester(preset.semester);
    setPassword('EduNexus@2026!');
    setConfirmPassword('EduNexus@2026!');
    setConsentAgreed(true);
    setError('');
  };

  const handleRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (import.meta.env.PROD && !supabaseConfigured) {
      setError('Registration is unavailable because Supabase is not configured for this deployment. Please contact your institutional administrator.');
      return;
    }
    if (supabaseConfigured && role !== 'student') {
      setError('Public registration is for students only. Staff accounts must be provisioned by an institutional administrator.');
      return;
    }

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please provide your full legal or institutional name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid institutional email address.');
      return;
    }
    if (role === 'student' && !studentId.trim()) {
      setError('Student ID / Roll Number is required for enrolled students.');
      return;
    }
    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password entry.');
      return;
    }
    if (!consentAgreed) {
      setError('You must acknowledge the institutional data governance and ethical AI consent.');
      return;
    }

    setSubmitting(true);

    try {
      if (supabaseConfigured) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: `${firstName.trim()} ${lastName.trim()}`,
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              department,
              student_id: studentId.trim(),
              semester,
            },
          },
        });

        if (signUpError) {
          throw new Error(signUpError.message || 'Registration failed. Please contact the administrator.');
        }

        // If email confirmation is disabled or session is directly provided
        if (data.session?.access_token) {
          const nextSession = signIn(data.session.access_token, {
            userId: data.user?.id,
            email: data.user?.email || email.trim(),
          });
          navigate(nextSession.role.toLowerCase() === 'student' ? '/student' : '/', { replace: true });
          return;
        }

        // Email confirmation flow
        setSuccessMessage(
          `Account created successfully for ${email}. A verification link has been sent to your institutional email. Please check your inbox to activate your account.`
        );
      } else {
        if (import.meta.env.PROD) {
          throw new Error('Supabase registration is not configured for production.');
        }
        // Local prototype / demo mode fallback
        const simulatedToken = role === 'student'
          ? 'edunexus-demo-student-token'
          : role === 'advisor'
            ? 'edunexus-demo-advisor-token'
            : role === 'faculty'
              ? 'edunexus-demo-faculty-token'
              : 'edunexus-demo-admin-token';

        signIn(simulatedToken, {
          role,
          email: email.trim(),
          isDemoSession: true,
        });
        navigate(role === 'student' ? '/student' : '/', { replace: true });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#101714] text-slate-900 dark:text-[#E2ECE6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Main Registration Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#35433B] pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-indigo-600 text-white rounded-xl shadow-xs">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base font-bold">
                  EduNexus <span className="text-indigo-600 dark:text-[#56B594]">AI</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-[#8FA89B]">
                  Smart Campus Analytics & Student Success
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
              Create your institutional account
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-[#CBD5CF]">
              Register to access student analytics, course performance, or your personal learning telemetry.
            </p>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-lg border border-rose-300 bg-rose-50 dark:border-[#4A1E24] dark:bg-[#281618] p-3.5 text-sm text-rose-800 dark:text-[#F87171]"
            >
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
              <div>{error}</div>
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 dark:border-[#1E4A35] dark:bg-[#163026] p-4 text-sm text-emerald-800 dark:text-[#56B594]"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold">Registration Confirmation</p>
                <p className="text-xs leading-relaxed text-emerald-700 dark:text-[#8FA89B]">{successMessage}</p>
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 font-bold text-xs underline hover:no-underline"
                  >
                    Proceed to Sign in <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {!successMessage && (
            <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-5">
              {!supabaseConfigured && !import.meta.env.PROD && (
              <div>
                {/* Local demo role selector only; production self-registration is student-only. */}
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF] mb-2">
                  Institutional Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'student', label: 'Student' },
                      { id: 'faculty', label: 'Faculty' },
                      { id: 'advisor', label: 'Advisor' },
                      { id: 'admin', label: 'Admin' },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRole(option.id)}
                      className={`min-h-9 py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                        role === option.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-[#56B594] dark:bg-[#1D332A] dark:text-[#56B594]'
                          : 'border-slate-200 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] text-slate-700 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#25322B]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              )}

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                  >
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Aarav"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                  >
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sharma"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="institutional-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                >
                  Institutional Email
                </label>
                <input
                  id="institutional-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Role-Specific Fields */}
              {role === 'student' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-indigo-100 bg-indigo-50/50 dark:border-[#1D4633] dark:bg-[#152720] p-4">
                  <div>
                    <label
                      htmlFor="student-id"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                    >
                      <Hash className="h-3.5 w-3.5 text-indigo-600 dark:text-[#56B594]" /> Student ID / Roll No
                    </label>
                    <input
                      id="student-id"
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. STU-1025"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="student-semester"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-indigo-600 dark:text-[#56B594]" /> Academic Term
                    </label>
                    <select
                      id="student-semester"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2 text-sm text-slate-900 dark:text-[#E2ECE6] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {semesters.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Department */}
              <div>
                <label
                  htmlFor="department"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                >
                  <Building className="h-3.5 w-3.5 text-indigo-600 dark:text-[#56B594]" /> Department / Academic Unit
                </label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="registration-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                  >
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id="registration-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700 dark:text-[#8FA89B] dark:hover:text-[#E2ECE6]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="registration-confirm-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id="registration-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 dark:border-[#35433B] dark:bg-[#1D2722] px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Ethical AI & Governance Consent */}
              <div className="rounded-xl border border-slate-200 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-indigo-600 rounded"
                  />
                  <div className="text-xs leading-relaxed text-slate-600 dark:text-[#CBD5CF]">
                    <span className="font-semibold text-slate-800 dark:text-[#E2ECE6] flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-[#56B594]" /> Ethical AI & Data
                      Governance Consent
                    </span>
                    I acknowledge that EduNexus AI provides predictive decision-support indicators under the core
                    institutional principle: <em className="font-medium">"AI recommends, humans decide."</em> Student
                    data is handled confidentially in accordance with campus privacy policies.
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Registering Account…' : 'Create Institutional Account'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Bottom Login Link */}
          <div className="mt-6 border-t border-slate-200 dark:border-[#35433B] pt-4 text-center text-xs text-slate-600 dark:text-[#CBD5CF]">
            Already have an institutional account?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 dark:text-[#56B594] hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </div>

        {/* Development Quick-Fill Panel */}
        {!import.meta.env.PROD && !supabaseConfigured && (
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Development Mode
                </span>
                <span className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-300">
                  Instant Presets
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold">Fast Registration Presets</h2>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                Click any preset role below to instantly populate form fields with valid test parameters and test the
                complete registration journey without manual typing.
              </p>

              <div className="mt-6 space-y-3">
                {demoPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-3.5 text-left hover:border-indigo-400 hover:bg-slate-800/80 transition-colors"
                  >
                    <div>
                      <span className="block text-sm font-semibold text-white">{preset.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-400">
                        {preset.firstName} {preset.lastName} · {preset.email}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-700/60 px-2 py-1 rounded">
                      {preset.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-4 text-[11px] text-slate-400">
              <p>
                <strong>Evaluation Note:</strong> When Supabase is not configured, the registration form activates a
                verified local demo session matching the chosen institutional role.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
