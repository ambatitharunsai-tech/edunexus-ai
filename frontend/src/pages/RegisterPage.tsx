import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Eye,
  EyeOff,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { signUpStudent } from '../lib/auth';

export function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim()) {
      setError('Please provide your full legal or institutional name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await signUpStudent({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        studentId: studentId.trim() || undefined,
      });

      setSuccess(res.message || 'Registration successful! You may now sign in.');
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] text-[#172033] dark:text-[#e2ece6] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-lg border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-8 sm:p-10 shadow-xs rounded-none">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-none bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-[#E2ECE6]">
              EduNexus <span className="text-indigo-600 dark:text-[#56B594]">AI</span>
            </span>
            <p className="text-[10px] text-slate-500 dark:text-[#8FA89B]">
              Student Portal Registration
            </p>
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
          Create a Student Account
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-[#CBD5CF] leading-relaxed">
          Sign up to access your individual course progress, attendance summaries, assessment performance, and success milestones.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 border border-rose-300 dark:border-[#4A1E24] bg-rose-50 dark:bg-[#281618] p-3 text-sm text-rose-800 dark:text-[#F87171] rounded-none"
          >
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-[#F87171]" />
            <div className="leading-snug">{error}</div>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mt-6 flex items-start gap-3 border border-emerald-300 dark:border-[#1D4633] bg-emerald-50 dark:bg-[#153E31] p-3 text-sm text-emerald-800 dark:text-[#56B594] rounded-none"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-[#56B594]" />
            <div className="leading-snug">
              {success} <span className="block mt-1 text-xs">Redirecting to sign in...</span>
            </div>
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="reg-name"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
            >
              Full Legal Name
            </label>
            <input
              id="reg-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="mt-1.5 w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
            />
          </div>

          <div>
            <label
              htmlFor="reg-studentid"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
            >
              Student ID / Enrollment Number (Optional)
            </label>
            <input
              id="reg-studentid"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. STU-2024-001"
              className="mt-1.5 w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
            />
            <p className="mt-1 text-[11px] text-slate-500 dark:text-[#8FA89B]">
              If already enrolled, entering your ID links your existing academic records automatically.
            </p>
          </div>

          <div>
            <label
              htmlFor="reg-email"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
            >
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.morgan@college.edu"
              className="mt-1.5 w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
              >
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 chars"
                  className="w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-[#CBD5CF]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-confirm"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
              >
                Confirm
              </label>
              <input
                id="reg-confirm"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="mt-1.5 w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-3 flex w-full items-center justify-center gap-2 border border-transparent bg-indigo-600 dark:bg-[#1D4633] px-4 py-3 text-sm font-semibold text-white dark:text-[#56B594] hover:bg-indigo-700 dark:hover:bg-[#255740] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors rounded-none"
          >
            {submitting ? 'Creating account...' : 'Create Student Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 border-t border-slate-200 dark:border-[#35433B] pt-4 flex items-center justify-between text-xs text-slate-600 dark:text-[#CBD5CF]">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 font-medium text-slate-600 dark:text-[#CBD5CF] hover:text-indigo-600 dark:hover:text-[#56B594]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
          <span className="text-[11px] text-slate-400 dark:text-[#8FA89B]">
            Staff accounts are provisioned by an administrator.
          </span>
        </div>
      </div>
    </div>
  );
}
