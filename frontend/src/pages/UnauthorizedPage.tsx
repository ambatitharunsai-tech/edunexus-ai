import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../context';

export function UnauthorizedPage() {
  const { session, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] text-[#172033] dark:text-[#e2ece6] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-md border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-8 text-center shadow-xs rounded-none">
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-rose-50 dark:bg-[#281618] border border-rose-200 dark:border-[#4A1E24] text-rose-600 dark:text-[#F87171] rounded-none">
          <ShieldX className="h-7 w-7" aria-hidden="true" />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
          403 — Access Restricted
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-[#CBD5CF] leading-relaxed">
          You do not have the required institutional permissions to access this page or perform this action.
        </p>

        <div className="mt-6 border border-slate-200 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] p-4 text-left rounded-none">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8FA89B]">
            Current Session
          </div>
          <div className="mt-2 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-[#8FA89B]">Signed in as:</span>
              <span className="font-medium text-slate-900 dark:text-[#E2ECE6] truncate max-w-[200px]">
                {session?.email || 'Unknown User'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-[#8FA89B]">Assigned Role:</span>
              <span className="font-mono text-[11px] uppercase px-1.5 py-0.2 bg-slate-200 dark:bg-[#153E31] text-slate-800 dark:text-[#56B594] rounded-none">
                {session?.role || 'None'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-transparent bg-indigo-600 dark:bg-[#1D4633] px-4 py-2.5 text-xs font-semibold text-white dark:text-[#56B594] hover:bg-indigo-700 dark:hover:bg-[#255740] rounded-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Dashboard
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-[#35433B] bg-white dark:bg-[#1D2722] px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#25322B] rounded-none"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
