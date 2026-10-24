import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  ClipboardList,
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
    <div className="bg-white dark:bg-[#141416] rounded-none border border-[#E4E4E7] dark:border-[#27272A] overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#1C1C20] text-[#18181B] dark:text-[#E4E4E7] font-semibold uppercase tracking-wider text-[11px]">
              {showSelect && (
                <th className="py-3 px-3 text-center w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onToggleSelectAll}
                    className="rounded-none border-[#D4D4D8] dark:border-[#3F3F46] accent-[#4F46E5] dark:accent-[#6366F1] cursor-pointer"
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
          <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#27272A] text-[#27272A] dark:text-[#D4D4D8]">
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
                improving: <TrendingUp className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#67E8F9]" />,
                declining: <TrendingDown className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#FCA5A5]" />,
                stable: <Minus className="w-3.5 h-3.5 text-[#71717A] dark:text-[#71717A]" />,
              }[student.trend || 'stable'];

              const trendBadgeClass = {
                improving: 'bg-[#CFFAFE] dark:bg-[#083344] text-[#0E7490] dark:text-[#67E8F9] border-[#67E8F9] dark:border-[#155E75]',
                declining: 'bg-[#FEE2E2] dark:bg-[#450A0A] text-[#B91C1C] dark:text-[#FCA5A5] border-[#FCA5A5] dark:border-[#991B1B]',
                stable: 'bg-[#F4F4F5] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] border-[#D4D4D8] dark:border-[#52525B]',
              }[student.trend || 'stable'];

              const initials = `${student.first_name[0] || ''}${student.last_name[0] || ''}`.toUpperCase();

              const successScoreColor =
                student.success_score === null || student.success_score === undefined
                  ? 'text-[#71717A] dark:text-[#71717A] bg-[#F4F4F5] dark:bg-[#27272A] border-[#D4D4D8] dark:border-[#3F3F46]'
                  : student.success_score >= 80
                  ? 'text-[#0E7490] dark:text-[#67E8F9] bg-[#CFFAFE] dark:bg-[#083344] border-[#67E8F9] dark:border-[#155E75]'
                  : student.success_score >= 65
                  ? 'text-[#1D4ED8] dark:text-[#93C5FD] bg-[#DBEAFE] dark:bg-[#172554] border-[#93C5FD] dark:border-[#1D4ED8]'
                  : student.success_score >= 50
                  ? 'text-[#92400E] dark:text-[#FCD34D] bg-[#FEF3C7] dark:bg-[#451A03] border-[#FCD34D] dark:border-[#92400E]'
                  : 'text-[#B91C1C] dark:text-[#FCA5A5] bg-[#FEE2E2] dark:bg-[#450A0A] border-[#FCA5A5] dark:border-[#991B1B]';

              return (
                <tr
                  key={student.id}
                  className={`hover:bg-[#F4F4F5] dark:hover:bg-[#242428] transition-colors group ${
                    isSelected ? 'bg-[#EEF2FF] dark:bg-[#27272A]' : ''
                  }`}
                >
                  {showSelect && (
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect?.(student.id)}
                        className="rounded-none border-[#D4D4D8] dark:border-[#3F3F46] accent-[#4F46E5] dark:accent-[#6366F1] cursor-pointer"
                        aria-label={`Select ${student.first_name} ${student.last_name}`}
                      />
                    </td>
                  )}
                  {/* Student Code & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-none bg-[#F4F4F5] dark:bg-[#1C1C20] text-[#18181B] dark:text-[#FAFAFA] font-bold flex items-center justify-center shrink-0 border border-[#E4E4E7] dark:border-[#3F3F46] select-none">
                        {initials}
                      </div>
                      <div>
                        <Link
                          to={`/journey?student_id=${student.id}`}
                          className="font-bold text-[#18181B] dark:text-[#FAFAFA] group-hover:text-[#4F46E5] dark:group-hover:text-[#A5B4FC] transition-colors"
                        >
                          {student.first_name} {student.last_name}
                        </Link>
                        <div className="font-mono text-[11px] text-[#71717A] dark:text-[#71717A]">
                          {student.student_id}
                        </div>
                        {student.segment_label && (
                          <div className="mt-0.5">
                            <span
                              className={`inline-block px-1.5 py-0.5 text-[9px] font-bold rounded-none border ${
                                student.segment_badge_color === 'emerald'
                                  ? 'bg-[#CFFAFE] dark:bg-[#083344] text-[#0E7490] dark:text-[#67E8F9] border-[#67E8F9] dark:border-[#155E75]'
                                  : student.segment_badge_color === 'blue'
                                  ? 'bg-[#DBEAFE] dark:bg-[#172554] text-[#1D4ED8] dark:text-[#93C5FD] border-[#93C5FD] dark:border-[#1D4ED8]'
                                  : student.segment_badge_color === 'amber'
                                  ? 'bg-[#FEF3C7] dark:bg-[#451A03] text-[#92400E] dark:text-[#FCD34D] border-[#FCD34D] dark:border-[#92400E]'
                                  : student.segment_badge_color === 'rose'
                                  ? 'bg-[#FEE2E2] dark:bg-[#450A0A] text-[#B91C1C] dark:text-[#FCA5A5] border-[#FCA5A5] dark:border-[#991B1B]'
                                  : 'bg-[#EDE9FE] dark:bg-[#2E1065] text-[#5B21B6] dark:text-[#C4B5FD] border-[#C4B5FD] dark:border-[#7C3AED]'
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
                    <div className="font-semibold text-[#18181B] dark:text-[#E4E4E7]">
                      {student.department || 'General Academics'}
                    </div>
                    <div className="text-[11px] text-[#71717A] dark:text-[#71717A]">
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
                        <div className="text-[10px] text-[#71717A] dark:text-[#71717A] capitalize mt-0.5">
                          {student.success_tier || 'active'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#71717A] dark:text-[#71717A] font-medium italic">
                        Insufficient Data
                      </span>
                    )}
                  </td>

                  {/* Attendance Rate */}
                  <td className="py-3.5 px-4 text-center">
                    <div
                      className={`font-bold ${
                        (student.attendance_rate || 0) < 80.0
                          ? 'text-[#92400E] dark:text-[#FCD34D]'
                          : 'text-[#0E7490] dark:text-[#67E8F9]'
                      }`}
                    >
                      {student.attendance_rate != null ? `${student.attendance_rate.toFixed(1)}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-[#71717A] dark:text-[#71717A]">
                      {student.attendance_rate == null ? 'Awaiting records' : student.attendance_rate < 80 ? 'Below benchmark' : 'Benchmark met'}
                    </span>
                  </td>

                  {/* Latest Assessment Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-[#18181B] dark:text-[#FAFAFA]">
                      {student.latest_assessment_percentage != null
                        ? `${student.latest_assessment_percentage.toFixed(1)}%`
                        : student.average_score == null ? 'N/A' : `${student.average_score.toFixed(1)}%`}
                    </span>
                    <div className="text-[10px] text-[#71717A] dark:text-[#71717A]">
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
                        <span className="text-[10px] font-medium text-[#71717A] dark:text-[#71717A] w-10">Acad:</span>
                        <Badge variant={acadRiskVariant} size="sm">
                          {(student.academic_risk_tier || student.risk_tier || 'low').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium text-[#71717A] dark:text-[#71717A] w-10">Place:</span>
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
                          ? 'text-[#92400E] dark:text-[#FCD34D]'
                          : student.review_status === 'Active Support Plan'
                          ? 'text-[#4F46E5] dark:text-[#A5B4FC]'
                          : 'text-[#52525B] dark:text-[#A1A1AA]'
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
                          className="text-[#4F46E5] dark:text-[#A5B4FC] hover:text-[#3730A3] dark:hover:text-[#FFFFFF] p-1.5 h-auto"
                        >
                          <ClipboardList className="w-4 h-4" />
                        </Button>
                      )}
                      <Link
                        to={`/journey?student_id=${student.id}`}
                        className="inline-flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#18181B] hover:bg-[#E4E4E7] dark:hover:bg-[#27272A] text-[#27272A] dark:text-[#E4E4E7] border border-[#E4E4E7] dark:border-[#27272A] text-xs px-2.5 py-1.5 font-medium transition-colors group cursor-pointer"
                        title="View Student Journey Dossier"
                      >
                        <span>Journey</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#71717A] dark:text-[#71717A] group-hover:translate-x-0.5 transition-transform" />
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
