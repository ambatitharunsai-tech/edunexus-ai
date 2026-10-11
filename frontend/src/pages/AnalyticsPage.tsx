import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Download,
  Calendar,
  Lightbulb,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const gradeRiskData = [
  { grade: 'Grade 9', low: 52, moderate: 12, high: 4, critical: 2 },
  { grade: 'Grade 10', low: 48, moderate: 14, high: 5, critical: 1 },
  { grade: 'Grade 11', low: 42, moderate: 10, high: 6, critical: 2 },
  { grade: 'Grade 12', low: 40, moderate: 8, high: 3, critical: 1 },
];

const attendancePerformanceTrend = [
  { month: 'Jun', attendance: 92, academicScore: 78 },
  { month: 'Jul', attendance: 90, academicScore: 76 },
  { month: 'Aug', attendance: 86, academicScore: 72 },
  { month: 'Sep', attendance: 84, academicScore: 71 },
  { month: 'Oct', attendance: 87, academicScore: 75 },
];

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('term2');

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Analytics & Journey Intelligence</h2>
          <p className="text-xs text-slate-500">
            Cohort-level trend exploration, multi-factor correlation, and intervention impact tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none pr-2 py-0.5"
              aria-label="Select Time Range"
            >
              <option value="term2">Term 2 (Current)</option>
              <option value="term1">Term 1 (Past)</option>
              <option value="annual">Full Academic Year</option>
            </select>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export Insights
          </Button>
        </div>
      </div>

      {/* Analytical Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Attendance-Score Correlation</h4>
            <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
              Students maintaining attendance ≥85% exhibit a 24.3% higher average score in standardized STEM evaluations.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Intervention Response Velocity</h4>
            <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
              Interventions logged within 14 days of an attendance dip show a 68% rate of attendance stabilization within 30 days.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance vs Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance vs Academic Score Trajectory</CardTitle>
            <CardDescription>
              Monthly cohort progression comparing average attendance with assessment marks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={attendancePerformanceTrend}
                  margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis
                    domain={[60, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line
                    type="monotone"
                    name="Attendance Rate"
                    dataKey="attendance"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="Academic Score Avg"
                    dataKey="academicScore"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution by Grade */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Tier Breakdown by Grade</CardTitle>
            <CardDescription>
              Distribution of support needs across cohort levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gradeRiskData}
                  margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar name="Low Risk" dataKey="low" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar name="Moderate" dataKey="moderate" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar name="High Focus" dataKey="high" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar name="Critical" dataKey="critical" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
