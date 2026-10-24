import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { clearAuthSession, getStoredAuthSession, signInWithToken, type AuthSession, isStaffRole } from '../lib/auth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { safeStorageSet } from '../lib/utils';

export interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  signIn: (token: string, overrides?: Partial<AuthSession>) => AuthSession;
  signOut: () => Promise<void>;
  refreshSession: () => AuthSession | null;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => {
    return getStoredAuthSession();
  });

  useEffect(() => {
    if (!session) return;
    safeStorageSet('edunexus_auth_session', JSON.stringify(session));
  }, [session]);

  // Keep the API bearer token synchronized with Supabase token refresh and sign-out events.
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session?.access_token) {
        const nextSession = signInWithToken(data.session.access_token, {
          userId: data.session.user?.id,
          email: data.session.user?.email,
        });
        setSession(nextSession);
      } else {
        // In hosted mode, only a real Supabase session can restore authentication.
        clearAuthSession();
        setSession(null);
      }
    }).catch(() => {
      // If the provider is unreachable, remove stale browser-only auth state.
      if (!active) return;
      clearAuthSession();
      setSession(null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, authSession) => {
      if (!active) return;
      if (event === 'SIGNED_OUT' || !authSession) {
        clearAuthSession();
        setSession(null);
        return;
      }
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        setSession(signInWithToken(authSession.access_token));
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback((token: string, overrides?: Partial<AuthSession>) => {
    const nextSession = signInWithToken(token, overrides);
    setSession(nextSession);
    return nextSession;
  }, []);

  const signOut = useCallback(async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch {
      // Always clear this app's local auth state even when the provider is unreachable.
    } finally {
      clearAuthSession();
      setSession(null);
    }
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
