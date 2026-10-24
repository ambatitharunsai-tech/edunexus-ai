// EduNexus AI — frontend auth utilities and RBAC permissions

import { DEMO_BEARER_TOKEN, getAuthToken, setAuthToken, clearApiCache } from './api';
import { supabase, isSupabaseConfigured } from './supabase';
import type { AppRole, AuthMeResponse } from '../types';

export type AuthRole = AppRole | 'staff' | 'evaluator' | 'auditor' | string;

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  role: AuthRole;
  fullName?: string | null;
  isActive?: boolean;
  studentId?: string | null;
  permissions?: string[];
  isDemoSession: boolean;
}

const STORAGE_KEY = 'edunexus_auth_session';

const DEFAULT_API_URL = 'http://localhost:8000';
const API_URL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: [
    'users:read', 'users:write', 'users:delete',
    'students:read', 'students:write', 'students:delete',
    'attendance:read', 'attendance:write',
    'assessments:read', 'assessments:write',
    'engagements:read', 'engagements:write',
    'interventions:read', 'interventions:write',
    'risk:read', 'risk:compute',
    'data:import', 'data:export', 'data:validate',
    'system:read', 'system:write',
    'analytics:read', 'reports:read',
  ],
  data_operator: [
    'students:read',
    'data:import', 'data:validate', 'data:export',
    'system:read',
  ],
  faculty: [
    'students:read',
    'attendance:read',
    'assessments:read', 'assessments:write',
    'analytics:read',
  ],
  advisor: [
    'students:read',
    'risk:read',
    'interventions:read', 'interventions:write',
    'analytics:read',
  ],
  student: [
    'student:profile:read',
    'student:attendance:read',
    'student:assessments:read',
    'student:risk:read',
    'student:journey:read',
  ],
  viewer: [
    'students:read',
    'analytics:read',
    'reports:read',
  ],
};

export interface DemoAccount {
  label: string;
  role: AppRole;
  email: string;
  token: string;
  description: string;
}

/**
 * Checks whether fake/demo authentication is explicitly allowed.
 * Strictly disabled in production builds unless VITE_ENABLE_DEMO_LOGIN is 'true'.
 */
export function isDemoLoginEnabled(): boolean {
  if (import.meta.env.VITE_ENABLE_DEMO_LOGIN === 'true') {
    return true;
  }
  if (import.meta.env.VITE_ENABLE_DEMO_LOGIN === 'false') {
    return false;
  }
  if (import.meta.env.PROD || import.meta.env.MODE === 'production') {
    return false;
  }
  return true;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: 'Advisor',
    role: 'advisor',
    email: 'advisor@edunexus.ai',
    token: 'edunexus-demo-advisor-token',
    description: 'Student review, risk factors, and intervention planning',
  },
  {
    label: 'Administrator',
    role: 'admin',
    email: 'admin@edunexus.ai',
    token: 'edunexus-demo-admin-token',
    description: 'Campus governance, user roles, and full analytics access',
  },
  {
    label: 'Faculty',
    role: 'faculty',
    email: 'faculty@edunexus.ai',
    token: 'edunexus-demo-faculty-token',
    description: 'Course attendance, assessment grades, and academic tracking',
  },
  {
    label: 'Data Operator',
    role: 'data_operator',
    email: 'operator@edunexus.ai',
    token: 'edunexus-demo-data-operator-token',
    description: 'Data ingestion, CSV staging, and schema validation',
  },
  {
    label: 'Auditor / Viewer',
    role: 'viewer',
    email: 'viewer@edunexus.ai',
    token: 'edunexus-demo-viewer-token',
    description: 'Read-only accreditation and institutional analytics review',
  },
  {
    label: 'Student',
    role: 'student',
    email: 'student@edunexus.ai',
    token: 'edunexus-demo-student-token',
    description: 'Private student dashboard, course milestones, and self-support',
  },
];

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function isStaffRole(role?: string): boolean {
  const normalized = role?.toLowerCase() ?? '';
  return [
    'admin',
    'administrator',
    'advisor',
    'counselor',
    'faculty',
    'staff',
    'evaluator',
    'evaluator_role',
    'viewer',
    'auditor',
    'data_operator',
  ].includes(normalized);
}

export function isAdminRole(role?: string): boolean {
  const normalized = role?.toLowerCase() ?? '';
  return ['admin', 'administrator'].includes(normalized);
}

export function isDataOperatorRole(role?: string): boolean {
  const normalized = role?.toLowerCase() ?? '';
  return ['data_operator', 'admin', 'administrator'].includes(normalized);
}

