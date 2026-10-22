import React, { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  AlertCircle,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  Target,
  TrendingUp,
} from 'lucide-react';
import { api } from '../lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';

interface StudentDashboardResponse {
  data_source: string;
  student: {
    student_id: string;
    first_name: string;
    last_name: string;
    current_grade?: string | null;
    academic_term?: string | null;
    section?: string | null;
    department?: string | null;
    status: string;
  };
  metrics: {
    attendance_rate: number | null;
    average_score: number | null;
    latest_assessment_percentage: number | null;
    trend: 'improving' | 'stable' | 'declining' | string;
    review_status: string;
    success_score: number | null;
    success_tier: string | null;
    risk_tier: string | null;
    academic_risk_tier: string | null;
    placement_risk_tier: string | null;
    active_interventions_count: number;
    domain_coverage_pct: number;
    available_domains_count: number;
    missing_domains: string[];
    segment_label?: string | null;
  };
  domains: Array<{
    name: string;
    score: number | null;
    is_missing: boolean;
    normalized_weight: number;
  }>;
  recent_assessments: Array<{
    subject: string;
    assessment_type: string;
    score: number;
    max_score: number;
    percentage: number | null;
    date?: string | null;
  }>;
  recent_attendance: Array<{
    date?: string | null;
    status: string;
  }>;
  support_plans: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    start_date?: string | null;
    follow_up_date?: string | null;
  }>;
}

