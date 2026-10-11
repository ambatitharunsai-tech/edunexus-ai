import React from 'react';
import { Search, Filter, RotateCcw, ArrowUpDown } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface StudentFilterToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  departmentsList: string[];
  semester: string;
  onSemesterChange: (value: string) => void;
  semestersList: string[];
  riskTier: string;
  onRiskTierChange: (value: string) => void;
  sortBy: string;
  sortDir: string;
  onSortChange: (sortBy: string, sortDir: string) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const StudentFilterToolbar: React.FC<StudentFilterToolbarProps> = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  departmentsList,
  semester,
  onSemesterChange,
  semestersList,
  riskTier,
  onRiskTierChange,
  sortBy,
  sortDir,
  onSortChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const hasActiveFilters =
    search.trim() !== '' ||
    department !== 'all' ||
    semester !== 'all' ||
    riskTier !== 'all';

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3.5">
      {/* Top Search & Dropdown Filters Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Input
            type="search"
            placeholder="Search by student code (e.g. STU-001) or student name..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            className="text-xs py-2 bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              aria-label="Filter by Department"
            >
              <option value="all">All Departments</option>
              {departmentsList.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Semester / Cohort Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <select
              value={semester}
              onChange={(e) => onSemesterChange(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              aria-label="Filter by Semester"
            >
              <option value="all">All Semesters / Terms</option>
              {semestersList.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Control */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={`${sortBy}-${sortDir}`}
              onChange={(e) => {
                const [sb, sd] = e.target.value.split('-');
                onSortChange(sb, sd);
              }}
              className="px-2.5 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              aria-label="Sort Order"
            >
              <option value="risk_score-desc">Risk Index: High to Low</option>
              <option value="risk_score-asc">Risk Index: Low to High</option>
              <option value="attendance_rate-asc">Attendance: Low to High</option>
              <option value="attendance_rate-desc">Attendance: High to Low</option>
              <option value="average_score-asc">Avg Score: Low to High</option>
              <option value="average_score-desc">Avg Score: High to Low</option>
              <option value="name-asc">Student Name: A-Z</option>
              <option value="name-desc">Student Name: Z-A</option>
              <option value="student_id-asc">Student Code: Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Risk Category Pills & Active Count Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium text-[11px] mr-1">Risk Category:</span>
          {[
            { key: 'all', label: 'All Students' },
            { key: 'critical', label: 'Critical Flag' },
            { key: 'high', label: 'High Focus' },
            { key: 'medium', label: 'Moderate' },
            { key: 'low', label: 'Low Risk' },
          ].map((tier) => {
            const isActive = riskTier === tier.key;
            return (
              <button
                key={tier.key}
                type="button"
                onClick={() => onRiskTierChange(tier.key)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>

        {/* Clear Filters & Match Count */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            Matching Records: <strong className="text-slate-900">{totalFilteredCount}</strong>
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 p-0 h-auto font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
