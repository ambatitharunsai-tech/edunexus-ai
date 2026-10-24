import { useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context';
import { AppShell } from './layouts/AppShell';
import { safeStorageGet, safeStorageSet } from './lib/utils';
import {
  AnalyticsPage,
  CsvHubPage,
  DashboardPage,
  HelpPage,
  InterventionsPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  StudentDashboardPage,
  StudentJourneyPage,
  StudentsPage,
} from './pages';

type AppTheme = 'light' | 'dark';

function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated
    ? <>{children}</>
    : <Navigate to="/login" replace state={{ from: location }} />;
}

function RequireStaff({ children }: { children: ReactNode }) {
  const { isAuthenticated, isStaff, session } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (!isStaff) {
    return <Navigate to={session?.role?.toLowerCase() === 'student' ? '/student' : '/'} replace />;
  }
  return <>{children}</>;
}

function RequireStudent({ children }: { children: ReactNode }) {
  const { isAuthenticated, session } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (session?.role?.toLowerCase() !== 'student') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function HomeRoute() {
  const { session } = useAuth();
  return session?.role?.toLowerCase() === 'student'
    ? <Navigate to="/student" replace />
    : <DashboardPage />;
}

export function AppRoutes({
  theme = 'dark',
  onThemeChange = () => {},
}: {
  theme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell theme={theme} onThemeChange={onThemeChange} />
          </RequireAuth>
        }
      >
        <Route index element={<HomeRoute />} />
        <Route path="students" element={<RequireStaff><StudentsPage /></RequireStaff>} />
        <Route path="students/:id" element={<RequireStaff><StudentJourneyPage /></RequireStaff>} />
        <Route path="journey" element={<RequireStaff><StudentJourneyPage /></RequireStaff>} />
        <Route path="journey/:id" element={<RequireStaff><StudentJourneyPage /></RequireStaff>} />
        <Route path="interventions" element={<RequireStaff><InterventionsPage /></RequireStaff>} />
        <Route path="analytics" element={<RequireStaff><AnalyticsPage /></RequireStaff>} />
        <Route path="csv-hub" element={<RequireStaff><CsvHubPage /></RequireStaff>} />
        <Route path="help" element={<HelpPage />} />
        <Route path="student" element={<RequireStudent><StudentDashboardPage /></RequireStudent>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    return safeStorageGet('edunexus_theme') === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const handleThemeChange = (nextTheme: AppTheme) => {
    setTheme(nextTheme);
    safeStorageSet('edunexus_theme', nextTheme);
  };

  return (
    <div className={`${theme === 'dark' ? 'dark-app' : 'light-app'} min-h-screen`}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes theme={theme} onThemeChange={handleThemeChange} />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
