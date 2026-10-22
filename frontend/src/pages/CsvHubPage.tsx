import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Database,
  ShieldCheck,
  FileCheck,
  FileX,
  Layers,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { api, apiUrl } from '../lib/api';
import type { CsvPreviewResponse, CsvImportResult, CsvRowError } from '../types';

export type CsvDataType =
  | 'students'
  | 'attendance'
  | 'assessments'
  | 'placement'
  | 'skills'
  | 'feedback'
  | 'lms'
  | 'engagement';

const templateCards: Array<{
  dataType: CsvDataType;
  fileName: string;
  title: string;
  description: string;
  headerPreview: string;
}> = [
  { dataType: 'students', fileName: 'students.csv', title: 'Student Registry', description: 'Identifiers, names, department, cohort, term, and section.', headerPreview: 'student_id, first_name, last_name...' },
  { dataType: 'attendance', fileName: 'attendance.csv', title: 'Attendance Sessions', description: 'Daily classroom sessions, date, status (present/late/absent).', headerPreview: 'student_id, date, status, remarks' },
  { dataType: 'assessments', fileName: 'assessments.csv', title: 'Assessment Marks', description: 'Subject evaluations with separate scores and maximum marks.', headerPreview: 'student_id, subject, type, score, max...' },
  { dataType: 'engagement', fileName: 'engagement.csv', title: 'Campus Engagement', description: 'Timestamped workshops, mentoring, clubs, and other activities.', headerPreview: 'student_id, event_type, title...' },
  { dataType: 'placement', fileName: 'placement.csv', title: 'Placement Readiness', description: 'Aptitude, coding, mock interviews, and readiness tier.', headerPreview: 'student_id, aptitude, coding, mock...' },
  { dataType: 'skills', fileName: 'skills.csv', title: 'Skills & Certifications', description: 'Technical, soft skills, certifications, and verified skills.', headerPreview: 'student_id, technical, soft_skills...' },
  { dataType: 'feedback', fileName: 'feedback.csv', title: 'Faculty & Mentors', description: 'Faculty sentiment, student satisfaction, and mentor notes.', headerPreview: 'student_id, faculty_sentiment...' },
  { dataType: 'lms', fileName: 'lms.csv', title: 'LMS Learning', description: 'Logins, module completion, assignments, and forum posts.', headerPreview: 'student_id, weekly_login_count...' },
];

