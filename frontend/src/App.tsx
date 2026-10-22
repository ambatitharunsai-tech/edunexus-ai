import { useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context';
import { AppShell } from './layouts/AppShell';
import {
  AnalyticsPage,
  CsvHubPage,
  DashboardPage,
  HelpPage,
  InterventionsPage,
  LoginPage,
  NotFoundPage,
  StudentJourneyPage,
  StudentDashboardPage,
  StudentsPage,
} from './pages';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function StaffOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isStaff } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isStaff) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function NonStudentJourneyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, session } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (session?.role?.toLowerCase() === 'student') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function RoleDashboard() {
  const { session } = useAuth();
  return session?.role?.toLowerCase() === 'student'
    ? <StudentDashboardPage />
    : <DashboardPage />;
}

type AppTheme = 'light' | 'dark';

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
          <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell theme={theme} onThemeChange={handleThemeChange} />
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
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
