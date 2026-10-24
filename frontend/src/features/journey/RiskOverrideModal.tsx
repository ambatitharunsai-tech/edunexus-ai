import React, { useState } from 'react';
import { X, UserCheck, ShieldAlert, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import type { RiskOverridePayload } from '../../types';

interface RiskOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  currentTier: string;
  currentScore: number | null;
  isOverridden?: boolean;
  overrideDetails?: {
    original_tier: string;
    override_tier: string;
    reason: string;
    staff_name: string;
    recorded_at: string;
  };
  onSuccess: () => void;
}

export const RiskOverrideModal: React.FC<RiskOverrideModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
  currentTier,
  currentScore,
  isOverridden,
  overrideDetails,
  onSuccess,
}) => {
  const [overrideTier, setOverrideTier] = useState<'low' | 'moderate' | 'high' | 'critical'>(
    (overrideDetails?.override_tier as any) || 'moderate'
  );
  const [reason, setReason] = useState(
    overrideDetails?.reason ||
      'Verified mitigating circumstances; student actively completing academic support plan.'
  );
  const [staffName, setStaffName] = useState(overrideDetails?.staff_name || 'Dr. Verma (Dean)');
  const [staffId, setStaffId] = useState('FAC-104');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    if (overrideDetails) {
      setOverrideTier((overrideDetails.override_tier as any) || 'moderate');
      setReason(
        overrideDetails.reason ||
          'Verified mitigating circumstances; student actively completing academic support plan.'
      );
      setStaffName(overrideDetails.staff_name || 'Dr. Verma (Dean)');
    } else {
      const defaultTier =
        currentTier === 'critical'
          ? 'high'
          : currentTier === 'high'
          ? 'moderate'
          : 'moderate';
      setOverrideTier(defaultTier as any);
      setReason(
        `Advisor review: Student ${studentName} demonstrates active engagement and progress towards academic benchmarks.`
      );
      setStaffName('Dr. Verma (Dean)');
    }
    setStaffId('FAC-104');
    setError(null);
  }, [isOpen, studentId, studentName, overrideDetails, currentTier]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload: RiskOverridePayload = {
        override_tier: overrideTier,
        reason,
        staff_id: staffId,
        staff_name: staffName,
        reviewed_by: staffName,
      };

      await api(`/api/v1/students/${studentId}/risk-override`, {
        method: 'POST',
        body: payload,
      });

      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('Failed to submit risk tier override:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to record advisor override. Please verify all inputs.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClearOverride = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await api(`/api/v1/students/${studentId}/risk-override`, {
        method: 'DELETE',
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('Failed to clear override:', err);
      setError(err instanceof Error ? err.message : 'Failed to clear override.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="override-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/70">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="override-modal-title" className="text-sm font-bold text-slate-900 truncate">
                Advisor Review Tier Override
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                {studentName} • Algorithmic Baseline: {currentTier.toUpperCase()} ({currentScore}/100)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isOverridden && overrideDetails && (
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1 text-xs text-indigo-950">
              <span className="font-bold text-indigo-900">Current Active Override:</span>
              <p className="text-[11px] text-indigo-800">
                Overridden to <strong>{overrideDetails.override_tier.toUpperCase()}</strong> by {overrideDetails.staff_name} on {new Date(overrideDetails.recorded_at).toLocaleDateString()}.
              </p>
              <p className="text-[11px] italic text-slate-600">"{overrideDetails.reason}"</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Advisor Review Tier
            </label>
            <select
              value={overrideTier}
              onChange={(e) => setOverrideTier(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="low">LOW — Standard Observation (Stable)</option>
              <option value="moderate">MODERATE — Advisory Check-in Advised</option>
              <option value="high">HIGH — Active Intervention Priority</option>
              <option value="critical">CRITICAL — Urgent Multi-Disciplinary Support</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Documented Human Rationale <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              minLength={10}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Detail the qualitative context, verified medical certificates, bereavement, or extracurricular adjustments justifying this change..."
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Authorized Staff Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="Dr. Verma (Dean)"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Staff / Faculty ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="FAC-104"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 text-[11px] text-slate-600">
            <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p leading-normal>
              Overrides are recorded in the audit trail. They never delete underlying attendance or assessment facts, but govern triage priority and support queues.
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            {isOverridden ? (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleClearOverride}
                disabled={submitting}
                className="text-xs"
              >
                Clear Override (Restore Baseline)
              </Button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
              >
                {submitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Commit Override</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
