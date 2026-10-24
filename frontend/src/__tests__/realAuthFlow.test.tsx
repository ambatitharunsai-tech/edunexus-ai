import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as authLib from '../lib/auth';
import { supabase } from '../lib/supabase';
import type { AuthMeResponse } from '../types';

describe('EduNexus AI — Real User Authentication End-to-End Suite', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('Nested /auth/me Response Contract Verification', () => {
    it('correctly parses authoritative nested { user, permissions } response', async () => {
      const mockResponse: AuthMeResponse = {
        user: {
          id: 'user-uuid-1234',
          email: 'student.aarav@college.edu',
          role: 'student',
          full_name: 'Aarav Sharma',
          is_active: true,
          student_id: 'STU-001',
        },
        permissions: ['student_dashboard:view', 'student_record:read_own'],
      };

      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      const res = await authLib.fetchAuthMe('valid-bearer-token');

      // Assert nested structure is correctly read
      expect(res.user).toBeDefined();
      expect(res.user.id).toBe('user-uuid-1234');
      expect(res.user.email).toBe('student.aarav@college.edu');
      expect(res.user.role).toBe('student');
      expect(res.user.full_name).toBe('Aarav Sharma');
      expect(res.user.is_active).toBe(true);
      expect(res.user.student_id).toBe('STU-001');
      expect(res.permissions).toEqual(['student_dashboard:view', 'student_record:read_own']);
    });

    it('preserves faculty, administrator, viewer, and advisor roles from nested response', async () => {
      const roles: Array<{ role: authLib.AuthRole; perms: string[] }> = [
        { role: 'admin', perms: ['admin:users:read', 'admin:users:write', 'csv:import'] },
        { role: 'faculty', perms: ['attendance:read', 'assessments:write'] },
        { role: 'advisor', perms: ['interventions:write', 'risk:read'] },
        { role: 'viewer', perms: ['analytics:view', 'students:read_assigned'] },
      ];

      for (const item of roles) {
        const mockMe: AuthMeResponse = {
          user: {
            id: `user-${item.role}`,
            email: `${item.role}@edunexus.ai`,
            role: item.role as any,
            full_name: `${item.role.toUpperCase()} User`,
            is_active: true,
            student_id: null,
          },
          permissions: item.perms,
        };

        globalThis.fetch = vi.fn().mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockMe,
        });

        const res = await authLib.fetchAuthMe(`token-${item.role}`);
        expect(res.user.role).toBe(item.role);
        expect(res.user.is_active).toBe(true);
        expect(res.permissions).toEqual(item.perms);
      }
    });
  });

  describe('Real Supabase Authentication & Session Establishment', () => {
    it('successfully signs in with credentials, verifies with backend, and establishes session', async () => {
      const mockToken = 'supabase.access.token.jwt';
      const mockSupabaseSession = {
        access_token: mockToken,
        user: { id: 'auth-user-999', email: 'verified.student@college.edu' },
      };

      vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValueOnce({
        data: { session: mockSupabaseSession as any, user: mockSupabaseSession.user as any },
        error: null,
      });

      const backendMe: AuthMeResponse = {
        user: {
          id: 'auth-user-999',
          email: 'verified.student@college.edu',
          role: 'student',
          full_name: 'Verified Student',
          is_active: true,
          student_id: 'STU-042',
        },
        permissions: ['student_dashboard:view'],
      };

      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => backendMe,
      });

      const session = await authLib.signInWithEmailPassword('verified.student@college.edu', 'CorrectPass123!');

      expect(session).toBeDefined();
      expect(session.userId).toBe('auth-user-999');
      expect(session.email).toBe('verified.student@college.edu');
      expect(session.role).toBe('student');
      expect(session.studentId).toBe('STU-042');
      expect(session.fullName).toBe('Verified Student');
      expect(session.isActive).toBe(true);
      expect(session.isDemoSession).toBe(false);

      // Verify stored in localStorage
      const stored = authLib.getStoredAuthSession();
      expect(stored?.userId).toBe('auth-user-999');
      expect(stored?.studentId).toBe('STU-042');
      expect(stored?.role).toBe('student');
    });

    it('rejects invalid credentials with informative error', async () => {
      vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValueOnce({
        data: { session: null, user: null },
        error: { message: 'Invalid login credentials', name: 'AuthApiError', status: 400 } as any,
      });

      await expect(
        authLib.signInWithEmailPassword('student@college.edu', 'WrongPassword!')
      ).rejects.toThrow(/Invalid login credentials/i);

      expect(authLib.getStoredAuthSession()).toBeNull();
    });

    it('rejects deactivated accounts and cleans up session', async () => {
      const mockToken = 'supabase.deactivated.token';
      vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValueOnce({
        data: {
          session: { access_token: mockToken, user: { id: 'deactivated-user' } } as any,
          user: { id: 'deactivated-user' } as any,
        },
        error: null,
      });

      const signOutSpy = vi.spyOn(supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });

      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          user: {
            id: 'deactivated-user',
            email: 'deactivated@college.edu',
            role: 'student',
            full_name: 'Deactivated Student',
            is_active: false,
            student_id: null,
          },
          permissions: [],
        }),
      });

      await expect(
        authLib.signInWithEmailPassword('deactivated@college.edu', 'Password123!')
      ).rejects.toThrow(/deactivated/i);

      expect(signOutSpy).toHaveBeenCalled();
      expect(authLib.getStoredAuthSession()).toBeNull();
    });

    it('fails safely when backend authentication endpoint is unavailable without fallback session', async () => {
      const mockToken = 'supabase.valid.token';
      vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValueOnce({
        data: {
          session: { access_token: mockToken, user: { id: 'u1' } } as any,
          user: { id: 'u1' } as any,
        },
        error: null,
      });

      const signOutSpy = vi.spyOn(supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });

      // Backend fails with 503 Service Unavailable
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        json: async () => ({ detail: 'Service Unavailable' }),
      });

      await expect(
        authLib.signInWithEmailPassword('student@college.edu', 'Password123!')
      ).rejects.toThrow(/unavailable/i);

      expect(signOutSpy).toHaveBeenCalled();
      expect(authLib.getStoredAuthSession()).toBeNull();
    });
  });

  describe('Production Demo Login & Fake Token Prevention', () => {
    it('disables demo sessions when demo login is disabled', () => {
      // Mock VITE_ENABLE_DEMO_LOGIN to 'false'
      vi.stubEnv('VITE_ENABLE_DEMO_LOGIN', 'false');
      expect(authLib.isDemoLoginEnabled()).toBe(false);
      vi.unstubAllEnvs();
    });

    it('signOutAuth cleanly clears Supabase and localStorage', async () => {
      const signOutSpy = vi.spyOn(supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });
      localStorage.setItem('edunexus_auth_session', JSON.stringify({ token: 'test-token', userId: '1' }));

      await authLib.signOutAuth();

      expect(signOutSpy).toHaveBeenCalled();
      expect(authLib.getStoredAuthSession()).toBeNull();
    });
  });
});
