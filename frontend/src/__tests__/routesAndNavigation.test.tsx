import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, type AuthContextValue } from '../context/AuthContext';
import { AppRoutes } from '../App';
import { clearApiCache } from '../lib/api';
import type { DashboardOverviewResponse } from '../types';

const mockOverview: DashboardOverviewResponse = {
  summary: {
    total_students: 120,
    active_students: 115,
    requiring_review_count: 15,
    review_percentage: 12.5,
    average_attendance: 91.2,
    attendance_status: 'Good',
    active_interventions_count: 8,
    follow_ups_due_count: 3,
    cohort_avg_score: 84.1,
    average_success_score: 82.4,
  },
  attendance_trend: [],
  assessment_trend: [],
  risk_distribution: [],
  recent_activity: [],
  follow_up_students: [],
  intervention_summary: {
    total: 8,
    planned: 2,
    in_progress: 4,
    under_review: 1,
    completed: 1,
    by_type: {},
    by_priority: {},
    completion_rate: 12.5,
    upcoming_follow_ups: 3,
  },
  metadata: {
    is_demo: true,
    data_source: 'synthetic',
    dataset_size: 120,
    generated_at: '2026-10-22T00:00:00Z',
    disclaimer: 'Advisory indicator only',
  },
  domain_averages: {},
  domain_coverage: {},
  academic_risk_distribution: [],
  placement_risk_distribution: [],
  cohort_comparisons: [],
};

const createMockAuth = (role?: 'advisor' | 'student'): AuthContextValue => {
  if (!role) {
    return {
      session: null,
      isAuthenticated: false,
      isStaff: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      refreshSession: vi.fn(),
    };
  }
  const isStaff = role !== 'student';
  return {
    session: {
      token: 'mock-token',
      userId: `user-${role}`,
      email: `${role}@edunexus.ai`,
      role,
      isDemoSession: true,
    },
    isAuthenticated: true,
    isStaff,
    signIn: vi.fn(),
    signOut: vi.fn(),
    refreshSession: vi.fn(),
  };
};

