import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  LayoutDashboard,
  Users,
  Milestone,
  ShieldAlert,
  BarChart3,
  Menu,
  X,
  Search,
  GraduationCap,
  Sparkles,
  FileSpreadsheet,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  SlidersHorizontal,
  Sun,
  Moon,
  HelpCircle,
} from 'lucide-react';
import { cn, safeStorageGet, safeStorageSet } from '../lib/utils';
import { useAuth } from '../context';
import { api } from '../lib/api';
import type { DashboardOverviewResponse, FollowUpStudentItem } from '../types';

interface NavItem {
  name: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Students Directory', to: '/students', icon: Users },
  { name: 'Student Journey', to: '/journey', icon: Milestone, badge: 'Intelligence' },
  { name: 'Interventions', to: '/interventions', icon: ShieldAlert },
  { name: 'Analytics & Trends', to: '/analytics', icon: BarChart3 },
  { name: 'Data & CSV Hub', to: '/csv-hub', icon: FileSpreadsheet, badge: 'Ingest' },
  { name: 'Help & Support', to: '/help', icon: HelpCircle },
];

type AppTheme = 'light' | 'dark';

export const AppShell: React.FC<{ theme: AppTheme; onThemeChange: (theme: AppTheme) => void }> = ({ theme, onThemeChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [highRiskStudents, setHighRiskStudents] = useState<FollowUpStudentItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState(false);
  const [compactNavigation, setCompactNavigation] = useState(() => {
    return safeStorageGet('edunexus_compact_navigation') === 'true';
  });
  const [reduceMotion, setReduceMotion] = useState(() => {
    return safeStorageGet('edunexus_reduce_motion') === 'true';
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const isStudent = session?.role?.toLowerCase() === 'student';

  useEffect(() => {
    let isMounted = true;
    if (isStudent) {
      setHighRiskStudents([]);
      setNotificationsError(false);
      setNotificationsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const loadRiskNotifications = async () => {
      try {
        const dashboard = await api<DashboardOverviewResponse>('/api/v1/dashboard/overview');
        const highRisk = dashboard.follow_up_students
          .filter((student) => student.risk_level === 'high' || student.risk_level === 'critical')
          .sort((left, right) => {
            const tierOrder = (tier: string) => tier === 'critical' ? 0 : 1;
            return tierOrder(left.risk_level) - tierOrder(right.risk_level) ||
              (right.risk_score ?? -1) - (left.risk_score ?? -1);
          });
        if (isMounted) {
          setHighRiskStudents(highRisk);
          setNotificationsError(false);
        }
      } catch {
        if (isMounted) setNotificationsError(true);
      } finally {
        if (isMounted) setNotificationsLoading(false);
      }
    };

    void loadRiskNotifications();
    const refreshId = window.setInterval(() => void loadRiskNotifications(), 60_000);
    return () => {
      isMounted = false;
      window.clearInterval(refreshId);
    };
  }, [isStudent]);

  const submitStudentSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim()) {
      navigate(`/students?search=${encodeURIComponent(event.currentTarget.value.trim())}`);
      event.currentTarget.blur();
    }
  };

  const storePreference = (key: string, value: boolean) => {
    safeStorageSet(key, String(value));
  };

  // Student navigation is strictly limited to their own private portal, campus overview, and support
  const visibleNavItems = isStudent
    ? [
        { name: 'My Student Portal', to: '/student', icon: GraduationCap, badge: 'Personal' },
        { name: 'Overview', to: '/', icon: LayoutDashboard },
        { name: 'Help & Support', to: '/help', icon: HelpCircle },
      ]
    : navItems;

  const currentNav = visibleNavItems.find((item) =>
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
  );
  const pageTitle = currentNav?.name || 'Overview';

  return (
    <div className={cn('app-shell h-screen overflow-hidden bg-[#f6f8fa] dark:bg-[#101714] text-[#172033] dark:text-[#e2ece6] flex flex-col antialiased', compactNavigation && 'compact-navigation', reduceMotion && 'reduce-motion')}>
      {/* Skip to Main Content Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-none focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Header */}
      <header className="app-shell-header relative z-30 shrink-0 border-b border-slate-200 dark:border-[#35433B] bg-white/95 dark:bg-[#151C19]/95 backdrop-blur-xs">
        <div className="flex min-h-16 items-center gap-3 px-3 sm:px-6">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-none text-slate-600 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#1D2722] hover:text-slate-900 dark:hover:text-[#E2ECE6] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Logo & Title */}
          <div className="flex min-w-0 shrink-0 items-center gap-2.5">
            <div className="w-9 h-9 rounded-none bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-[#E2ECE6]">
                  EduNexus <span className="text-indigo-600 dark:text-[#56B594]">AI</span>
                </span>
                {session?.role && (
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wider',
                      isStudent
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        : session.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                        : session.role === 'faculty'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                    )}
                  >
                    {session.role}{isStudent ? ' · Read-Only' : ''}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-[#8FA89B] hidden xl:block">
                Student Journey Intelligence
              </p>
            </div>
          </div>

          {!isStudent && (
            <>
          {/* Global search */}
          <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                onKeyDown={submitStudentSearch}
                placeholder="Search students by name or ID"
                className="w-full border border-slate-200 dark:border-[#35433B] bg-slate-100 dark:bg-[#1D2722] py-1.5 pl-9 pr-4 text-xs text-slate-800 dark:text-[#E2ECE6] placeholder:text-slate-500 dark:placeholder:text-[#8FA89B] focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151C19] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
                aria-label="Quick search students"
              />
            </div>
          </div>


            </>
          )}
          <div className="hidden xl:flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-none bg-slate-100 dark:bg-[#1D2722] text-[11px] font-medium text-slate-700 dark:text-[#CBD5CF]">
            <span className="w-1.5 h-1.5 rounded-none bg-indigo-500 dark:bg-[#56B594]" aria-hidden="true" />
            <span>Human-reviewed support</span>
          </div>

          {!isStudent && (
            <>
          {/* Current high-risk student notifications from dashboard data */}
          <div className="relative ml-auto shrink-0">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center text-slate-600 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#1D2722] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`High-risk student notifications${highRiskStudents.length ? `, ${highRiskStudents.length} students` : ''}`}
              aria-expanded={notificationsOpen}
              aria-controls="high-risk-notifications"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {highRiskStudents.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center bg-rose-600 dark:bg-[#9B2C2C] px-1 text-[10px] font-bold leading-none text-white dark:text-[#E2ECE6]">
                  {highRiskStudents.length > 99 ? '99+' : highRiskStudents.length}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <section
                id="high-risk-notifications"
                className="fixed right-3 top-[7.5rem] z-50 w-[min(22rem,calc(100vw-1.5rem))] border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] text-slate-800 dark:text-[#CBD5CF] shadow-xl md:absolute md:right-0 md:top-full md:mt-2"
                aria-label="High-risk student notifications"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-[#35433B] px-4 py-3">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-[#E2ECE6]">High-risk students</h2>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-[#8FA89B]">Current high and critical review flags</p>
                  </div>
                  <span className="flex h-7 min-w-7 items-center justify-center bg-rose-50 dark:bg-[#281618] px-2 text-xs font-bold text-rose-700 dark:text-[#F87171] border border-rose-200 dark:border-[#4A1E24]">
                    {highRiskStudents.length}
                  </span>
                </div>
                {notificationsLoading ? (
                  <p className="px-4 py-5 text-sm text-slate-500 dark:text-[#8FA89B]" role="status">Loading current risk flags…</p>
                ) : notificationsError ? (
                  <p className="px-4 py-5 text-sm text-amber-700 dark:text-[#F6D289]" role="alert">Risk notifications are unavailable right now.</p>
                ) : highRiskStudents.length === 0 ? (
                  <div className="flex items-start gap-2.5 px-4 py-5 text-sm text-slate-600 dark:text-[#CBD5CF]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-[#56B594]" />
                    <p>No students currently have a high or critical baseline risk flag.</p>
                  </div>
                ) : (
                  <ul className="max-h-[min(60vh,28rem)] overflow-y-auto">
                    {highRiskStudents.map((student) => (
                      <li key={student.id} className="border-b border-slate-100 dark:border-[#25322B] last:border-b-0">
                        <Link
                          to={`/journey?student_id=${encodeURIComponent(student.id)}`}
                          onClick={() => setNotificationsOpen(false)}
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-[#1D2722] focus:bg-slate-50 dark:focus:bg-[#1D2722] focus:outline-none"
                        >
                          <AlertTriangle className={cn('mt-0.5 h-4 w-4 shrink-0', student.risk_level === 'critical' ? 'text-rose-600 dark:text-[#F87171]' : 'text-orange-600 dark:text-[#FB923C]')} />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-2">
                              <span className="truncate text-sm font-semibold text-slate-900 dark:text-[#E2ECE6]">{student.name}</span>
                              <span className={cn('shrink-0 text-[10px] font-bold uppercase', student.risk_level === 'critical' ? 'text-rose-700 dark:text-[#F87171]' : 'text-orange-700 dark:text-[#FB923C]')}>
                                {student.risk_level}
                              </span>
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-500 dark:text-[#8FA89B]">{student.student_id} · {student.risk_score == null ? 'Score unavailable' : `${student.risk_score.toFixed(1)} risk score`}</span>
                            <span className="mt-1 block text-xs leading-relaxed text-slate-600 dark:text-[#CBD5CF]">{student.primary_risk_factor}</span>
                          </span>
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-[#8FA89B]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </div>


            </>
          )}
          {/* Profile, sign in, and display settings */}
          <div className="flex shrink-0 items-center pl-2 border-l border-slate-200 dark:border-[#35433B]">
            {!session && (
              <Link
                to="/login"
                className="mr-2 inline-flex min-h-8 items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Log in</span>
              </Link>
            )}
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 p-1.5 text-slate-700 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#1D2722] focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="flex h-8 w-8 items-center justify-center bg-slate-800 dark:bg-[#1D2722] text-xs font-semibold text-white dark:text-[#E2ECE6] border border-transparent dark:border-[#35433B]">
                  {session?.role ? session.role.slice(0, 2).toUpperCase() : 'AI'}
                </span>
                <span className="hidden text-xs font-medium sm:block">{session?.role ? session.role : 'Workspace'}</span>
                <ChevronDown className="h-4 w-4 text-slate-500 dark:text-[#8FA89B] transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute right-0 top-full z-50 mt-2 w-[min(19rem,calc(100vw-1.5rem))] border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-4 text-slate-800 dark:text-[#CBD5CF] shadow-xl">
                <div className="border-b border-slate-200 dark:border-[#35433B] pb-3">
                  <p className="text-sm font-semibold text-slate-900 dark:text-[#E2ECE6]">
                    {session ? 'User Session' : 'EduNexus AI Workspace'}
                  </p>
                  <p className="mt-1 break-all text-xs text-slate-600 dark:text-[#CBD5CF]">
                    {session?.email || 'Direct Access Public Mode'}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-[#8FA89B]">
                    {session ? `Role: ${session.role}` : 'Role: Public Viewer (Read-Only)'}
                  </p>
                  {session?.isDemoSession && <p className="mt-1 text-[11px] text-indigo-700 dark:text-[#56B594]">Local demo session</p>}
                </div>
                <div className="space-y-3 py-3">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Display settings
                  </p>
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-700 dark:text-[#CBD5CF]">
                    <span className="font-medium">Appearance</span>
                    <button
                      type="button"
                      onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                      className="inline-flex min-h-9 items-center gap-2 border border-slate-200 dark:border-[#35433B] bg-slate-50 dark:bg-[#1D2722] px-3 py-2 text-xs font-semibold text-slate-700 dark:text-[#E2ECE6] hover:bg-slate-100 dark:hover:bg-[#25322B] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {theme === 'dark' ? 'Light theme' : 'Dark theme'}
                    </button>
                  </div>
                  <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-slate-700 dark:text-[#CBD5CF]">
                    <span>Compact navigation</span>
                    <input
                      type="checkbox"
                      checked={compactNavigation}
                      onChange={(event) => {
                        setCompactNavigation(event.target.checked);
                        storePreference('edunexus_compact_navigation', event.target.checked);
                      }}
                      className="h-4 w-4 accent-indigo-600"
                    />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-slate-700 dark:text-[#CBD5CF]">
                    <span>Reduce motion</span>
                    <input
                      type="checkbox"
                      checked={reduceMotion}
                      onChange={(event) => {
                        setReduceMotion(event.target.checked);
                        storePreference('edunexus_reduce_motion', event.target.checked);
                      }}
                      className="h-4 w-4 accent-indigo-600"
                    />
                  </label>
                </div>
                <div className="border-t border-slate-200 dark:border-[#35433B] pt-3 space-y-2">
                  {!session ? (
                    <>
                      <Link
                        to="/login"
                        onClick={(event) => {
                          event.currentTarget.closest('details')?.removeAttribute('open');
                        }}
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-indigo-600 dark:text-[#56B594] hover:text-indigo-700 dark:hover:text-[#459b7e] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      >
                        <LogIn className="h-3.5 w-3.5" /> Sign in to account
                      </Link>
                      <Link
                        to="/register"
                        onClick={(event) => {
                          event.currentTarget.closest('details')?.removeAttribute('open');
                        }}
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-slate-700 dark:text-[#CBD5CF] hover:text-indigo-600 dark:hover:text-[#56B594] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      >
                        <UserPlus className="h-3.5 w-3.5" /> Create new account
                      </Link>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.currentTarget.closest('details')?.removeAttribute('open');
                          signOut();
                          navigate('/');
                        }}
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-slate-500 dark:text-[#8FA89B] hover:text-rose-600 dark:hover:text-[#F87171] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" /> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={(event) => {
                          event.currentTarget.closest('details')?.removeAttribute('open');
                        }}
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-indigo-600 dark:text-[#56B594] hover:underline"
                      >
                        <Users className="h-3.5 w-3.5" /> Switch Role / Profiles
                      </Link>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.currentTarget.closest('details')?.removeAttribute('open');
                          signOut();
                          navigate('/');
                        }}
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-slate-700 dark:text-[#CBD5CF] hover:text-rose-600 dark:hover:text-[#F87171] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5 text-rose-500" /> Sign out
                      </button>
                    </>
                  )}
                </div>
              </div>
            </details>
          </div>
        </div>

        {!isStudent && (
        <div className="px-3 pb-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              onKeyDown={submitStudentSearch}
              placeholder="Search students by name or ID"
              className="w-full border border-slate-200 dark:border-[#35433B] bg-slate-100 dark:bg-[#1D2722] py-2 pl-9 pr-3 text-sm text-slate-800 dark:text-[#E2ECE6] placeholder:text-slate-500 dark:placeholder:text-[#8FA89B] focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151C19] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              aria-label="Quick search students"
            />
          </div>
        </div>
        )}
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside
          className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] md:flex"
          aria-label="Main sidebar navigation"
        >
          {/* Main Navigation Links */}
          <div className="flex-1 space-y-1 p-4">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[#8FA89B]">
              Platform Modules
            </div>
            <nav className="space-y-1">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-3 py-2 rounded-none text-sm font-medium transition-colors group',
                        isActive
                          ? 'bg-[#E8F5F1] text-[#166B53] dark:bg-[#1D332A] dark:text-[#56B594] font-semibold shadow-2xs'
                          : 'text-slate-600 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#1D2722] hover:text-slate-900 dark:hover:text-[#E2ECE6]'
                      )
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-none bg-[#D5EDE5] text-[#166B53] dark:bg-[#153E31] dark:text-[#56B594]">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-6 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[#8FA89B]">
              Governance & Integrity
            </div>
            <div className="space-y-1 text-xs text-slate-600 dark:text-[#CBD5CF]">
              <div className="p-3 bg-slate-50 dark:bg-[#1D2722] border border-slate-200 dark:border-[#35433B] rounded-none space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-[#E2ECE6] text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-[#56B594]" />
                  <span>Explainable AI Principles</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-[#8FA89B] leading-normal">
                  Risk scores are transparent, descriptive, and require human review. No punitive automated actions.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Footer with Active Account and Sign Out */}
          <div className="p-3.5 border-t border-slate-200 dark:border-[#35433B] bg-slate-50/70 dark:bg-[#1A2320] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-800 dark:bg-[#1D2722] text-[11px] font-bold text-white dark:text-[#E2ECE6] border border-slate-700/50">
                  {session?.role ? session.role.slice(0, 2).toUpperCase() : 'AI'}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-[#E2ECE6] truncate">
                    {session?.email || 'Direct Workspace'}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-[#8FA89B] uppercase font-semibold">
                    {session?.role || 'Guest'}{isStudent ? ' · Read-Only' : ''}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
                title="Sign out of workspace"
                className="p-1.5 rounded-none text-slate-500 hover:text-rose-600 dark:text-[#8FA89B] dark:hover:text-[#F87171] hover:bg-slate-200/60 dark:hover:bg-[#25322B] transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-[#8FA89B] pt-2 border-t border-slate-200/60 dark:border-[#25322B]">
              <Link
                to="/login"
                className="font-semibold text-indigo-600 dark:text-[#56B594] hover:underline"
              >
                Switch Role / Sign In
              </Link>
              <span className="text-slate-400 dark:text-[#8FA89B]">
                EduNexus AI
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden bg-slate-900/40 backdrop-blur-2xs flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-72 bg-white dark:bg-[#151C19] text-slate-900 dark:text-[#E2ECE6] h-full shadow-xl flex flex-col p-4 animate-in slide-in-from-left duration-200 border-r border-slate-200 dark:border-[#35433B]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#35433B] mb-4">
                <span className="font-bold text-base text-slate-900 dark:text-[#E2ECE6]">EduNexus AI</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-none text-slate-500 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#1D2722]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1 flex-1">
                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium',
                          isActive
                            ? 'bg-[#E8F5F1] text-[#166B53] font-semibold dark:bg-[#1D332A] dark:text-[#56B594]'
                            : 'text-slate-600 dark:text-[#CBD5CF] hover:bg-slate-100 dark:hover:bg-[#1D2722] hover:text-slate-900 dark:hover:text-[#E2ECE6]'
                        )
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
                {!session && (
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-semibold text-indigo-600 dark:text-[#56B594] hover:bg-slate-100 dark:hover:bg-[#1D2722]"
                  >
                    <LogIn className="w-4 h-4 shrink-0" />
                    <span>Log in</span>
                  </NavLink>
                )}
              </nav>

              <div className="pt-3 border-t border-slate-200 dark:border-[#35433B] space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-[#56B594] hover:bg-slate-100 dark:hover:bg-[#1D2722]"
                >
                  <Users className="w-4 h-4" /> Switch Role / Sign In
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                    navigate('/');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-[#F87171] hover:bg-rose-50 dark:hover:bg-[#281618]"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main id="main-content" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* Breadcrumb / Section Banner */}
          <div className="bg-white dark:bg-[#151C19] border-b border-slate-200 dark:border-[#35433B] px-4 sm:px-8 py-3.5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#8FA89B] mb-0.5">
                <span>EduNexus</span>
                <span>/</span>
                <span className="font-medium text-slate-800 dark:text-[#CBD5CF]">{pageTitle}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-[#E2ECE6] tracking-tight">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Page Outlet */}
          <div key={location.pathname} className="page-enter p-4 sm:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
