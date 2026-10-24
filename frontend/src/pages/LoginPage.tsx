import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, ShieldAlert, Eye } from 'lucide-react';
import { useAuth } from '../context';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const demoAccounts = [
  { label: 'Advisor', token: 'edunexus-demo-advisor-token', description: 'Full cohort advisory access', role: 'advisor', email: 'advisor@edunexus.ai' },
  { label: 'Administrator', token: 'edunexus-demo-admin-token', description: 'Administrative governance access', role: 'admin', email: 'admin@edunexus.ai' },
  { label: 'Faculty', token: 'edunexus-demo-faculty-token', description: 'Academic workflow review', role: 'faculty', email: 'faculty@edunexus.ai' },
  { label: 'Data Operator', token: 'edunexus-demo-dataoperator-token', description: 'CSV ingestion and data validation', role: 'data_operator', email: 'operator@edunexus.ai' },
  { label: 'Auditor / Viewer', token: 'edunexus-demo-viewer-token', description: 'Read-only accreditation review', role: 'viewer', email: 'viewer@edunexus.ai' },
  { label: 'Student', token: 'edunexus-demo-student-token', description: 'Read-only student view', role: 'student', email: 'student@edunexus.ai' },
];

export function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const supabaseConfigured = typeof isSupabaseConfigured === 'function' && isSupabaseConfigured();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleCredentialsSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your institutional email and password.');
      return;
    }
    if (!supabaseConfigured) {
      setError('Secure sign-in is not configured. Please contact the administrator.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) throw new Error(authError.message || 'Invalid email or password.');
      const token = data.session?.access_token;
      if (!token) throw new Error('Supabase did not issue an access token.');
      // The backend independently verifies the JWT signature and server-managed role.
      signIn(token);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Verify your credentials and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = (account: (typeof demoAccounts)[number]) => {
    if (import.meta.env.PROD) return;
    signIn(account.token, { role: account.role, email: account.email, isDemoSession: true });
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#101714] text-slate-900 dark:text-[#e2ece6] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-indigo-600 text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-base font-bold">EduNexus <span className="text-indigo-600 dark:text-[#56B594]">AI</span></div>
              <div className="text-xs text-slate-500 dark:text-[#8FA89B]">Student Success & Intelligence Platform</div>
            </div>
          </div>
          <h1 className="mt-8 text-2xl font-bold">Sign in to the student intelligence workspace</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#CBD5CF]">
            Use your institutional account. Your access token is cryptographically verified by the EduNexus API.
          </p>

          {error && (
            <div role="alert" className="mt-6 flex items-start gap-3 border border-rose-300 bg-rose-50 p-3 text-sm text-rose-800 dark:border-[#4A1E24] dark:bg-[#281618] dark:text-[#F87171]">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleCredentialsSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="institutional-email" className="block text-xs font-semibold uppercase tracking-wider">Institutional Email</label>
              <input
                id="institutional-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@college.edu"
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm dark:border-[#35433B] dark:bg-[#1D2722]"
              />
            </div>
            <div>
              <label htmlFor="institutional-password" className="block text-xs font-semibold uppercase tracking-wider">Password</label>
              <div className="relative mt-1.5">
                <input
                  id="institutional-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-3 pr-10 text-sm dark:border-[#35433B] dark:bg-[#1D2722]"
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
              {submitting ? 'Authenticating…' : 'Sign In'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {!supabaseConfigured && (
            <p className="mt-4 text-xs text-amber-700 dark:text-amber-300">Secure sign-in configuration is missing. Please contact the administrator.</p>
          )}
        </div>

        {!import.meta.env.PROD && (
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-white shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Local demo mode</div>
            <h2 className="mt-3 text-xl font-bold">Development role previews</h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">Demo tokens work only in local/development builds. Production requires Supabase credentials.</p>
            <div className="mt-5 space-y-3">
              {demoAccounts.map((account) => (
                <button key={account.role} type="button" onClick={() => handleDemoLogin(account)} className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-3 text-left hover:border-indigo-400">
                  <span><span className="block text-sm font-semibold">{account.label}</span><span className="mt-1 block text-xs text-slate-400">{account.description}</span></span>
                  <span className="text-[10px] uppercase text-slate-300">{account.role}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
