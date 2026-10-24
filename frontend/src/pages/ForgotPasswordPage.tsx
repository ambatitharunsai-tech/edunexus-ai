import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mail,
} from 'lucide-react';
import { sendPasswordResetEmail } from '../lib/auth';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid institutional email address.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await sendPasswordResetEmail(email.trim());
      setSuccess(res.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to send recovery email. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] text-[#172033] dark:text-[#e2ece6] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-md border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-8 sm:p-10 shadow-xs rounded-none">
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
              Account Recovery
            </p>
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
          Reset Your Password
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-[#CBD5CF] leading-relaxed">
          Enter your registered email address and we'll send you a secure link to reset your account password.
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
            <div className="leading-snug">{success}</div>
          </div>
        )}

        {!success ? (
          <form onSubmit={handleResetRequest} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="reset-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
              >
                Registered Email
              </label>
              <div className="relative mt-1.5">
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 pl-10 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
                />
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex w-full items-center justify-center gap-2 border border-transparent bg-indigo-600 dark:bg-[#1D4633] px-4 py-3 text-sm font-semibold text-white dark:text-[#56B594] hover:bg-indigo-700 dark:hover:bg-[#255740] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors rounded-none"
            >
              {submitting ? 'Sending Link...' : 'Send Recovery Link'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="mt-6">
            <Link
              to="/login"
              className="flex w-full items-center justify-center gap-2 border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-[#E2ECE6] hover:bg-slate-100 dark:hover:bg-[#25322B] rounded-none"
            >
              Return to Sign In
            </Link>
          </div>
        )}

        <div className="mt-8 border-t border-slate-200 dark:border-[#35433B] pt-4 text-center text-xs">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 font-medium text-slate-600 dark:text-[#CBD5CF] hover:text-indigo-600 dark:hover:text-[#56B594]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