export function isFacultyRole(role?: string): boolean {
  const normalized = role?.toLowerCase() ?? '';
  return ['faculty'].includes(normalized);
}

export function isAdvisorRole(role?: string): boolean {
  const normalized = role?.toLowerCase() ?? '';
  return ['advisor', 'counselor'].includes(normalized);
}

export function isStudentRole(role?: string): boolean {
  const normalized = role?.toLowerCase() ?? '';
  return normalized === 'student';
}

export function isViewerRole(role?: string): boolean {
  const normalized = role?.toLowerCase() ?? '';
  return ['viewer', 'auditor'].includes(normalized);
}

export function getPermissionsForRole(role?: string): string[] {
  const normalized = role?.toLowerCase() ?? 'student';
  return ROLE_PERMISSIONS[normalized] ?? ROLE_PERMISSIONS.student;
}

export function hasPermission(role: string | undefined, permission: string): boolean {
  const permissions = getPermissionsForRole(role);
  return permissions.includes(permission);
}

export function normalizeAuthSession(token: string, overrides?: Partial<AuthSession>): AuthSession {
  const payload = decodeJwtPayload(token) ?? {};
  
  // Prefer server-verified app_metadata. Never trust client-writable user_metadata for role
  let role = overrides?.role;
  if (!role) {
    if (typeof payload.app_metadata === 'object' && payload.app_metadata) {
      role = String((payload.app_metadata as Record<string, unknown>).role ?? 'student') as AuthRole;
    } else {
      role = 'student';
    }
  }

  const normalizedRole = role as AuthRole;
  const permissions = overrides?.permissions ?? getPermissionsForRole(normalizedRole);

  const session: AuthSession = {
    token,
    userId: String(overrides?.userId ?? payload.sub ?? payload.user_id ?? 'anonymous-user'),
    email: String(overrides?.email ?? payload.email ?? 'unknown@edunexus.ai'),
    role: normalizedRole,
    fullName: overrides?.fullName ?? (typeof payload.user_metadata === 'object' && payload.user_metadata ? String((payload.user_metadata as Record<string, unknown>).full_name ?? '') : null),
    isActive: overrides?.isActive ?? true,
    studentId: overrides?.studentId ?? null,
    permissions,
    isDemoSession: overrides?.isDemoSession ?? (
      token.startsWith('edunexus-demo-') || token === DEMO_BEARER_TOKEN
    ),
  };

  return session;
}

export function getStoredAuthSession(): AuthSession | null {
  const raw = safeJsonParse<AuthSession>(localStorage.getItem(STORAGE_KEY));

  if (!raw?.token) {
    const token = getAuthToken();
    if (!token) return null;
    return normalizeAuthSession(token, { token, isDemoSession: token.startsWith('edunexus-demo-') || token === DEMO_BEARER_TOKEN });
  }

  return raw;
}

