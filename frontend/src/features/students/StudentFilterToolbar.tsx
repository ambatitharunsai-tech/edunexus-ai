import React, { useState } from 'react';
import { Search, Filter, RotateCcw, ArrowUpDown, X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface StudentFilterToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  departmentsList: string[];
  semester: string;
  onSemesterChange: (value: string) => void;
  semestersList: string[];
  segment?: string;
  onSegmentChange?: (value: string) => void;
  riskTier: string;
  onRiskTierChange: (value: string) => void;
  academicRisk: string;
  onAcademicRiskChange: (value: string) => void;
  placementRisk: string;
  onPlacementRiskChange: (value: string) => void;
  successMin: string;
  onSuccessMinChange: (value: string) => void;
  successMax: string;
  onSuccessMaxChange: (value: string) => void;
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
  segment = 'all',
  onSegmentChange,
  riskTier,
  onRiskTierChange,
  academicRisk,
  onAcademicRiskChange,
  placementRisk,
  onPlacementRiskChange,
  successMin,
  onSuccessMinChange,
  successMax,
  onSuccessMaxChange,
  sortBy,
  sortDir,
  onSortChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasAdvancedFilters =
    academicRisk !== 'all' ||
    placementRisk !== 'all' ||
    successMin !== '' ||
    successMax !== '';

  const hasActiveFilters =
    search.trim() !== '' ||
    department !== 'all' ||
    semester !== 'all' ||
    segment !== 'all' ||
    riskTier !== 'all' ||
    hasAdvancedFilters;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3.5">
      {/* Top Search & Primary Filters Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input with Clear Button */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by student code (e.g. STU-001) or student name..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
          {search.trim() && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
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

          {/* Strategic Cohort Segment Filter */}
          {onSegmentChange && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <select
                value={segment}
                onChange={(e) => onSegmentChange(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-purple-50/60 rounded-lg border border-purple-200 text-purple-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                aria-label="Filter by Strategic Cohort"
              >
                <option value="all">All Strategic Cohorts</option>
                <option value="insufficient_data">Awaiting data review</option>
                <option value="high_achiever_placement_ready">High Achievers & Placement Ready</option>
                <option value="academic_star_career_at_risk">Academic Stars / Career At-Risk</option>
                <option value="practical_star_exam_vulnerable">Practical Stars / Exam Vulnerable</option>
                <option value="priority_holistic_support">Priority Holistic Support</option>
                <option value="steady_emerging_potential">Steady / Emerging Potential</option>
              </select>
            </div>
          )}

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
              <option value="success_score-desc">Success Score: High to Low</option>
              <option value="success_score-asc">Success Score: Low to High</option>
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

          {/* Toggle Advanced Filters Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`text-xs px-2.5 py-1.5 h-auto flex items-center gap-1.5 border ${
              showAdvanced || hasAdvancedFilters
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold'
                : 'text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Advanced</span>
            {hasAdvancedFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />
            )}
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </Button>
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvanced && (
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50/60 p-3 rounded-lg border border-slate-200/80">
          {/* Academic Risk */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600">Academic Risk Tier</label>
            <select
              value={academicRisk}
              onChange={(e) => onAcademicRiskChange(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="all">All Academic Tiers</option>
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
              <option value="critical">Critical Risk</option>
              <option value="insufficient_data">Insufficient Data</option>
            </select>
          </div>

          {/* Placement Risk */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600">Placement Risk Tier</label>
            <select
              value={placementRisk}
              onChange={(e) => onPlacementRiskChange(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="all">All Placement Tiers</option>
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
              <option value="critical">Critical Risk</option>
              <option value="insufficient_data">Insufficient Data</option>
            </select>
          </div>

          {/* Success Score Range */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600">Success Score Range</label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Min"
                value={successMin}
                onChange={(e) => onSuccessMinChange(e.target.value)}
                className="w-1/2 px-2 py-1.5 text-xs bg-white rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
              />
              <span className="text-slate-400 text-xs font-mono">—</span>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Max"
                value={successMax}
                onChange={(e) => onSuccessMaxChange(e.target.value)}
                className="w-1/2 px-2 py-1.5 text-xs bg-white rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Quick reset inside drawer */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                onAcademicRiskChange('all');
                onPlacementRiskChange('all');
                onSuccessMinChange('');
                onSuccessMaxChange('');
              }}
              className="w-full text-xs py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-colors"
            >
              Clear Advanced Filters
            </button>
          </div>
        </div>
      )}

      {/* Bottom Risk Category Pills & Active Count Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium text-[11px] mr-1">Composite Priority:</span>
          {[
            { key: 'all', label: 'All Students' },
            { key: 'critical', label: 'Critical Flag' },
            { key: 'high', label: 'High Focus' },
            { key: 'medium', label: 'Moderate' },
            { key: 'low', label: 'Low Risk' },
            { key: 'insufficient_data', label: 'Awaiting Data' },
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
