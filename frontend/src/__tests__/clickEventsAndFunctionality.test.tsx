import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, type AuthContextValue } from '../context/AuthContext';
import { InterventionsPage } from '../pages/InterventionsPage';
import { CsvHubPage } from '../pages/CsvHubPage';
import { StudentTable } from '../features/students/StudentTable';
import type { StudentListItem } from '../types';

vi.mock('../lib/api', () => ({
  api: vi.fn().mockImplementation((endpoint: string) => {
    if (endpoint.includes('/interventions')) {
      return Promise.resolve([
        {
          id: 'intv-001',
          student_id: 'stu-uuid-001',
          student_name: 'Test Student',
          student_code: 'STU-001',
          title: 'Math Tutoring',
          intervention_type: 'academic_tutoring',
          priority: 'high',
          status: 'planned',
          description: 'Weekly math tutoring',
          assigned_staff_name: 'Advisor Smith',
          start_date: '2026-10-01',
          follow_up_date: '2026-11-01',
          is_overdue: false,
          outcomes: [],
        },
      ]);
    }
    if (endpoint.includes('/students')) {
      return Promise.resolve({
        students: [],
        total: 0,
        page: 1,
        page_size: 10,
        departments: ['Computer Science'],
        semesters: ['Semester 1'],
      });
    }
    return Promise.resolve({});
  }),
  apiUrl: (path: string) => `http://localhost:8000${path}`,
  getCachedApiData: () => null,
  clearApiCache: vi.fn(),
  getAuthToken: () => '',
  setAuthToken: vi.fn(),
}));

const mockVisitorAuth: AuthContextValue = {
  session: null,
  isAuthenticated: false,
  isStaff: false,
  signIn: vi.fn(),
  signOut: vi.fn(),
  refreshSession: vi.fn(),
};

const mockStudentAuth: AuthContextValue = {
  session: {
    token: 'student-token',
    userId: 'stu-1',
    email: 'student@example.com',
    role: 'student',
    isDemoSession: true,
  },
  isAuthenticated: true,
  isStaff: false,
  signIn: vi.fn(),
  signOut: vi.fn(),
  refreshSession: vi.fn(),
};

describe('Clickable Events & Functional Access Verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('InterventionsPage renders "New Intervention Plan" button and active plans for public visitors', async () => {
    render(
      <AuthContext.Provider value={mockVisitorAuth}>
        <MemoryRouter>
          <InterventionsPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Verify "New Intervention Plan" button is present and clickable for visitors
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /New Intervention Plan/i })).toBeInTheDocument();
    });

    // Verify student read-only lockout banner is NOT shown for visitors
    expect(screen.queryByText(/Read-Only Support Portal/i)).not.toBeInTheDocument();

    // Verify intervention card is loaded
    expect(screen.getByText('Test Student')).toBeInTheDocument();
    expect(screen.getByText(/Math Tutoring/i)).toBeInTheDocument();
  });

  it('InterventionsPage applies read-only mode strictly for authenticated students', async () => {
    render(
      <AuthContext.Provider value={mockStudentAuth}>
        <MemoryRouter>
          <InterventionsPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // "New Intervention Plan" button should be hidden for student role
    expect(screen.queryByRole('button', { name: /New Intervention Plan/i })).not.toBeInTheDocument();

    // Student read-only lockout banner should be present for actual students
    expect(screen.getByText(/Student Read-Only Mode/i)).toBeInTheDocument();
  });

  it('CsvHubPage enables file upload and demo reset for public visitors', async () => {
    render(
      <AuthContext.Provider value={mockVisitorAuth}>
        <MemoryRouter>
          <CsvHubPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Demo reset button should be available for visitors
    expect(screen.getByRole('button', { name: /Reset Synthetic Demo Data/i })).toBeInTheDocument();

    // File input should not be disabled
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).not.toBeNull();
    expect(fileInput.disabled).toBe(false);

    // Student read-only banner should NOT be present for visitors
    expect(screen.queryByText(/Student Read-Only Mode/i)).not.toBeInTheDocument();
  });

  it('StudentTable renders accessible Journey Link without nested button tag', () => {
    const mockStudent: StudentListItem = {
      id: 'stu-uuid-123',
      student_id: 'STU-001',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      current_grade: 'Grade 10',
      academic_term: 'Semester 1',
      section: 'A',
      department: 'Computer Science',
      attendance_rate: 94,
      average_score: 88,
      risk_score: 25,
      risk_tier: 'low',
      academic_risk_tier: 'low',
      placement_risk_tier: 'low',
      success_score: 85,
      success_tier: 'thriving',
      review_status: 'On Track',
      status: 'active',
    };

    render(
      <MemoryRouter>
        <StudentTable
          students={[mockStudent]}
        />
      </MemoryRouter>
    );

    const journeyLink = screen.getByTitle('View Student Journey Dossier');
    expect(journeyLink).toBeInTheDocument();
    expect(journeyLink.tagName).toBe('A');
    expect(journeyLink.getAttribute('href')).toBe('/journey?student_id=stu-uuid-123');

    // Crucial check: verify there is NO <button> nested inside the <a> tag
    expect(journeyLink.querySelector('button')).toBeNull();
  });

  it('StudentTable supports row checkbox toggling and select all header', () => {
    const mockStudent: StudentListItem = {
      id: 'stu-uuid-123',
      student_id: 'STU-001',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      current_grade: 'Grade 10',
      academic_term: 'Semester 1',
      section: 'A',
      department: 'Computer Science',
      attendance_rate: 94,
      average_score: 88,
      risk_score: 25,
      risk_tier: 'low',
      academic_risk_tier: 'low',
      placement_risk_tier: 'low',
      success_score: 85,
      success_tier: 'thriving',
      review_status: 'On Track',
      status: 'active',
    };

    const onToggleSelect = vi.fn();
    const onToggleSelectAll = vi.fn();

    render(
      <MemoryRouter>
        <StudentTable
          students={[mockStudent]}
          selectedIds={['stu-uuid-123']}
          onToggleSelect={onToggleSelect}
          onToggleSelectAll={onToggleSelectAll}
          isAllSelected={true}
        />
      </MemoryRouter>
    );

    const selectAllCheckbox = screen.getByLabelText('Select all students on current page');
    expect(selectAllCheckbox).toBeInTheDocument();
    expect(selectAllCheckbox).toBeChecked();

    const rowCheckbox = screen.getByLabelText('Select John Doe');
    expect(rowCheckbox).toBeInTheDocument();
    expect(rowCheckbox).toBeChecked();
  });

  it('CsvHubPage provides "Load Sample Test Data" button for 1-click test ingestion', async () => {
    render(
      <AuthContext.Provider value={mockVisitorAuth}>
        <MemoryRouter>
          <CsvHubPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const sampleButton = await screen.findByRole('button', { name: /Load Sample Test Data/i });
    expect(sampleButton).toBeInTheDocument();
  });
});