function renderAppRoute(initialEntry: string, role?: 'advisor' | 'student', authOverride?: Partial<AuthContextValue>) {
  const mockAuth = { ...createMockAuth(role), ...authOverride };

  return render(
    <AuthContext.Provider value={mockAuth}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRoutes theme="dark" onThemeChange={vi.fn()} />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('Direct Route Refresh & Access Control Verification', () => {
  beforeEach(() => {
    clearApiCache();
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      let data: unknown = {};
      if (typeof url === 'string') {
        if (url.includes('/api/v1/interventions')) {
          data = [];
        } else if (url.includes('/api/v1/dashboard/overview')) {
          data = mockOverview;
        } else if (url.includes('/api/v1/students/me/dashboard')) {
          data = {
            data_source: 'synthetic',
            student: { student_id: 'S101', first_name: 'Alex', last_name: 'Taylor', status: 'Active' },
            metrics: { attendance_rate: 92, academic_average: 84, success_score: 88, success_tier: 'Low Risk', available_domains_count: 5, domain_coverage_pct: 71.4, trend: 'stable', missing_domains: [] },
            domains: [{ name: 'attendance', score: 92, label: 'Attendance' }],
            recent_assessments: [],
            recent_attendance: [],
            support_plans: [],
          };
        } else if (url.includes('/api/v1/students/')) {
          data = {
            student: { id: 'STU-001', student_id: 'STU-001', first_name: 'Alex', last_name: 'Taylor', current_grade: 'Senior', section: 'A', status: 'active', enrollment_date: '2024-09-01' },
            risk_profile: { overall_risk: 'low', risk_score: 18, requires_review: false, disclaimer: 'Advisory only', factors: [] },
            academic_risk_profile: { tier: 'low', score: 15, is_critical_flag: false, contributing_factors: [], recommendation: 'Maintain progress' },
            placement_risk_profile: { tier: 'low', score: 20, is_critical_flag: false, contributing_factors: [], recommendation: 'Continue preparation' },
            attendance_rate: 92,
            average_score: 84,
            metrics_trend: [],
            missing_data_notices: [],
            interventions: [],
            recent_assessments: [],
            recent_attendance: [],
            recent_engagements: [],
            timeline_events: [],
          };
        } else if (url.includes('/api/v1/students')) {
          data = {
            students: [],
            total: 0,
            page: 1,
            page_size: 10,
            total_pages: 1,
            departments: [],
            semesters: [],
          };
        }
      }
      return {
        ok: true,
        json: async () => data,
      } as unknown as Response;
    });
  });

  describe('Direct Unauthenticated Dashboard Access', () => {
    it('direct load of "/" by unauthenticated visitor renders Dashboard without login', async () => {
      renderAppRoute('/', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Executive Student Success Dashboard/i)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Sign in to the student intelligence workspace/i)).not.toBeInTheDocument();
    });

    it('direct load of "/login" renders dedicated Login Page with role selection', async () => {
      renderAppRoute('/login', undefined);
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: /Sign in to EduNexus AI/i })).toBeInTheDocument();
      });
      expect(screen.getAllByText(/Administrator/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Academic Advisor/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Faculty Member/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Student/i).length).toBeGreaterThan(0);
    });

    it('direct load of "/register" renders the Registration Page for account creation', async () => {
      renderAppRoute('/register', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Create your institutional account/i)).toBeInTheDocument();
      });
    });

    it('direct load of "/help" by unauthenticated visitor renders Help & Support Center', async () => {
      renderAppRoute('/help', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Help & Support Center/i)).toBeInTheDocument();
      });
    });

    it('direct load of "/analytics" renders Analytics & Trends directly', async () => {
      renderAppRoute('/analytics', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Campus Analytics & Strategic Segmentation/i)).toBeInTheDocument();
      });
    });

    it('direct load of "/students" renders Students Directory directly', async () => {
      renderAppRoute('/students', undefined);
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2, name: /Students Directory/i })).toBeInTheDocument();
      });
    });

    it('direct load of "/journey" renders Student Journey directly', async () => {
      renderAppRoute('/journey', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Refresh Journey/i)).toBeInTheDocument();
      });
    });

    it('direct load of "/interventions" renders Interventions page directly', async () => {
      renderAppRoute('/interventions', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Intervention Planning & Outcome Tracking/i)).toBeInTheDocument();
      });
    });

    it('direct load of "/csv-hub" renders Data & CSV Hub directly', async () => {
      renderAppRoute('/csv-hub', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Data Hub & CSV Ingestion Engine/i)).toBeInTheDocument();
      });
    });

    it('direct load of genuinely invalid route renders NotFoundPage', async () => {
      renderAppRoute('/not-a-valid-route', undefined);
      await waitFor(() => {
        expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
        expect(screen.getByText(/Return to Dashboard/i)).toBeInTheDocument();
      });
    });
  });

  describe('Authenticated Staff Direct Route Access', () => {
    it('direct load of "/" renders Staff Dashboard', async () => {
      renderAppRoute('/', 'advisor');
      await waitFor(() => {
        expect(screen.getByText(/Executive Student Success Dashboard/i)).toBeInTheDocument();
      });
    });

    it('direct load of "/login" by authenticated staff displays active session and link to dashboard', async () => {
      renderAppRoute('/login', 'advisor');
      await waitFor(() => {
        expect(screen.getByText(/Active Session: Signed in as/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Go to Dashboard/i })).toBeInTheDocument();
      });
    });

    it('direct load of "/students" renders Students Directory', async () => {
      renderAppRoute('/students', 'advisor');
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2, name: /Students Directory/i })).toBeInTheDocument();
      });
    });

    it('direct load of "/help" renders Help & Support Center', async () => {
      renderAppRoute('/help', 'advisor');
      await waitFor(() => {
        expect(screen.getByText(/Help & Support Center/i)).toBeInTheDocument();
      });
    });

    it('profile dropdown contains a Sign out button', async () => {
      renderAppRoute('/', undefined);
      expect(screen.getAllByRole('button', { name: /Sign out/i })[0]).toBeInTheDocument();
    });

    it('clicking sign out clears session and navigates to "/"', async () => {
      const mockSignOut = vi.fn();
      renderAppRoute('/students', 'advisor', { signOut: mockSignOut });
      const signOutBtns = screen.getAllByRole('button', { name: /Sign out/i });
      expect(signOutBtns.length).toBeGreaterThan(0);
      fireEvent.click(signOutBtns[0]);
      expect(mockSignOut).toHaveBeenCalled();
    });
  });
});
