import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  clearAuthSession,
  getStoredAuthSession,
  signInWithToken,
  signInWithEmailPassword,
  signOutAuth,
  fetchAuthMe,
  saveAuthSession,
  isStaffRole,
  isAdminRole,
  isDataOperatorRole,
  isFacultyRole,
  isAdvisorRole,
  isStudentRole,
  isViewerRole,
  isDemoLoginEnabled,
  hasPermission as checkPermission,
  type AuthSession,
} from '../lib/auth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  isStaff: boolean;
  isAdmin?: boolean;
  isDataOperator?: boolean;
  isFaculty?: boolean;
  isAdvisor?: boolean;
  isStudent?: boolean;
  isViewer?: boolean;
  hasPermission?: (permission: string) => boolean;
  signIn: (token: string, overrides?: Partial<AuthSession>) => AuthSession;
  signInWithCredentials: (email: string, password: string) => Promise<AuthSession>;
  signOut: () => Promise<void> | void;
  refreshSession: () => Promise<AuthSession | null> | AuthSession | null;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getStoredAuthSession());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authoritative profile refresher: calls /api/v1/auth/me to verify role & status
  const verifyAndSyncProfile = useCallback(async (currentSession: AuthSession): Promise<AuthSession | null> => {
    // If it's a demo session, reject immediately in production
    if (currentSession.isDemoSession) {
      if (!isDemoLoginEnabled()) {
        await signOutAuth();
        setSession(null);
        return null;
      }
      return currentSession;
    }

    try {
      const me = await fetchAuthMe(currentSession.token);
      const profile = me.user;

      if (profile.is_active === false) {
        await signOutAuth();
        setSession(null);
        return null;
      }

      const updatedSession: AuthSession = {
        ...currentSession,
        userId: profile.id,
        email: profile.email,
        role: profile.role,
        fullName: profile.full_name,
        isActive: profile.is_active,
        studentId: profile.student_id,
        permissions: me.permissions,
        isDemoSession: false,
      };

      saveAuthSession(updatedSession);
      setSession(updatedSession);
      return updatedSession;
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;

      // If token expired or was rejected with 401/403, attempt Supabase session refresh
      if (status === 401 || status === 403 || (err instanceof Error && err.message.includes('401'))) {
        if (isSupabaseConfigured()) {
          try {
            const { data, error } = await supabase.auth.refreshSession();
            if (!error && data.session?.access_token) {
              const refreshedMe = await fetchAuthMe(data.session.access_token);
              const p = refreshedMe.user;
              if (p.is_active === false) {
                await signOutAuth();
                setSession(null);
                return null;
              }
              const refreshedSession: AuthSession = {
                token: data.session.access_token,
                userId: p.id,
                email: p.email,
                role: p.role,
                fullName: p.full_name,
                isActive: p.is_active,
                studentId: p.student_id,
                permissions: refreshedMe.permissions,
                isDemoSession: false,
              };
              saveAuthSession(refreshedSession);
              setSession(refreshedSession);
              return refreshedSession;
            }
          } catch {
            // Token refresh failed
          }
        }
        await signOutAuth();
        setSession(null);
        return null;
      }

      // If backend verification fails or endpoint is unreachable in production, do not keep an unauthorized session
      if (!isDemoLoginEnabled()) {
        await signOutAuth();
        setSession(null);
        return null;
      }

      // Non-production offline mode: keep session
      return currentSession;
    }
  }, []);

  // Initialize session and subscribe to Supabase Auth state changes
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        // 1. If Supabase is configured, check live Supabase session first
        if (isSupabaseConfigured()) {
          try {
            const { data: { session: supaSession } } = await supabase.auth.getSession();
            if (supaSession?.access_token) {
              const me = await fetchAuthMe(supaSession.access_token);
              if (me.user.is_active === false) {
                await signOutAuth();
                if (isMounted) setSession(null);
                return;
              }
              const appSession: AuthSession = {
                token: supaSession.access_token,
                userId: me.user.id,
                email: me.user.email,
                role: me.user.role,
                fullName: me.user.full_name,
                isActive: me.user.is_active,
                studentId: me.user.student_id,
                permissions: me.permissions,
                isDemoSession: false,
              };
              saveAuthSession(appSession);
              if (isMounted) setSession(appSession);
              return;
            }
          } catch {
            // Live Supabase session restoration failed; fall through to stored session
          }
        }

        // 2. Fall back to stored session
        const stored = getStoredAuthSession();
        if (!stored) {
          return;
        }

        // In production, reject stored demo sessions
        if (stored.isDemoSession) {
          if (!isDemoLoginEnabled()) {
            clearAuthSession();
            if (isMounted) setSession(null);
            return;
          }
          if (isMounted) setSession(stored);
          return;
        }

        try {
          const synced = await verifyAndSyncProfile(stored);
          if (isMounted) {
            setSession(synced);
          }
        } catch {
          if (isMounted) {
            if (!isDemoLoginEnabled()) {
              clearAuthSession();
              setSession(null);
            } else {
              setSession(stored);
            }
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void initAuth();

    // Supabase auth subscription if live client is configured
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    if (isSupabaseConfigured()) {
      try {
        const { data } = supabase.auth.onAuthStateChange(async (event, newSupabaseSession) => {
          if (!isMounted) return;

          if (event === 'SIGNED_OUT' || !newSupabaseSession) {
            clearAuthSession();
            setSession(null);
            setIsLoading(false);
          } else if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') && newSupabaseSession.access_token) {
            try {
              const me = await fetchAuthMe(newSupabaseSession.access_token);
              if (me.user.is_active === false) {
                await signOutAuth();
                setSession(null);
                return;
              }
              const updatedSession: AuthSession = {
                token: newSupabaseSession.access_token,
                userId: me.user.id,
                email: me.user.email,
                role: me.user.role,
                fullName: me.user.full_name,
                isActive: me.user.is_active,
                studentId: me.user.student_id,
                permissions: me.permissions,
                isDemoSession: false,
              };
              saveAuthSession(updatedSession);
              setSession(updatedSession);
            } catch {
              if (!isDemoLoginEnabled()) {
                clearAuthSession();
                setSession(null);
              }
            } finally {
              if (isMounted) {
                setIsLoading(false);
              }
            }
          }
        });
        authListener = data;
      } catch {
        // Ignore Supabase auth listener errors
      }
    }

    // Listen for 401 unauthorized events from API client
    const handleUnauthorized = () => {
      clearAuthSession();
      setSession(null);
    };
    window.addEventListener('edunexus:auth-unauthorized', handleUnauthorized);

    return () => {
      isMounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
      window.removeEventListener('edunexus:auth-unauthorized', handleUnauthorized);
    };
  }, [verifyAndSyncProfile]);

  const signIn = useCallback((token: string, overrides?: Partial<AuthSession>) => {
    const nextSession = signInWithToken(token, overrides);
    setSession(nextSession);
    return nextSession;
  }, []);

  const signInWithCredentials = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const nextSession = await signInWithEmailPassword(email, password);
      setSession(nextSession);
      return nextSession;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await signOutAuth();
    setSession(null);
  }, []);

  const refreshSession = useCallback(async () => {
    const nextSession = getStoredAuthSession();
    if (!nextSession) {
      setSession(null);
      return null;
    }
    const synced = await verifyAndSyncProfile(nextSession);
    setSession(synced);
    return synced;
  }, [verifyAndSyncProfile]);

  const hasPermission = useCallback(
    (permission: string) => checkPermission(session?.role, permission),
    [session?.role]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isLoading,
      isStaff: isStaffRole(session?.role),
      isAdmin: isAdminRole(session?.role),
      isDataOperator: isDataOperatorRole(session?.role),
      isFaculty: isFacultyRole(session?.role),
      isAdvisor: isAdvisorRole(session?.role),
      isStudent: isStudentRole(session?.role),
      isViewer: isViewerRole(session?.role),
      hasPermission,
      signIn,
      signInWithCredentials,
      signOut,
      refreshSession,
    }),
    [
      session,
      isLoading,
      hasPermission,
      signIn,
      signInWithCredentials,
      signOut,
      refreshSession,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
