import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context';
import { DEMO_ACCOUNTS, isDemoLoginEnabled } from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';

export function LoginPage() {
  const { isAuthenticated, signInWithCredentials, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your institutional email and password.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await signInWithCredentials(email.trim(), password);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please verify and try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccountSelect = async (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setError('');
    setEmail(account.email);
    setPassword('');

    // If demo mode is active (e.g. in development or unit tests), allow instant synchronous role switching
    if (isDemoLoginEnabled()) {
      signIn(account.token, {
        role: account.role,
        email: account.email,
        fullName: account.label,
        isDemoSession: true,
      });
      navigate('/', { replace: true });
      return;
    }

    setError(`Selected ${account.label}. Enter that account's password in the form, then select Sign In to continue.`);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] text-[#172033] dark:text-[#e2ece6] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-5xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Side: Standard Email/Password Sign-In */}
        <div className="border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-8 sm:p-10 shadow-xs rounded-none">
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
                Student Success & Intelligence Platform
              </p>
            </div>
          </div>

          <h1 className="mt-8 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
            Sign in to the student intelligence workspace
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#CBD5CF]">
            Access the student journey dashboard, intervention workflows, and analytics with institutional credentials or a verified bearer token. Demo tokens are available for evaluation and local development.
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

          <form onSubmit={handleCredentialsSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
              >
                Institutional Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@college.edu or advisor@edunexus.ai"
                className="mt-1.5 w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-indigo-600 dark:text-[#56B594] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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


            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex w-full items-center justify-center gap-2 border border-transparent bg-indigo-600 dark:bg-[#1D4633] px-4 py-3 text-sm font-semibold text-white dark:text-[#56B594] hover:bg-indigo-700 dark:hover:bg-[#255740] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors rounded-none"
            >
              {submitting ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration link for students */}
          <div className="mt-8 border-t border-slate-200 dark:border-[#35433B] pt-4 text-center text-xs text-slate-600 dark:text-[#CBD5CF]">
            Are you a student without an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 dark:text-[#56B594] hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>

        {/* Right Side: Institutional Pre-Configured Accounts & Instant Role Sign-In */}
        <div className="flex flex-col justify-between border border-slate-200 dark:border-[#35433B] bg-slate-900 dark:bg-[#0D1311] p-8 text-white shadow-xs rounded-none">
          <div>
            <div className="inline-flex items-center gap-2 border border-slate-700 dark:border-[#273830] bg-slate-800 dark:bg-[#16211D] px-2.5 py-1 text-[11px] font-semibold text-emerald-400 dark:text-[#56B594] rounded-none">
              <ShieldCheck className="w-3.5 h-3.5" />
              Pre-Configured Institutional Roles
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight text-white">
              Instant Institutional Role Switching
            </h2>
            <p className="mt-2 text-xs text-slate-300 dark:text-[#8FA89B] leading-relaxed">
              Explore EduNexus AI across institutional roles. Select a role to prefill its email, then enter its password and select Sign In.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  disabled={submitting}
                  onClick={() => handleAccountSelect(account)}
                  className="group flex w-full items-center justify-between border border-slate-800 dark:border-[#23312A] bg-slate-800/70 dark:bg-[#141C18] p-3 text-left transition hover:border-indigo-500/60 dark:hover:border-[#56B594]/60 hover:bg-slate-800 dark:hover:bg-[#1A2520] disabled:opacity-50 rounded-none cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-indigo-300 dark:group-hover:text-[#56B594]">
                        {account.label}
                      </span>
                      <span className="border border-slate-700 dark:border-[#2E4138] bg-slate-900/60 dark:bg-[#0E1513] px-1.5 py-0.2 text-[10px] font-mono text-slate-300 dark:text-[#8FA89B] uppercase rounded-none">
                        {account.role}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-slate-400 dark:text-[#8FA89B]">
                      {account.email} • {account.description}
                    </p>
                  </div>
                  <UserCheck className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-indigo-400 dark:group-hover:text-[#56B594]" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 dark:border-[#23312A] pt-4 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400 dark:text-[#56B594]" />
                Supabase Cryptographic Authentication
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
