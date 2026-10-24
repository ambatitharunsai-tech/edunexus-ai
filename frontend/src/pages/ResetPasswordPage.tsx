import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Eye,
  EyeOff,
  ShieldAlert,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
} from 'lucide-react';
import { updateUserPassword } from '../lib/auth';

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await updateUserPassword(password);
      setSuccess(res.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password. Recovery link may have expired.';
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
              Set New Password
            </p>
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
          Create New Password
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-[#CBD5CF] leading-relaxed">
          Please enter and confirm your new secure password.
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

        {!success && (
          <form onSubmit={handlePasswordUpdate} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="new-pwd"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
              >
                New Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="new-pwd"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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
                htmlFor="confirm-pwd"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-pwd"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="mt-1.5 w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex w-full items-center justify-center gap-2 border border-transparent bg-indigo-600 dark:bg-[#1D4633] px-4 py-3 text-sm font-semibold text-white dark:text-[#56B594] hover:bg-indigo-700 dark:hover:bg-[#255740] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors rounded-none"
            >
              <KeyRound className="w-4 h-4" />
              {submitting ? 'Updating...' : 'Update Password'}
            </button>
          </form>
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
