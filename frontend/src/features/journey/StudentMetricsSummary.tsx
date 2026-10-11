import React from 'react';
import {
  CalendarCheck,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Minus,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import type { StudentJourneyProfileResponse } from '../../types';

interface StudentMetricsSummaryProps {
  profile: StudentJourneyProfileResponse;
}

export const StudentMetricsSummary: React.FC<StudentMetricsSummaryProps> = ({ profile }) => {
  const { attendance_rate, average_score, latest_assessment_percentage, trend, review_status, interventions } = profile;

  const trendIcon = {
    improving: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />,
    declining: <TrendingDown className="w-3.5 h-3.5 text-rose-600" />,
    stable: <Minus className="w-3.5 h-3.5 text-slate-400" />,
  }[trend];

  const trendColor = {
    improving: 'text-emerald-600',
    declining: 'text-rose-600',
    stable: 'text-slate-600',
  }[trend];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Attendance Rate */}
      <Card hoverable className="border-slate-200">
        <CardContent className="p-5 flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Recorded Attendance
            </p>
            <h3
              className={`text-2xl font-black ${
                attendance_rate < 80.0 ? 'text-amber-600' : 'text-slate-900'
              }`}
            >
              {attendance_rate.toFixed(1)}%
            </h3>
            <div className="flex items-center gap-1 text-xs font-medium">
              {attendance_rate >= 80.0 ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Above 80% Institutional Min</span>
                </span>
              ) : (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{(80.0 - attendance_rate).toFixed(1)}% below target threshold</span>
                </span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 shadow-2xs">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      {/* Metric 2: Academic Evaluation Average */}
      <Card hoverable className="border-slate-200">
        <CardContent className="p-5 flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Academic Average
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              {average_score.toFixed(1)}%
            </h3>
            <p className="text-xs text-slate-500">
              Latest Cycle Eval:{' '}
              <strong className="text-slate-800">
                {latest_assessment_percentage !== undefined
                  ? `${latest_assessment_percentage.toFixed(1)}%`
                  : 'N/A'}
              </strong>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
            <GraduationCap className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      {/* Metric 3: Performance Trajectory Trend */}
      <Card hoverable className="border-slate-200">
        <CardContent className="p-5 flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Performance Trend
            </p>
            <div className="flex items-center gap-2">
              <h3 className={`text-2xl font-black capitalize ${trendColor}`}>{trend}</h3>
              <div className="p-1 rounded-md bg-slate-100">{trendIcon}</div>
            </div>
            <p className="text-xs text-slate-500">
              Computed over semester cycles
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs">
            <TrendingUp className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      {/* Metric 4: Support Status */}
      <Card hoverable className="border-slate-200">
        <CardContent className="p-5 flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Advisory Workflow
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              {review_status}
            </h3>
            <p className="text-xs text-indigo-600 font-medium">
              {interventions.length} Support {interventions.length === 1 ? 'Plan' : 'Plans'} Logged
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
            <HeartHandshake className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
