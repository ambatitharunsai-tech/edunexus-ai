import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Shield,
  UserCheck,
  Briefcase,
  Award,
  BookOpen,
  MessageSquare,
  Scale,
  CheckCircle2,
  GraduationCap,
  CalendarCheck,
  Activity,
} from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context';
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
import { RecordOutcomeModal } from '../features/interventions/RecordOutcomeModal';
import { RiskOverrideModal } from '../features/journey/RiskOverrideModal';
import { StudentSuccessScoreCard } from '../features/journey/StudentSuccessScoreCard';
import { DualRiskAssessmentCard } from '../features/journey/DualRiskAssessmentCard';
import { CohortSegmentCard } from '../features/journey/CohortSegmentCard';
import { StudentRadarFingerprint } from '../features/journey/StudentRadarFingerprint';
import type {
  StudentJourneyProfileResponse,
  StudentListItem,
  StudentDirectoryResponse,
  CreateInterventionPayload,
  RiskExplanationResponse,
  Intervention,
} from '../types';

export const StudentJourneyPage: React.FC = () => {
  const { session } = useAuth();
  const isStudent = session?.role?.toLowerCase() === 'student';

  const params = useParams<{ id?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine current student ID from either /students/:id or /journey?student_id=...
  const studentIdParam = params.id || searchParams.get('student_id') || '';

  const [studentDirectory, setStudentDirectory] = useState<StudentListItem[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string>(studentIdParam || (isStudent ? 'STU-001' : ''));
  const [profile, setProfile] = useState<StudentJourneyProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const profileRef = useRef(profile);
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  // Active records tab across all 7 domains + support plans
  const [activeTab, setActiveTab] = useState<
    'assessments' | 'attendance' | 'placement' | 'skills' | 'lms' | 'feedback' | 'interventions' | 'engagements'
  >('assessments');

  // Intervention modal
  const [interventionModalOpen, setInterventionModalOpen] = useState<boolean>(false);
  const [outcomeModalOpen, setOutcomeModalOpen] = useState<boolean>(false);
  const [selectedInterventionForOutcome, setSelectedInterventionForOutcome] = useState<Intervention | null>(null);

  // Risk explanation and human override state
  const [riskExplanation, setRiskExplanation] = useState<RiskExplanationResponse | null>(null);
  const [overrideModalOpen, setOverrideModalOpen] = useState<boolean>(false);

  // 1. Fetch directory for student quick-switcher (skip for students to respect FERPA policy)
  useEffect(() => {
    if (isStudent) return;
    let isMounted = true;
    if (isStudent) {
      setActiveStudentId((prev) => prev || studentIdParam || 'STU-001');
      return () => {
        isMounted = false;
      };
    }

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
  }, [studentIdParam, isStudent]);

  // Sync state if URL param changes
  useEffect(() => {
    if (studentIdParam) {
      setActiveStudentId(studentIdParam);
    }
  }, [studentIdParam]);

  // 2. Fetch full student dossier & risk explanation
  const fetchStudentDossier = useCallback(async (id: string, opts: { bypassCache?: boolean } = {}) => {
    if (!id) return;
    const current = profileRef.current;
    if (!current || (current.student.id !== id && current.student.student_id !== id)) {
      setLoading(true);
    }
    setError(null);
    try {
      const [profileRes, riskRes] = await Promise.all([
        api<StudentJourneyProfileResponse>(`/api/v1/students/${id}`, { bypassCache: opts.bypassCache }),
        api<RiskExplanationResponse>(`/api/v1/students/${id}/risk-explanation`, { bypassCache: opts.bypassCache }).catch((err) => {
          console.warn('Could not fetch risk explanation for student:', err);
          return null;
        }),
      ]);
      setProfile(profileRes);
      setRiskExplanation(riskRes);
      setError(null);
    } catch (err: unknown) {
      console.error('Failed to load student journey profile:', err);
      if (!profileRef.current) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load student journey. Please ensure the backend is running.'
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isStudent && activeStudentId) {
      fetchStudentDossier(activeStudentId);
    }
  }, [activeStudentId, fetchStudentDossier, isStudent]);

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
    } catch {
      // Retry once in case of Render cold-start latency
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
    }
  };

  // Human advisor override data normalization (resolves nested human_override or legacy properties)
  const humanOverride = riskExplanation?.human_override;
  const isOverridden = Boolean(humanOverride?.is_overridden || riskExplanation?.is_overridden);
  const activeEffectiveTier = (humanOverride?.is_overridden && humanOverride.override_tier)
    ? humanOverride.override_tier
    : (riskExplanation?.effective_priority_tier || profile?.risk_profile?.overall_risk || 'moderate');
  const baselineComputedTier = humanOverride?.original_tier || riskExplanation?.support_priority_tier || profile?.risk_profile?.overall_risk || 'moderate';
  const overrideReason = humanOverride?.override_reason || riskExplanation?.override_details?.reason;
  const reviewerName = humanOverride?.reviewed_by || riskExplanation?.override_details?.staff_name;
  const reviewTimestamp = humanOverride?.reviewed_at || riskExplanation?.override_details?.recorded_at;

  if (isStudent) {
    return (
      <div className="mx-auto max-w-2xl py-12 px-4">
        <Card className="border-slate-200 dark:border-[#29292D] bg-white dark:bg-[#141416] shadow-sm">
          <CardContent className="space-y-4 p-6 sm:p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-[#18181B] text-indigo-700 dark:text-[#818CF8] border border-indigo-200 dark:border-[#27272A]">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-[#FAFAFA]">
              Student Caseload Privacy Policy
            </h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-[#A1A1AA]">
              Individual caseload student journey profiles are restricted to institutional academic advisors and mentors. To view your own personal attendance, assessment analytics, and support indicators, please open your student portal.
            </p>
            <div className="pt-2">
              <Link
                to="/student"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
              >
                Go to My Student Portal
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Student Read-Only Mode Banner */}
      {isStudent && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-300/80 bg-amber-50/90 dark:border-[#92400E] dark:bg-[#451A03] text-amber-900 dark:text-[#FCD34D] text-xs shadow-xs">
          <Shield className="w-5 h-5 shrink-0 text-amber-600 dark:text-[#FCD34D] mt-0.5" />
          <div>
            <span className="font-bold block sm:inline">Student Read-Only Mode: </span>
            You are viewing this student journey profile and timeline in read-only mode.
            Adjusting risk review tiers, assigning intervention plans, and recording outcomes are restricted to authorized academic advisors and faculty.
          </div>
        </div>
      )}

      {/* Top Student Switcher & Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#141416] p-3.5 rounded-xl border border-slate-200 dark:border-[#27272A] shadow-2xs">
        <div className="flex items-center gap-3">
          {!isStudent && (
            <Link
              to="/students"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-[#A1A1AA] hover:text-indigo-600 dark:hover:text-[#818CF8] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1C1C20] border border-slate-200 dark:border-[#27272A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Directory</span>
            </Link>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-[#71717A] font-medium hidden md:inline">
              Selected Student:
            </span>
            <select
              value={studentDirectory.find((s) => s.id === activeStudentId || s.student_id === activeStudentId)?.id || activeStudentId}
              onChange={(e) => handleSelectStudent(e.target.value)}
              className="text-xs font-semibold text-slate-800 dark:text-[#FAFAFA] bg-slate-50 dark:bg-[#111113] border border-slate-300 dark:border-[#3F3F46] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
              {studentDirectory.length === 0 && profile?.student && (
                <option value={profile.student.id || profile.student.student_id || 'STU-001'}>
                  {profile.student.first_name || 'Enrolled'} {profile.student.last_name || 'Student'} ({profile.student.student_id || 'STU-001'})
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
            onClick={() => activeStudentId && fetchStudentDossier(activeStudentId, { bypassCache: true })}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-[#A1A1AA] hover:text-slate-900 dark:hover:text-[#FAFAFA]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600 dark:text-[#818CF8]' : ''}`} />
            <span>Refresh Journey</span>
          </Button>

          {!isStudent && (
            <Button
              size="sm"
              onClick={() => setInterventionModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-100 border border-slate-900 dark:border-zinc-700 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors shadow-none tracking-normal"
            >
              Log Support Plan
            </Button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && !profile && (
        <div className="py-24 flex flex-col items-center justify-center space-y-3">
          <Spinner size="lg" label="Loading student chronological journey, academic markers, and explainable risk profile…" />
          <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Loading student chronological journey, academic markers, and explainable risk profile…
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
            <Link
              to="/students"
              className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 text-xs px-3 py-1.5 font-medium transition-colors cursor-pointer"
            >
              Return to Directory
            </Link>
            <Button
              size="sm"
              onClick={() => activeStudentId && fetchStudentDossier(activeStudentId, { bypassCache: true })}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Main Student Dossier Profile */}
      {profile && profile.student && (
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

          {/* 3b. KPMG 7-Domain Success Score (Positive Composite Index) */}
          {profile.success_profile && (
            <StudentSuccessScoreCard successProfile={profile.success_profile} />
          )}

          {/* 3c. Decoupled Dual-Risk Assessment & Strategic Cohort Classification */}
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            <DualRiskAssessmentCard
              academicRiskProfile={profile.academic_risk_profile}
              placementRiskProfile={profile.placement_risk_profile}
              onOpenIntervention={() => setInterventionModalOpen(true)}
            />
            {profile.segment_profile && (
              <CohortSegmentCard segmentProfile={profile.segment_profile} />
            )}
          </div>

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
                    <div className="flex items-center gap-2">
                      {!isStudent && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOverrideModalOpen(true)}
                          className="text-xs h-7 px-2.5 flex items-center gap-1.5 text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{isOverridden ? 'Modify Human Override' : 'Adjust Review Tier'}</span>
                        </Button>
                      )}
                      <Badge
                        variant={
                          activeEffectiveTier === 'critical'
                            ? 'danger'
                            : activeEffectiveTier === 'high'
                            ? 'warning'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {isOverridden
                          ? `Advisor Overridden: ${activeEffectiveTier.toUpperCase()}`
                          : profile.risk_profile?.requires_review
                          ? 'Human Review Advised'
                          : 'System Monitored'}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    Transparent mathematical decomposition of student indicators contributing to advisory tier.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isOverridden && (
                    <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl flex items-start gap-3 text-xs text-amber-950 shadow-2xs">
                      <UserCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-950 text-xs">
                              Active Human Advisor Override: <span className="underline uppercase">{activeEffectiveTier}</span> Tier
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                              Underlying Computed Baseline: <strong className="uppercase">{baselineComputedTier}</strong> ({riskExplanation?.composite_risk_score ?? profile?.risk_profile?.risk_score}/100)
                            </span>
                          </div>
                          {reviewTimestamp && (
                            <span className="text-[10px] text-amber-700 font-mono">
                              {new Date(reviewTimestamp).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          )}
                        </div>
                        {overrideReason && (
                          <p className="text-[11px] text-amber-900 bg-amber-100/60 p-2 rounded-lg border border-amber-200">
                            <strong>Advisor Context / Rationale:</strong> "{overrideReason}"
                          </p>
                        )}
                        {reviewerName && (
                          <p className="text-[10px] text-slate-500">
                            Authorized Reviewer: <strong className="text-slate-700">{reviewerName}</strong> • Preserves audit traceability
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {(profile.risk_profile?.factors || []).map((factor, idx) => (
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
                                : 'bg-cyan-500'
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
                        {profile.risk_profile?.disclaimer || 'All algorithmic risk determinations serve purely as decision-support alerts and require professional validation.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right 1 Col: Advisor Dossier & Quick Profile Details */}
            <div className="space-y-6">
              {/* 7-Domain Radar Fingerprint */}
              {profile.success_profile?.domain_breakdowns && (
                <StudentRadarFingerprint
                  domainBreakdowns={profile.success_profile.domain_breakdowns}
                  studentName={`${profile.student.first_name} ${profile.student.last_name}`}
                />
              )}

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
                      {profile.student.current_grade || profile.student.grade || 'Current Cohort'}
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
                    {profile.interventions?.length || 0} Plans
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {(profile.interventions?.length || 0) === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No support plans currently assigned to this student.
                    </div>
                  ) : (
                    (profile.interventions || []).map((intv, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 transition-colors shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{intv.intervention_type.replace('_', ' ').toUpperCase()}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              intv.status === 'in_progress'
                                ? 'bg-indigo-50 dark:bg-[#172554] text-indigo-700 dark:text-[#93C5FD] border border-indigo-200 dark:border-[#1D4ED8]'
                                : 'bg-cyan-50 dark:bg-[#083344] text-cyan-700 dark:text-[#67E8F9] border border-cyan-200 dark:border-[#155E75]'
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
                          <span>Follow-up: {intv.follow_up_date || 'Not scheduled'}</span>
                        </div>
                      </div>
                    ))
                  )}

                  {!isStudent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInterventionModalOpen(true)}
                      className="w-full text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50 mt-1 flex items-center justify-center gap-1.5"
                    >
                      <span>Create New Plan</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 5. Chronological Journey Timeline Component */}
          <JourneyTimeline events={profile.timeline_events || []} />

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

              {/* Tab Selector across all 7 domains and support plans */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl text-xs self-start border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('assessments')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'assessments'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Academic ({profile.recent_assessments?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('attendance')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'attendance'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Attendance ({profile.recent_attendance?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('placement')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'placement'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Placement</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${profile.placement_details ? 'bg-cyan-400' : 'bg-slate-300'}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('skills')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'skills'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Skills</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${profile.skills_details ? 'bg-cyan-400' : 'bg-slate-300'}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('lms')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'lms'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>LMS</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${profile.lms_details ? 'bg-cyan-400' : 'bg-slate-300'}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('feedback')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'feedback'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Feedback</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${profile.feedback_details ? 'bg-cyan-400' : 'bg-slate-300'}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('engagements')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'engagements'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Campus Logs ({profile.recent_engagements?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('interventions')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'interventions'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Support Plans ({profile.interventions?.length || 0})</span>
                </button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Tab 1: Assessments */}
              {activeTab === 'assessments' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-[#27272A] bg-[#EEF2F6] dark:bg-[#1C1C20] text-slate-700 dark:text-[#E4E4E7] uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">Subject</th>
                        <th className="py-2.5 px-3">Evaluation Type</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3 text-center">Score / Max</th>
                        <th className="py-2.5 px-3 text-center">Percentage</th>
                        <th className="py-2.5 px-3">Institutional Benchmark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#27272A] text-slate-700 dark:text-[#D4D4D8]">
                      {(profile.recent_assessments || []).map((a, idx) => {
                        const scorePct = a.max_score > 0 ? (a.score / a.max_score) * 100 : 0;
                        return (
                          <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-[#242428] transition-colors">
                            <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-[#FAFAFA]">{a.subject}</td>
                            <td className="py-2.5 px-3 capitalize">
                              {a.assessment_type.replace('_', ' ')}
                            </td>
                            <td className="py-2.5 px-3 text-slate-500 dark:text-[#71717A]">{a.assessment_date}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-slate-800 dark:text-[#FAFAFA]">
                              {a.score} / {a.max_score}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className={`font-bold ${
                                  scorePct >= 75
                                    ? 'text-cyan-600 dark:text-[#67E8F9]'
                                    : scorePct >= 60
                                    ? 'text-amber-600 dark:text-[#FCD34D]'
                                    : 'text-rose-600 dark:text-[#FDA4AF]'
                                }`}
                              >
                                {scorePct.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-none text-[10px] font-semibold border ${
                                  scorePct >= 70
                                    ? 'bg-cyan-50 dark:bg-[#083344] text-cyan-700 dark:text-[#67E8F9] border-cyan-200 dark:border-[#155E75]'
                                    : 'bg-amber-50 dark:bg-[#451A03] text-amber-700 dark:text-[#FCD34D] border-amber-200 dark:border-[#92400E]'
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
                      <tr className="border-b border-slate-200 dark:border-[#27272A] bg-[#EEF2F6] dark:bg-[#1C1C20] text-slate-700 dark:text-[#E4E4E7] uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Advisory Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#27272A] text-slate-700 dark:text-[#D4D4D8]">
                      {(profile.recent_attendance || []).map((att, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-[#242428] transition-colors">
                          <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-[#FAFAFA]">{att.session_date}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-none border text-[10px] font-bold capitalize ${
                                att.status === 'present'
                                  ? 'bg-cyan-50 dark:bg-[#083344] text-cyan-700 dark:text-[#67E8F9] border border-cyan-200 dark:border-[#155E75]'
                                  : att.status === 'late'
                                  ? 'bg-amber-50 dark:bg-[#451A03] text-amber-700 dark:text-[#FCD34D] border border-amber-200 dark:border-[#92400E]'
                                  : 'bg-rose-50 dark:bg-[#4C0519] text-rose-700 dark:text-[#FDA4AF] border border-rose-200 dark:border-[#9F1239]'
                              }`}
                            >
                              {att.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">
                            {att.remarks || 'No remarks recorded'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: Placement Readiness */}
              {activeTab === 'placement' && (
                <div>
                  {profile.placement_details ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Aptitude Score</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.placement_details.aptitude_score != null ? `${profile.placement_details.aptitude_score}%` : 'N/A'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Coding Score</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.placement_details.coding_score != null ? `${profile.placement_details.coding_score}%` : 'N/A'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Mock Interview</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.placement_details.mock_interview_score != null ? `${profile.placement_details.mock_interview_score}%` : 'N/A'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Resume Rating</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.placement_details.resume_score != null ? `${profile.placement_details.resume_score}%` : 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Assigned Readiness Tier</span>
                          <span className="font-bold capitalize px-2 py-0.5 rounded text-[11px] bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {profile.placement_details.readiness_tier.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Mock Interviews Attended</span>
                          <span className="font-bold text-slate-800">{profile.placement_details.mock_interviews_attended} sessions</span>
                        </div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Evaluation Date</span>
                          <span className="text-slate-700">{profile.placement_details.evaluated_at}</span>
                        </div>
                        {profile.placement_details.notes && (
                          <div className="pt-1">
                            <span className="text-slate-500 block mb-1">Career Coach Notes:</span>
                            <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                              "{profile.placement_details.notes}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Placement Telemetry Not Yet Ingested</span>
                      </div>
                      <p className="text-amber-800 leading-relaxed">
                        No placement assessment records are currently filed for this student.
                      </p>
                      <p className="text-[11px] text-amber-700 italic border-t border-amber-200/60 pt-2">
                        Institutional Governance Principle: Missing placement data is treated as unavailable evidence, not proof of poor aptitude or unreadiness.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Skills & Certifications */}
              {activeTab === 'skills' && (
                <div>
                  {profile.skills_details ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Technical Skill Score</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.skills_details.technical_score != null ? `${profile.skills_details.technical_score}%` : 'N/A'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Soft Skills Score</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.skills_details.soft_skills_score != null ? `${profile.skills_details.soft_skills_score}%` : 'N/A'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Accredited Certifications</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.skills_details.certifications_count ?? 0}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-3">
                        <div>
                          <span className="text-slate-500 font-semibold block mb-1.5">Verified Technical Competencies:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {(profile.skills_details.verified_skills || []).length > 0 ? (
                              profile.skills_details.verified_skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                                  <span>{skill}</span>
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 italic">No specific competency tags recorded</span>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                          <span>Last Assessed Date:</span>
                          <span className="font-semibold text-slate-700">{profile.skills_details.last_assessed_date}</span>
                        </div>

                        {profile.skills_details.notes && (
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-500 block mb-1">Evaluator Notes:</span>
                            <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                              "{profile.skills_details.notes}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Skills Telemetry Awaiting Ingestion</span>
                      </div>
                      <p className="text-amber-800 leading-relaxed">
                        No technical skill evaluations or certifications currently filed for this student.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: LMS Learning Activity */}
              {activeTab === 'lms' && (
                <div>
                  {profile.lms_details ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Weekly Logins</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.lms_details.weekly_login_count ?? 0}
                          </p>
                          <span className="text-[10px] text-slate-400">sessions/wk</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Module Completion</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.lms_details.module_completion_pct != null ? `${profile.lms_details.module_completion_pct}%` : 'N/A'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Assignment Rate</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.lms_details.assignments_submitted_pct != null ? `${profile.lms_details.assignments_submitted_pct}%` : 'N/A'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Forum Posts</p>
                          <p className="text-xl font-black text-slate-900 mt-1">
                            {profile.lms_details.forum_posts_count ?? 0}
                          </p>
                          <span className="text-[10px] text-slate-400">contributions</span>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Last Portal Session</span>
                          <span className="font-semibold text-slate-800">{profile.lms_details.last_login_date || 'Active within current week'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Telemetry Ingest Timestamp</span>
                          <span className="text-slate-700 font-mono text-[11px]">{profile.lms_details.recorded_at}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>LMS Activity Records Awaiting Ingestion</span>
                      </div>
                      <p className="text-amber-800 leading-relaxed">
                        No digital learning management platform telemetry currently ingested for this student.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 6: Feedback & Faculty Sentiment */}
              {activeTab === 'feedback' && (
                <div>
                  {profile.feedback_details ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Faculty Sentiment Rating</p>
                          <p className="text-2xl font-black text-slate-900 mt-1">
                            {profile.feedback_details.faculty_sentiment != null ? `${profile.feedback_details.faculty_sentiment}/100` : 'N/A'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">Evaluated by course instructors and teaching assistants</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Student Satisfaction Rating</p>
                          <p className="text-2xl font-black text-slate-900 mt-1">
                            {profile.feedback_details.student_satisfaction != null ? `${profile.feedback_details.student_satisfaction}/100` : 'N/A'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">Self-reported term survey engagement metric</p>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Academic Term Evaluated</span>
                          <span className="font-semibold text-slate-800">{profile.feedback_details.academic_term}</span>
                        </div>
                        {profile.feedback_details.mentor_notes && (
                          <div>
                            <span className="text-slate-500 font-semibold block mb-1">Qualitative Mentor & Faculty Observations:</span>
                            <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed italic">
                              "{profile.feedback_details.mentor_notes}"
                            </p>
                          </div>
                        )}
                        <div className="pt-1 text-[10px] text-slate-400">
                          Recorded: {profile.feedback_details.recorded_at}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Faculty & Mentorship Feedback Awaiting Ingestion</span>
                      </div>
                      <p className="text-amber-800 leading-relaxed">
                        No sentiment or survey feedback currently recorded for this student.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 7: Interventions & Recorded Outcomes */}
              {activeTab === 'interventions' && (
                <div className="space-y-4">
                  {(profile.interventions?.length || 0) === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400 space-y-2">
                      <p>No support interventions currently assigned to this student.</p>
                      {!isStudent && (
                        <Button
                          size="sm"
                          onClick={() => setInterventionModalOpen(true)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                        >
                          Create Support Plan
                        </Button>
                      )}
                    </div>
                  ) : (
                    (profile.interventions || []).map((intv) => (
                      <div
                        key={intv.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 text-xs shadow-2xs hover:border-slate-300 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {intv.title || `${intv.intervention_type.replace('_', ' ').toUpperCase()} Plan`}
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
                            {!isStudent && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInterventionForOutcome(intv);
                                  setOutcomeModalOpen(true);
                                }}
                                className="text-xs h-7 px-2.5 text-cyan-700 dark:text-[#67E8F9] border-cyan-200 dark:border-[#155E75] hover:bg-cyan-50 dark:hover:bg-[#083344] flex items-center gap-1"
                              >
                                <Scale className="w-3.5 h-3.5" />
                                <span>{intv.outcomes && intv.outcomes.length > 0 ? 'Update Outcome' : 'Record Outcome'}</span>
                              </Button>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-600 dark:text-[#A1A1AA] leading-relaxed">{intv.description}</p>

                        <div className="pt-2 border-t border-slate-100 dark:border-[#27272A] flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-[#71717A]">
                          <span>Mentor / Assigned Staff: <strong>{intv.assigned_staff_name || intv.assigned_to || 'Not assigned'}</strong></span>
                          <span>Start Date: <strong>{intv.start_date || 'Not recorded'}</strong></span>
                          <span>Follow-up Target: <strong>{intv.follow_up_date || 'Not scheduled'}</strong></span>
                          {intv.completed_date && <span>Completed: <strong>{intv.completed_date}</strong></span>}
                        </div>

                        {/* Outcomes Section */}
                        {intv.outcomes && intv.outcomes.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#27272A] bg-slate-50/70 dark:bg-[#111113] p-3 rounded-lg border border-slate-200/80 dark:border-[#27272A] space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 dark:text-[#FAFAFA]">
                              <span className="flex items-center gap-1 text-cyan-800 dark:text-[#67E8F9]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-[#67E8F9]" />
                                <span>Recorded Outcome Measurement:</span>
                              </span>
                              <span className="text-slate-500 dark:text-[#71717A] text-[10px]">
                                {intv.outcomes[0].measurement_date}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                              <span>Metric: <strong>{intv.outcomes[0].metric_name}</strong></span>
                              <span>Baseline: <strong>{intv.outcomes[0].baseline_value}</strong></span>
                              <span>Post: <strong>{intv.outcomes[0].post_value ?? '—'}</strong></span>
                              {intv.outcomes[0].absolute_change != null && (
                                <span className={`font-bold ${intv.outcomes[0].absolute_change >= 0 ? 'text-cyan-700 dark:text-[#67E8F9]' : 'text-rose-700 dark:text-[#FDA4AF]'}`}>
                                  Delta: {intv.outcomes[0].absolute_change >= 0 ? '+' : ''}{intv.outcomes[0].absolute_change} pts
                                  {intv.outcomes[0].percentage_change != null && ` (${intv.outcomes[0].percentage_change >= 0 ? '+' : ''}${intv.outcomes[0].percentage_change}%)`}
                                </span>
                              )}
                            </div>
                            {intv.outcomes[0].evidence_notes && (
                              <p className="text-[11px] text-slate-600 dark:text-[#A1A1AA] italic">
                                "{intv.outcomes[0].evidence_notes}"
                              </p>
                            )}
                            <p className="text-[10px] text-slate-400 dark:text-[#71717A] italic pt-1 border-t border-slate-200/60 dark:border-[#27272A]">
                              * {intv.outcomes[0].causation_disclaimer || 'Non-causal correlation disclaimer applies.'}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 8: Campus Engagements */}
              {activeTab === 'engagements' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-[#27272A] bg-[#EEF2F6] dark:bg-[#1C1C20] text-slate-700 dark:text-[#E4E4E7] uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Activity Type</th>
                        <th className="py-2.5 px-3">Duration (mins)</th>
                        <th className="py-2.5 px-3">Engagement Context</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#27272A] text-slate-700 dark:text-[#D4D4D8]">
                      {(profile.recent_engagements || []).map((eng, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-[#242428] transition-colors">
                          <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-[#FAFAFA]">{eng.event_timestamp}</td>
                          <td className="py-2.5 px-3 font-semibold text-indigo-700 dark:text-[#818CF8] capitalize">
                            {eng.event_type.replaceAll('_', ' ')}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-800 dark:text-[#FAFAFA]">
                            {eng.duration_minutes == null ? 'Not recorded' : `${eng.duration_minutes} mins`}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-[#A1A1AA]">
                            {eng.description || 'No description recorded'}
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
            grade: profile.student.current_grade || profile.student.grade || 'Current Cohort',
            risk_level: profile.risk_profile?.overall_risk || 'low',
            risk_score: profile.risk_profile?.risk_score || 0,
            primary_risk_factor: `Review flag: Attendance ${profile.attendance_rate != null ? profile.attendance_rate.toFixed(1) : 0}% | Academic ${profile.average_score != null ? profile.average_score.toFixed(1) : 0}%`,
            attendance_rate: profile.attendance_rate ?? null,
            avg_score: profile.average_score ?? null,
            last_interaction: 'Recent',
            status: 'Needs Review',
          }}
          studentsList={studentDirectory.map((s) => ({
            id: s.id,
            student_id: s.student_id,
            name: `${s.first_name} ${s.last_name}`,
            grade: s.current_grade || 'Current Cohort',
            section: s.section || undefined,
            risk_level: s.risk_tier || 'low',
            risk_score: s.risk_score || 0,
            primary_risk_factor: `Review flag: Attendance ${s.attendance_rate != null ? s.attendance_rate.toFixed(1) : 0}%`,
            attendance_rate: s.attendance_rate ?? null,
            avg_score: s.average_score ?? null,
            last_interaction: 'Recent',
            status: s.review_status || 'Under Observation',
          }))}
          onSubmit={handleCreateIntervention}
        />
      )}

      {/* Outcome Recording Modal */}
      {profile && selectedInterventionForOutcome && (
        <RecordOutcomeModal
          isOpen={outcomeModalOpen}
          onClose={() => {
            setOutcomeModalOpen(false);
            setSelectedInterventionForOutcome(null);
          }}
          intervention={selectedInterventionForOutcome}
          onSuccess={(_outcome) => {
            fetchStudentDossier(activeStudentId);
          }}
        />
      )}

      {/* Human Risk Override Modal */}
      {profile && (
        <RiskOverrideModal
          isOpen={overrideModalOpen}
          onClose={() => setOverrideModalOpen(false)}
          studentId={activeStudentId}
          studentName={`${profile.student.first_name} ${profile.student.last_name}`}
          currentTier={baselineComputedTier || profile.risk_profile?.overall_risk || 'low'}
          currentScore={riskExplanation?.composite_risk_score ?? profile.risk_profile?.risk_score ?? 0}
          isOverridden={isOverridden}
          overrideDetails={
            isOverridden
              ? {
                  original_tier: baselineComputedTier,
                  override_tier: activeEffectiveTier,
                  reason: overrideReason || '',
                  staff_name: reviewerName || 'Academic Advisor',
                  recorded_at: reviewTimestamp || '',
                }
              : undefined
          }
          onSuccess={() => fetchStudentDossier(activeStudentId)}
        />
      )}
    </div>
  );
};
