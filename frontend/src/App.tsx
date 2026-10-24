import { useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context';
import { AppShell } from './layouts/AppShell';
import { Spinner } from './components/ui/Spinner';
import {
  AnalyticsPage,
  CsvHubPage,
  DashboardPage,
  ForgotPasswordPage,
  HelpPage,
  InterventionsPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  ResetPasswordPage,
  StudentJourneyPage,
  StudentDashboardPage,
  StudentsPage,
  UnauthorizedPage,
} from './pages';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] flex flex-col items-center justify-center p-4">
        <Spinner size="lg" label="Restoring session..." showLabel />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function StaffOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isStaff, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] flex flex-col items-center justify-center p-4">
        <Spinner size="lg" label="Verifying staff access..." showLabel />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isStaff) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function AdminOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] flex flex-col items-center justify-center p-4">
        <Spinner size="lg" label="Verifying administrator privileges..." showLabel />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

export function NonStudentJourneyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#101714] flex flex-col items-center justify-center p-4">
        <Spinner size="lg" label="Verifying journey access..." showLabel />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (session?.role?.toLowerCase() === 'student') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function RoleDashboard() {
  const { session } = useAuth();
  return session?.role?.toLowerCase() === 'student'
    ? <StudentDashboardPage />
    : <DashboardPage />;
}

type AppTheme = 'light' | 'dark';

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
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell theme={theme} onThemeChange={onThemeChange} />
          </ProtectedRoute>
        }
      >
        <Route index element={<RoleDashboard />} />
        <Route path="students" element={<StaffOnlyRoute><StudentsPage /></StaffOnlyRoute>} />
        <Route path="students/:id" element={<StaffOnlyRoute><StudentJourneyPage /></StaffOnlyRoute>} />
        <Route path="journey" element={<NonStudentJourneyRoute><StudentJourneyPage /></NonStudentJourneyRoute>} />
        <Route path="journey/:id" element={<NonStudentJourneyRoute><StudentJourneyPage /></NonStudentJourneyRoute>} />
        <Route path="interventions" element={<StaffOnlyRoute><InterventionsPage /></StaffOnlyRoute>} />
        <Route path="analytics" element={<StaffOnlyRoute><AnalyticsPage /></StaffOnlyRoute>} />
        <Route path="csv-hub" element={<StaffOnlyRoute><CsvHubPage /></StaffOnlyRoute>} />
        <Route path="help" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      return localStorage.getItem('edunexus_theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const handleThemeChange = (nextTheme: AppTheme) => {
    setTheme(nextTheme);
    try {
      localStorage.setItem('edunexus_theme', nextTheme);
    } catch {
      // Keep the current theme in memory when browser storage is unavailable.
    }
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
