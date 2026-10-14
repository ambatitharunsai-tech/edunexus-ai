import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import type { StudentListItem } from '../../types';

interface StudentTableProps {
  students: StudentListItem[];
  onOpenIntervention?: (student: StudentListItem) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onOpenIntervention,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Student & ID</th>
              <th className="py-3 px-4">Department & Cohort</th>
              <th className="py-3 px-4 text-center">Success Score</th>
              <th className="py-3 px-4 text-center">Attendance %</th>
              <th className="py-3 px-4 text-center">Latest Eval %</th>
              <th className="py-3 px-4 text-center">Trajectory Trend</th>
              <th className="py-3 px-4">Decoupled Risks</th>
              <th className="py-3 px-4">Review Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {students.map((student) => {
              const acadRiskVariant = {
                insufficient_data: 'neutral',
    critical: 'danger',
                high: 'warning',
                moderate: 'warning',
                medium: 'warning',
                low: 'success',
              }[student.academic_risk_tier || student.risk_tier || 'low'] as 'danger' | 'warning' | 'success';

              const placeRiskVariant = {
                insufficient_data: 'neutral',
    critical: 'danger',
                high: 'warning',
                moderate: 'warning',
                medium: 'warning',
                low: 'success',
              }[student.placement_risk_tier || 'low'] as 'danger' | 'warning' | 'success';

              const trendIcon = {
                improving: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />,
                declining: <TrendingDown className="w-3.5 h-3.5 text-rose-600" />,
                stable: <Minus className="w-3.5 h-3.5 text-slate-400" />,
              }[student.trend || 'stable'];

              const trendBadgeClass = {
                improving: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                declining: 'bg-rose-50 text-rose-700 border-rose-200',
                stable: 'bg-slate-50 text-slate-600 border-slate-200',
              }[student.trend || 'stable'];

              const initials = `${student.first_name[0] || ''}${student.last_name[0] || ''}`.toUpperCase();

              const successScoreColor =
                student.success_score === null || student.success_score === undefined
                  ? 'text-slate-400 bg-slate-50 border-slate-200'
                  : student.success_score >= 80
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : student.success_score >= 65
                  ? 'text-teal-700 bg-teal-50 border-teal-200'
                  : student.success_score >= 50
                  ? 'text-amber-700 bg-amber-50 border-amber-200'
                  : 'text-rose-700 bg-rose-50 border-rose-200';

              return (
                <tr key={student.id} className="hover:bg-slate-50/75 transition-colors group">
                  {/* Student Code & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center shrink-0 border border-indigo-100 select-none">
                        {initials}
                      </div>
                      <div>
                        <Link
                          to={`/journey?student_id=${student.id}`}
                          className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors"
                        >
                          {student.first_name} {student.last_name}
                        </Link>
                        <div className="font-mono text-[11px] text-slate-400">
                          {student.student_id}
                        </div>
                        {student.segment_label && (
                          <div className="mt-0.5">
                            <span
                              className={`inline-block px-1.5 py-0.5 text-[9px] font-bold rounded ${
                                student.segment_badge_color === 'emerald'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : student.segment_badge_color === 'blue'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : student.segment_badge_color === 'amber'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : student.segment_badge_color === 'rose'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-purple-50 text-purple-700 border border-purple-200'
                              }`}
                            >
                              {student.segment_label}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Department & Cohort */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      {student.department || 'General Academics'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {student.current_grade} • Sec {student.section || 'A'}
                    </div>
                  </td>

                  {/* Student Success Score */}
                  <td className="py-3.5 px-4 text-center">
                    {student.success_score !== null && student.success_score !== undefined ? (
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${successScoreColor}`}>
                          {student.success_score.toFixed(1)}/100
                        </span>
                        <div className="text-[10px] text-slate-400 capitalize mt-0.5">
                          {student.success_tier || 'active'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium italic">
                        Insufficient Data
                      </span>
                    )}
                  </td>

                  {/* Attendance Rate */}
                  <td className="py-3.5 px-4 text-center">
                    <div
                      className={`font-bold ${
                        (student.attendance_rate || 0) < 80.0
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {student.attendance_rate != null ? `${student.attendance_rate.toFixed(1)}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {student.attendance_rate == null ? 'Awaiting records' : student.attendance_rate < 80 ? 'Below benchmark' : 'Benchmark met'}
                    </span>
                  </td>

                  {/* Latest Assessment Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-slate-900">
                      {student.latest_assessment_percentage != null
                        ? `${student.latest_assessment_percentage.toFixed(1)}%`
                        : student.average_score == null ? 'N/A' : `${student.average_score.toFixed(1)}%`}
                    </span>
                    <div className="text-[10px] text-slate-400">
                      Avg: {student.average_score == null ? 'N/A' : `${student.average_score.toFixed(1)}%`}
                    </div>
                  </td>

                  {/* Performance Trend */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${trendBadgeClass}`}
                    >
                      {trendIcon}
                      <span className="capitalize">{student.trend || 'stable'}</span>
                    </span>
                  </td>

                  {/* Decoupled Risks: Academic & Placement */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium text-slate-400 w-10">Acad:</span>
                        <Badge variant={acadRiskVariant} size="sm">
                          {(student.academic_risk_tier || student.risk_tier || 'low').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium text-slate-400 w-10">Place:</span>
                        <Badge variant={placeRiskVariant} size="sm">
                          {(student.placement_risk_tier || 'low').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </td>

                  {/* Review Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs font-semibold ${
                        student.review_status === 'Needs Review'
                          ? 'text-amber-600'
                          : student.review_status === 'Active Support Plan'
                          ? 'text-indigo-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {student.review_status || 'On Track'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {onOpenIntervention && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenIntervention(student)}
                          title="Assign Student Support Plan"
                          className="text-indigo-600 hover:text-indigo-800 p-1.5 h-auto"
                        >
                          <HeartHandshake className="w-4 h-4" />
                        </Button>
                      )}
                      <Link to={`/journey?student_id=${student.id}`}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 text-xs px-2.5 flex items-center gap-1"
                        >
                          <span>Journey</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
