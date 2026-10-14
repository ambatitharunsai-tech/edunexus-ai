import { type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context';
import { AppShell } from './layouts/AppShell';
import {
  AnalyticsPage,
  CsvHubPage,
  DashboardPage,
  InterventionsPage,
  LoginPage,
  NotFoundPage,
  StudentJourneyPage,
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

export function App() {
  return (
    <div className="dark-app min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="students" element={<StaffOnlyRoute><StudentsPage /></StaffOnlyRoute>} />
            <Route path="students/:id" element={<StaffOnlyRoute><StudentJourneyPage /></StaffOnlyRoute>} />
            <Route path="journey" element={<ProtectedRoute><StudentJourneyPage /></ProtectedRoute>} />
            <Route path="journey/:id" element={<ProtectedRoute><StudentJourneyPage /></ProtectedRoute>} />
            <Route path="interventions" element={<StaffOnlyRoute><InterventionsPage /></StaffOnlyRoute>} />
            <Route path="analytics" element={<StaffOnlyRoute><AnalyticsPage /></StaffOnlyRoute>} />
            <Route path="csv-hub" element={<StaffOnlyRoute><CsvHubPage /></StaffOnlyRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
