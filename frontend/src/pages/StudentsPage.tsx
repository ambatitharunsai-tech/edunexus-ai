import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, RefreshCw, GraduationCap, HeartHandshake, CheckSquare } from 'lucide-react';
import { api, getCachedApiData } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Card, CardContent } from '../components/ui/Card';
import { StudentFilterToolbar } from '../features/students/StudentFilterToolbar';
import { StudentTable } from '../features/students/StudentTable';
import { StudentPagination } from '../features/students/StudentPagination';
import { CreateInterventionModal } from '../features/dashboard/CreateInterventionModal';
import { useAuth } from '../context';
import type {
  StudentDirectoryResponse,
  StudentListItem,
  CreateInterventionPayload,
} from '../types';

export const StudentsPage: React.FC = () => {
  const { session, isStaff } = useAuth();
  const isStudent = session?.role?.toLowerCase() === 'student';
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCache = getCachedApiData<StudentDirectoryResponse>('/api/v1/students?page=1&page_size=10&sort_by=risk_score&sort_dir=desc');
  const [data, setData] = useState<StudentDirectoryResponse | null>(() => initialCache);
  const [loading, setLoading] = useState<boolean>(() => !initialCache);
  const [error, setError] = useState<string | null>(null);

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Filters state initialized from URL search params
  const [search, setSearch] = useState<string>(() => searchParams.get('search') || '');
  const [department, setDepartment] = useState<string>(() => searchParams.get('department') || 'all');
  const [semester, setSemester] = useState<string>(() => searchParams.get('semester') || 'all');
  const [segment, setSegment] = useState<string>(() => searchParams.get('segment') || 'all');
  const [riskTier, setRiskTier] = useState<string>(() => searchParams.get('risk_tier') || 'all');
  const [academicRisk, setAcademicRisk] = useState<string>(() => searchParams.get('academic_risk') || 'all');
  const [placementRisk, setPlacementRisk] = useState<string>(() => searchParams.get('placement_risk') || 'all');
  const [successMin, setSuccessMin] = useState<string>(() => searchParams.get('success_min') || '');
  const [successMax, setSuccessMax] = useState<string>(() => searchParams.get('success_max') || '');
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sortBy') || searchParams.get('sort_by') || 'risk_score');
  const [sortDir, setSortDir] = useState<string>(() => searchParams.get('sortDir') || searchParams.get('sort_dir') || 'desc');
  const [page, setPage] = useState<number>(() => {
    const p = parseInt(searchParams.get('page') || '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  });
  const pageSize = 10;

  // Sync state if URL search parameters change externally
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setDepartment(searchParams.get('department') || 'all');
    setSemester(searchParams.get('semester') || 'all');
    setSegment(searchParams.get('segment') || 'all');
    setRiskTier(searchParams.get('risk_tier') || 'all');
    setAcademicRisk(searchParams.get('academic_risk') || 'all');
    setPlacementRisk(searchParams.get('placement_risk') || 'all');
    setSuccessMin(searchParams.get('success_min') || '');
    setSuccessMax(searchParams.get('success_max') || '');
    setSortBy(searchParams.get('sortBy') || searchParams.get('sort_by') || 'risk_score');
    setSortDir(searchParams.get('sortDir') || searchParams.get('sort_dir') || 'desc');
    const p = parseInt(searchParams.get('page') || '1', 10);
    setPage(isNaN(p) || p < 1 ? 1 : p);
  }, [searchParams]);

  // Intervention modal state
  const [interventionModalOpen, setInterventionModalOpen] = useState<boolean>(false);
  const [selectedStudentForIntervention, setSelectedStudentForIntervention] = useState<any>(null);

  // Batch multi-select state
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [exportingFull, setExportingFull] = useState<boolean>(false);

  const handleToggleSelect = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const currentPageStudentIds = data?.students.map((s) => s.id) || [];
  const isAllCurrentPageSelected =
    currentPageStudentIds.length > 0 &&
    currentPageStudentIds.every((id) => selectedStudentIds.includes(id));

  const handleToggleSelectAll = () => {
    if (isAllCurrentPageSelected) {
      setSelectedStudentIds((prev) => prev.filter((id) => !currentPageStudentIds.includes(id)));
    } else {
      setSelectedStudentIds((prev) => Array.from(new Set([...prev, ...currentPageStudentIds])));
    }
  };

  const handleClearSelection = () => {
    setSelectedStudentIds([]);
  };

  const fetchStudents = useCallback(async (opts: { bypassCache?: boolean } = {}) => {
    if (isStudent) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (!dataRef.current) {
      setLoading(true);
    }
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        page_size: String(pageSize),
        sort_by: sortBy,
        sort_dir: sortDir,
      });

      if (academicRisk !== 'all') params.set('academic_risk', academicRisk);
      if (placementRisk !== 'all') params.set('placement_risk', placementRisk);
      if (successMin !== '') params.set('success_min', successMin);
      if (successMax !== '') params.set('success_max', successMax);
      if (search.trim()) params.append('search', search.trim());
      if (department !== 'all') params.append('department', department);
      if (semester !== 'all') params.append('semester', semester);
      if (segment !== 'all') params.append('segment', segment);
      if (riskTier !== 'all') params.append('risk_tier', riskTier);

      const res = await api<StudentDirectoryResponse>(`/api/v1/students?${params.toString()}`, {
        signal: controller.signal,
        bypassCache: opts.bypassCache,
      });
      setData(res);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('Failed to load students directory:', err);
      if (!dataRef.current) {
        setError('Unable to retrieve student records. Please ensure backend is operational.');
      }
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, sortDir, search, department, semester, segment, riskTier, academicRisk, placementRisk, successMin, successMax, isStudent]);

  useEffect(() => {
    if (!isStudent) {
      fetchStudents();
    }
  }, [fetchStudents, isStudent]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleResetFilters = () => {
    setAcademicRisk('all'); setPlacementRisk('all'); setSuccessMin(''); setSuccessMax('');
    setSearch('');
    setDepartment('all');
    setSemester('all');
    setSegment('all');
    setRiskTier('all');
    setSortBy('risk_score');
    setSortDir('desc');
    setPage(1);
    setSearchParams({});
  };

  const handleOpenIntervention = (student: StudentListItem) => {
    setSelectedStudentForIntervention({
      id: student.id,
      student_id: student.student_id,
      name: `${student.first_name} ${student.last_name}`,
      grade: student.current_grade,
      risk_level: student.risk_tier || 'medium',
      primary_risk_factor: `Review flag: Attendance ${student.attendance_rate || 0}%`,
    });
    setInterventionModalOpen(true);
  };

  const handleCreateIntervention = async (payload: CreateInterventionPayload): Promise<boolean> => {
    try {
      await api('/api/v1/interventions', {
        method: 'POST',
        body: payload,
      });
      await fetchStudents();
      return true;
    } catch (err) {
      console.error('Failed to create intervention:', err);
      return false;
    }
  };

  const exportCohortCSV = async (mode: 'page' | 'cohort' | 'selected' = 'page') => {
    let studentRows: StudentListItem[] = [];

    if (mode === 'selected') {
      if (!data?.students) return;
      studentRows = data.students.filter((s) => selectedStudentIds.includes(s.id));
      if (studentRows.length === 0) return;
    } else if (mode === 'cohort') {
      setExportingFull(true);
      try {
        const params = new URLSearchParams({
          page: '1',
          page_size: '1000',
          sort_by: sortBy,
          sort_dir: sortDir,
        });
        if (academicRisk !== 'all') params.set('academic_risk', academicRisk);
        if (placementRisk !== 'all') params.set('placement_risk', placementRisk);
        if (successMin !== '') params.set('success_min', successMin);
        if (successMax !== '') params.set('success_max', successMax);
        if (search.trim()) params.append('search', search.trim());
        if (department !== 'all') params.append('department', department);
        if (semester !== 'all') params.append('semester', semester);
        if (segment !== 'all') params.append('segment', segment);
        if (riskTier !== 'all') params.append('risk_tier', riskTier);

        const res = await api<StudentDirectoryResponse>(`/api/v1/students?${params.toString()}`);
        studentRows = res.students;
      } catch (e) {
        console.error('Failed to export full cohort:', e);
        studentRows = data?.students || [];
      } finally {
        setExportingFull(false);
      }
    } else {
      studentRows = data?.students || [];
    }

    if (studentRows.length === 0) return;

    const headers =
      'Student ID,First Name,Last Name,Department,Grade,Section,Success Score,Success Tier,Academic Risk,Placement Risk,Composite Risk,Risk Index,Attendance Rate %,Average Score %,Latest Assessment %,Trend,Review Status,Active Interventions\n';
    const rows = studentRows
      .map(
        (s) =>
          `"${s.student_id}","${s.first_name}","${s.last_name}","${s.department || ''}","${s.current_grade}","${s.section || ''}",${s.success_score != null ? s.success_score.toFixed(1) : ''},"${s.success_tier || ''}","${s.academic_risk_tier || ''}","${s.placement_risk_tier || ''}","${s.risk_tier || 'low'}",${s.risk_score || 0},${s.attendance_rate != null ? s.attendance_rate.toFixed(1) : ''},${s.average_score != null ? s.average_score.toFixed(1) : ''},${s.latest_assessment_percentage != null ? s.latest_assessment_percentage.toFixed(1) : ''},"${s.trend || 'stable'}","${s.review_status || 'On Track'}",${s.active_interventions_count || 0}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filenameSuffix = mode === 'cohort' ? 'full_cohort' : mode === 'selected' ? 'selected_students' : 'displayed_page';
    link.setAttribute('download', `edunexus_${filenameSuffix}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isStudent) {
    return (
      <div className="mx-auto max-w-2xl py-12 px-4">
        <Card className="border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] shadow-sm">
          <CardContent className="space-y-4 p-6 sm:p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-[#153E31] text-indigo-700 dark:text-[#56B594] border border-indigo-200 dark:border-[#1D4633]">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-[#E2ECE6]">
              Private Educational Records Policy
            </h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-[#CBD5CF]">
              The Students Directory contains institutional cohort data and is restricted to authorized faculty and academic advisors. Student privacy policies prohibit students from viewing peer educational records.
            </p>
            <div className="pt-2">
              <Link
                to="/student"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
              >
                Go to My Student Portal
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-[#E2ECE6]">
              Students Directory
            </h2>
            {data && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-[#18352A] text-indigo-700 dark:text-[#56B594] border border-indigo-200 dark:border-[#1D4633]">
                {data.total} Enrolled
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-[#8FA89B] mt-0.5">
            Holistic student records with observable attendance rates, evaluation benchmarks, and explainable risk tiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fetchStudents({ bypassCache: true })}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 dark:text-[#CBD5CF] ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCohortCSV('page')}
            disabled={!data || data.students.length === 0}
            className="flex items-center gap-1.5 text-xs"
            title="Export currently displayed page (10 records)"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 dark:text-[#CBD5CF]" />
            <span>Export Page</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCohortCSV('cohort')}
            disabled={!data || data.total === 0 || exportingFull}
            className="flex items-center gap-1.5 text-xs bg-indigo-50/70 dark:bg-[#1D332A] text-indigo-700 dark:text-[#56B594] border-indigo-200 dark:border-[#1D4633] font-semibold"
            title="Export all students matching active filters to CSV"
          >
            <Download className={`w-3.5 h-3.5 ${exportingFull ? 'animate-bounce' : ''}`} />
            <span>{exportingFull ? 'Exporting Cohort…' : `Export All (${data?.total || 0})`}</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <StudentFilterToolbar
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        department={department}
        onDepartmentChange={(val) => {
          setDepartment(val);
          setPage(1);
        }}
        departmentsList={data?.departments || []}
        semester={semester}
        onSemesterChange={(val) => {
          setSemester(val);
          setPage(1);
        }}
        semestersList={data?.semesters || []}
        segment={segment}
        onSegmentChange={(val) => {
          setSegment(val);
          setPage(1);
          if (val === 'all') {
            searchParams.delete('segment');
          } else {
            searchParams.set('segment', val);
          }
          setSearchParams(searchParams);
        }}
        riskTier={riskTier}
        onRiskTierChange={(val) => {
          setRiskTier(val);
          setPage(1);
        }}
        academicRisk={academicRisk}
        onAcademicRiskChange={(val) => {
          setAcademicRisk(val);
          setPage(1);
        }}
        placementRisk={placementRisk}
        onPlacementRiskChange={(val) => {
          setPlacementRisk(val);
          setPage(1);
        }}
        successMin={successMin}
        onSuccessMinChange={(val) => {
          setSuccessMin(val);
          setPage(1);
        }}
        successMax={successMax}
        onSuccessMaxChange={(val) => {
          setSuccessMax(val);
          setPage(1);
        }}
        sortBy={sortBy}
        sortDir={sortDir}
        onSortChange={(sb, sd) => {
          setSortBy(sb);
          setSortDir(sd);
          setPage(1);
        }}
        onResetFilters={handleResetFilters}
        totalFilteredCount={data?.total || 0}
      />

      {/* Content State Handling */}
      {loading && !data ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Spinner size="lg" label="Querying student directory with attendance telemetry…" />
          <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Querying student directory with attendance telemetry…
          </p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-white dark:bg-[#151C19] rounded-xl border border-rose-200 dark:border-[#4A1E24]">
          <p className="text-sm text-rose-700 dark:text-[#F87171]">{error}</p>
          <Button size="sm" onClick={() => void fetchStudents({ bypassCache: true })} className="mt-3">
            Retry
          </Button>
        </div>
      ) : data?.students.length === 0 ? (
        <div className="p-10 bg-white dark:bg-[#151C19] rounded-xl border border-slate-200 dark:border-[#35433B]">
          <EmptyState
            title="No Matching Students Found"
            description="No students matched your search keyword or selected department/risk filters."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Floating Batch Action Bar */}
          {selectedStudentIds.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-indigo-50 dark:bg-[#162B23] border border-indigo-200 dark:border-[#1E4B3E] rounded-xl text-xs text-indigo-950 dark:text-[#E2ECE6] shadow-xs">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-[#56B594]" />
                <span className="font-bold text-indigo-900 dark:text-[#56B594]">
                  {selectedStudentIds.length} student{selectedStudentIds.length > 1 ? 's' : ''} selected
                </span>
                <span className="text-[11px] text-slate-500 dark:text-[#8FA89B] hidden sm:inline">
                  • Apply batch operations or export selected rows
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => exportCohortCSV('selected')}
                  className="text-xs py-1 h-auto flex items-center gap-1 bg-white dark:bg-[#1D2722]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Selected ({selectedStudentIds.length})</span>
                </Button>
                {isStaff && (
                  <Button
                    size="sm"
                    onClick={() => {
                      const firstSelected = data?.students.find((s) => selectedStudentIds.includes(s.id));
                      if (firstSelected) handleOpenIntervention(firstSelected);
                    }}
                    className="text-xs py-1 h-auto bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Assign Support Plan</span>
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClearSelection}
                  className="text-xs py-1 h-auto text-slate-600 dark:text-[#CBD5CF] hover:text-slate-900"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}

          <StudentTable
            students={data?.students || []}
            onOpenIntervention={isStaff ? handleOpenIntervention : undefined}
            selectedIds={selectedStudentIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            isAllSelected={isAllCurrentPageSelected}
          />

          <StudentPagination
            currentPage={page}
            pageSize={pageSize}
            totalItems={data?.total || 0}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}

      {/* Intervention Modal */}
      <CreateInterventionModal
        isOpen={interventionModalOpen}
        onClose={() => setInterventionModalOpen(false)}
        preselectedStudent={selectedStudentForIntervention}
        studentsList={(data?.students || []).map((s) => ({
          id: s.id,
          student_id: s.student_id,
          name: `${s.first_name} ${s.last_name}`,
          grade: s.current_grade || 'Current Cohort',
          section: s.section || undefined,
          risk_level: s.risk_tier || 'low',
          risk_score: s.risk_score || 0,
          primary_risk_factor: `Review flag: Attendance ${s.attendance_rate != null ? s.attendance_rate.toFixed(1) : 0}%`,
          attendance_rate: s.attendance_rate ?? null,
          avg_score: s.average_score ?? null,
          last_interaction: 'Recent',
          status: s.review_status || 'Under Observation',
        }))}
        onSubmit={handleCreateIntervention}
      />
    </div>
  );
};