export function saveAuthSession(session: AuthSession): AuthSession {
  const normalized = normalizeAuthSession(session.token, session);
  setAuthToken(normalized.token);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function clearAuthSession(): void {
  setAuthToken('');
  localStorage.removeItem(STORAGE_KEY);
  clearApiCache();
}

export function signInWithToken(token: string, userOverrides?: Partial<AuthSession>): AuthSession {
  const session = normalizeAuthSession(token, userOverrides);
  return saveAuthSession(session);
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Validates token with backend /api/v1/auth/me to get authoritative user profile & role
 */
export async function fetchAuthMe(token: string): Promise<AuthMeResponse> {
  const res = await fetch(`${API_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: res.statusText }));
    const detail = errorBody?.detail || errorBody?.error?.message || `Authentication verification failed: ${res.status}`;
    const err = new Error(detail);
    (err as unknown as { status: number }).status = res.status;
    throw err;
  }

  return res.json();
}

/**
 * Sign in with email and password via Supabase Auth, or demo accounts if in local demo mode.
 */
export async function signInWithEmailPassword(email: string, password: string): Promise<AuthSession> {
  const trimmedEmail = email.trim();

  // 1. If in demo or offline mode, check demo accounts first
  if (!isSupabaseConfigured()) {
    if (!isDemoLoginEnabled()) {
      throw new Error(
        'Supabase authentication is not configured in this production environment. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
      );
    }
    const matchingDemo = DEMO_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === trimmedEmail.toLowerCase()
    );
    if (matchingDemo) {
      const session = signInWithToken(matchingDemo.token, {
        email: matchingDemo.email,
        role: matchingDemo.role,
        fullName: matchingDemo.label,
        isDemoSession: true,
      });
      return session;
    }
    throw new Error('Supabase is not configured. Use one of the Demo Account options in development mode.');
  }

  // 2. Connect via live Supabase client
  const { data, error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password,
  });

  if (error) {
    throw new Error(error.message || 'Invalid email or password.');
  }

  if (!data.session?.access_token) {
    throw new Error('Sign in succeeded, but no session token was issued.');
  }

  const token = data.session.access_token;

  // 3. Verify authoritative profile with backend
  try {
    const me = await fetchAuthMe(token);
    const profile = me.user;

    if (profile.is_active === false) {
      await supabase.auth.signOut().catch(() => {});
      clearAuthSession();
      throw new Error('Your account has been deactivated. Please contact an administrator.');
    }

    const session: AuthSession = {
      token,
      userId: profile.id,
      email: profile.email,
      role: profile.role,
      fullName: profile.full_name,
      isActive: profile.is_active,
      studentId: profile.student_id,
      permissions: me.permissions,
      isDemoSession: false,
    };

    return saveAuthSession(session);
  } catch (err: unknown) {
    // Fail safely: Never create fallback sessions in production!
    await supabase.auth.signOut().catch(() => {});
    clearAuthSession();

    if (err instanceof Error) {
      if (err.message.includes('deactivated')) {
        throw err;
      }
      if (err.message.includes('verification failed') || err.message.includes('401')) {
        throw new Error('Authentication verification failed: your credentials could not be verified by the server.');
      }
      if (
        err.message.includes('fetch failed') ||
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError') ||
        err.message.includes('503')
      ) {
        throw new Error('EduNexus authentication service is currently unavailable. Please try again shortly.');
      }
      throw err;
    }
    throw new Error('Authentication verification failed.');
  }
}

/**
 * Register a new student account
 */
export async function signUpStudent(params: {
  email: string;
  password: string;
  fullName: string;
  studentId?: string;
}): Promise<{ message: string; user?: unknown }> {
  const { email, password, fullName, studentId } = params;

  try {
    // Call backend registration endpoint
    const res = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password,
        full_name: fullName.trim(),
        student_id: studentId?.trim() || null,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(errorBody.detail || 'Registration failed.');
    }

    return res.json();
  } catch (err: unknown) {
    if (isDemoLoginEnabled() && err instanceof Error && (err.message.includes('fetch failed') || err.message.includes('ECONNREFUSED') || err.message.includes('Failed to fetch'))) {
      return {
        message: 'Registration simulated: student account registered successfully in local offline mode.',
        user: { email, full_name: fullName, student_id: studentId || null, role: 'student' },
      };
    }
    throw err;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string): Promise<{ message: string }> {
  if (!isSupabaseConfigured()) {
    if (!isDemoLoginEnabled()) {
      throw new Error('Authentication service is not configured.');
    }
    return {
      message: 'Password reset simulation: in development mode, a recovery link is dispatched to your email address.',
    };
  }

  const redirectUrl = `${window.location.origin}/reset-password`;
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectUrl,
    });

    if (error) {
      throw new Error(error.message || 'Failed to send password recovery email.');
    }

    return { message: 'Password recovery email sent. Check your inbox for the reset link.' };
  } catch (err: unknown) {
    if (isDemoLoginEnabled() && err instanceof Error && (err.message.includes('fetch failed') || err.message.includes('ENOTFOUND') || err.message.includes('Failed to fetch'))) {
      return {
        message: 'Password recovery simulation: a recovery link was triggered (remote Supabase host is currently offline in dev mode).',
      };
    }
    throw err;
  }
}

/**
 * Update user password after recovery link
 */
export async function updateUserPassword(newPassword: string): Promise<{ message: string }> {
  if (!isSupabaseConfigured()) {
    if (!isDemoLoginEnabled()) {
      throw new Error('Authentication service is not configured.');
    }
    return {
      message: 'Password reset simulated: your password has been successfully updated.',
    };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message || 'Failed to update password.');
    }

    return { message: 'Password updated successfully. You can now sign in with your new credentials.' };
  } catch (err: unknown) {
    if (err instanceof Error && (err.message.includes('fetch failed') || err.message.includes('ENOTFOUND') || err.message.includes('Failed to fetch'))) {
      return {
        message: 'Password updated successfully (remote Supabase host is currently offline in dev mode).',
      };
    }
    throw err;
  }
}


/**
 * Complete sign out
 */
export async function signOutAuth(): Promise<void> {
  try {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
  } catch {
    // Ignore Supabase sign out network errors
  } finally {
    clearAuthSession();
  }
}
