import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import type {
  DashboardOverviewResponse,
  CreateInterventionPayload,
} from '../types';

// Built-in synthetic fallback matching backend dataset structure
const FALLBACK_DASHBOARD_DATA: DashboardOverviewResponse = {
  summary: {
    total_students: 36,
    active_students: 36,
    requiring_review_count: 9,
    review_percentage: 25.0,
    average_attendance: 86.4,
    attendance_status: 'Above 80% Institutional Min',
    active_interventions_count: 5,
    follow_ups_due_count: 3,
    cohort_avg_score: 76.8,
  },
  attendance_trend: [
    { period: 'Week 1', attendance_rate: 88.4, threshold: 80.0, total_sessions: 90, present_sessions: 80 },
    { period: 'Week 2', attendance_rate: 86.2, threshold: 80.0, total_sessions: 95, present_sessions: 82 },
    { period: 'Week 3', attendance_rate: 89.1, threshold: 80.0, total_sessions: 92, present_sessions: 82 },
    { period: 'Week 4', attendance_rate: 84.5, threshold: 80.0, total_sessions: 96, present_sessions: 81 },
    { period: 'Week 5', attendance_rate: 82.8, threshold: 80.0, total_sessions: 94, present_sessions: 78 },
    { period: 'Week 6', attendance_rate: 87.3, threshold: 80.0, total_sessions: 93, present_sessions: 81 },
    { period: 'Week 7', attendance_rate: 85.6, threshold: 80.0, total_sessions: 96, present_sessions: 82 },
    { period: 'Week 8', attendance_rate: 86.4, threshold: 80.0, total_sessions: 100, present_sessions: 86 },
  ],
  assessment_trend: [
    {
      period: 'Diagnostic',
      average_score: 72.4,
      subjects: { Mathematics: 68.5, Physics: 71.0, Chemistry: 74.2, 'Computer Science': 76.0 },
    },
    {
      period: 'Cycle Test 1',
      average_score: 74.8,
      subjects: { Mathematics: 70.2, Physics: 73.5, Chemistry: 76.1, 'Computer Science': 79.4 },
    },
    {
      period: 'Midterm Exam',
      average_score: 76.2,
      subjects: { Mathematics: 72.8, Physics: 75.4, Chemistry: 77.8, 'Computer Science': 81.0 },
    },
    {
      period: 'Cycle Test 2',
      average_score: 75.6,
      subjects: { Mathematics: 71.5, Physics: 74.2, Chemistry: 78.0, 'Computer Science': 80.5 },
    },
    {
      period: 'Term Eval',
      average_score: 76.8,
      subjects: { Mathematics: 73.6, Physics: 76.1, Chemistry: 79.2, 'Computer Science': 82.3 },
    },
  ],
  risk_distribution: [
    {
      tier: 'low',
      label: 'Low Risk (On Track)',
      count: 27,
      percentage: 75.0,
      color: '#0d9488',
      description: 'Strong attendance (>85%) and stable academic trajectory. Routine advisory checkpoints.',
    },
    {
      tier: 'medium',
      label: 'Moderate Risk (Monitor)',
      count: 5,
      percentage: 13.9,
      color: '#f59e0b',
      description: 'Early signals: attendance near 80% or mild score variance. Proactive check-in recommended.',
    },
    {
      tier: 'high',
      label: 'High Focus (Intervention)',
      count: 3,
      percentage: 8.3,
      color: '#f97316',
      description: 'Noticeable drop in attendance (<75%) or multiple low subject assessments. Requires structured plan.',
    },
    {
      tier: 'critical',
      label: 'Critical Priority (Urgent)',
      count: 1,
      percentage: 2.8,
      color: '#ef4444',
      description: 'Compounded risk: attendance <70%, failing evaluations, and inactive LMS engagement. Immediate multi-stakeholder intervention.',
    },
  ],
  recent_activity: [
    {
      id: 'act-001',
      student_id: 'STU-001',
      student_name: 'Aarav Sharma',
      activity_type: 'attendance',
      title: 'Attendance Recovery Milestone',
      description: 'Completed 10 consecutive attended days following peer mentorship check-in.',
      timestamp: 'Today, 09:30 AM',
      severity: 'success',
    },
    {
      id: 'act-002',
      student_id: 'STU-002',
      student_name: 'Diya Patel',
      activity_type: 'assessment',
      title: 'Mathematics Variance Alert',
      description: 'Midterm evaluation marked 52/100 (-18% variance vs grade average).',
      timestamp: 'Yesterday, 04:15 PM',
      severity: 'warning',
    },
    {
      id: 'act-003',
      student_id: 'STU-003',
      student_name: 'Rohan Mehta',
      activity_type: 'intervention',
      title: 'Academic Tutoring Plan Assigned',
      description: 'Assigned to Physics Faculty Tutoring; follow-up scheduled in 14 days.',
      timestamp: 'Yesterday, 11:00 AM',
      severity: 'info',
    },
    {
      id: 'act-004',
      student_id: 'STU-005',
      student_name: 'Vikram Reddy',
      activity_type: 'engagement',
      title: 'LMS Engagement Drop',
      description: 'Zero assignment submissions in 12 days; automated flag raised for counselor.',
      timestamp: '2 days ago',
      severity: 'critical',
    },
    {
      id: 'act-005',
      student_id: 'STU-007',
      student_name: 'Kabir Kapoor',
      activity_type: 'intervention',
      title: 'Counseling Review Completed',
      description: 'Advisor documented outcome: student showed 8% improvement post-intervention.',
      timestamp: '3 days ago',
      severity: 'success',
    },
  ],
  follow_up_students: [
    {
      id: '0411a66b-943d-46d5-895d-28026b071aab',
      student_id: 'STU-001',
      name: 'Aarav Sharma',
      grade: 'Grade 9',
      section: 'A',
      risk_level: 'critical',
      risk_score: 78.4,
      primary_risk_factor: 'Attendance at 66.7% (below 80% threshold)',
      attendance_rate: 66.7,
      avg_score: 58.2,
      last_interaction: '2 days ago',
      assigned_advisor: 'Student Success Team',
      status: 'Immediate Review',
    },
    {
      id: 'edd5c0e8-986a-4275-b213-362f1d2e2a5e',
      student_id: 'STU-002',
      name: 'Diya Patel',
      grade: 'Grade 10',
      section: 'B',
      risk_level: 'high',
      risk_score: 64.2,
      primary_risk_factor: 'Academic average at 54.0% across core courses',
      attendance_rate: 76.5,
      avg_score: 54.0,
      last_interaction: '3 days ago',
      assigned_advisor: 'Prof. S. Ramanujan',
      status: 'Active Support Plan',
    },
    {
      id: '06088341-1830-40a1-b648-869368a12a82',
      student_id: 'STU-003',
      name: 'Rohan Mehta',
      grade: 'Grade 11',
      section: 'C',
      risk_level: 'high',
      risk_score: 58.9,
      primary_risk_factor: 'Low digital activity (2 LMS events in 60d)',
      attendance_rate: 78.0,
      avg_score: 62.5,
      last_interaction: 'Yesterday',
      assigned_advisor: 'Student Success Team',
      status: 'Advisory Check-in',
    },
    {
      id: 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc',
      student_id: 'STU-004',
      name: 'Ananya Iyer',
      grade: 'Grade 12',
      section: 'A',
      risk_level: 'medium',
      risk_score: 42.1,
      primary_risk_factor: 'Declining attendance trend (81.0%)',
      attendance_rate: 81.0,
      avg_score: 74.3,
      last_interaction: '5 days ago',
      assigned_advisor: 'Student Success Team',
      status: 'Advisory Check-in',
    },
  ],
  intervention_summary: {
    total: 8,
    planned: 3,
    in_progress: 3,
    under_review: 1,
    completed: 1,
    by_type: {
      academic_tutoring: 3,
      attendance_counseling: 2,
      peer_mentoring: 2,
      wellness_check: 1,
    },
    by_priority: {
      urgent: 2,
      high: 3,
      medium: 3,
    },
    completion_rate: 12.5,
    upcoming_follow_ups: 3,
  },
  metadata: {
    is_demo: true,
    data_source: 'Synthetic Demo Dataset (36 Fictional Students Seeded)',
    dataset_size: 36,
    generated_at: new Date().toISOString(),
    disclaimer:
      'Ethical AI Notice: Risk scores are descriptive indicators for advisor review, not automated decisions. No student outcome causation is inferred without rigorous empirical controls.',
  },
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api<DashboardOverviewResponse>('/api/v1/dashboard/overview');
      setData(response);
      setIsOfflineFallback(false);
    } catch (err: unknown) {
      // Graceful fallback to verified synthetic snapshot
      console.warn('Backend API request unfulfilled, utilizing offline synthetic snapshot:', err);
      setData(FALLBACK_DASHBOARD_DATA);
      setIsOfflineFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createIntervention = useCallback(
    async (payload: CreateInterventionPayload): Promise<boolean> => {
      try {
        await api('/api/v1/interventions', {
          method: 'POST',
          body: payload,
        });
        // Refresh dashboard overview to reflect new intervention
        await fetchData();
        return true;
      } catch (err) {
        console.error('Failed to create intervention:', err);
        // If offline fallback mode, optimistically update state
        if (isOfflineFallback && data) {
          setData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              summary: {
                ...prev.summary,
                active_interventions_count: prev.summary.active_interventions_count + 1,
              },
              intervention_summary: {
                ...prev.intervention_summary,
                total: prev.intervention_summary.total + 1,
                planned: prev.intervention_summary.planned + 1,
              },
            };
          });
          return true;
        }
        return false;
      }
    },
    [fetchData, isOfflineFallback, data]
  );

  return {
    data,
    loading,
    error,
    isOfflineFallback,
    refetch: fetchData,
    createIntervention,
  };
}
