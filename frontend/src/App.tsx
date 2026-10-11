import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import {
  DashboardPage,
  StudentsPage,
  StudentJourneyPage,
  InterventionsPage,
  AnalyticsPage,
  NotFoundPage,
} from './pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="journey" element={<StudentJourneyPage />} />
          <Route path="interventions" element={<InterventionsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
