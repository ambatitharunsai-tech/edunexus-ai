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
              <th className="py-3 px-4 text-center">Attendance %</th>
              <th className="py-3 px-4 text-center">Latest Eval %</th>
              <th className="py-3 px-4 text-center">Trajectory Trend</th>
              <th className="py-3 px-4">Risk Category</th>
              <th className="py-3 px-4">Review Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {students.map((student) => {
              const riskVariant = {
                critical: 'danger',
                high: 'warning',
                medium: 'warning',
                low: 'success',
              }[student.risk_tier || 'low'] as 'danger' | 'warning' | 'success';

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

                  {/* Attendance Rate */}
                  <td className="py-3.5 px-4 text-center">
                    <div
                      className={`font-bold ${
                        (student.attendance_rate || 0) < 80.0
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {student.attendance_rate ? `${student.attendance_rate.toFixed(1)}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {(student.attendance_rate || 0) < 80.0 ? 'Below 80% Min' : 'Target Met'}
                    </span>
                  </td>

                  {/* Latest Assessment Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-slate-900">
                      {student.latest_assessment_percentage !== undefined
                        ? `${student.latest_assessment_percentage.toFixed(1)}%`
                        : `${(student.average_score || 0).toFixed(1)}%`}
                    </span>
                    <div className="text-[10px] text-slate-400">
                      Avg: {(student.average_score || 0).toFixed(1)}%
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

                  {/* Risk Tier & Score */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={riskVariant} size="sm">
                        {(student.risk_tier || 'low').toUpperCase()}
                      </Badge>
                      <span className="font-bold text-slate-700 text-[11px]">
                        {student.risk_score || 0}
                      </span>
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
