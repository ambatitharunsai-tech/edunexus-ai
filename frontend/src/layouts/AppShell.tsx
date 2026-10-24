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

    loadRiskNotifications();
    return () => {
      isMounted = false;
    };
  }, [isStudent]);

  const storePreference = (key: string, value: boolean) => {
    safeStorageSet(key, String(value));
  };

  const getPageTitle = (pathname: string) => {
    if (pathname === '/') return 'Cohort Risk & Placement Command Center';
    if (pathname.startsWith('/students/')) return 'Student Dossier & Longitudinal Journey';
    if (pathname === '/students') return 'Student Cohort Directory & Dual-Risk Filters';
    if (pathname.startsWith('/journey')) return 'Longitudinal Trajectory & Dual Risk Matrix';
    if (pathname === '/interventions') return 'Support Plans & Intervention Records';
    if (pathname === '/analytics') return 'Cohort Risk Trends & Predictive Analytics';
    if (pathname === '/csv-hub') return 'Multi-Domain CSV Ingestion & Quality Hub';
    if (pathname === '/help') return 'Intelligence Governance & Support';
    if (pathname === '/student') return 'Student Personalized Success Portal';
    return 'EduNexus AI Portal';
  };

  const pageTitle = getPageTitle(location.pathname);

  const visibleNavItems = navItems.filter((item) => {
    if (!isStudent) return true;
    return (
      item.to === '/journey' ||
      item.to === '/student' ||
      item.to === '/help'
    );
  });

  const submitStudentSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const q = e.currentTarget.value.trim();
      if (q) {
        navigate(`/students?search=${encodeURIComponent(q)}`);
      }
    }
  };

  return (
    <div className={cn('app-shell h-screen overflow-hidden bg-[#F5F5F5] dark:bg-[#09090B] text-[#27272A] dark:text-[#E4E4E7] flex flex-col antialiased', compactNavigation && 'compact-navigation', reduceMotion && 'reduce-motion')}>
      {/* Skip to Main Content Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#18181B] dark:focus:bg-[#F4F4F5] focus:text-white dark:focus:text-[#09090B] focus:rounded-none focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Header */}
      <header className="app-shell-header relative z-30 shrink-0 border-b border-[#E4E4E7] dark:border-[#27272A] bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xs">
        <div className="flex min-h-16 items-center gap-3 px-3 sm:px-6">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-none text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C20] hover:text-[#18181B] dark:hover:text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#818CF8]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Logo & Title */}
          <div className="flex min-w-0 shrink-0 items-center gap-2.5">
            <div className="w-9 h-9 rounded-none bg-[#18181B] dark:bg-[#27272A] border border-[#D4D4D8] dark:border-[#3F3F46] flex items-center justify-center text-white dark:text-[#FAFAFA] shadow-2xs">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-[#18181B] dark:text-[#FAFAFA]">
                  EduNexus <span className="text-[#4F46E5] dark:text-[#818CF8]">AI</span>
                </span>
                {session?.role && (
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wider',
                      isStudent
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] dark:bg-[#451A03] dark:text-[#FCD34D] dark:border-[#92400E]'
                        : session.role === 'admin'
                        ? 'bg-[#EDE9FE] text-[#5B21B6] border-[#C4B5FD] dark:bg-[#2E1065] dark:text-[#C4B5FD] dark:border-[#7C3AED]'
                        : session.role === 'faculty'
                        ? 'bg-[#CFFAFE] text-[#0E7490] border-[#67E8F9] dark:bg-[#083344] dark:text-[#67E8F9] dark:border-[#155E75]'
                        : 'bg-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD] dark:bg-[#172554] dark:text-[#93C5FD] dark:border-[#1D4ED8]'
                    )}
                  >
                    {session.role}{isStudent ? ' · Read-Only' : ''}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] hidden xl:block">
                Student Journey Intelligence
              </p>
            </div>
          </div>

          {!isStudent && (
            <>
          {/* Global search */}
          <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-[#71717A] dark:text-[#A1A1AA] pointer-events-none" />
              <input
                type="search"
                onKeyDown={submitStudentSearch}
                placeholder="Search students by name or ID"
                className="w-full border border-[#D4D4D8] dark:border-[#3F3F46] bg-slate-50 dark:bg-[#111113] py-1.5 pl-9 pr-4 text-xs text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA] dark:placeholder:text-[#71717A] focus:border-[#6366F1] dark:focus:border-[#818CF8] focus:bg-white dark:focus:bg-[#141416] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
                aria-label="Quick search students"
              />
            </div>
          </div>
            </>
          )}

          <div className="hidden xl:flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-none bg-slate-100 dark:bg-[#1C1C20] text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-none bg-[#4F46E5] dark:bg-[#818CF8]" aria-hidden="true" />
            <span>Human-reviewed support</span>
          </div>

          {!isStudent && (
            <>
          {/* Current high-risk student notifications from dashboard data */}
          <div className="relative ml-auto shrink-0">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C20] hover:text-[#18181B] dark:hover:text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#818CF8]"
              aria-label={`High-risk student notifications${highRiskStudents.length ? `, ${highRiskStudents.length} students` : ''}`}
              aria-expanded={notificationsOpen}
              aria-controls="high-risk-notifications"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {highRiskStudents.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center bg-[#E11D48] dark:bg-[#FB7185] px-1 text-[10px] font-bold leading-none text-white dark:text-[#09090B]">
                  {highRiskStudents.length > 99 ? '99+' : highRiskStudents.length}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <section
                id="high-risk-notifications"
                className="fixed right-3 top-[7.5rem] z-50 w-[min(22rem,calc(100vw-1.5rem))] border border-[#E4E4E7] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-[#27272A] dark:text-[#E4E4E7] shadow-xl md:absolute md:right-0 md:top-full md:mt-2"
                aria-label="High-risk student notifications"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#E4E4E7] dark:border-[#27272A] px-4 py-3">
                  <div>
                    <h2 className="text-sm font-semibold text-[#18181B] dark:text-[#FAFAFA]">High-risk students</h2>
                    <p className="mt-0.5 text-xs text-[#71717A] dark:text-[#A1A1AA]">Current high and critical review flags</p>
                  </div>
                  <span className="flex h-7 min-w-7 items-center justify-center bg-[#FEE2E2] dark:bg-[#450A0A] px-2 text-xs font-bold text-[#B91C1C] dark:text-[#FCA5A5] border border-[#FCA5A5] dark:border-[#991B1B]">
                    {highRiskStudents.length}
                  </span>
                </div>
                {notificationsLoading ? (
                  <p className="px-4 py-5 text-sm text-[#71717A] dark:text-[#A1A1AA]" role="status">Loading current risk flags…</p>
                ) : notificationsError ? (
                  <p className="px-4 py-5 text-sm text-[#92400E] dark:text-[#FCD34D]" role="alert">Risk notifications are unavailable right now.</p>
                ) : highRiskStudents.length === 0 ? (
                  <div className="flex items-start gap-2.5 px-4 py-5 text-sm text-[#52525B] dark:text-[#A1A1AA]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7490] dark:text-[#67E8F9]" />
                    <p>No students currently have a high or critical baseline risk flag.</p>
                  </div>
                ) : (
                  <ul className="max-h-[min(60vh,28rem)] overflow-y-auto">
                    {highRiskStudents.map((student) => (
                      <li key={student.id} className="border-b border-[#E4E4E7] dark:border-[#27272A] last:border-b-0">
                        <Link
                          to={`/journey?student_id=${encodeURIComponent(student.id)}`}
                          onClick={() => setNotificationsOpen(false)}
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-[#1C1C20] focus:bg-slate-50 dark:focus:bg-[#1C1C20] focus:outline-none"
                        >
                          <AlertTriangle className={cn('mt-0.5 h-4 w-4 shrink-0', student.risk_level === 'critical' ? 'text-[#B91C1C] dark:text-[#FDA4AF]' : 'text-[#D97706] dark:text-[#FCD34D]')} />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-2">
                              <span className="truncate text-sm font-semibold text-[#18181B] dark:text-[#FAFAFA]">{student.name}</span>
                              <span className={cn('shrink-0 text-[10px] font-bold uppercase', student.risk_level === 'critical' ? 'text-[#B91C1C] dark:text-[#FDA4AF]' : 'text-[#D97706] dark:text-[#FCD34D]')}>
                                {student.risk_level}
                              </span>
                            </span>
                            <span className="mt-0.5 block text-xs text-[#71717A] dark:text-[#A1A1AA]">{student.student_id} · {student.risk_score == null ? 'Score unavailable' : `${student.risk_score.toFixed(1)} risk score`}</span>
                            <span className="mt-1 block text-xs leading-relaxed text-[#52525B] dark:text-[#D4D4D8]">{student.primary_risk_factor}</span>
                          </span>
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#71717A] dark:text-[#A1A1AA]" />
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

          {/* Profile, sign in, and appearance settings */}
          <div className="flex shrink-0 items-center pl-2 border-l border-[#E4E4E7] dark:border-[#27272A]">
            {!session && (
              <Link
                to="/login"
                className="mr-2 inline-flex min-h-8 items-center gap-1.5 rounded-none bg-[#18181B] dark:bg-[#F4F4F5] px-3 py-1.5 text-xs font-semibold text-white dark:text-[#09090B] shadow-2xs hover:bg-[#27272A] dark:hover:bg-[#D4D4D8] focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Log in</span>
              </Link>
            )}
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 p-1.5 text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C20] focus:outline-none focus:ring-2 focus:ring-[#818CF8]">
                <span className="flex h-8 w-8 items-center justify-center bg-[#18181B] dark:bg-[#27272A] text-xs font-semibold text-white dark:text-[#FAFAFA] border border-[#D4D4D8] dark:border-[#3F3F46]">
                  {session?.role ? session.role.slice(0, 2).toUpperCase() : 'AI'}
                </span>
                <span className="hidden text-xs font-medium sm:block">{session?.role ? session.role : 'Workspace'}</span>
                <ChevronDown className="h-4 w-4 text-[#71717A] dark:text-[#A1A1AA] transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-1.5rem))] border border-[#E4E4E7] dark:border-[#3F3F46] bg-white dark:bg-[#18181B] p-4 text-[#27272A] dark:text-[#E4E4E7] shadow-xl">
                <div className="border-b border-[#E4E4E7] dark:border-[#27272A] pb-3">
                  <p className="text-sm font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                    {session ? 'User Session' : 'EduNexus AI Workspace'}
                  </p>
                  <p className="mt-1 break-all text-xs text-[#52525B] dark:text-[#A1A1AA]">
                    {session?.email || 'Direct Access Public Mode'}
                  </p>
                  <p className="mt-1 text-xs text-[#71717A] dark:text-[#71717A]">
                    {session ? `Role: ${session.role}` : 'Role: Public Viewer (Read-Only)'}
                  </p>
                  {session?.isDemoSession && <p className="mt-1 text-[11px] text-[#4F46E5] dark:text-[#A5B4FC]">Local demo session</p>}
                </div>

                {/* Appearance Theme Selector */}
                <div className="space-y-2 py-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                    <span className="flex items-center gap-2">
                      <SlidersHorizontal className="h-3.5 w-3.5 text-[#52525B] dark:text-[#A1A1AA]" /> Appearance
                    </span>
                    <span className="text-[10px] font-medium text-[#71717A] dark:text-[#A1A1AA]">
                      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4F4F5] dark:bg-[#111113] border border-[#E4E4E7] dark:border-[#27272A]">
                    <button
                      type="button"
                      onClick={() => onThemeChange('dark')}
                      className={cn(
                        'flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium transition-all select-none rounded-none',
                        theme === 'dark'
                          ? 'bg-[#27272A] text-[#FFFFFF] border border-[#3F3F46] shadow-2xs font-semibold'
                          : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#E4E4E7] dark:hover:bg-[#1C1C20]'
                      )}
                      aria-pressed={theme === 'dark'}
                      aria-label="Switch to Dark Mode"
                    >
                      <Moon className={cn('h-3.5 w-3.5', theme === 'dark' ? 'text-[#A5B4FC]' : 'text-[#71717A]')} />
                      <span>Dark Mode</span>
                      {theme === 'dark' && <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => onThemeChange('light')}
                      className={cn(
                        'flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium transition-all select-none rounded-none',
                        theme === 'light'
                          ? 'bg-white text-[#18181B] border border-[#D4D4D8] shadow-2xs font-semibold'
                          : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] hover:bg-[#E4E4E7] dark:hover:bg-[#1C1C20]'
                      )}
                      aria-pressed={theme === 'light'}
                      aria-label="Switch to Light Mode"
                    >
                      <Sun className={cn('h-3.5 w-3.5', theme === 'light' ? 'text-[#4F46E5]' : 'text-[#71717A]')} />
                      <span>Light Mode</span>
                      {theme === 'light' && <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />}
                    </button>
                  </div>

                  <div className="pt-2 space-y-2">
                    <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-[#52525B] dark:text-[#A1A1AA]">
                      <span>Compact navigation</span>
                      <input
                        type="checkbox"
                        checked={compactNavigation}
                        onChange={(event) => {
                          setCompactNavigation(event.target.checked);
                          storePreference('edunexus_compact_navigation', event.target.checked);
                        }}
                        className="h-4 w-4 accent-[#4F46E5] dark:accent-[#6366F1]"
                      />
                    </label>
                    <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-[#52525B] dark:text-[#A1A1AA]">
                      <span>Reduce motion</span>
                      <input
                        type="checkbox"
                        checked={reduceMotion}
                        onChange={(event) => {
                          setReduceMotion(event.target.checked);
                          storePreference('edunexus_reduce_motion', event.target.checked);
                        }}
                        className="h-4 w-4 accent-[#4F46E5] dark:accent-[#6366F1]"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  {!session ? (
                    <>
                      <Link
                        to="/login"
                        onClick={(event) => {
                          event.currentTarget.closest('details')?.removeAttribute('open');
                        }}
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-[#4F46E5] dark:text-[#A5B4FC] hover:text-[#3730A3] dark:hover:text-[#C7D2FE] focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-colors"
                      >
                        <LogIn className="h-3.5 w-3.5" /> Sign in to account
                      </Link>
                      <Link
                        to="/register"
                        onClick={(event) => {
                          event.currentTarget.closest('details')?.removeAttribute('open');
                        }}
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-colors"
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
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-[#71717A] dark:text-[#71717A] hover:text-[#B91C1C] dark:hover:text-[#FCA5A5] focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-colors"
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
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-[#4F46E5] dark:text-[#A5B4FC] hover:underline"
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
                        className="flex min-h-9 w-full items-center gap-2 text-left text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] hover:text-[#B91C1C] dark:hover:text-[#FCA5A5] focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5 text-[#B91C1C] dark:text-[#FCA5A5]" /> Sign out
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
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A] dark:text-[#A1A1AA]" />
            <input
              type="search"
              onKeyDown={submitStudentSearch}
              placeholder="Search students by name or ID"
              className="w-full border border-[#D4D4D8] dark:border-[#3F3F46] bg-slate-100 dark:bg-[#111113] py-2 pl-9 pr-3 text-sm text-[#18181B] dark:text-[#FAFAFA] placeholder:text-[#A1A1AA] dark:placeholder:text-[#71717A] focus:border-[#6366F1] dark:focus:border-[#818CF8] focus:bg-white dark:focus:bg-[#141416] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
              aria-label="Quick search students"
            />
          </div>
        </div>
        )}
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside
          className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#0D0D0F] md:flex"
          aria-label="Main sidebar navigation"
        >
          {/* Main Navigation Links */}
          <div className="flex-1 space-y-1 p-4">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#71717A] dark:text-[#71717A]">
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
                          ? 'bg-[#EEF2FF] text-[#3730A3] dark:bg-[#27272A] dark:text-[#FFFFFF] font-semibold shadow-2xs'
                          : 'text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C20] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon className={cn('w-4 h-4 shrink-0 transition-transform group-hover:scale-105', isActive ? 'text-[#4F46E5] dark:text-[#A5B4FC]' : 'text-[#71717A] dark:text-[#A1A1AA]')} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={cn('text-[10px] font-semibold px-1.5 py-0.2 rounded-none border', isActive ? 'bg-[#EEF2FF] text-[#3730A3] border-[#818CF8] dark:bg-[#27272A] dark:text-[#A5B4FC] dark:border-[#3F3F46]' : 'bg-[#F4F4F5] text-[#52525B] border-[#D4D4D8] dark:bg-[#1C1C20] dark:text-[#A1A1AA] dark:border-[#3F3F46]')}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-6 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#71717A] dark:text-[#71717A]">
              Governance & Integrity
            </div>
            <div className="space-y-1 text-xs text-[#52525B] dark:text-[#A1A1AA]">
              <div className="p-3 bg-slate-50 dark:bg-[#111113] border border-[#E4E4E7] dark:border-[#27272A] rounded-none space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-[#18181B] dark:text-[#FAFAFA] text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8]" />
                  <span>Explainable AI Principles</span>
                </div>
                <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-normal">
                  Risk scores are transparent, descriptive, and require human review. No punitive automated actions.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Footer with Active Account and Sign Out */}
          <div className="p-3.5 border-t border-[#E4E4E7] dark:border-[#27272A] bg-slate-50/70 dark:bg-[#0A0A0A] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#18181B] dark:bg-[#27272A] text-[11px] font-bold text-white dark:text-[#FAFAFA] border border-[#D4D4D8] dark:border-[#3F3F46]">
                  {session?.role ? session.role.slice(0, 2).toUpperCase() : 'AI'}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#18181B] dark:text-[#FAFAFA] truncate">
                    {session?.email || 'Direct Workspace'}
                  </p>
                  <p className="text-[10px] text-[#71717A] dark:text-[#71717A] uppercase font-semibold">
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
                className="p-1.5 rounded-none text-[#71717A] hover:text-[#B91C1C] dark:text-[#A1A1AA] dark:hover:text-[#FCA5A5] hover:bg-slate-200/60 dark:hover:bg-[#1C1C20] transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#71717A] dark:text-[#71717A] pt-2 border-t border-[#E4E4E7] dark:border-[#27272A]">
              <Link
                to="/login"
                className="font-semibold text-[#4F46E5] dark:text-[#A5B4FC] hover:underline"
              >
                Switch Role / Sign In
              </Link>
              <span className="text-[#A1A1AA] dark:text-[#71717A]">
                EduNexus AI
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-2xs flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-72 bg-white dark:bg-[#0D0D0F] text-[#27272A] dark:text-[#E4E4E7] h-full shadow-xl flex flex-col p-4 animate-in slide-in-from-left duration-200 border-r border-[#E4E4E7] dark:border-[#27272A]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E4E4E7] dark:border-[#27272A] mb-4">
                <span className="font-bold text-base text-[#18181B] dark:text-[#FAFAFA]">EduNexus AI</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-none text-[#71717A] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C20]"
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
                          'flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-[#EEF2FF] text-[#3730A3] dark:bg-[#27272A] dark:text-[#FFFFFF] font-semibold'
                            : 'text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C20] hover:text-[#18181B] dark:hover:text-[#FAFAFA]'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon className={cn('w-4 h-4', isActive ? 'text-[#4F46E5] dark:text-[#A5B4FC]' : 'text-[#71717A] dark:text-[#A1A1AA]')} />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-none border', isActive ? 'bg-[#EEF2FF] text-[#3730A3] border-[#818CF8] dark:bg-[#27272A] dark:text-[#A5B4FC] dark:border-[#3F3F46]' : 'bg-[#F4F4F5] text-[#52525B] border-[#D4D4D8] dark:bg-[#1C1C20] dark:text-[#A1A1AA] dark:border-[#3F3F46]')}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                    navigate('/');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-[#B91C1C] dark:text-[#FCA5A5] hover:bg-[#FEE2E2] dark:hover:bg-[#450A0A]"
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
          <div className="bg-white dark:bg-[#141416] border-b border-[#E4E4E7] dark:border-[#27272A] px-4 sm:px-8 py-3.5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#71717A] dark:text-[#71717A] mb-0.5">
                <span>EduNexus</span>
                <span>/</span>
                <span className="font-medium text-[#27272A] dark:text-[#A1A1AA]">{pageTitle}</span>
              </div>
              <h1 className="text-xl font-bold text-[#18181B] dark:text-[#FAFAFA] tracking-tight">
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
