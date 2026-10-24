import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { clearAuthSession, getStoredAuthSession, signInWithToken, saveAuthSession, signOutAuth, type AuthSession, isStaffRole } from '../lib/auth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  signIn: (token: string, overrides?: Partial<AuthSession>) => AuthSession;
  signOut: () => void;
  refreshSession: () => AuthSession | null;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getStoredAuthSession());

  // Keep the API bearer token synchronized when Supabase refreshes a session.
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, authSession) => {
      if (authSession?.access_token) {
        const current = getStoredAuthSession();
        if (current && !current.isDemoSession && current.token !== authSession.access_token) {
          const refreshed = saveAuthSession({ ...current, token: authSession.access_token });
          setSession(refreshed);
        }
      } else if (event === 'SIGNED_OUT') {
        clearAuthSession();
        setSession(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    try {
      localStorage.setItem('edunexus_auth_session', JSON.stringify(session));
    } catch {
      // Continue in-memory if browser storage is unavailable.
    }
  }, [session]);

  const signIn = useCallback((token: string, overrides?: Partial<AuthSession>) => {
    const nextSession = signInWithToken(token, overrides);
    setSession(nextSession);
    return nextSession;
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    void signOutAuth();
  }, []);

  const refreshSession = useCallback(() => {
    const nextSession = getStoredAuthSession();
    setSession(nextSession);
    return nextSession;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isStaff: isStaffRole(session?.role),
      signIn,
      signOut,
      refreshSession,
    }),
    [session, signIn, signOut, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
