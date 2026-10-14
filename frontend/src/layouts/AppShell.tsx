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
  ChevronDown,
  SlidersHorizontal,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '../lib/utils';
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
];

type AppTheme = 'light' | 'dark';

export const AppShell: React.FC<{ theme: AppTheme; onThemeChange: (theme: AppTheme) => void }> = ({ theme, onThemeChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [highRiskStudents, setHighRiskStudents] = useState<FollowUpStudentItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState(false);
  const [compactNavigation, setCompactNavigation] = useState(() => {
    try {
      return localStorage.getItem('edunexus_compact_navigation') === 'true';
    } catch {
      return false;
    }
  });
  const [reduceMotion, setReduceMotion] = useState(() => {
    try {
      return localStorage.getItem('edunexus_reduce_motion') === 'true';
    } catch {
      return false;
    }
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { session, signOut, isStaff } = useAuth();

  useEffect(() => {
    let isMounted = true;
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
  }, []);

  const submitStudentSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim()) {
      navigate(`/students?search=${encodeURIComponent(event.currentTarget.value.trim())}`);
      event.currentTarget.blur();
    }
  };

  const storePreference = (key: string, value: boolean) => {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // Keep the in-memory setting when browser storage is unavailable.
    }
  };

  // Determine current page title
  const visibleNavItems = isStaff
    ? navItems
    : navItems.filter((item) => item.to === '/' || item.to === '/journey');

  const currentNav = visibleNavItems.find((item) =>
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
  );
  const pageTitle = currentNav?.name || 'Overview';

  return (
    <div className={cn('app-shell h-screen overflow-hidden bg-slate-50 text-slate-900 flex flex-col antialiased', compactNavigation && 'compact-navigation', reduceMotion && 'reduce-motion')}>
      {/* Skip to Main Content Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Header */}
      <header className="app-shell-header relative z-30 shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="flex min-h-16 items-center gap-3 px-3 sm:px-6">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Logo & Title */}
          <div className="flex min-w-0 shrink-0 items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  EduNexus <span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Prototype
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden xl:block">
                Student Journey Intelligence
              </p>
            </div>
          </div>

          {/* Global search */}
          <div className="hidden min-w-0 flex-1 justify-center md:absolute md:left-1/2 md:top-1/2 md:flex md:w-[min(42vw,36rem)] md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="relative w-full max-w-xl">
            <Search className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="search"
              onKeyDown={submitStudentSearch}
              placeholder="Search students by name or ID"
              className="w-full border border-slate-200 bg-slate-100 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
              aria-label="Quick search students"
            />
            </div>
          </div>

          <div className="hidden xl:flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
            <span>Human-reviewed support</span>
          </div>

          {/* Current high-risk student notifications from dashboard data */}
          <div className="relative ml-auto shrink-0">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`High-risk student notifications${highRiskStudents.length ? `, ${highRiskStudents.length} students` : ''}`}
              aria-expanded={notificationsOpen}
              aria-controls="high-risk-notifications"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {highRiskStudents.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center bg-rose-600 px-1 text-[10px] font-bold leading-none text-white">
                  {highRiskStudents.length > 99 ? '99+' : highRiskStudents.length}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <section
                id="high-risk-notifications"
                className="fixed right-3 top-[7.5rem] z-50 w-[min(22rem,calc(100vw-1.5rem))] border border-slate-200 bg-white text-slate-800 shadow-xl md:absolute md:right-0 md:top-full md:mt-2"
                aria-label="High-risk student notifications"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">High-risk students</h2>
                    <p className="mt-0.5 text-xs text-slate-500">Current high and critical review flags</p>
                  </div>
                  <span className="flex h-7 min-w-7 items-center justify-center bg-rose-50 px-2 text-xs font-bold text-rose-700">
                    {highRiskStudents.length}
                  </span>
                </div>
                {notificationsLoading ? (
                  <p className="px-4 py-5 text-sm text-slate-500" role="status">Loading current risk flags…</p>
                ) : notificationsError ? (
                  <p className="px-4 py-5 text-sm text-amber-700" role="alert">Risk notifications are unavailable right now.</p>
                ) : highRiskStudents.length === 0 ? (
                  <div className="flex items-start gap-2.5 px-4 py-5 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <p>No students currently have a high or critical baseline risk flag.</p>
                  </div>
                ) : (
                  <ul className="max-h-[min(60vh,28rem)] overflow-y-auto">
                    {highRiskStudents.map((student) => (
                      <li key={student.id} className="border-b border-slate-100 last:border-b-0">
                        <Link
                          to={`/journey?student_id=${encodeURIComponent(student.id)}`}
                          onClick={() => setNotificationsOpen(false)}
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                        >
                          <AlertTriangle className={cn('mt-0.5 h-4 w-4 shrink-0', student.risk_level === 'critical' ? 'text-rose-600' : 'text-orange-600')} />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-2">
                              <span className="truncate text-sm font-semibold text-slate-900">{student.name}</span>
                              <span className={cn('shrink-0 text-[10px] font-bold uppercase', student.risk_level === 'critical' ? 'text-rose-700' : 'text-orange-700')}>
                                {student.risk_level}
                              </span>
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-500">{student.student_id} · {student.risk_score == null ? 'Score unavailable' : `${student.risk_score.toFixed(1)} risk score`}</span>
                            <span className="mt-1 block text-xs leading-relaxed text-slate-600">{student.primary_risk_factor}</span>
                          </span>
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </div>

          {/* Profile and display settings */}
          <div className="flex shrink-0 items-center pl-2 border-l border-slate-200">
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 p-1.5 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="flex h-8 w-8 items-center justify-center bg-slate-800 text-xs font-semibold text-white">
                  {session?.role ? session.role.slice(0, 2).toUpperCase() : 'NA'}
                </span>
                <span className="hidden text-xs font-medium sm:block">{session?.role || 'Profile'}</span>
                <ChevronDown className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute right-0 top-full z-50 mt-2 w-[min(19rem,calc(100vw-1.5rem))] border border-slate-200 bg-white p-4 text-slate-800 shadow-xl">
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-sm font-semibold text-slate-900">Profile</p>
                  <p className="mt-1 break-all text-xs text-slate-600">{session?.email || 'Email not provided'}</p>
                  <p className="mt-1 text-xs text-slate-500">Role: {session?.role || 'Unknown'}</p>
                  {session?.isDemoSession && <p className="mt-1 text-[11px] text-indigo-700">Local demo session</p>}
                </div>
                <div className="space-y-3 py-3">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Display settings
                  </p>
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-700">
                    <span className="font-medium">Appearance</span>
                    <button
                      type="button"
                      onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                      className="inline-flex min-h-9 items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {theme === 'dark' ? 'Light theme' : 'Dark theme'}
                    </button>
                  </div>
                  <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-slate-700">
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
                  <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-slate-700">
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
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="flex min-h-9 w-full items-center gap-2 border-t border-slate-200 pt-3 text-left text-xs font-semibold text-slate-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </div>
            </details>
          </div>
        </div>

        <div className="px-3 pb-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              onKeyDown={submitStudentSearch}
              placeholder="Search students by name or ID"
              className="w-full border border-slate-200 bg-slate-100 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              aria-label="Quick search students"
            />
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside
          className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white md:flex"
          aria-label="Main sidebar navigation"
        >
          {/* Main Navigation Links */}
          <div className="flex-1 space-y-1 p-4">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
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
                        'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group',
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-6 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Governance & Integrity
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Explainable AI Principles</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Risk scores are transparent, descriptive, and require human review. No punitive automated actions.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Data Mode:</span>
              <span className="font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                See dashboard source
              </span>
            </div>
            <div className="mt-2 text-[10px] text-slate-400">
              EduNexus AI Prototype
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
              className="w-72 bg-white h-full shadow-xl flex flex-col p-4 animate-in slide-in-from-left duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <span className="font-bold text-base text-slate-900">EduNexus AI</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        )
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200">
                EduNexus AI Prototype
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main id="main-content" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* Breadcrumb / Section Banner */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                <span>EduNexus</span>
                <span>/</span>
                <span className="font-medium text-slate-800">{pageTitle}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
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
