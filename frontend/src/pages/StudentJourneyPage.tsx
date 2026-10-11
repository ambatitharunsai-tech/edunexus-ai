import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  HeartHandshake,
  Shield,
} from 'lucide-react';
import { api } from '../lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { StudentProfileHeader } from '../features/journey/StudentProfileHeader';
import { StudentMetricsSummary } from '../features/journey/StudentMetricsSummary';
import { MissingDataNoticeBanner } from '../features/journey/MissingDataNoticeBanner';
import { StudentMetricTrendsChart } from '../features/journey/StudentMetricTrendsChart';
import { JourneyTimeline } from '../features/journey/JourneyTimeline';
import { CreateInterventionModal } from '../features/dashboard/CreateInterventionModal';
import type {
  StudentJourneyProfileResponse,
  StudentListItem,
  StudentDirectoryResponse,
  CreateInterventionPayload,
} from '../types';

export const StudentJourneyPage: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine current student ID from either /students/:id or /journey?student_id=...
  const studentIdParam = params.id || searchParams.get('student_id') || '';

  const [studentDirectory, setStudentDirectory] = useState<StudentListItem[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string>(studentIdParam);
  const [profile, setProfile] = useState<StudentJourneyProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Active records tab
  const [activeTab, setActiveTab] = useState<'assessments' | 'attendance' | 'interventions' | 'engagements'>('assessments');

  // Intervention modal
  const [interventionModalOpen, setInterventionModalOpen] = useState<boolean>(false);

  // 1. Fetch directory for student quick-switcher
  useEffect(() => {
    let isMounted = true;
    const loadDirectory = async () => {
      try {
        const res = await api<StudentDirectoryResponse>('/api/v1/students?page=1&page_size=50');
        if (isMounted && res.students.length > 0) {
          setStudentDirectory(res.students);
          // If no student param was supplied, default to the first student in directory
          setActiveStudentId((prev) => (studentIdParam ? studentIdParam : prev || res.students[0].id));
        }
      } catch (err) {
        console.warn('Could not load student directory switcher list:', err);
      }
    };
    loadDirectory();
    return () => {
      isMounted = false;
    };
  }, [studentIdParam]);

  // Sync state if URL param changes
  useEffect(() => {
    if (studentIdParam) {
      setActiveStudentId(studentIdParam);
    }
  }, [studentIdParam]);

  // 2. Fetch full student dossier
  const fetchStudentDossier = useCallback(async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api<StudentJourneyProfileResponse>(`/api/v1/students/${id}`);
      setProfile(res);
    } catch (err: unknown) {
      console.error('Failed to load student journey profile:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load student journey. Please ensure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeStudentId) {
      fetchStudentDossier(activeStudentId);
    }
  }, [activeStudentId, fetchStudentDossier]);

  const handleSelectStudent = (newId: string) => {
    setActiveStudentId(newId);
    setSearchParams({ student_id: newId });
  };

  const handleCreateIntervention = async (payload: CreateInterventionPayload): Promise<boolean> => {
    try {
      await api('/api/v1/interventions', {
        method: 'POST',
        body: payload,
      });
      if (activeStudentId) {
        await fetchStudentDossier(activeStudentId);
      }
      return true;
    } catch (err) {
      console.error('Failed to log intervention plan:', err);
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Student Switcher & Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <Link
            to="/students"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Directory</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden md:inline">
              Selected Student:
            </span>
            <select
              value={activeStudentId}
              onChange={(e) => handleSelectStudent(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {studentDirectory.length === 0 && profile && (
                <option value={profile.student.id}>
                  {profile.student.first_name} {profile.student.last_name} ({profile.student.student_id})
                </option>
              )}
              {studentDirectory.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name} ({s.student_id}) — {s.department || 'General'} [
                  {(s.risk_tier || 'low').toUpperCase()}: {s.risk_score || 0}]
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => activeStudentId && fetchStudentDossier(activeStudentId)}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
            <span>Refresh Journey</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setInterventionModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Log Support Plan</span>
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && !profile && (
        <div className="py-24 flex flex-col items-center justify-center space-y-3">
          <Spinner size="lg" />
          <p className="text-xs font-medium text-slate-500 animate-pulse">
            Loading student chronological journey, academic markers, and explainable risk profile...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !profile && (
        <div className="p-8 text-center bg-white rounded-xl border border-rose-200 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Student Profile Unavailable</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">{error}</p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <Link to="/students">
              <Button variant="secondary" size="sm">
                Return to Directory
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={() => activeStudentId && fetchStudentDossier(activeStudentId)}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Main Student Dossier Profile */}
      {profile && (
        <div className="space-y-6">
          {/* 1. Student Profile Header */}
          <StudentProfileHeader
            profile={profile}
            onOpenIntervention={() => setInterventionModalOpen(true)}
          />

          {/* 2. Ethical Transparency Banner for Missing Telemetry */}
          <MissingDataNoticeBanner notices={profile.missing_data_notices} />

          {/* 3. 4-Card Metrics Summary */}
          <StudentMetricsSummary profile={profile} />

          {/* 4. Analytics & Trajectory Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Metric Trajectories Recharts Chart */}
            <div className="lg:col-span-2 space-y-6">
              <StudentMetricTrendsChart metricsTrend={profile.metrics_trend} />

              {/* Explainable Risk Decomposition Card */}
              <Card className="border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <CardTitle className="text-base font-bold text-slate-900">
                        Explainable Risk Scoring Decomposition
                      </CardTitle>
                    </div>
                    <Badge
                      variant={
                        profile.risk_profile.overall_risk === 'critical'
                          ? 'danger'
                          : profile.risk_profile.overall_risk === 'high'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {profile.risk_profile.requires_review ? 'Human Review Advised' : 'System Monitored'}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    Transparent mathematical decomposition of student indicators contributing to advisory tier.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {profile.risk_profile.factors.map((factor, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{factor.factor}</span>
                          <span className="text-indigo-600 font-bold">
                            {(factor.weight * 100).toFixed(0)}% Weight
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="text-slate-500 text-[11px]">Sub-Metric Score:</span>
                          <span className="font-bold text-slate-900">{factor.value.toFixed(1)}/100</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              idx === 0
                                ? 'bg-amber-500'
                                : idx === 1
                                ? 'bg-indigo-600'
                                : 'bg-teal-600'
                            }`}
                            style={{ width: `${Math.min(100, factor.value)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 text-right font-medium">
                          +{factor.contribution.toFixed(1)} pts to Risk Index
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Ethical AI Safeguard Callout */}
                  <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-[11px] leading-relaxed">
                      <p className="font-bold text-indigo-900">
                        Human-in-the-Loop Decision Support Safeguard:
                      </p>
                      <p className="text-indigo-800">
                        {profile.risk_profile.disclaimer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right 1 Col: Advisor Dossier & Quick Profile Details */}
            <div className="space-y-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Institutional Record
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Cohort administrative credentials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Institutional ID</span>
                    <span className="font-mono font-bold text-slate-900">
                      {profile.student.student_id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Academic Department</span>
                    <span className="font-semibold text-slate-800">{profile.department}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Current Cohort / Grade</span>
                    <span className="font-semibold text-slate-800">
                      {profile.student.grade || 'Grade 11'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Assigned Section</span>
                    <span className="font-semibold text-slate-800">
                      Section {profile.student.section || 'A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Enrollment Date</span>
                    <span className="text-slate-700">{profile.student.enrollment_date}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-500">Enrollment Status</span>
                    <Badge variant="success" size="sm">
                      {profile.student.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Active Interventions Summary Card */}
              <Card className="border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Active Support Plans
                  </CardTitle>
                  <Badge variant="neutral" size="sm">
                    {profile.interventions.length} Plans
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {profile.interventions.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No support plans currently assigned to this student.
                    </div>
                  ) : (
                    profile.interventions.map((intv, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 transition-colors shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{intv.type.replace('_', ' ').toUpperCase()}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              intv.status === 'in_progress'
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {intv.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          {intv.description}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                          <span>Mentor: {intv.assigned_to || 'Support Specialist'}</span>
                          <span>Follow-up: {intv.follow_up_date || 'Scheduled'}</span>
                        </div>
                      </div>
                    ))
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInterventionModalOpen(true)}
                    className="w-full text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50 mt-1 flex items-center justify-center gap-1.5"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Create New Plan</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 5. Chronological Journey Timeline Component */}
          <JourneyTimeline events={profile.timeline_events} />

          {/* 6. Comprehensive Historical Telemetry Records Tables */}
          <Card className="border-slate-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Comprehensive Historical Records
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Granular attendance sessions, assessments, engagement logs, and intervention milestones
                </CardDescription>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs self-start">
                <button
                  type="button"
                  onClick={() => setActiveTab('assessments')}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors ${
                    activeTab === 'assessments'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Assessments ({profile.recent_assessments.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('attendance')}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors ${
                    activeTab === 'attendance'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Attendance ({profile.recent_attendance.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('interventions')}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors ${
                    activeTab === 'interventions'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Support Plans ({profile.interventions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('engagements')}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors ${
                    activeTab === 'engagements'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  LMS Logs ({profile.recent_engagements.length})
                </button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Tab 1: Assessments */}
              {activeTab === 'assessments' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">Subject</th>
                        <th className="py-2.5 px-3">Evaluation Type</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3 text-center">Score / Max</th>
                        <th className="py-2.5 px-3 text-center">Percentage</th>
                        <th className="py-2.5 px-3">Institutional Benchmark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {profile.recent_assessments.map((a, idx) => {
                        const scorePct = a.max_score > 0 ? (a.score / a.max_score) * 100 : 0;
                        return (
                          <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-2.5 px-3 font-bold text-slate-900">{a.subject}</td>
                            <td className="py-2.5 px-3 capitalize">
                              {a.assessment_type.replace('_', ' ')}
                            </td>
                            <td className="py-2.5 px-3 text-slate-500">{a.date}</td>
                            <td className="py-2.5 px-3 text-center font-mono">
                              {a.score} / {a.max_score}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className={`font-bold ${
                                  scorePct >= 75
                                    ? 'text-emerald-600'
                                    : scorePct >= 60
                                    ? 'text-amber-600'
                                    : 'text-rose-600'
                                }`}
                              >
                                {scorePct.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  scorePct >= 70
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-amber-50 text-amber-700'
                                }`}
                              >
                                {scorePct >= 70 ? 'Benchmark Met' : 'Under Observation'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2: Attendance */}
              {activeTab === 'attendance' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Advisory Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {profile.recent_attendance.map((att, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-slate-900">{att.date}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                                att.status === 'present'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : att.status === 'late'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {att.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">
                            {att.status === 'absent'
                              ? 'Absence recorded; daily guardian advisory dispatched.'
                              : 'Standard classroom session attended.'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: Interventions */}
              {activeTab === 'interventions' && (
                <div className="space-y-3">
                  {profile.interventions.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No support interventions recorded for this student.
                    </div>
                  ) : (
                    profile.interventions.map((intv, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {intv.type.replace('_', ' ').toUpperCase()} Plan
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={intv.priority === 'urgent' ? 'danger' : 'warning'}
                              size="sm"
                            >
                              {intv.priority.toUpperCase()}
                            </Badge>
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {intv.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{intv.description}</p>
                        <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
                          <span>Mentor / Assigned Staff: <strong>{intv.assigned_to || 'Student Advisory'}</strong></span>
                          <span>Start Date: <strong>{intv.start_date || '2026-09-15'}</strong></span>
                          <span>Follow-up Target: <strong>{intv.follow_up_date || 'Within 30 Days'}</strong></span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 4: LMS Engagements */}
              {activeTab === 'engagements' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Activity Type</th>
                        <th className="py-2.5 px-3">Duration (mins)</th>
                        <th className="py-2.5 px-3">Engagement Context</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {profile.recent_engagements.map((eng, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-slate-900">{eng.date}</td>
                          <td className="py-2.5 px-3 font-semibold text-indigo-700 capitalize">
                            {eng.activity_type.replace('_', ' ')}
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            {eng.duration_minutes || 30} mins
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            {eng.description || 'Digital learning portal study module completed.'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Intervention Modal */}
      {profile && (
        <CreateInterventionModal
          isOpen={interventionModalOpen}
          onClose={() => setInterventionModalOpen(false)}
          preselectedStudent={{
            id: profile.student.id,
            student_id: profile.student.student_id,
            name: `${profile.student.first_name} ${profile.student.last_name}`,
            grade: profile.student.grade || 'Grade 11',
            risk_level: profile.risk_profile.overall_risk,
            risk_score: profile.risk_profile.risk_score,
            primary_risk_factor: `Review flag: Attendance ${profile.attendance_rate}% | Academic ${profile.average_score}%`,
            attendance_rate: profile.attendance_rate,
            avg_score: profile.average_score,
            last_interaction: 'Recent',
            status: 'Needs Review',
          }}
          studentsList={[]}
          onSubmit={handleCreateIntervention}
        />
      )}
    </div>
  );
};
