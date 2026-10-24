import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  UnauthorizedPage,
} from '../pages';
import * as authLib from '../lib/auth';

describe('EduNexus AI — Authentication & RBAC Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('RBAC Role Helper Functions', () => {
    it('verifies staff and non-staff roles correctly', () => {
      expect(authLib.isStaffRole('admin')).toBe(true);
      expect(authLib.isStaffRole('advisor')).toBe(true);
      expect(authLib.isStaffRole('faculty')).toBe(true);
      expect(authLib.isStaffRole('data_operator')).toBe(true);
      expect(authLib.isStaffRole('viewer')).toBe(true);
      expect(authLib.isStaffRole('student')).toBe(false);
    });

    it('verifies specific role checkers', () => {
      expect(authLib.isAdminRole('admin')).toBe(true);
      expect(authLib.isAdminRole('advisor')).toBe(false);

      expect(authLib.isDataOperatorRole('data_operator')).toBe(true);
      expect(authLib.isDataOperatorRole('admin')).toBe(true);
      expect(authLib.isDataOperatorRole('student')).toBe(false);

      expect(authLib.isStudentRole('student')).toBe(true);
      expect(authLib.isStudentRole('faculty')).toBe(false);

      expect(authLib.isViewerRole('viewer')).toBe(true);
      expect(authLib.isViewerRole('auditor')).toBe(true);
      expect(authLib.isViewerRole('advisor')).toBe(false);
    });

    it('returns authoritative permissions per role', () => {
      const adminPerms = authLib.getPermissionsForRole('admin');
      expect(adminPerms).toContain('users:write');
      expect(adminPerms).toContain('data:import');
      expect(adminPerms).toContain('analytics:read');

      const studentPerms = authLib.getPermissionsForRole('student');
      expect(studentPerms).toContain('student:profile:read');
      expect(studentPerms).not.toContain('users:write');
      expect(studentPerms).not.toContain('data:import');

      const operatorPerms = authLib.getPermissionsForRole('data_operator');
      expect(operatorPerms).toContain('data:import');
      expect(operatorPerms).toContain('data:validate');
      expect(operatorPerms).not.toContain('users:write');
    });

    it('evaluates hasPermission correctly', () => {
      expect(authLib.hasPermission('admin', 'users:write')).toBe(true);
      expect(authLib.hasPermission('data_operator', 'data:import')).toBe(true);
      expect(authLib.hasPermission('student', 'data:import')).toBe(false);
    });
  });

  describe('LoginPage Component', () => {
    it('renders login form and demo role buttons', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Sign in to the student intelligence workspace/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Institutional Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Sign In$/i })).toBeInTheDocument();

      // Check demo buttons
      expect(screen.getByText('Administrator')).toBeInTheDocument();
      expect(screen.getByText('Data Operator')).toBeInTheDocument();
      expect(screen.getByText('Auditor / Viewer')).toBeInTheDocument();
    });

    it('allows instant authentication via demo role button', async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      );

      const adminBtn = screen.getByText('Administrator').closest('button');
      expect(adminBtn).toBeDefined();
      fireEvent.click(adminBtn!);

      const stored = localStorage.getItem('edunexus_auth_session');
      expect(stored).toBeDefined();
      expect(JSON.parse(stored!).role).toBe('admin');
    });

    it('validates empty credentials on submission', async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      );

      const form = screen.getByLabelText(/Institutional Email/i).closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
  });

  describe('RegisterPage Component', () => {
    it('renders registration fields for students', () => {
      render(
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Create a Student Account/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Legal Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Confirm/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Create Student Account/i })).toBeInTheDocument();
    });

    it('validates password mismatch on registration', async () => {
      render(
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/Full Legal Name/i), {
        target: { value: 'Alex Morgan' },
      });
      fireEvent.change(screen.getByLabelText(/Email Address/i), {
        target: { value: 'alex@college.edu' },
      });
      fireEvent.change(screen.getByLabelText(/^Password/i), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText(/Confirm/i), {
        target: { value: 'mismatch456' },
      });

      const form = screen.getByLabelText(/Full Legal Name/i).closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
      });
    });
  });

  describe('ForgotPasswordPage Component', () => {
    it('renders password reset request form', () => {
      render(
        <MemoryRouter>
          <ForgotPasswordPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Reset Your Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Registered Email/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Send Recovery Link/i })).toBeInTheDocument();
    });

    it('displays notice when email is submitted', async () => {
      render(
        <MemoryRouter>
          <ForgotPasswordPage />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/Registered Email/i), {
        target: { value: 'user@college.edu' },
      });

      const form = screen.getByLabelText(/Registered Email/i).closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });
  });

  describe('ResetPasswordPage Component', () => {
    it('renders new password and confirmation inputs', () => {
      render(
        <MemoryRouter>
          <ResetPasswordPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Create New Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^New Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Update Password/i })).toBeInTheDocument();
    });

    it('validates password length under 6 characters', async () => {
      render(
        <MemoryRouter>
          <ResetPasswordPage />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/^New Password/i), {
        target: { value: '123' },
      });
      fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
        target: { value: '123' },
      });

      const form = screen.getByLabelText(/^New Password/i).closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe('UnauthorizedPage Component', () => {
    it('renders 403 access restricted message and session info', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <UnauthorizedPage />
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/403 — Access Restricted/i)).toBeInTheDocument();
      expect(screen.getByText(/Return to Dashboard/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign Out/i })).toBeInTheDocument();
    });
  });
});
