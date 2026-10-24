import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context';
import { AppShell } from './layouts/AppShell';
import { safeStorageGet, safeStorageSet } from './lib/utils';
import {
  AnalyticsPage,
  CsvHubPage,
  DashboardPage,
  HelpPage,
  InterventionsPage,
  NotFoundPage,
  StudentJourneyPage,
  StudentsPage,
} from './pages';

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
      {/* Obsolete login route redirects cleanly to direct dashboard */}
      <Route path="/login" element={<Navigate to="/" replace />} />

      {/* Main direct-access application layout */}
      <Route
        path="/"
        element={<AppShell theme={theme} onThemeChange={onThemeChange} />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentJourneyPage />} />
        <Route path="journey" element={<StudentJourneyPage />} />
        <Route path="journey/:id" element={<StudentJourneyPage />} />
        <Route path="interventions" element={<InterventionsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="csv-hub" element={<CsvHubPage />} />
        <Route path="help" element={<HelpPage />} />
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
