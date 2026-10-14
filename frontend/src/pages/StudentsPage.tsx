import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, RefreshCw } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { StudentFilterToolbar } from '../features/students/StudentFilterToolbar';
import { StudentTable } from '../features/students/StudentTable';
import { StudentPagination } from '../features/students/StudentPagination';
import { CreateInterventionModal } from '../features/dashboard/CreateInterventionModal';
import type {
  StudentDirectoryResponse,
  StudentListItem,
  CreateInterventionPayload,
} from '../types';

export const StudentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSegment = searchParams.get('segment') || 'all';

  const [data, setData] = useState<StudentDirectoryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [department, setDepartment] = useState<string>('all');
  const [semester, setSemester] = useState<string>('all');
  const [segment, setSegment] = useState<string>(initialSegment);
  const [riskTier, setRiskTier] = useState<string>('all');
  const [academicRisk, setAcademicRisk] = useState('all');
  const [placementRisk, setPlacementRisk] = useState('all');
  const [successMin, setSuccessMin] = useState('');
  const [successMax, setSuccessMax] = useState('');
  const [sortBy, setSortBy] = useState<string>('risk_score');
  const [sortDir, setSortDir] = useState<string>('desc');
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  // Intervention modal state
  const [interventionModalOpen, setInterventionModalOpen] = useState<boolean>(false);
  const [selectedStudentForIntervention, setSelectedStudentForIntervention] = useState<any>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
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

      const res = await api<StudentDirectoryResponse>(`/api/v1/students?${params.toString()}`);
      setData(res);
    } catch (err: unknown) {
      console.error('Failed to load students directory:', err);
      setError('Unable to retrieve student records. Please ensure backend is operational.');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, sortDir, search, department, semester, segment, riskTier, academicRisk, placementRisk, successMin, successMax]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

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

  const exportCohortCSV = () => {
    if (!data?.students) return;
    const headers = 'Student ID,First Name,Last Name,Department,Grade,Attendance Rate,Average Score,Risk Tier,Review Status\n';
    const rows = data.students
      .map(
        (s) =>
          `"${s.student_id}","${s.first_name}","${s.last_name}","${s.department || ''}","${s.current_grade}",${s.attendance_rate || 0},${s.average_score || 0},"${s.risk_tier || 'low'}","${s.review_status || 'On Track'}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `edunexus_students_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Students Directory
            </h2>
            {data && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {data.total} Enrolled
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic student records with observable attendance rates, evaluation benchmarks, and explainable risk tiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchStudents}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={exportCohortCSV}
            disabled={!data || data.students.length === 0}
            className="flex items-center gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export displayed page</span>
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
          <Spinner size="lg" />
          <p className="text-xs font-medium text-slate-500 animate-pulse">
            Querying student directory with attendance telemetry...
          </p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-white rounded-xl border border-rose-200">
          <p className="text-sm text-rose-700">{error}</p>
          <Button size="sm" onClick={fetchStudents} className="mt-3">
            Retry
          </Button>
        </div>
      ) : data?.students.length === 0 ? (
        <div className="p-10 bg-white rounded-xl border border-slate-200">
          <EmptyState
            title="No Matching Students Found"
            description="No students matched your search keyword or selected department/risk filters."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <StudentTable
            students={data?.students || []}
            onOpenIntervention={handleOpenIntervention}
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
