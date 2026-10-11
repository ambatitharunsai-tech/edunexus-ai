import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
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
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Badge } from '../components/ui/Badge';
import { useHealth } from '../hooks/useHealth';

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
];

export const AppShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { health } = useHealth();

  // Determine current page title
  const currentNav = navItems.find((item) =>
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
  );
  const pageTitle = currentNav?.name || 'Overview';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Skip to Main Content Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Header */}
      <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-xs flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
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
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  EduNexus <span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Prototype
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden md:block">
                KPMG Student Analytics Challenge
              </p>
            </div>
          </div>
        </div>

        {/* Global Search & System Meta */}
        <div className="flex items-center gap-3">
          {/* Search bar simulation */}
          <div className="hidden lg:flex items-center relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="search"
              placeholder="Search student or ID (e.g. STU-001)..."
              className="pl-9 pr-4 py-1.5 text-xs bg-slate-100 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all"
              aria-label="Quick search students"
            />
          </div>

          {/* Academic Term Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
            <span>AY 2025-26 • Term 2</span>
          </div>

          {/* API Health Status Pill */}
          <div className="flex items-center">
            {health.status === 'online' ? (
              <Badge variant="success" size="sm" dot>
                API v{health.version || '0.1.0'}
              </Badge>
            ) : health.status === 'checking' ? (
              <Badge variant="warning" size="sm" dot>
                API Connecting
              </Badge>
            ) : (
              <Badge variant="danger" size="sm" dot>
                API Offline
              </Badge>
            )}
          </div>

          {/* Evaluator User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div
              className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold select-none ring-2 ring-slate-100"
              title="KPMG Evaluator Profile"
            >
              KP
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Sidebar Navigation */}
        <aside
          className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0"
          aria-label="Main sidebar navigation"
        >
          {/* Main Navigation Links */}
          <div className="p-4 flex-1 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Platform Modules
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
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
                Synthetic Seed
              </span>
            </div>
            <div className="mt-2 text-[10px] text-slate-400">
              EduNexus AI Platform • Stage 1
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
                KPMG Student Analytics Challenge Prototype
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main id="main-content" className="flex-1 overflow-y-auto">
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
          <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
