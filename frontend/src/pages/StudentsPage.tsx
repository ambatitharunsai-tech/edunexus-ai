import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, RefreshCw, GraduationCap, Plus, X } from 'lucide-react';
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
  const { session } = useAuth();
  const role = session?.role?.toLowerCase() || '';
  const isStudent = role === 'student';
  const canManageStudents = ['admin', 'administrator', 'advisor', 'counselor', 'faculty', 'staff', 'evaluator', 'evaluator_role'].includes(role);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSegment = searchParams.get('segment') || 'all';

  const initialCache = getCachedApiData<StudentDirectoryResponse>('/api/v1/students?page=1&page_size=10&sort_by=risk_score&sort_dir=desc');
  const [data, setData] = useState<StudentDirectoryResponse | null>(() => initialCache);
  const [loading, setLoading] = useState<boolean>(() => !initialCache);
  const [error, setError] = useState<string | null>(null);

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  const abortControllerRef = useRef<AbortController | null>(null);

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

  type StudentFormValues = {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    current_grade: string;
    academic_term: string;
    section: string;
    department: string;
  };
  const emptyStudentForm: StudentFormValues = {
    student_id: '',
    first_name: '',
    last_name: '',
    email: '',
    current_grade: '',
    academic_term: 'AY 2026-27 Term 1',
    section: '',
    department: '',
  };
  const [studentFormOpen, setStudentFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentListItem | null>(null);
  const [studentForm, setStudentForm] = useState<StudentFormValues>(emptyStudentForm);
  const [studentFormError, setStudentFormError] = useState<string | null>(null);
  const [savingStudent, setSavingStudent] = useState(false);

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

  const openCreateStudent = () => {
    setEditingStudent(null);
    setStudentForm({ ...emptyStudentForm });
    setStudentFormError(null);
    setStudentFormOpen(true);
  };

  const openEditStudent = (student: StudentListItem) => {
    setEditingStudent(student);
    setStudentForm({
      student_id: student.student_id || '',
      first_name: student.first_name || '',
      last_name: student.last_name || '',
      email: student.email || '',
      current_grade: student.current_grade || '',
      academic_term: student.academic_term || '',
      section: student.section || '',
      department: student.department || '',
    });
    setStudentFormError(null);
    setStudentFormOpen(true);
  };

  const handleSaveStudent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canManageStudents) {
      setStudentFormError('Your account does not have permission to modify student records.');
      return;
    }
    setSavingStudent(true);
    setStudentFormError(null);
    const values = {
      first_name: studentForm.first_name.trim(),
      last_name: studentForm.last_name.trim(),
      email: studentForm.email.trim() || null,
      current_grade: studentForm.current_grade.trim(),
      academic_term: studentForm.academic_term.trim(),
      section: studentForm.section.trim() || null,
      department: studentForm.department.trim() || null,
    };
    try {
      if (editingStudent) {
        await api<StudentListItem>(`/api/v1/students/${encodeURIComponent(editingStudent.id)}`, {
          method: 'PATCH',
          body: values,
        });
      } else {
        await api<StudentListItem>('/api/v1/students', {
          method: 'POST',
          body: {
            ...values,
            student_id: studentForm.student_id.trim(),
            status: 'active',
          },
        });
      }
      setStudentFormOpen(false);
      await fetchStudents({ bypassCache: true });
    } catch (err: unknown) {
      setStudentFormError(err instanceof Error ? err.message : 'Could not save this student record.');
    } finally {
      setSavingStudent(false);
    }
  };

  const handleArchiveStudent = async (student: StudentListItem) => {
    if (!canManageStudents) return;
    const confirmed = window.confirm(
      `Archive ${student.first_name} ${student.last_name} (${student.student_id})? Historical attendance, assessments, and interventions will be retained.`
    );
    if (!confirmed) return;
    try {
      await api<StudentListItem>(`/api/v1/students/${encodeURIComponent(student.id)}`, {
        method: 'DELETE',
      });
      await fetchStudents({ bypassCache: true });
    } catch (err: unknown) {
      window.alert(err instanceof Error ? err.message : 'Could not archive this student record.');
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
          {canManageStudents && (
            <Button
              variant="primary"
              size="sm"
              onClick={openCreateStudent}
              className="flex items-center gap-1.5 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Student</span>
            </Button>
          )}
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
            onClick={exportCohortCSV}
            disabled={!data || data.students.length === 0}
            className="flex items-center gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 dark:text-[#CBD5CF]" />
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
          <StudentTable
            students={data?.students || []}
            onOpenIntervention={canManageStudents ? handleOpenIntervention : undefined}
            onEditStudent={canManageStudents ? openEditStudent : undefined}
            onArchiveStudent={canManageStudents ? handleArchiveStudent : undefined}
          />

          <StudentPagination
            currentPage={page}
            pageSize={pageSize}
            totalItems={data?.total || 0}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}

      {studentFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="student-record-title">
          <form onSubmit={handleSaveStudent} className="w-full max-w-2xl space-y-4 rounded-2xl border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="student-record-title" className="text-lg font-bold text-slate-900 dark:text-[#E2ECE6]">
                  {editingStudent ? 'Edit Student Record' : 'Add Student Record'}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-[#8FA89B]">
                  Saved to the connected database; every change is recorded in the audit log.
                </p>
              </div>
              <button type="button" onClick={() => setStudentFormOpen(false)} aria-label="Close student form" className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-[#25322B]">
                <X className="h-5 w-5" />
              </button>
            </div>
            {studentFormError && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{studentFormError}</div>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                Institution ID / Roll No
                <input required minLength={2} maxLength={30} disabled={Boolean(editingStudent)} value={studentForm.student_id} onChange={(e) => setStudentForm({ ...studentForm, student_id: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 disabled:opacity-60 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                Email
                <input type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                First name
                <input required value={studentForm.first_name} onChange={(e) => setStudentForm({ ...studentForm, first_name: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                Last name
                <input required value={studentForm.last_name} onChange={(e) => setStudentForm({ ...studentForm, last_name: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                Grade / Year
                <input required value={studentForm.current_grade} onChange={(e) => setStudentForm({ ...studentForm, current_grade: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                Academic term
                <input required value={studentForm.academic_term} onChange={(e) => setStudentForm({ ...studentForm, academic_term: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                Department
                <input value={studentForm.department} onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-700 dark:text-[#CBD5CF]">
                Section
                <input maxLength={10} value={studentForm.section} onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-900 dark:border-[#35433B] dark:bg-[#1D2722] dark:text-[#E2ECE6]" />
              </label>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 pt-4 dark:border-[#35433B]">
              <Button type="button" variant="outline" onClick={() => setStudentFormOpen(false)} disabled={savingStudent}>Cancel</Button>
              <Button type="submit" disabled={savingStudent}>{savingStudent ? 'Saving…' : editingStudent ? 'Save Changes' : 'Add Student'}</Button>
            </div>
          </form>
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
