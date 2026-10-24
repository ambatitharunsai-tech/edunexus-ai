import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  CalendarCheck,
  AlertTriangle,
  ClipboardCheck,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Search,
  RefreshCw,
  Database,
  PlusCircle,
  Layers,
  Award,
  Briefcase,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { useDashboardData } from '../hooks/useDashboardData';
import { useAuth } from '../context';
import { CreateInterventionModal } from '../features/dashboard/CreateInterventionModal';
import { StudentQuickProfileModal } from '../features/dashboard/StudentQuickProfileModal';
import { DomainRadarOverview } from '../features/dashboard/DomainRadarOverview';
import { PlacementReadinessCard } from '../features/dashboard/PlacementReadinessCard';
import { StudentSegmentationCard } from '../features/dashboard/StudentSegmentationCard';
import { DualRiskMatrixCard } from '../features/dashboard/DualRiskMatrixCard';
import { TelemetryGovernanceCard } from '../features/dashboard/TelemetryGovernanceCard';
import type { FollowUpStudentItem } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isStaff, session } = useAuth();
  const isStudent = session?.role?.toLowerCase() === 'student';
  const { data, loading, error, refetch, createIntervention } = useDashboardData();

  // Local state for interactive controls
  const [dateRange, setDateRange] = useState<string>('all');
  const [followUpFilter, setFollowUpFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [followUpSearch, setFollowUpSearch] = useState<string>('');

  // Modals state
  const [interventionModalOpen, setInterventionModalOpen] = useState<boolean>(false);
  const [selectedStudentForIntervention, setSelectedStudentForIntervention] = useState<FollowUpStudentItem | null>(null);

  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<FollowUpStudentItem | null>(null);

  const placementSupportCount = useMemo(() => {
    return (
      data?.placement_risk_distribution
        ?.filter((d) => d.tier === 'high' || d.tier === 'medium')
        ?.reduce((sum, d) => sum + d.count, 0) ?? 0
    );
  }, [data?.placement_risk_distribution]);

  // Filtered follow-up students
  const followUpStudents = data?.follow_up_students;
  const filteredFollowUps = useMemo(() => {
    if (!followUpStudents) return [];
    return followUpStudents.filter((student) => {
      // Risk tier filter
      if (followUpFilter !== 'all' && (student.risk_level === 'moderate' ? 'medium' : student.risk_level) !== followUpFilter) {
        return false;
      }
      // Search filter
      if (followUpSearch.trim()) {
        const query = followUpSearch.toLowerCase().trim();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesId = student.student_id.toLowerCase().includes(query);
        const matchesConcern = student.primary_risk_factor.toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesConcern) {
          return false;
        }
      }
      return true;
    });
  }, [followUpStudents, followUpFilter, followUpSearch]);

  const chartRange = <T extends {period: string}>(points: T[]): T[] => {
    if (dateRange === 'all' || !points.length) return points;
    const latest = Math.max(...points.map(p => Date.parse(p.period)));
    const cutoff = latest - (dateRange === '30d' ? 30 : 365) * 86400000;
    return points.filter(p => Date.parse(p.period) >= cutoff);
  };

  const handleOpenIntervention = (student?: FollowUpStudentItem) => {
    setSelectedStudentForIntervention(student || null);
    setInterventionModalOpen(true);
  };

  const handleOpenProfile = (student: FollowUpStudentItem) => {
    setSelectedStudentForProfile(student);
    setProfileModalOpen(true);
  };

  if (loading && !data) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-4">
        <Spinner size="lg" label="Aggregating cohort intelligence, risk signals, and attendance trends…" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Aggregating cohort intelligence, risk signals, and attendance trends…
        </p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <Card className="border-rose-200 bg-rose-50/50">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Failed to Load Dashboard Intelligence</h3>
              <p className="text-xs text-slate-600 mt-1">{error}</p>
            </div>
            <Button onClick={refetch} variant="primary" size="sm" className="mx-auto flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              <span>Retry Query</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const {
    summary,
    attendance_trend,
    assessment_trend,
    risk_distribution,
    recent_activity,
    intervention_summary,
    metadata,
    domain_averages,
    placement_readiness_summary,
    segmentation_distribution,
    dual_risk_matrix,
  } = data;

  const insightCards = [
    {
      label: 'Students needing review',
      value: `${summary.requiring_review_count}`,
      note: `${summary.review_percentage}% of the cohort`,
      accent: 'amber',
    },
    {
      label: 'Intervention coverage',
      value: `${summary.active_interventions_count}`,
      note: `${intervention_summary.total} plans tracked`,
      accent: 'indigo',
    },
    {
      label: 'Average attendance',
      value: `${summary.average_attendance}%`,
      note: summary.attendance_status,
      accent: 'emerald',
    },
  ];

  const insightTone = {
    amber: 'border-amber-200/80 bg-amber-50/60 text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/20 dark:text-amber-300',
    indigo: 'border-indigo-200/80 bg-indigo-50/60 text-indigo-800 dark:border-indigo-800/60 dark:bg-indigo-950/20 dark:text-indigo-300',
    emerald: 'border-emerald-200/80 bg-emerald-50/60 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/20 dark:text-emerald-300',
  } as const;

  const activityTone = {
    info: 'bg-sky-100 text-sky-700 border-sky-200',
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    critical: 'bg-rose-100 text-rose-700 border-rose-200',
  } as const;

  const recentHighlights = recent_activity.slice(0, 5);

  return (
    <div className="space-y-6 animate-float-up">
      {/* ── Context & Date Controls Header ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Executive Student Success Dashboard
            </h2>
            {metadata.is_demo ? (
              <Badge variant="warning" size="sm" dot>
                Demo Dataset
              </Badge>
            ) : (
              <Badge variant="success" size="sm" dot>
                Live Database
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic student trajectory monitoring combining academic trends, attendance signals, and support interventions.
          </p>
        </div>

        {/* Date / Term / Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Term Selector */}
          {/* Time Window Selector */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setDateRange('30d')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                dateRange === '30d' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30 Days
            </button>
            <button
              type="button"
              onClick={() => setDateRange('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                dateRange === 'all' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All records
            </button>
            <button
              type="button"
              onClick={() => setDateRange('year')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                dateRange === 'year' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Year
            </button>
          </div>

          {/* Refresh Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={refetch}
            title="Refresh analytics data"
            className="px-2.5"
            disabled={loading}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
          </Button>

          {/* Create Intervention Action (Staff authorized only) */}
          {isStaff && (
            <Button
              size="sm"
              onClick={() => handleOpenIntervention()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-2xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Intervention</span>
            </Button>
          )}
        </div>
      </div>

      {/* Student Read-Only Mode Banner */}
      {isStudent && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-300/80 bg-amber-50/90 dark:border-amber-900/50 dark:bg-[#2A2315] text-amber-900 dark:text-amber-200 text-xs shadow-xs">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <span className="font-bold block sm:inline">Student Read-Only Mode: </span>
            You are viewing the dashboard in student read-only mode. Attendance trajectories, radar domain profiles, and performance metrics are visible.
            Modifying data, authoring interventions, and adjusting risk tiers are disabled for student accounts.
          </div>
        </div>
      )}

      {/* ── Demo Mode / Connection Status Banner ───────────────────── */}
      {metadata.is_demo && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white border border-indigo-900/50 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                Synthetic Demo Dataset Active
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-teal-400" />
                <span>36 Fictional Student Cohort</span>
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">
              Operating in Verified Prototype Mode
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Synthetic records are held in this backend process. Changes reset when the process restarts or you reset demo data.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/students"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs px-3 py-1.5 font-medium rounded-none transition-colors cursor-pointer"
            >
              Explore Directory
            </Link>
            <Link
              to="/interventions"
              className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-500 text-white border-0 text-xs font-semibold px-3 py-1.5 rounded-none transition-colors cursor-pointer"
            >
              View Active Plans ({summary.active_interventions_count})
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insightCards.map((item) => (
          <div
            key={item.label}
            className={`feature-tile border ${insightTone[item.accent as keyof typeof insightTone]} animate-pulse-glow`}
          >
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">{item.label}</p>
                <p className="mt-3 text-3xl font-black tracking-tight">{item.value}</p>
              </div>
              <div className="rounded-full bg-white/80 dark:bg-slate-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-xs border border-current/15 shrink-0">
                Live
              </div>
            </div>
            <p className="relative z-10 mt-4 text-xs font-medium opacity-80">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-6">
        <Card className="border-slate-200 bg-slate-50/50 dark:bg-slate-900/60">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base font-bold text-slate-900">Live Activity Feed</CardTitle>
                <CardDescription className="text-xs text-slate-500">Recent student events and advisor actions across the cohort.</CardDescription>
              </div>
              <Link to="/students" className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 shrink-0">
                View directory
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentHighlights.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
                No recent activity is available yet.
              </div>
            ) : (
              recentHighlights.map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
                  <div className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold uppercase ${activityTone[item.severity]}`}>
                    {item.activity_type.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
                      <span className="text-[10px] font-medium text-slate-400">{new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{item.student_name} • {item.student_id}</p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-white">Action Center</CardTitle>
              <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-100">Focus</span>
            </div>
            <CardDescription className="text-xs text-slate-300">Next actions for advisory and support teams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-slate-300">Review queue</div>
                <div className="mt-2 text-2xl font-black text-white">{summary.requiring_review_count}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-slate-300">Due follow-up</div>
                <div className="mt-2 text-2xl font-black text-white">{summary.follow_ups_due_count}</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-100">Intervention coverage</span>
                <span className="font-bold text-indigo-200">{intervention_summary.completion_rate}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-indigo-400" style={{ width: `${intervention_summary.completion_rate}%` }} />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Link to="/students" className="inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-3 py-2 text-xs font-semibold transition hover:bg-slate-100">
                Review student roster
              </Link>
              <Link to="/interventions" className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10">
                Open intervention queue
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── KPI Cards Grid (Components 1 & 2 & Metric summaries) ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* KPI 1: Total Students -> Students Directory */}
        <Link to="/students" className="block group">
          <Card hoverable className="border-slate-200 group-hover:border-indigo-300 transition-colors h-full">
            <CardContent className="p-5 flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                  Total Enrolled Cohort
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {summary.total_students}
                  </h3>
                  <span className="text-xs font-medium text-slate-500">
                    ({summary.active_students} active)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{summary.total_students ? ((summary.active_students / summary.total_students) * 100).toFixed(1) : '0'}% Active enrollment</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* KPI 2: Average Student Success Score -> Campus Analytics */}
        <Link to="/analytics" className="block group">
          <Card hoverable className="border-slate-200 group-hover:border-teal-300 transition-colors h-full">
            <CardContent className="p-5 flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-teal-700 transition-colors">
                  Average Success Score
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {summary.average_success_score ?? 'Under Review'}
                  </h3>
                  {summary.average_success_score != null && (
                    <span className="text-xs font-medium text-slate-500">
                      / 100
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>KPMG 7-Domain holistic composite</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* KPI 3: Cohort Attendance Average -> Students Directory sorted by attendance */}
        <Link to="/students?sortBy=attendance_rate&sortDir=asc" className="block group">
          <Card hoverable className="border-slate-200 group-hover:border-emerald-300 transition-colors h-full">
            <CardContent className="p-5 flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-emerald-700 transition-colors">
                  Cohort Attendance Rate
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {summary.average_attendance}%
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{summary.attendance_status}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* KPI 4: Students Requiring Academic Review -> Students filtered by review need */}
        <Link to="/students?risk_tier=critical" className="block group">
          <Card hoverable className="border-slate-200 group-hover:border-amber-300 transition-colors h-full">
            <CardContent className="p-5 flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-amber-700 transition-colors">
                  Academic Review Required
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {summary.requiring_review_count}
                  </h3>
                  <span className="text-xs font-semibold text-amber-600">
                    {summary.review_percentage}% of cohort
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Advisor Check-in Needed</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* KPI 5: Placement Support Needed -> Students filtered by placement risk */}
        <Link to="/students?placement_risk=high" className="block group">
          <Card hoverable className="border-slate-200 group-hover:border-sky-300 transition-colors h-full">
            <CardContent className="p-5 flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-sky-700 transition-colors">
                  Placement Support Needed
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {placementSupportCount}
                  </h3>
                  <span className="text-xs font-semibold text-sky-600">
                    {summary.total_students ? ((placementSupportCount / summary.total_students) * 100).toFixed(1) : '0'}% of cohort
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-sky-600 font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>High or Moderate Career Risk</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs">
                <Briefcase className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* KPI 6: Underway Interventions -> Interventions Hub */}
        <Link to="/interventions" className="block group">
          <Card hoverable className="border-slate-200 group-hover:border-purple-300 transition-colors h-full">
            <CardContent className="p-5 flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-purple-700 transition-colors">
                  Active Support Plans
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {summary.active_interventions_count}
                  </h3>
                  <span className="text-xs font-medium text-slate-500">
                    of {intervention_summary.total} total
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{summary.follow_ups_due_count} Overdue or due within 7 days</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs">
                <ClipboardCheck className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* ── KPMG 7-Domain Intelligence & Placement Readiness ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DomainRadarOverview domainAverages={domain_averages} />
        <PlacementReadinessCard placementSummary={placement_readiness_summary} />
      </div>

      {/* ── 7-Domain Telemetry Ingestion & Risk Governance ──────────── */}
      <TelemetryGovernanceCard
        domainCoverage={data.domain_coverage}
        totalStudents={summary.total_students}
        academicRiskDistribution={data.academic_risk_distribution}
        placementRiskDistribution={data.placement_risk_distribution}
      />

      {/* ── Dual Risk Matrix & Strategic Student Segmentation ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DualRiskMatrixCard dualRiskMatrix={dual_risk_matrix} />
        </div>
        <div className="lg:col-span-2">
          <StudentSegmentationCard segmentDistribution={segmentation_distribution} />
        </div>
      </div>

      {/* ── Main Charts Row (Components 3 & 5) ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component 3: Attendance Trajectory Area Chart (2 Cols) */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-bold text-slate-900">
                Institutional Attendance Trajectory
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Recorded daily attendance. Time windows end at the latest recorded date. Prototype benchmark: 80%.
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                <span>Attendance %</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2.5 h-0.5 bg-rose-500 inline-block" />
                <span>80% Minimum</span>
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-68 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartRange(attendance_trend)}
                  margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="attRateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    domain={[60, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `${val}%`}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg, #ffffff)',
                      borderRadius: 0,
                      border: '1px solid var(--tooltip-border, #e2e8f0)',
                      color: 'var(--tooltip-text, #1e293b)',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [
                      `${Number(val || 0)}%`,
                      'Attendance Rate',
                    ]}
                  />
                  <ReferenceLine
                    y={80}
                    stroke="#ef4444"
                    strokeDasharray="4 4"
                    label={{
                      value: '80% Benchmark',
                      position: 'top',
                      fill: '#ef4444',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance_rate"
                    stroke="#4338ca"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#attRateGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Component 5: Student Distribution by Explainable Risk Category */}
        <Card className="border-slate-200 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Explainable Risk Segmentation
              </CardTitle>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                N={summary.total_students}
              </span>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Deterministic tier classification based on attendance, academic, and engagement indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Donut Chart */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={risk_distribution}
                    dataKey="count"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={4}
                    className="cursor-pointer"
                    onClick={(entry: any) => {
                      if (entry && entry.tier) {
                        navigate(`/students?risk_tier=${entry.tier}`);
                      }
                    }}
                  >
                    {risk_distribution.map((entry) => (
                      <Cell
                        key={`cell-${entry.tier}`}
                        fill={entry.color}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg, #ffffff)',
                      borderRadius: 0,
                      border: '1px solid var(--tooltip-border, #e2e8f0)',
                      color: 'var(--tooltip-text, #1e293b)',
                      fontSize: '12px',
                    }}
                    formatter={(val: any, name: any) => [
                      `${Number(val || 0)} students`,
                      String(name || ''),
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tier Legend & Counts */}
            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              {risk_distribution.map((tier) => (
                <Link
                  key={tier.tier}
                  to={`/students?risk_tier=${tier.tier}`}
                  className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-100/80 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: tier.color }}
                    />
                    <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                      {tier.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tier.count}
                    </span>
                    <span className="text-[11px] text-slate-400 w-10 text-right">
                      {tier.percentage}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Component 4: Assessment Performance Trend & Component 8: Intervention Status ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component 4: Assessment Performance Trend Chart (2 Cols) */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-bold text-slate-900">
                Assessment Performance Trajectory
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Recorded assessment dates. Time windows end at the latest recorded assessment.
              </CardDescription>
            </div>
            <Badge variant="primary" size="sm" className="shrink-0 self-start sm:self-auto">
              Average: {summary.cohort_avg_score}%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartRange(assessment_trend)}
                  margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    domain={[50, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `${val}%`}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg, #ffffff)',
                      borderRadius: 0,
                      border: '1px solid var(--tooltip-border, #e2e8f0)',
                      color: 'var(--tooltip-text, #1e293b)',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [
                      `${Number(val || 0)}%`,
                      'Average Score',
                    ]}
                  />
                  <Bar
                    dataKey="average_score"
                    fill="#0f766e"
                    radius={[4, 4, 0, 0]}
                    name="Cohort Average"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Component 8: Intervention Status Summary */}
        <Card className="border-slate-200 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base font-bold text-slate-900">
                Intervention Registry Overview
              </CardTitle>
              <Link
                to="/interventions"
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Active support plans, scheduled reviews, and completion status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Segment */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
                <span>Support Plan Progression</span>
                <span className="font-bold text-slate-900">
                  {intervention_summary.completion_rate}% Concluded
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                <div
                  className="bg-indigo-600 h-full"
                  style={{
                    width: `${(intervention_summary.in_progress / (intervention_summary.total || 1)) * 100}%`,
                  }}
                  title={`In Progress: ${intervention_summary.in_progress}`}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{
                    width: `${(intervention_summary.planned / (intervention_summary.total || 1)) * 100}%`,
                  }}
                  title={`Planned: ${intervention_summary.planned}`}
                />
                <div
                  className="bg-emerald-500 h-full"
                  style={{
                    width: `${(intervention_summary.completed / (intervention_summary.total || 1)) * 100}%`,
                  }}
                  title={`Completed: ${intervention_summary.completed}`}
                />
              </div>
            </div>

            {/* Status Breakdown Pills */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[11px] text-slate-500">In Progress</div>
                <div className="text-lg font-bold text-indigo-700">
                  {intervention_summary.in_progress}
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[11px] text-slate-500">Planned</div>
                <div className="text-lg font-bold text-amber-600">
                  {intervention_summary.planned}
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[11px] text-slate-500">Under Review</div>
                <div className="text-lg font-bold text-purple-600">
                  {intervention_summary.under_review}
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[11px] text-slate-500">Completed</div>
                <div className="text-lg font-bold text-emerald-600">
                  {intervention_summary.completed}
                </div>
              </div>
            </div>

            {/* Upcoming Milestones Alert */}
            <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Overdue or due in next 7 days</span>
              </div>
              <Badge variant="primary" size="sm">
                {intervention_summary.upcoming_follow_ups} Due
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Component 7: Students Needing Follow-up (Priority Action Table) ── */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold text-slate-900">
                Students Requiring Advisory Follow-Up
              </CardTitle>
              <Badge variant="warning" size="sm">
                {filteredFollowUps.length} flagged
              </Badge>
            </div>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              Prioritized by composite risk score with observable signals to guide advisor intervention
            </CardDescription>
          </div>

          {/* Table Filters & Search */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, ID or signal..."
                value={followUpSearch}
                onChange={(e) => setFollowUpSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full sm:w-56 transition-all"
              />
            </div>

            {/* Tier Filters Tabs */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setFollowUpFilter('all')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  followUpFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFollowUpFilter('critical')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  followUpFilter === 'critical' ? 'bg-rose-600 text-white shadow-2xs font-bold' : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                Critical
              </button>
              <button
                type="button"
                onClick={() => setFollowUpFilter('high')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  followUpFilter === 'high' ? 'bg-amber-600 text-white shadow-2xs font-bold' : 'text-amber-700 hover:bg-amber-50'
                }`}
              >
                High
              </button>
              <button
                type="button"
                onClick={() => setFollowUpFilter('medium')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  followUpFilter === 'medium' ? 'bg-yellow-600 text-white shadow-2xs font-bold' : 'text-yellow-700 hover:bg-yellow-50'
                }`}
              >
                Moderate
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredFollowUps.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No Students Match Current Criteria"
                description="Try expanding the risk tier filter or clearing your search keywords."
                actionLabel="Clear Filters"
                onAction={() => {
                  setFollowUpFilter('all');
                  setFollowUpSearch('');
                }}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#35433B] bg-[#EEF2F6] dark:bg-[#1D2722] text-slate-700 dark:text-[#CBD5CF] font-semibold">
                    <th className="py-3 px-4">Student & ID</th>
                    <th className="py-3 px-4">Cohort</th>
                    <th className="py-3 px-4">Risk Tier</th>
                    <th className="py-3 px-4">Primary Contributing Factor</th>
                    <th className="py-3 px-4 text-center">Attendance</th>
                    <th className="py-3 px-4 text-center">Avg Score</th>
                    <th className="py-3 px-4">Last recorded event</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#25322B] text-slate-700 dark:text-[#CBD5CF]">
                  {filteredFollowUps.map((student) => {
                    const badgeVariant = {
                      insufficient_data: 'neutral',
    critical: 'danger',
                      high: 'warning',
                      moderate: 'warning',
                      medium: 'warning',
                      low: 'success',
                    }[student.risk_level] as 'danger' | 'warning' | 'success';

                    return (
                      <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1D2722]/60 transition-colors">
                        {/* Student Name */}
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => handleOpenProfile(student)}
                            className="font-bold text-slate-900 dark:text-[#E2ECE6] hover:text-indigo-600 dark:hover:text-[#56B594] text-left transition-colors"
                          >
                            {student.name}
                          </button>
                          <div className="font-mono text-[11px] text-slate-400 dark:text-[#8FA89B]">
                            {student.student_id}
                          </div>
                        </td>

                        {/* Grade & Section */}
                        <td className="py-3 px-4 text-slate-600 dark:text-[#CBD5CF]">
                          {student.grade} <span className="text-slate-400 dark:text-[#8FA89B]">({student.section || 'A'})</span>
                        </td>

                        {/* Risk Level & Score */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <Badge variant={badgeVariant} size="sm">
                              {student.risk_level.toUpperCase()}
                            </Badge>
                            <span className="font-bold text-slate-700 dark:text-[#CBD5CF] text-[11px]">
                              {student.risk_score}
                            </span>
                          </div>
                        </td>

                        {/* Primary Factor */}
                        <td className="py-3 px-4 max-w-xs text-slate-700 dark:text-[#CBD5CF]">
                          <div className="truncate text-xs font-medium" title={student.primary_risk_factor}>
                            {student.primary_risk_factor}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-[#8FA89B]">
                            Status: {student.status}
                          </div>
                        </td>

                        {/* Attendance Rate */}
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`font-semibold ${
                              student.attendance_rate != null && student.attendance_rate < 80 ? 'text-amber-600 dark:text-[#F6D289]' : 'text-emerald-600 dark:text-[#5EEAD4]'
                            }`}
                          >
                            {student.attendance_rate}%
                          </span>
                        </td>

                        {/* Avg Score */}
                        <td className="py-3 px-4 text-center font-semibold text-slate-800 dark:text-[#E2ECE6]">
                          {student.avg_score}%
                        </td>

                        {/* Last Interaction */}
                        <td className="py-3 px-4 text-slate-500 dark:text-[#8FA89B] text-[11px]">
                          {student.last_interaction}
                        </td>

                        {/* Quick Actions (Component 9) */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-700 hover:text-slate-900 text-xs px-2"
                              onClick={() => handleOpenProfile(student)}
                              title="Open Student Dossier"
                            >
                              Profile
                            </Button>
                            {isStaff && (
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 text-xs px-2 flex items-center justify-center rounded-md"
                                onClick={() => handleOpenIntervention(student)}
                                title="Assign Intervention Support Plan"
                              >
                                <span>Intervene</span>
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Component 6: Recent Student Activity Stream & Ethical AI Roadmap ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Component 6: Recent Activity Feed */}
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Recent Student Activity Stream
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Chronological milestone events and automated threshold signals
              </CardDescription>
            </div>
            <Link
              to="/journey"
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Timeline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent_activity.map((act) => {
              const dotColor = {
                success: 'bg-emerald-500',
                warning: 'bg-amber-500',
                critical: 'bg-rose-500',
                info: 'bg-indigo-500',
              }[act.severity || 'info'];

              return (
                <div
                  key={act.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-slate-100/60 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${dotColor} mt-1.5 shrink-0`} />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{act.title}</span>
                      <span className="text-[11px] text-slate-400">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{act.description}</p>
                    <div className="mt-1 text-[11px] text-slate-400 font-mono">
                      Student: {act.student_name} ({act.student_id})
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Ethical AI Assurance & Challenge Submission Scope */}
        <Card className="border-slate-200 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-slate-900">
              Ethical AI Principles & Platform Integrity
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              KPMG Challenge submission architecture guidelines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-teal-900">Human-in-the-Loop Decision Support</div>
                  <p className="text-[11px] text-teal-800 mt-0.5">
                    Risk indices synthesize observable signals (attendance rates, assessment scores, LMS participation). No punitive decisions are executed automatically.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-indigo-200 bg-indigo-50/60 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-indigo-900">Non-Causal Outcome Attribution</div>
                  <p className="text-[11px] text-indigo-800 mt-0.5">
                    Intervention outcomes compare pre- and post-metric variance with mandatory disclaimers. Platform does not claim unproven causal attribution without randomized controls.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Row Level Security & Minimal Client Keys</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    The frontend calls the authorized backend. Database policies require deployment verification; no privileged keys belong in the browser.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
              <span>EduNexus AI • KPMG Challenge Prototype</span>
              <span>Stage 3 Dashboard Complete</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Modals (Component 9) ──────────────────────────────────── */}
      <CreateInterventionModal
        isOpen={interventionModalOpen}
        onClose={() => setInterventionModalOpen(false)}
        preselectedStudent={selectedStudentForIntervention}
        studentsList={data.follow_up_students}
        onSubmit={createIntervention}
      />

      <StudentQuickProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        student={selectedStudentForProfile}
        onOpenIntervention={handleOpenIntervention}
      />
    </div>
  );
};
