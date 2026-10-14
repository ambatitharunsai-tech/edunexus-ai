import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';

const demoAccounts = [
  {
    label: 'Advisor',
    token: 'edunexus-demo-advisor-token',
    description: 'Full cohort advisory access',
    role: 'advisor',
    email: 'advisor@edunexus.ai',
  },
  {
    label: 'Admin',
    token: 'edunexus-demo-admin-token',
    description: 'Administrative governance access',
    role: 'admin',
    email: 'admin@edunexus.ai',
  },
  {
    label: 'Faculty',
    token: 'edunexus-demo-faculty-token',
    description: 'Academic workflow review',
    role: 'faculty',
    email: 'faculty@edunexus.ai',
  },
  {
    label: 'Student',
    token: 'edunexus-demo-student-token',
    description: 'Read-only student view',
    role: 'student',
    email: 'student@edunexus.ai',
  },
];

export function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [customToken, setCustomToken] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (token: string, role?: string, email?: string) => {
    if (!token.trim()) {
      setError('Enter a valid bearer token to continue.');
      return;
    }

    try {
      signIn(token.trim(), role ? { role, email, isDemoSession: true } : undefined);
      navigate('/', { replace: true });
    } catch {
      setError('This token could not be accepted. Please try a valid EduNexus demo token or a verified institutional token.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            EduNexus AI
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Sign in to the student intelligence workspace</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Access the student journey dashboard, intervention workflows, and analytics with a verified bearer token. Demo tokens are available for evaluation and local development.
          </p>

          <div className="mt-8 space-y-3">
            {demoAccounts.map((account) => (
              <button
                key={account.token}
                type="button"
                onClick={() => handleLogin(account.token, account.role, account.email)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-900">{account.label}</div>
                  <div className="mt-1 text-xs text-slate-500">{account.description}</div>
                </div>
                <div className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600 shadow-sm border border-slate-200">
                  {account.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-slate-100 shadow-sm">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">Custom token</div>
          <form
            className="mt-5 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleLogin(customToken);
            }}
          >
            <label className="block text-sm font-medium text-slate-200" htmlFor="token-input">
              Bearer token
            </label>
            <input
              id="token-input"
              type="password"
              value={customToken}
              onChange={(event) => {
                setCustomToken(event.target.value);
                if (error) setError('');
              }}
              placeholder="Paste a valid Bearer token"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />

            {error && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Sign in with token
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/80 p-4 text-sm text-slate-300">
            <div className="font-semibold text-slate-100">Security note</div>
            <p className="mt-2 leading-6 text-slate-300">
              Tokens are stored locally in the browser and attached to API requests as Authorization headers. Staff-only operations remain protected by backend role rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