export const CsvHubPage: React.FC = () => {
  // Template download states
  const [downloadingTemplate, setDownloadingTemplate] = useState<string | null>(null);

  // Ingestion states
  const [selectedDataType, setSelectedDataType] = useState<CsvDataType>('students');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewResult, setPreviewResult] = useState<CsvPreviewResponse | null>(null);
  const [validating, setValidating] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Import commitment states
  const [dedupStrategy, setDedupStrategy] = useState<'skip' | 'overwrite'>('skip');
  const [importing, setImporting] = useState<boolean>(false);
  const [importResult, setImportResult] = useState<CsvImportResult | null>(null);

  // Reset demo states
  const [resetting, setResetting] = useState<boolean>(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);

  // 1. Template Download Handler
  const handleDownloadTemplate = async (type: CsvDataType) => {
    setDownloadingTemplate(type);
    try {
      const response = await fetch(apiUrl(`/api/v1/csv/templates/${type}`));
      if (!response.ok) {
        throw new Error(`Failed to download template: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edunexus_${type}_template.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download template error:', err);
      alert('Could not download CSV template. Please ensure backend is running.');
    } finally {
      setDownloadingTemplate(null);
    }
  };

  // 2. File Selection & Validation Handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewResult(null);
    setImportResult(null);
    setValidationError(null);
    setValidating(true);

    try {
      const text = await file.text();

      const res = await api<CsvPreviewResponse>('/api/v1/csv/preview', {
        method: 'POST',
        body: {
          file_content: text,
          file_name: file.name,
          data_type: selectedDataType,
        },
      });

      setPreviewResult(res);
    } catch (err: unknown) {
      console.error('Validation error:', err);
      setValidationError(
        err instanceof Error ? err.message : 'CSV file validation encountered an error.'
      );
    } finally {
      setValidating(false);
    }
  };

  // 3. Batch Ingestion Commitment Handler
  const handleCommitImport = async () => {
    if (!selectedFile || !previewResult || !previewResult.can_import) return;
    setImporting(true);
    setImportResult(null);

    try {
      const res = await api<CsvImportResult>('/api/v1/csv/import', {
        method: 'POST',
        body: {
          data_type: selectedDataType,
          file_content: await selectedFile.text(),
          deduplicate_strategy: dedupStrategy,
        },
      });

      setImportResult(res);
    } catch (err: unknown) {
      console.error('Import error:', err);
      alert(err instanceof Error ? err.message : 'Batch CSV import failed.');
    } finally {
      setImporting(false);
    }
  };

  // 4. One-Click Demo Reset Handler
  const handleResetDemo = async () => {
    setResetting(true);
    setResetSuccessMessage(null);
    setShowResetConfirmModal(false);

    try {
      const res = await api<{
        status: string;
        message: string;
        total_students: number;
        attendance_records?: number;
        assessment_records?: number;
        placement_records?: number;
        skills_records?: number;
        feedback_records?: number;
        lms_records?: number;
        timestamp: string;
      }>('/api/v1/csv/reset-demo', {
        method: 'POST',
      });

      setResetSuccessMessage(
        `${res.message} (${res.total_students} students across all 7 domains: ${res.attendance_records ?? 0} attendance, ${res.assessment_records ?? 0} assessments, ${res.placement_records ?? 0} placement, ${res.skills_records ?? 0} skills, ${res.feedback_records ?? 0} feedback, ${res.lms_records ?? 0} LMS records). Evaluator environment is completely clean.`
      );
      // Clear current file inputs
      setSelectedFile(null);
      setPreviewResult(null);
      setImportResult(null);
    } catch (err: unknown) {
      console.error('Reset error:', err);
      alert('Failed to reset synthetic demo data.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="csv-hub space-y-8">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Data Hub & CSV Ingestion Engine
          </h2>
          <p className="text-xs text-slate-500">
            Validated bulk data ingestion with line-numbered schema checks, deduplication safeguards, and synthetic demo reset.
          </p>
        </div>

        {/* Demo Reset Trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowResetConfirmModal(true)}
          disabled={resetting}
          className="min-h-9 whitespace-nowrap text-xs text-indigo-700 border-indigo-300 hover:bg-indigo-50 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md self-start sm:self-auto motion-reduce:transform-none motion-reduce:transition-none"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
          <span>Reset Synthetic Demo Data (1-Click)</span>
        </Button>
      </div>

      {/* Demo Reset Confirmation Toast */}
      {resetSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-900 text-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-950">Synthetic Demo Environment Restored</span>
            <p className="text-emerald-800 leading-normal">{resetSuccessMessage}</p>
          </div>
        </div>
      )}

      {/* Section 1: Download Templates */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">Standard Schema CSV Templates</h3>
        </div>
        <p className="text-xs text-slate-500">
          Download pre-structured templates formatted with mandatory institutional column headers.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {templateCards.map((template, index) => (
            <Card
              key={template.dataType}
              className="csv-template-card group flex min-w-0 flex-col border-slate-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <CardHeader className="flex-1 gap-3 pb-4">
                <div className="flex min-w-0 flex-col items-start gap-2">
                  <CardTitle className="min-w-0 text-sm font-bold leading-snug text-slate-900">
                    {template.title}
                  </CardTitle>
                  <Badge variant="neutral" size="sm" className="max-w-full truncate font-mono">
                    {template.fileName}
                  </Badge>
                </div>
                <CardDescription className="min-h-10 text-[11px] leading-relaxed text-slate-500">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full space-y-3">
                <div
                  className="flex h-12 min-w-0 items-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 px-3 font-mono text-[10px] leading-relaxed text-slate-600"
                  title={template.headerPreview}
                >
                  <span className="truncate">{template.headerPreview}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Download className="h-3.5 w-3.5 shrink-0" />}
                  onClick={() => handleDownloadTemplate(template.dataType)}
                  disabled={downloadingTemplate === template.dataType}
                  className="h-10 w-full whitespace-nowrap border-indigo-200 text-xs text-indigo-700 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none"
                >
                  Download template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 2: CSV Upload & Validation Engine */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <CardTitle className="text-base font-bold text-slate-900">
              Interactive CSV Validator & Batch Importer
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Performs pre-flight validation on column headers, range constraints, duplicate detection, and foreign-key integrity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls: Target Type and File Drop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Dataset Classification
              </label>
              <select
                value={selectedDataType}
                onChange={(e) => {
                  setSelectedDataType(e.target.value as any);
                  setPreviewResult(null);
                  setImportResult(null);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="students">1. Students Registry (students.csv)</option>
                <option value="attendance">2. Attendance Sessions (attendance.csv)</option>
                <option value="assessments">3. Assessment Marks (assessments.csv)</option>
                <option value="placement">4. Placement Readiness (placement.csv)</option>
                <option value="skills">5. Skills & Certifications (skills.csv)</option>
                <option value="feedback">6. Faculty & Mentors Feedback (feedback.csv)</option>
                <option value="engagement">Engagement</option>
                  <option value="lms">7. LMS Learning Engagement (lms.csv)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Upload CSV File
              </label>
              <div className="flex flex-col gap-1.5">
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-slate-200 rounded-lg bg-slate-50"
                />
                {selectedFile && (
                  <span className="text-[11px] font-mono text-slate-500">
                    Loaded: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Validation in progress */}
          {validating && (
            <div className="py-8 flex flex-col items-center justify-center space-y-2">
              <Spinner size="md" label="Parsing headers, evaluating row boundaries, and checking relational integrity…" />
              <p className="text-xs text-slate-700 dark:text-slate-200">
                Parsing headers, evaluating row boundaries, and checking relational integrity…
              </p>
            </div>
          )}

          {/* Fatal Validation Error */}
          {validationError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-900 text-xs">
              <FileX className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">CSV Schema Rejection</span>
                <p>{validationError}</p>
              </div>
            </div>
          )}

          {/* Preview Results Banner */}
          {previewResult && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
                      previewResult.can_import
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {previewResult.can_import ? (
                      <FileCheck className="w-5 h-5" />
                    ) : (
                      <FileX className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {previewResult.file_name} •{' '}
                      <span className={previewResult.can_import ? 'text-emerald-700' : 'text-rose-700'}>
                        {previewResult.can_import ? 'Validation Passed' : 'Validation Failed'}
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {previewResult.total_rows} total rows analyzed • {previewResult.valid_rows} valid •{' '}
                      {previewResult.failed_rows} errors
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={previewResult.can_import ? 'success' : 'danger'} size="md">
                    {previewResult.can_import ? 'Ready for Ingestion' : 'Import Blocked'}
                  </Badge>
                </div>
              </div>

              {/* Line-Numbered Errors Table */}
              {previewResult.errors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Line-Numbered Row Validation Failures ({previewResult.errors.length}):</span>
                  </div>
                  <div className="overflow-x-auto rounded-none border border-rose-200 dark:border-[#4A1E24] bg-rose-50/40 dark:bg-[#281618]/40">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-rose-200 dark:border-[#4A1E24] bg-rose-100/60 dark:bg-[#341C20] text-rose-900 dark:text-[#FECDD3] uppercase text-[10px] font-bold">
                          <th className="py-2 px-3 w-16 text-center">Line</th>
                          <th className="py-2 px-3 w-32">Column / Field</th>
                          <th className="py-2 px-3">Validation Rule Violation</th>
                          <th className="py-2 px-3 w-40">Sample Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-100 dark:divide-[#4A1E24] text-slate-700 dark:text-[#CBD5CF]">
                        {previewResult.errors.map((err: CsvRowError, idx: number) => (
                          <tr key={idx} className="hover:bg-rose-100/30 dark:hover:bg-[#341C20]/50">
                            <td className="py-2 px-3 text-center font-mono font-bold text-rose-700 dark:text-[#F87171]">
                              #{err.line}
                            </td>
                            <td className="py-2 px-3 font-semibold text-slate-800 dark:text-[#E2ECE6]">
                              {err.column || 'General'}
                            </td>
                            <td className="py-2 px-3 text-rose-800 dark:text-[#FECDD3] font-medium">
                              {err.message}
                            </td>
                            <td className="py-2 px-3 font-mono text-[11px] text-slate-500 dark:text-[#8FA89B] truncate max-w-xs">
                              {err.raw_value || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sample Data Table Preview */}
              {previewResult.sample_data.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-[#CBD5CF]">
                    Verified Rows Sample Preview ({previewResult.valid_rows} rows):
                  </span>
                  <div className="overflow-x-auto rounded-none border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-[#35433B] bg-[#EEF2F6] dark:bg-[#1D2722] text-slate-700 dark:text-[#CBD5CF] uppercase text-[10px] font-bold">
                          {Object.keys(previewResult.sample_data[0]).map((col) => (
                            <th key={col} className="py-2 px-3">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-[#25322B] text-slate-700 dark:text-[#CBD5CF]">
                        {previewResult.sample_data.slice(0, 5).map((row: Record<string, string>, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#1D2722]/60">
                            {Object.values(row).map((val: unknown, cIdx: number) => (
                              <td key={cIdx} className="py-2 px-3 font-mono text-[11px] text-slate-800 dark:text-[#E2ECE6]">
                                {String(val ?? '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Deduplication & Commit Import Controls */}
              {previewResult.can_import && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-bold text-xs text-emerald-950">
                        Deduplication Strategy:
                      </span>
                      <div className="flex items-center gap-4 text-xs text-slate-700">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="dedup"
                            value="skip"
                            checked={dedupStrategy === 'skip'}
                            onChange={() => setDedupStrategy('skip')}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>Skip existing records (Safe Deduplication)</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="dedup"
                            value="overwrite"
                            checked={dedupStrategy === 'overwrite'}
                            onChange={() => setDedupStrategy('overwrite')}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>Overwrite matching records</span>
                        </label>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={handleCommitImport}
                      disabled={importing}
                      className="min-h-10 whitespace-nowrap bg-emerald-600 text-xs font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      {importing && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      <span>Commit {previewResult.valid_rows} Records to System</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Ingestion Output Result */}
              {importResult && (
                <div className="p-4 bg-white border border-emerald-300 rounded-xl shadow-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{importResult.status === "rejected" ? "Batch rejected — no records changed" : "Batch ingestion completed"}</span>
                  </div>
                  <p className="text-xs">{importResult.message}</p>
                  <p className="text-xs">Inserted: {importResult.inserted} · Updated: {importResult.updated} · Rejected: {importResult.rejected}</p>
                  {importResult.errors.map((e, i) => <p className="text-xs text-rose-700" key={i}>Line {e.line}: {e.message}</p>)}
                  <div className="grid grid-cols-3 gap-3 text-center pt-2">
                    <div className="p-2 rounded bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Imported</span>
                      <div className="text-base font-bold text-emerald-700">{importResult.imported}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Duplicates Skipped</span>
                      <div className="text-base font-bold text-slate-700">{importResult.skipped}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Total Evaluated</span>
                      <div className="text-base font-bold text-indigo-700">{importResult.total_processed}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Modal for Resetting Synthetic Demo Data */}
      {showResetConfirmModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Confirm Synthetic Dataset Reset
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                This will restore the 36-student verified synthetic dataset across all semesters, attendance sessions, and assessments. Any experimental records uploaded during this session will be restored to baseline.
              </p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Production Safe: This operation only resets synthetic demo in-memory data structures. It never alters external Supabase production tables without authorization.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowResetConfirmModal(false)}
                disabled={resetting}
                className="min-h-9 whitespace-nowrap transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleResetDemo}
                disabled={resetting}
                className="min-h-9 whitespace-nowrap bg-indigo-600 text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
              >
                {resetting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Reset to Seed Baseline</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