const formatDate = (value?: string | null) => {
  if (!value) return 'Not scheduled';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatScore = (value: number | null | undefined, suffix = '%') =>
  value == null ? 'Not recorded' : `${Number(value).toFixed(1)}${suffix}`;

const prettyLabel = (value?: string | null) =>
  value ? value.replaceAll('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase()) : 'Awaiting data';

const riskTone = (tier?: string | null) => {
  const normalized = tier?.toLowerCase() ?? '';
  if (normalized === 'low') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (normalized === 'moderate' || normalized === 'medium') return 'border-amber-200 bg-amber-50 text-amber-800';
  if (normalized === 'high' || normalized === 'critical') return 'border-rose-200 bg-rose-50 text-rose-800';
  return 'border-slate-200 bg-slate-50 text-slate-600';
};

export const StudentDashboardPage: React.FC = () => {
  const [dashboard, setDashboard] = useState<StudentDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api<StudentDashboardResponse>('/api/v1/students/me/dashboard');
      setDashboard(response);
    } catch (err: unknown) {
      setDashboard(null);
      setError(err instanceof Error ? err.message : 'Unable to load your student dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (loading && !dashboard) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <Spinner size="lg" label="Loading your personal learning overview…" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Loading your personal learning overview…
        </p>
      </div>
    );
  }

  if (error && !dashboard) {
    const unlinkedAccount = error.toLowerCase().includes('no student record is linked');
    return (
      <div className="mx-auto max-w-2xl py-12">
        <Card className="border-slate-200 bg-white">
          <CardContent className="space-y-4 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {unlinkedAccount ? 'Your student record is not linked yet' : 'Student dashboard unavailable'}
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              {unlinkedAccount
                ? 'Your account is signed in, but your institution has not linked it to a student record. Ask your college administrator to connect your verified account to your institutional student ID.'
                : error}
            </p>
            {!unlinkedAccount && (
              <button
                type="button"
                onClick={() => void loadDashboard()}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <RefreshCw className="h-4 w-4" /> Retry
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dashboard) return null;

  const { student, metrics, domains, recent_assessments, recent_attendance, support_plans, data_source } = dashboard;
  const scoreCards = [
    {
      label: 'Student Success Score',
      value: formatScore(metrics.success_score, '/100'),
      detail: prettyLabel(metrics.success_tier),
      icon: Target,
      iconTone: 'bg-indigo-50 text-indigo-700',
    },
    {
      label: 'Attendance',
      value: formatScore(metrics.attendance_rate),
      detail: 'Based on recorded sessions',
      icon: CalendarCheck,
      iconTone: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Average assessment',
      value: formatScore(metrics.average_score),
      detail: metrics.latest_assessment_percentage == null
        ? 'No recent assessment score'
        : `Latest: ${formatScore(metrics.latest_assessment_percentage)}`,
      icon: BookOpen,
      iconTone: 'bg-sky-50 text-sky-700',
    },
    {
      label: 'Active support plans',
      value: String(metrics.active_interventions_count ?? 0),
      detail: 'Staff-led follow-up plans',
      icon: ShieldCheck,
      iconTone: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 dark:bg-slate-900/60 p-5 sm:flex-row sm:items-center sm:p-7">
        <div className="space-y-2 min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600">Student overview</p>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {student.first_name}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Your personal progress across attendance, assessments, learning activity, skills, placement preparation, engagement and feedback.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white dark:bg-slate-800/80 px-3 py-1 font-semibold">{student.student_id}</span>
            {student.current_grade && <span>{student.current_grade}</span>}
            {student.academic_term && <span>· {student.academic_term}</span>}
            {student.section && <span>· Section {student.section}</span>}
          </div>
        </div>
        <button
          type="button"
          onClick={() => void loadDashboard()}
          disabled={loading}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white dark:bg-slate-800/80 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </section>

      {data_source.toLowerCase().includes('synthetic') && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Synthetic demo data</p>
            <p className="mt-1 text-xs leading-5">This account shows fictional evaluation data, not your institution’s live student record.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {scoreCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border-slate-200 bg-white shadow-xs">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                    <p className="mt-3 text-2xl font-black tracking-tight text-slate-900">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-500 break-words">{item.detail}</p>
                  </div>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconTone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-slate-900">
              <GraduationCap className="h-5 w-5 text-indigo-600" /> Academic risk indicator
            </CardTitle>
            <CardDescription className="text-xs leading-5 text-slate-500">
              A transparent prompt for discussion and support, not a grade or a disciplinary decision.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-bold ${riskTone(metrics.academic_risk_tier)}`}>
              {prettyLabel(metrics.academic_risk_tier)}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              {metrics.academic_risk_tier === 'insufficient_data'
                ? 'More attendance or academic records are needed before this indicator can be assessed.'
                : 'Review attendance and academic progress with your advisor if you have questions about this indicator.'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-slate-900">
              <TrendingUp className="h-5 w-5 text-teal-600" /> Placement readiness indicator
            </CardTitle>
            <CardDescription className="text-xs leading-5 text-slate-500">
              Based on available aptitude, coding and mock-interview evidence.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-bold ${riskTone(metrics.placement_risk_tier)}`}>
              {prettyLabel(metrics.placement_risk_tier)}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              {metrics.placement_risk_tier === 'insufficient_data'
                ? 'Placement diagnostics are not fully recorded yet; missing data is not treated as a zero.'
                : 'Use this indicator to plan practice activities and career preparation with your placement team.'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base text-slate-900">Your seven-domain progress</CardTitle>
              <CardDescription className="mt-1 text-xs text-slate-500">
                {metrics.available_domains_count} of 7 domains have recorded evidence · {Number(metrics.domain_coverage_pct ?? 0).toFixed(0)}% coverage
              </CardDescription>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 shrink-0 self-start sm:self-auto">
              <Activity className="h-3.5 w-3.5" /> {prettyLabel(metrics.trend)} trend
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {domains.map((domain) => (
              <div key={domain.name} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold capitalize text-slate-800">{prettyLabel(domain.name)}</p>
                  <span className="text-sm font-black text-slate-900">
                    {domain.score == null ? '—' : Number(domain.score).toFixed(1)}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, domain.score ?? 0))}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  {domain.is_missing ? 'Not recorded yet · not scored as zero' : `Recorded · ${Math.round(domain.normalized_weight * 100)}% of this score`}
                </p>
              </div>
            ))}
          </div>
          {metrics.missing_domains.length > 0 && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs leading-5 text-sky-900">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <p>Still awaiting records for: {metrics.missing_domains.map(prettyLabel).join(', ')}. The score uses available evidence only and does not impute missing domains as zero.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-base text-slate-900">Recent assessments</CardTitle>
            <CardDescription className="text-xs text-slate-500">Your most recent recorded assessment results.</CardDescription>
          </CardHeader>
          <CardContent>
            {recent_assessments.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500">No assessment results have been recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
                    <tr><th className="py-2 pr-3">Subject</th><th className="py-2 pr-3">Assessment</th><th className="py-2 pr-3">Result</th><th className="py-2 text-right">Date</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recent_assessments.map((assessment, index) => (
                      <tr key={`${assessment.subject}-${assessment.date ?? index}-${index}`}>
                        <td className="py-3 pr-3 font-semibold text-slate-800">{assessment.subject}</td>
                        <td className="py-3 pr-3 text-slate-600">{assessment.assessment_type}</td>
                        <td className="py-3 pr-3 font-bold text-slate-800">{formatScore(assessment.percentage)}</td>
                        <td className="py-3 text-right text-slate-500">{formatDate(assessment.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-slate-900">
              <CalendarCheck className="h-4 w-4 text-emerald-600" /> Recent attendance
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">Attendance entries most recently recorded for you.</CardDescription>
          </CardHeader>
          <CardContent>
            {recent_attendance.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500">No attendance sessions have been recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {recent_attendance.map((row, index) => (
                  <div key={`${row.date ?? index}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-medium text-slate-700">{formatDate(row.date)}</span>
                    </div>
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${row.status === 'present' || row.status === 'late' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : row.status === 'absent' ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                      {prettyLabel(row.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-base text-slate-900">Support plans and follow-ups</CardTitle>
          <CardDescription className="text-xs text-slate-500">A limited view of your own support plan status and next follow-up date.</CardDescription>
        </CardHeader>
        <CardContent>
          {support_plans.length === 0 ? (
            <div className="flex items-start gap-3 rounded-lg border border-dashed border-slate-200 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-slate-800">No support plans are currently listed</p>
                <p className="mt-1 text-xs text-slate-500">Your advisor can help if you would like to discuss academic or career support.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {support_plans.map((plan) => (
                <div key={plan.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{plan.title}</p>
                      <p className="mt-1 text-xs text-slate-500">Follow-up: {formatDate(plan.follow_up_date)}</p>
                    </div>
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${riskTone(plan.priority)}`}>{prettyLabel(plan.status)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <p className="flex items-start gap-2 px-1 text-[11px] leading-5 text-slate-500">
        <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        These indicators support learning conversations and are not disciplinary decisions. Missing records are shown as unavailable, and a score change alone does not prove an intervention caused an outcome.
      </p>
    </div>
  );
};
