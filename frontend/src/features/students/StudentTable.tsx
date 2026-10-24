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
  selectedIds?: string[];
  onToggleSelect?: (studentId: string) => void;
  onToggleSelectAll?: () => void;
  isAllSelected?: boolean;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onOpenIntervention,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  isAllSelected = false,
}) => {
  const showSelect = typeof onToggleSelect === 'function';

  return (
    <div className="bg-white dark:bg-[#151C19] rounded-none border border-slate-200 dark:border-[#35433B] overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#35433B] bg-[#EEF2F6] dark:bg-[#1D2722] text-slate-700 dark:text-[#CBD5CF] font-semibold uppercase tracking-wider text-[11px]">
              {showSelect && (
                <th className="py-3 px-3 text-center w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onToggleSelectAll}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    aria-label="Select all students on current page"
                  />
                </th>
              )}
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
          <tbody className="divide-y divide-slate-100 dark:divide-[#25322B] text-slate-700 dark:text-[#CBD5CF]">
            {students.map((student) => {
              const isSelected = selectedIds?.includes(student.id) || false;
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
                improving: <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-[#5EEAD4]" />,
                declining: <TrendingDown className="w-3.5 h-3.5 text-rose-600 dark:text-[#F87171]" />,
                stable: <Minus className="w-3.5 h-3.5 text-slate-400 dark:text-[#8FA89B]" />,
              }[student.trend || 'stable'];

              const trendBadgeClass = {
                improving: 'bg-emerald-50 dark:bg-[#142820] text-emerald-700 dark:text-[#5EEAD4] border-emerald-200 dark:border-[#1D4633]',
                declining: 'bg-rose-50 dark:bg-[#281618] text-rose-700 dark:text-[#F87171] border-rose-200 dark:border-[#4A1E24]',
                stable: 'bg-slate-50 dark:bg-[#1D2722] text-slate-600 dark:text-[#CBD5CF] border-slate-200 dark:border-[#35433B]',
              }[student.trend || 'stable'];

              const initials = `${student.first_name[0] || ''}${student.last_name[0] || ''}`.toUpperCase();

              const successScoreColor =
                student.success_score === null || student.success_score === undefined
                  ? 'text-slate-400 dark:text-[#8FA89B] bg-slate-50 dark:bg-[#1D2722] border-slate-200 dark:border-[#35433B]'
                  : student.success_score >= 80
                  ? 'text-emerald-700 dark:text-[#5EEAD4] bg-emerald-50 dark:bg-[#142820] border-emerald-200 dark:border-[#1D4633]'
                  : student.success_score >= 65
                  ? 'text-teal-700 dark:text-[#5EEAD4] bg-teal-50 dark:bg-[#122824] border-teal-200 dark:border-[#1E4B41]'
                  : student.success_score >= 50
                  ? 'text-amber-700 dark:text-[#F6D289] bg-amber-50 dark:bg-[#261F14] border-amber-200 dark:border-[#45331C]'
                  : 'text-rose-700 dark:text-[#F87171] bg-rose-50 dark:bg-[#281618] border-rose-200 dark:border-[#4A1E24]';

              return (
                <tr
                  key={student.id}
                  className={`hover:bg-slate-50/75 dark:hover:bg-[#1D2722]/60 transition-colors group ${
                    isSelected ? 'bg-indigo-50/40 dark:bg-[#153E31]/20' : ''
                  }`}
                >
                  {showSelect && (
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect?.(student.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        aria-label={`Select ${student.first_name} ${student.last_name}`}
                      />
                    </td>
                  )}
                  {/* Student Code & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-none bg-indigo-50 dark:bg-[#1D332A] text-indigo-700 dark:text-[#56B594] font-bold flex items-center justify-center shrink-0 border border-indigo-100 dark:border-[#1D4633] select-none">
                        {initials}
                      </div>
                      <div>
                        <Link
                          to={`/journey?student_id=${student.id}`}
                          className="font-bold text-slate-900 dark:text-[#E2ECE6] group-hover:text-indigo-600 dark:group-hover:text-[#56B594] transition-colors"
                        >
                          {student.first_name} {student.last_name}
                        </Link>
                        <div className="font-mono text-[11px] text-slate-400 dark:text-[#8FA89B]">
                          {student.student_id}
                        </div>
                        {student.segment_label && (
                          <div className="mt-0.5">
                            <span
                              className={`inline-block px-1.5 py-0.5 text-[9px] font-bold rounded-none ${
                                student.segment_badge_color === 'emerald'
                                  ? 'bg-emerald-50 dark:bg-[#142820] text-emerald-700 dark:text-[#5EEAD4] border border-emerald-200 dark:border-[#1D4633]'
                                  : student.segment_badge_color === 'blue'
                                  ? 'bg-blue-50 dark:bg-[#14252E] text-blue-700 dark:text-[#7DD3FC] border border-blue-200 dark:border-[#1E3A4B]'
                                  : student.segment_badge_color === 'amber'
                                  ? 'bg-amber-50 dark:bg-[#261F14] text-amber-700 dark:text-[#F6D289] border border-amber-200 dark:border-[#45331C]'
                                  : student.segment_badge_color === 'rose'
                                  ? 'bg-rose-50 dark:bg-[#281618] text-rose-700 dark:text-[#F87171] border border-rose-200 dark:border-[#4A1E24]'
                                  : 'bg-purple-50 dark:bg-[#172A30] text-purple-700 dark:text-[#9BD3DC] border border-purple-200 dark:border-[#284C55]'
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
                    <div className="font-semibold text-slate-800 dark:text-[#E2ECE6]">
                      {student.department || 'General Academics'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-[#8FA89B]">
                      {student.current_grade} • Sec {student.section || 'A'}
                    </div>
                  </td>

                  {/* Student Success Score */}
                  <td className="py-3.5 px-4 text-center">
                    {student.success_score !== null && student.success_score !== undefined ? (
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded-none text-xs font-bold border ${successScoreColor}`}>
                          {student.success_score.toFixed(1)}/100
                        </span>
                        <div className="text-[10px] text-slate-400 dark:text-[#8FA89B] capitalize mt-0.5">
                          {student.success_tier || 'active'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 dark:text-[#8FA89B] font-medium italic">
                        Insufficient Data
                      </span>
                    )}
                  </td>

                  {/* Attendance Rate */}
                  <td className="py-3.5 px-4 text-center">
                    <div
                      className={`font-bold ${
                        (student.attendance_rate || 0) < 80.0
                          ? 'text-amber-600 dark:text-[#F6D289]'
                          : 'text-emerald-600 dark:text-[#5EEAD4]'
                      }`}
                    >
                      {student.attendance_rate != null ? `${student.attendance_rate.toFixed(1)}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-[#8FA89B]">
                      {student.attendance_rate == null ? 'Awaiting records' : student.attendance_rate < 80 ? 'Below benchmark' : 'Benchmark met'}
                    </span>
                  </td>

                  {/* Latest Assessment Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-slate-900 dark:text-[#E2ECE6]">
                      {student.latest_assessment_percentage != null
                        ? `${student.latest_assessment_percentage.toFixed(1)}%`
                        : student.average_score == null ? 'N/A' : `${student.average_score.toFixed(1)}%`}
                    </span>
                    <div className="text-[10px] text-slate-400 dark:text-[#8FA89B]">
                      Avg: {student.average_score == null ? 'N/A' : `${student.average_score.toFixed(1)}%`}
                    </div>
                  </td>

                  {/* Performance Trend */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[11px] font-semibold border ${trendBadgeClass}`}
                    >
                      {trendIcon}
                      <span className="capitalize">{student.trend || 'stable'}</span>
                    </span>
                  </td>

                  {/* Decoupled Risks: Academic & Placement */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium text-slate-400 dark:text-[#8FA89B] w-10">Acad:</span>
                        <Badge variant={acadRiskVariant} size="sm">
                          {(student.academic_risk_tier || student.risk_tier || 'low').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium text-slate-400 dark:text-[#8FA89B] w-10">Place:</span>
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
                          ? 'text-amber-600 dark:text-[#F6D289]'
                          : student.review_status === 'Active Support Plan'
                          ? 'text-indigo-600 dark:text-[#56B594]'
                          : 'text-slate-600 dark:text-[#CBD5CF]'
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
                      <Link
                        to={`/journey?student_id=${student.id}`}
                        className="inline-flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2.5 py-1.5 font-medium transition-colors group cursor-pointer"
                        title="View Student Journey Dossier"
                      >
                        <span>Journey</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
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
