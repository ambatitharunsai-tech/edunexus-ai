import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CalendarCheck,
  AlertTriangle,
  HeartHandshake,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
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

// Sample visual trend data for Stage 1 foundation
const weeklyAttendanceData = [
  { week: 'W1', attendance: 88, threshold: 80 },
  { week: 'W2', attendance: 86, threshold: 80 },
  { week: 'W3', attendance: 89, threshold: 80 },
  { week: 'W4', attendance: 84, threshold: 80 },
  { week: 'W5', attendance: 82, threshold: 80 },
  { week: 'W6', attendance: 87, threshold: 80 },
  { week: 'W7', attendance: 85, threshold: 80 },
  { week: 'W8', attendance: 86.8, threshold: 80 },
];

const riskDistributionData = [
  { tier: 'Low Risk', count: 182, fill: '#10b981' },
  { tier: 'Moderate', count: 44, fill: '#f59e0b' },
  { tier: 'High Focus', count: 18, fill: '#f97316' },
  { tier: 'Critical', count: 6, fill: '#ef4444' },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Platform Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 text-white uppercase tracking-wider">
              Stage 1 Foundation
            </span>
            <span className="text-xs text-indigo-200">
              Prototype Ready for Evaluation
            </span>
          </div>
          <h2 className="text-lg font-bold">
            EduNexus AI Student Journey & Success Intelligence
          </h2>
          <p className="text-xs text-indigo-100 max-w-2xl mt-0.5">
            Holistic monitoring combining academic trends, attendance signals, and transparent intervention tracking.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/students">
            <Button variant="secondary" size="sm">
              Explore Directory
            </Button>
          </Link>
          <Link to="/interventions">
            <Button
              className="bg-indigo-500 hover:bg-indigo-400 text-white border-0"
              size="sm"
            >
              Active Plans
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <Card hoverable>
          <CardContent className="p-5 flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Total Enrolled Cohort</p>
              <h3 className="text-2xl font-bold text-slate-900">250</h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>98.4% Active Retention</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card hoverable>
          <CardContent className="p-5 flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Cohort Attendance Avg</p>
              <h3 className="text-2xl font-bold text-slate-900">86.8%</h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Above 80% Institutional Min</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 3 */}
        <Card hoverable>
          <CardContent className="p-5 flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Focus & Support Flags</p>
              <h3 className="text-2xl font-bold text-slate-900">24</h3>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Requires Advisor Review</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 4 */}
        <Card hoverable>
          <CardContent className="p-5 flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Interventions Underway</p>
              <h3 className="text-2xl font-bold text-slate-900">18</h3>
              <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>4 Follow-ups Due This Week</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Institutional Attendance Trajectory</CardTitle>
              <CardDescription>
                Weekly aggregated attendance rate across all grade sections
              </CardDescription>
            </div>
            <Badge variant="primary" size="sm">
              Term 2
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyAttendanceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="attGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis
                    domain={[70, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val}%`, 'Attendance']}
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#attGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cohort Risk Segmentation</CardTitle>
            <CardDescription>
              Transparent tier allocation based on multi-factor signals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={riskDistributionData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis
                    type="category"
                    dataKey="tier"
                    tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Next Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sample Journey Milestone Feed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Journey Milestones</CardTitle>
              <CardDescription>
                Chronological event stream from student activities
              </CardDescription>
            </div>
            <Link to="/journey" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              <span>View full timeline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Attendance Recovery Milestone</span>
                  <span className="text-[11px] text-slate-400">Today, 09:30</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  Aarav Sharma (STU-001) completed 10 consecutive attended days following peer mentorship session.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Midterm Mathematics Variance</span>
                  <span className="text-[11px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  Diya Patel (STU-042) flagged for academic intervention: score variance of -18% vs baseline.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Parent Advisory Completed</span>
                  <span className="text-[11px] text-slate-400">2 days ago</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  Rohan Mehta (STU-019) counseling intervention status transitioned to &apos;In Progress&apos;.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prototype Capabilities Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Platform Capabilities & Stage Roadmap</CardTitle>
            <CardDescription>
              KPMG Challenge submission feature coverage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-800">Stage 1: Architecture & Foundation</span>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-500">2</span>
                  <span className="text-slate-700">Stage 2: Supabase Schema & Row-Level Security</span>
                </div>
                <span className="text-[11px] text-slate-400">Next Stage</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-500">3</span>
                  <span className="text-slate-700">Stage 3: Explainable Risk Engine & CSV Pipeline</span>
                </div>
                <span className="text-[11px] text-slate-400">Queued</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-900 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Senior Engineer Architecture Note</span>
              </div>
              <p className="text-[11px] text-indigo-700">
                Frontend uses clean component contracts and typed data structures. Backend implements robust CORS, GET /health, and uniform error schemas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
