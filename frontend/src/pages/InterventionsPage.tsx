import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  User,
  Plus,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle2,
  Play,
  XCircle,
  Scale,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Modal } from '../components/ui/Modal';
import { api, getCachedApiData } from '../lib/api';
import { RecordOutcomeModal } from '../features/interventions/RecordOutcomeModal';
import { CreateInterventionModal } from '../features/dashboard/CreateInterventionModal';
import type {
  Intervention,
  Outcome,
  CreateInterventionPayload,
  FollowUpStudentItem,
  StudentDirectoryResponse,
} from '../types';

export const InterventionsPage: React.FC = () => {
  const initialCache = getCachedApiData<Intervention[]>('/api/v1/interventions');
  const [interventions, setInterventions] = useState<Intervention[]>(() => initialCache || []);
  const [loading, setLoading] = useState<boolean>(() => !initialCache);
  const [error, setError] = useState<string | null>(null);

  const interventionsRef = useRef(interventions);
  useEffect(() => {
    interventionsRef.current = interventions;
  }, [interventions]);

  // Filters
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'planned' | 'completed' | 'cancelled'>('all');
  const [showOverdueOnly, setShowOverdueOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [outcomeModalOpen, setOutcomeModalOpen] = useState<boolean>(false);
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [planToCancel, setPlanToCancel] = useState<Intervention | null>(null);
  const [directoryStudents, setDirectoryStudents] = useState<FollowUpStudentItem[]>([]);

  // Action busy states
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // 1. Fetch live interventions
  const fetchInterventions = useCallback(async (opts: { bypassCache?: boolean } = {}) => {
    if (interventionsRef.current.length === 0) {
      setLoading(true);
    }
    setError(null);
    try {
      const res = await api<Intervention[]>('/api/v1/interventions', {
        bypassCache: opts.bypassCache,
      });
      setInterventions(res);
      setError(null);
    } catch (err: unknown) {
      console.error('Failed to load interventions:', err);
      if (interventionsRef.current.length === 0) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load interventions from backend. Please ensure the API is running.'
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch student directory for create modal
  useEffect(() => {
    const loadDirectory = async () => {
      try {
        const res = await api<StudentDirectoryResponse>('/api/v1/students?page=1&page_size=50');
        if (res.students) {
          const mapped: FollowUpStudentItem[] = res.students.map((s) => ({
            id: s.id,
            student_id: s.student_id,
            name: `${s.first_name} ${s.last_name}`,
            grade: s.current_grade,
            section: s.section,
            risk_level: s.risk_tier || 'low',
            risk_score: s.risk_score || 0,
            primary_risk_factor: `Review flag: Attendance ${s.attendance_rate || 0}%`,
            attendance_rate: s.attendance_rate || 0,
            avg_score: s.average_score || 0,
            last_interaction: 'Recent',
            status: s.review_status || 'Under Observation',
          }));
          setDirectoryStudents(mapped);
        }
      } catch (e) {
        console.warn('Could not load students directory for interventions creation:', e);
      }
    };
    fetchInterventions();
    loadDirectory();
  }, [fetchInterventions]);

  // Status lifecycle transition handler
  const handleStatusTransition = async (
    interventionId: string,
    newStatus: 'in_progress' | 'completed' | 'cancelled'
  ) => {
    setUpdatingId(interventionId);
    try {
      const updated = await api<Intervention>(`/api/v1/interventions/${interventionId}`, {
        method: 'PATCH',
        body: { status: newStatus },
      });

      setInterventions((prev) =>
        prev.map((item) => (item.id === interventionId ? { ...item, ...updated } : item))
      );
    } catch (err) {
      console.error(`Failed to update status to ${newStatus}:`, err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Create intervention submit handler
  const handleCreateIntervention = async (payload: CreateInterventionPayload): Promise<boolean> => {
    try {
      await api('/api/v1/interventions', {
        method: 'POST',
        body: payload,
      });
      await fetchInterventions();
      return true;
    } catch (err) {
      console.error('Failed to create intervention:', err);
      return false;
    }
  };

  // Outcome recorded callback
  const handleOutcomeSaved = (_outcome: Outcome) => {
    fetchInterventions();
  };

  // Filter calculations
  const filteredInterventions = interventions.filter((item) => {
    // Status tab filter
    if (activeTab !== 'all' && item.status !== activeTab) {
      return false;
    }
    // Overdue filter
    if (showOverdueOnly && !item.is_overdue) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = (item.student_name || '').toLowerCase().includes(q);
      const codeMatch = (item.student_code || item.student_id || '').toLowerCase().includes(q);
      const typeMatch = (item.intervention_type || item.type || "").toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      if (!nameMatch && !codeMatch && !typeMatch && !descMatch) {
        return false;
      }
    }
    return true;
  });

  // KPI counts
  const totalCount = interventions.length;
  const inProgressCount = interventions.filter((i) => i.status === 'in_progress').length;
  const plannedCount = interventions.filter((i) => i.status === 'planned').length;
  const completedCount = interventions.filter((i) => i.status === 'completed').length;
  const cancelledCount = interventions.filter((i) => i.status === 'cancelled').length;
  const overdueCount = interventions.filter((i) => i.is_overdue).length;
  const outcomesCount = interventions.filter((i) => i.outcomes && i.outcomes.length > 0).length;

  const getPriorityBadge = (priority: Intervention['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger" size="sm" dot>Urgent Priority</Badge>;
      case 'high':
        return <Badge variant="warning" size="sm" dot>High Priority</Badge>;
      case 'medium':
        return <Badge variant="primary" size="sm" dot>Medium Priority</Badge>;
      case 'low':
      default:
        return <Badge variant="neutral" size="sm">Low Priority</Badge>;
    }
  };

  const getStatusBadge = (status: Intervention['status']) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'planned':
        return <Badge variant="warning">Planned</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header and Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Intervention Planning & Outcome Tracking
          </h2>
          <p className="text-xs text-slate-500">
            Lifecycle tracking of multi-disciplinary student support plans with verified baseline vs follow-up comparisons.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchInterventions({ bypassCache: true })}
            disabled={loading}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs text-xs font-semibold"
          >
            New Intervention Plan
          </Button>
        </div>
      </div>

      {/* Metric Cards Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Active Plans</span>
          <div className="text-xl font-bold text-indigo-600 mt-1">{inProgressCount}</div>
          <span className="text-[10px] text-slate-400">Under current execution</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Overdue Follow-ups</span>
          <div className={`text-xl font-bold mt-1 ${overdueCount > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
            {overdueCount}
          </div>
          <span className="text-[10px] text-slate-400">Target review date elapsed</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Outcomes Measured</span>
          <div className="text-xl font-bold text-teal-600 mt-1">{outcomesCount}</div>
          <span className="text-[10px] text-slate-400">With verified delta metrics</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Completed Successfully</span>
          <div className="text-xl font-bold text-emerald-600 mt-1">{completedCount}</div>
          <span className="text-[10px] text-slate-400">Closed support workflows</span>
        </div>
      </div>

      {/* Outcome Tracking Scientific Guidance Banner */}
      <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-xl flex items-start gap-3 text-xs text-indigo-950">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-indigo-900">
            Responsible Outcome Tracking & Non-Causation Standard (KPMG Challenge Integrity)
          </p>
          <p className="text-[11px] text-indigo-800 leading-normal">
            Before-and-after outcome comparisons represent observed metric correlations over time. Under scientific integrity standards, causal attribution to the intervention cannot be asserted without controlled longitudinal evidence.
          </p>
        </div>
      </div>

      {/* Controls: Search & Tabs & Overdue Pill */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b sm:border-b-0 border-slate-200 pb-2 sm:pb-0">
            {[
              { key: 'all', label: 'All Plans', count: totalCount },
              { key: 'in_progress', label: 'In Progress', count: inProgressCount },
              { key: 'planned', label: 'Planned', count: plannedCount },
              { key: 'completed', label: 'Completed', count: completedCount },
              { key: 'cancelled', label: 'Cancelled', count: cancelledCount },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Overdue toggle and Search */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowOverdueOnly(!showOverdueOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                showOverdueOnly
                  ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${showOverdueOnly ? 'text-rose-600' : 'text-slate-400'}`} />
              <span>Overdue Follow-ups Only</span>
              {overdueCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-200 text-rose-800 font-bold">
                  {overdueCount}
                </span>
              )}
            </button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search plans or student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-48 sm:w-56"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && interventions.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Spinner size="lg" label="Loading interventions and outcome telemetry…" />
          <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Loading interventions and outcome telemetry…
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold">Failed to load interventions</h4>
            <p>{error}</p>
            <Button size="sm" variant="secondary" onClick={() => void fetchInterventions({ bypassCache: true })} className="mt-2 text-xs">
              Retry Connection
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredInterventions.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No Interventions Match Your Filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {showOverdueOnly
              ? 'Great news! There are currently no overdue intervention follow-ups pending review.'
              : 'No intervention plans match the current tab or search criteria.'}
          </p>
          {(showOverdueOnly || searchQuery || activeTab !== 'all') && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowOverdueOnly(false);
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="text-xs"
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}

      {/* Intervention Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInterventions.map((item) => {
          const isBusy = updatingId === item.id;
          const hasOutcomes = item.outcomes && item.outcomes.length > 0;
          const primaryOutcome = hasOutcomes ? item.outcomes![0] : null;

          return (
            <Card key={item.id} hoverable className="space-y-3 border-slate-200 flex flex-col justify-between">
              <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {item.student_name || 'Student Record'}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          ({item.student_code || item.student_id})
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-indigo-600 mt-0.5 capitalize">
                        {(item.intervention_type || item.type || "Support").replace('_', ' ')}
                      </h4>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1.5">
                        {getStatusBadge(item.status)}
                        {getPriorityBadge(item.priority)}
                      </div>
                      {item.is_overdue && item.status !== 'completed' && item.status !== 'cancelled' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>Overdue Follow-up</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Staff and Schedule Meta */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.assigned_to || 'Assigned Support Specialist'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className={item.is_overdue ? 'text-rose-600 font-bold' : ''}>
                        Follow-up: {item.follow_up_date || 'Unspecified'}
                      </span>
                    </div>
                  </div>

                  {/* Outcome Comparison Block (if recorded) */}
                  {primaryOutcome && (
                    <div className="mt-3 p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-teal-900 text-xs">
                          <Scale className="w-3.5 h-3.5 text-teal-700" />
                          <span>Recorded Outcome: {primaryOutcome.metric_name}</span>
                        </div>
                        <span className="text-[10px] text-teal-700">
                          {primaryOutcome.measurement_date}
                        </span>
                      </div>

                      {/* Before / After comparison */}
                      <div className="flex items-center justify-between font-mono text-xs">
                        <div className="bg-white px-2.5 py-1 rounded-md border border-teal-200 text-slate-700">
                          Baseline: <strong className="text-slate-900">{(primaryOutcome.baseline_value ?? primaryOutcome.baseline_metric_value ?? 0).toFixed(1)}</strong>
                        </div>
                        <span className="text-teal-600 font-bold">→</span>
                        <div className="bg-white px-2.5 py-1 rounded-md border border-teal-200 text-slate-700">
                          Observed: <strong className="text-teal-800">{(primaryOutcome.post_value ?? primaryOutcome.follow_up_metric_value ?? 0).toFixed(1)}</strong>
                        </div>
                      </div>

                      {/* Deltas */}
                      <div className="flex items-center justify-between pt-1 border-t border-teal-200/60 text-[11px]">
                        <span className="text-teal-800 font-medium">Observed Trajectory:</span>
                        <div className="flex items-center gap-1.5">
                          {primaryOutcome.absolute_change !== undefined && (
                            <span
                              className={`px-1.5 py-0.2 rounded font-bold ${
                                primaryOutcome.absolute_change >= 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {primaryOutcome.absolute_change >= 0
                                ? `+${primaryOutcome.absolute_change}`
                                : primaryOutcome.absolute_change}{' '}
                              pts
                            </span>
                          )}
                          {primaryOutcome.percentage_change !== undefined && (
                            <span
                              className={`px-1.5 py-0.2 rounded font-bold ${
                                primaryOutcome.percentage_change >= 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {primaryOutcome.percentage_change >= 0
                                ? `+${primaryOutcome.percentage_change}%`
                                : `${primaryOutcome.percentage_change}%`}
                            </span>
                          )}
                        </div>
                      </div>

                      {primaryOutcome.notes && (
                        <p className="text-[10px] text-slate-600 italic">
                          "{primaryOutcome.notes}"
                        </p>
                      )}

                      <div className="pt-1 text-[9px] text-teal-800 leading-tight flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-teal-600 shrink-0" />
                        <span>Correlation only: not definitive mathematical proof of sole causation.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Lifecycle Transition Actions Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Action 1: If planned -> Start Plan */}
                    {item.status === 'planned' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={isBusy}
                        onClick={() => handleStatusTransition(item.id, 'in_progress')}
                        className="text-xs h-7 px-2.5 flex items-center gap-1 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200"
                      >
                        <Play className="w-3 h-3" />
                        <span>Start Plan</span>
                      </Button>
                    )}

                    {/* Action 2: If in_progress -> Complete Plan */}
                    {item.status === 'in_progress' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={isBusy}
                        onClick={() => handleStatusTransition(item.id, 'completed')}
                        className="text-xs h-7 px-2.5 flex items-center gap-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Complete</span>
                      </Button>
                    )}

                    {/* Action 3: If not completed / cancelled -> Cancel Plan */}
                    {(item.status === 'planned' || item.status === 'in_progress') && (
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={isBusy}
                        onClick={() => setPlanToCancel(item)}
                        className="text-xs h-7 px-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Cancel</span>
                      </Button>
                    )}
                  </div>

                  {/* Record / Update Outcome Button */}
                  {item.status !== 'cancelled' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedIntervention(item);
                        setOutcomeModalOpen(true);
                      }}
                      className="text-xs h-7 px-2.5 flex items-center gap-1 text-teal-700 border-teal-200 hover:bg-teal-50"
                    >
                      <Scale className="w-3 h-3" />
                      <span>{hasOutcomes ? 'Record Follow-up' : 'Record Outcome'}</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Outcome Recording Modal */}
      <RecordOutcomeModal
        isOpen={outcomeModalOpen}
        onClose={() => {
          setOutcomeModalOpen(false);
          setSelectedIntervention(null);
        }}
        intervention={selectedIntervention}
        onSuccess={handleOutcomeSaved}
      />

      {/* Create Intervention Modal */}
      <CreateInterventionModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        studentsList={directoryStudents}
        onSubmit={handleCreateIntervention}
      />

      {/* Consequential Action: Plan Cancellation Confirmation Modal */}
      {planToCancel && (
        <Modal
          isOpen={!!planToCancel}
          onClose={() => setPlanToCancel(null)}
          title="Confirm Plan Cancellation"
          description="Consequential Student Support Action"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">
                  Are you sure you want to cancel this intervention plan?
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Student: <strong>{planToCancel.student_name || 'Student'}</strong> ({planToCancel.student_code || planToCancel.student_id})
                </p>
                <p className="text-slate-500 text-[11px]">
                  This will mark the support workflow as discontinued in the permanent audit trail.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPlanToCancel(null)}
              >
                Keep Active
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white"
                onClick={async () => {
                  const id = planToCancel.id;
                  setPlanToCancel(null);
                  await handleStatusTransition(id, 'cancelled');
                }}
              >
                Discontinue Plan
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
