import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { clearAuthSession, getStoredAuthSession, signInWithToken, type AuthSession, isStaffRole } from '../lib/auth';

interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  signIn: (token: string, overrides?: Partial<AuthSession>) => AuthSession;
  signOut: () => void;
  refreshSession: () => AuthSession | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getStoredAuthSession());

  useEffect(() => {
    if (!session) return;
    localStorage.setItem('edunexus_auth_session', JSON.stringify(session));
  }, [session]);

  const signIn = useCallback((token: string, overrides?: Partial<AuthSession>) => {
    const nextSession = signInWithToken(token, overrides);
    setSession(nextSession);
    return nextSession;
  }, []);

  const signOut = useCallback(() => {
    clearAuthSession();
    setSession(null);
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

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
