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
    // If it's a demo session, no need to call Supabase auth sync unless desired
    if (currentSession.isDemoSession) {
      return currentSession;
    }

    try {
      const me = await fetchAuthMe(currentSession.token);
      if (me.is_active === false) {
        await signOutAuth();
        setSession(null);
        return null;
      }

      const updatedSession: AuthSession = {
        ...currentSession,
        userId: me.user.id,
        email: me.user.email,
        role: me.role,
        fullName: me.user.full_name,
        isActive: me.is_active,
        studentId: me.student_id,
        permissions: me.permissions,
      };

      saveAuthSession(updatedSession);
      setSession(updatedSession);
      return updatedSession;
    } catch {
      // Backend temporarily unreachable; keep existing session
      return currentSession;
    }
  }, []);

  // Initialize session and subscribe to Supabase Auth state changes
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      const stored = getStoredAuthSession();
      if (!stored) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const synced = await verifyAndSyncProfile(stored);
        if (isMounted) {
          setSession(synced);
        }
      } catch {
        if (isMounted) {
          setSession(stored);
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
        const { data } = supabase.auth.onAuthStateChange((event, newSupabaseSession) => {
          if (!isMounted) return;

          if (event === 'SIGNED_OUT' || !newSupabaseSession) {
            clearAuthSession();
            setSession(null);
            setIsLoading(false);
          } else if (event === 'TOKEN_REFRESHED' && newSupabaseSession.access_token) {
            const updated = signInWithToken(newSupabaseSession.access_token, {
              userId: newSupabaseSession.user.id,
              email: newSupabaseSession.user.email,
              isDemoSession: false,
            });
            setSession(updated);
            void verifyAndSyncProfile(updated);
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
