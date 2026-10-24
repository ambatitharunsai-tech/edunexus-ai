import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, ShieldAlert, ArrowRight, UserCheck, Lock } from 'lucide-react';
import { useAuth } from '../context';
import { DEMO_ACCOUNTS, isDemoLoginEnabled, signInWithEmailPassword } from '../lib/auth';

export function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleCredentialsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const session = await signInWithEmailPassword(email.trim(), password);
      signIn(session.token, session);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Check your credentials and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoAccount = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    setError('');
    try {
      signIn(account.token, {
        role: account.role,
        email: account.email,
        fullName: account.label,
        isDemoSession: true,
      });
      navigate('/', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Demo sign-in is unavailable.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] text-[#172033] dark:text-[#e2ece6] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-5xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-8 sm:p-10 shadow-xs rounded-none">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-[#E2ECE6]">
                EduNexus <span className="text-indigo-600 dark:text-[#56B594]">AI</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-[#8FA89B]">Student Success & Intelligence Platform</p>
            </div>
          </div>

          <h1 className="mt-8 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
            Sign in to the student intelligence workspace
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#CBD5CF]">
            Use your institutional email and password. Your Supabase session is verified by the EduNexus API before the dashboard opens.
          </p>

          {error && (
            <div role="alert" className="mt-6 flex items-start gap-3 border border-rose-300 dark:border-[#4A1E24] bg-rose-50 dark:bg-[#281618] p-3 text-sm text-rose-800 dark:text-[#F87171] rounded-none">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-[#F87171]" />
              <div className="leading-snug">{error}</div>
            </div>
          )}

          <form onSubmit={handleCredentialsSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]">
                Institutional Email
              </label>
              <input id="email" type="email" autoComplete="username" required value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@college.edu"
                className="mt-1.5 w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5CF]">
                Password
              </label>
              <div className="relative mt-1.5">
                <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-slate-300 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-[#E2ECE6] placeholder:text-slate-400 dark:placeholder:text-[#8FA89B] focus:border-indigo-600 dark:focus:border-[#56B594] focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:focus:ring-[#56B594] rounded-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-[#CBD5CF]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={submitting}
              className="mt-2 flex w-full items-center justify-center gap-2 bg-indigo-600 dark:bg-[#1D4633] px-4 py-3 text-sm font-semibold text-white dark:text-[#56B594] hover:bg-indigo-700 dark:hover:bg-[#255740] disabled:opacity-50 transition-colors rounded-none">
              {submitting ? 'Verifying session...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {isDemoLoginEnabled() && (
            <div className="mt-8 border-t border-slate-200 dark:border-[#35433B] pt-6">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-[#E2ECE6]">Local demo accounts</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#8FA89B]">Only available in development; demo tokens are disabled in production.</p>
              <div className="mt-4 grid grid-cols-1 gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button key={account.role} type="button" onClick={() => handleDemoAccount(account)}
                    className="group flex w-full items-center justify-between border border-slate-200 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] p-3 text-left hover:border-indigo-400 dark:hover:border-[#56B594] rounded-none">
                    <div className="min-w-0 pr-2">
                      <div className="text-sm font-semibold text-slate-900 dark:text-[#E2ECE6]">{account.label}</div>
                      <div className="mt-0.5 text-xs text-slate-500 dark:text-[#8FA89B]">{account.description}</div>
                    </div>
                    <UserCheck className="w-4 h-4 shrink-0 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between border border-slate-800 dark:border-[#23312A] bg-slate-900 dark:bg-[#0D1311] p-8 text-white shadow-xs rounded-none">
          <div>
            <div className="inline-flex items-center gap-2 border border-slate-700 dark:border-[#273830] bg-slate-800 dark:bg-[#16211D] px-2.5 py-1 text-[11px] font-semibold text-emerald-400 dark:text-[#56B594] rounded-none">
              <Lock className="w-3.5 h-3.5" />
              Supabase Authentication
            </div>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-white">Secure access to student intelligence</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 dark:text-[#8FA89B]">
              The browser receives a public Supabase session token after successful sign-in. The API validates the token signature and derives the role from server-managed metadata; client-supplied roles are not used to grant access.
            </p>
          </div>
          <div className="mt-8 border-t border-slate-800 dark:border-[#23312A] pt-4 text-xs text-slate-400">
            Never share your password or paste a service-role key into the browser.
          </div>
        </div>
      </div>
    </div>
  );
}
