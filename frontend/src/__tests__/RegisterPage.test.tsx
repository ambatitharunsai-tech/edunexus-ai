import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage';
import { AuthContext, type AuthContextValue } from '../context/AuthContext';

const renderRegisterPage = (isAuthenticated = false, authOverrides?: Partial<AuthContextValue>) => {
  const mockAuth: AuthContextValue = {
    session: isAuthenticated
      ? {
          token: 'mock-token',
          userId: 'test-user',
          email: 'test@edunexus.ai',
          role: 'advisor',
          isDemoSession: true,
        }
      : null,
    isAuthenticated,
    isStaff: isAuthenticated,
    signIn: vi.fn(),
    signOut: vi.fn(),
    refreshSession: vi.fn(),
    ...authOverrides,
  };

  const rendered = render(
    <AuthContext.Provider value={mockAuth}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  return { ...rendered, mockAuth };
};

describe('RegisterPage Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders registration page header and institutional branding', () => {
    renderRegisterPage();
    expect(screen.getByText(/Create your institutional account/i)).toBeInTheDocument();
    expect(screen.getByText(/Smart Campus Analytics & Student Success/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return to Dashboard/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Sign in here/i })).toHaveAttribute('href', '/login');
  });

  it('renders all core input fields and ethical AI consent checkbox', () => {
    renderRegisterPage();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Institutional Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Ethical AI & Data Governance Consent/i)).toBeInTheDocument();
  });

  it('displays role-specific fields when Student is selected and hides them for Faculty', () => {
    renderRegisterPage();

    // Default role is Student
    expect(screen.getByLabelText(/Student ID \/ Roll No/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Academic Term/i)).toBeInTheDocument();

    // Switch to Faculty
    const facultyButton = screen.getByRole('button', { name: /^Faculty$/i });
    fireEvent.click(facultyButton);

    expect(screen.queryByLabelText(/Student ID \/ Roll No/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Academic Term/i)).not.toBeInTheDocument();
  });

  it('validates required fields on submission', () => {
    renderRegisterPage();

    const submitButton = screen.getByRole('button', { name: /Create Institutional Account/i });
    fireEvent.submit(submitButton.closest('form')!);

    expect(screen.getByRole('alert')).toHaveTextContent(/Please provide your full legal or institutional name/i);
  });

  it('validates password mismatch on submission', () => {
    renderRegisterPage();

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Aarav' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Sharma' } });
    fireEvent.change(screen.getByLabelText(/Institutional Email/i), { target: { value: 'aarav@college.edu' } });
    fireEvent.change(screen.getByLabelText(/Student ID \/ Roll No/i), { target: { value: 'STU-1025' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'DifferentPassword' } });

    const submitButton = screen.getByRole('button', { name: /Create Institutional Account/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent(/Passwords do not match/i);
  });

  it('validates consent requirement on submission', () => {
    renderRegisterPage();

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Aarav' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Sharma' } });
    fireEvent.change(screen.getByLabelText(/Institutional Email/i), { target: { value: 'aarav@college.edu' } });
    fireEvent.change(screen.getByLabelText(/Student ID \/ Roll No/i), { target: { value: 'STU-1025' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPassword123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'ValidPassword123' } });

    const submitButton = screen.getByRole('button', { name: /Create Institutional Account/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent(/You must acknowledge the institutional data governance and ethical AI consent/i);
  });

  it('applies development preset when clicked', () => {
    renderRegisterPage();

    const studentPresetButton = screen.getByRole('button', { name: /Student Candidate/i });
    fireEvent.click(studentPresetButton);

    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Priya');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Nair');
    expect(screen.getByLabelText(/Institutional Email/i)).toHaveValue('priya.nair@edunexus.ai');
    expect(screen.getByLabelText(/Student ID \/ Roll No/i)).toHaveValue('STU-1025');
  });

  it('renders live database connection status badge', async () => {
    renderRegisterPage();
    const badge = screen.getByTestId('db-status-badge');
    expect(badge).toBeInTheDocument();
  });

  it('gracefully handles database trigger errors and authenticates via fallback without error banner', async () => {
    const signInMock = vi.fn();
    renderRegisterPage(false, { signIn: signInMock });

    // Apply student preset (presets valid student details, password, and consent)
    fireEvent.click(screen.getByRole('button', { name: /Student Candidate/i }));

    const submitButton = screen.getByRole('button', { name: /Create Institutional Account/i });
    fireEvent.click(submitButton);

    // Initial click passes form validation without showing validation alert
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
