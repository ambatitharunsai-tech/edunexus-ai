// EduNexus AI — Supabase-backed authentication and local-development demo helpers.
import { DEMO_BEARER_TOKEN, getAuthToken, setAuthToken, clearApiCache } from './api';
import { isSupabaseConfigured, supabase } from './supabase';

export type AuthRole = string;

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  role: AuthRole;
  fullName?: string | null;
  studentId?: string | null;
  isActive?: boolean;
  isDemoSession: boolean;
}

export interface DemoAccount {
  label: string;
  role: string;
  email: string;
  token: string;
  description: string;
}

const STORAGE_KEY = 'edunexus_auth_session';
const API_URL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { label: 'Advisor', role: 'advisor', email: 'advisor@edunexus.ai', token: 'edunexus-demo-advisor-token', description: 'Student review and intervention planning' },
  { label: 'Admin', role: 'admin', email: 'admin@edunexus.ai', token: 'edunexus-demo-admin-token', description: 'Administrative analytics and governance' },
  { label: 'Faculty', role: 'faculty', email: 'faculty@edunexus.ai', token: 'edunexus-demo-faculty-token', description: 'Academic workflow review' },
  { label: 'Student', role: 'student', email: 'student@edunexus.ai', token: 'edunexus-demo-student-token', description: 'Personal student dashboard' },
];

export function isDemoLoginEnabled(): boolean {
  // Production must always use real Supabase sessions, even if a build flag is mis-set.
  if (import.meta.env.PROD || import.meta.env.MODE === 'production') return false;
  return import.meta.env.VITE_ENABLE_DEMO_LOGIN !== 'false';
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try { return JSON.parse(value) as T; } catch { return null; }
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const json = decodeURIComponent(atob(padded).split('').map((char) =>
      `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`
    ).join(''));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function isStaffRole(role?: string): boolean {
  return ['admin', 'administrator', 'advisor', 'counselor', 'faculty', 'staff', 'evaluator', 'evaluator_role', 'viewer', 'auditor', 'data_operator']
    .includes((role || '').toLowerCase());
}

export function normalizeAuthSession(token: string, overrides: Partial<AuthSession> = {}): AuthSession {
  const payload = decodeJwtPayload(token) || {};
  const appMetadata = typeof payload.app_metadata === 'object' && payload.app_metadata
    ? payload.app_metadata as Record<string, unknown>
    : {};
  const userMetadata = typeof payload.user_metadata === 'object' && payload.user_metadata
    ? payload.user_metadata as Record<string, unknown>
    : {};
  return {
    token,
    userId: String(overrides.userId ?? payload.sub ?? payload.user_id ?? 'unknown-user'),
    email: String(overrides.email ?? payload.email ?? 'unknown@edunexus.ai'),
    role: String(overrides.role ?? appMetadata.role ?? 'student'),
    fullName: overrides.fullName ?? (typeof userMetadata.full_name === 'string' ? userMetadata.full_name : null),
    studentId: overrides.studentId ?? (typeof appMetadata.student_id === 'string' ? appMetadata.student_id : null),
    isActive: overrides.isActive ?? true,
    isDemoSession: overrides.isDemoSession ?? (token.startsWith('edunexus-demo-') || token === DEMO_BEARER_TOKEN),
  };
}

export function getStoredAuthSession(): AuthSession | null {
  try {
    const stored = safeJsonParse<AuthSession>(localStorage.getItem(STORAGE_KEY));
    const token = stored?.token || getAuthToken();
    if (!token) return null;

    // Remove stale demo sessions left in browser storage by the older deployed UI.
    if (token.startsWith('edunexus-demo-') && !isDemoLoginEnabled()) {
      clearAuthSession();
      return null;
    }
    return normalizeAuthSession(token, stored || {});
  } catch {
    return null;
  }
}

export function saveAuthSession(session: AuthSession): AuthSession {
  const normalized = normalizeAuthSession(session.token, session);
  setAuthToken(normalized.token);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized)); } catch { /* storage may be unavailable */ }
  return normalized;
}

export function clearAuthSession(): void {
  setAuthToken('');
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage may be unavailable */ }
  clearApiCache();
}

export function signInWithToken(token: string, overrides?: Partial<AuthSession>): AuthSession {
  const cleanedToken = token.trim();
  if (!cleanedToken) throw new Error('A bearer token is required.');
  if (cleanedToken.startsWith('edunexus-demo-') && !isDemoLoginEnabled()) {
    throw new Error('Demo evaluation tokens are disabled in production. Sign in with your institutional email and password.');
  }
  return saveAuthSession(normalizeAuthSession(cleanedToken, overrides));
}

export async function fetchAuthMe(token: string): Promise<{ user: Record<string, unknown>; permissions?: string[] }> {
  const response = await fetch(`${API_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  const body = await response.json().catch(() => ({})) as {
    user?: Record<string, unknown>;
    detail?: string;
    error?: { message?: string };
    permissions?: string[];
  };
  if (!response.ok) {
    throw new Error(
      body.detail ||
      body.error?.message ||
      'The API could not verify this Supabase session. Check the deployment configuration and try again.'
    );
  }
  const user = body.user || body as Record<string, unknown>;
  return { user, permissions: body.permissions || [] };
}

export async function signInWithEmailPassword(email: string, password: string): Promise<AuthSession> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase sign-in is not configured on this site. Please contact the administrator.');
  }
  if (!email.trim() || !password) throw new Error('Enter your institutional email and password.');

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) throw new Error(error.message || 'Invalid email or password.');
  const token = data.session?.access_token;
  if (!token) throw new Error('Supabase sign-in did not return an access token.');

  try {
    const result = await fetchAuthMe(token);
    const profile = result.user;
    if (profile.is_active === false) throw new Error('This account has been deactivated. Contact your administrator.');

    return saveAuthSession({
      token,
      userId: String(profile.id || profile.user_id || data.user.id),
      email: String(profile.email || data.user.email || email.trim()),
      role: String(profile.role || 'student'),
      fullName: typeof profile.full_name === 'string' ? profile.full_name : (data.user.user_metadata?.full_name || null),
      studentId: typeof profile.student_id === 'string' ? profile.student_id : null,
      isActive: profile.is_active !== false,
      isDemoSession: false,
    });
  } catch (error) {
    await supabase.auth.signOut().catch(() => undefined);
    clearAuthSession();
    throw error instanceof Error
      ? error
      : new Error('Authentication could not be verified. Please try again.');
  }
}

export async function signOutAuth(): Promise<void> {
  try {
    if (isSupabaseConfigured()) await supabase.auth.signOut();
  } catch {
    // Always clear the local API token even if the auth endpoint is temporarily unavailable.
  } finally {
    clearAuthSession();
  }
}
