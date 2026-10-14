import React, { useState } from 'react';
import { X, Scale, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import type { Intervention, Outcome } from '../../types';

interface RecordOutcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  intervention: Intervention | null;
  onSuccess: (newOutcome: Outcome) => void;
}

export const RecordOutcomeModal: React.FC<RecordOutcomeModalProps> = ({
  isOpen,
  onClose,
  intervention,
  onSuccess,
}) => {
  const [metricName, setMetricName] = useState('Assessment Average (%)');
  const [baselineValue, setBaselineValue] = useState('');
  const [followUpValue, setFollowUpValue] = useState('');
  const [measurementDate, setMeasurementDate] = useState<string>(() =>
    new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('Student attended scheduled mentoring sessions consistently.');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync form state when modal opens or intervention changes
  React.useEffect(() => {
    if (!isOpen || !intervention) return;

    if (intervention.outcomes && intervention.outcomes.length > 0) {
      const existing = intervention.outcomes[0];
      setMetricName(existing.metric_name || 'Assessment Average (%)');
      setBaselineValue(String(existing.baseline_value ?? existing.baseline_metric_value ?? ''));
      setFollowUpValue(String(existing.post_value ?? existing.follow_up_metric_value ?? ''));
      setMeasurementDate(existing.measurement_date || new Date().toISOString().split('T')[0]);
      setNotes(
        existing.evidence_notes ||
          existing.notes ||
          'Student completed scheduled support sessions with documented milestone progress.'
      );
    } else {
      setMetricName('Assessment Average (%)');
      setBaselineValue('');
      setFollowUpValue('');

      const today = new Date().toISOString().split('T')[0];
      const startDate = intervention.start_date
        ? String(intervention.start_date).split('T')[0]
        : today;
      setMeasurementDate(today >= startDate ? today : startDate);
      setNotes('');
    }
    setError(null);
  }, [isOpen, intervention]);

  if (!isOpen || !intervention) return null;

  // Real-time delta calculations with safe zero-baseline division protection
  const baselineNumber = baselineValue.trim() === '' ? null : Number(baselineValue);
  const followUpNumber = followUpValue.trim() === '' ? null : Number(followUpValue);
  const validMeasurements =
    baselineNumber !== null && followUpNumber !== null &&
    Number.isFinite(baselineNumber) && Number.isFinite(followUpNumber);
  const absoluteChange = validMeasurements
    ? Number((followUpNumber - baselineNumber).toFixed(2))
    : null;
  const percentageChange = validMeasurements && baselineNumber !== 0
    ? Number((((followUpNumber - baselineNumber) / baselineNumber) * 100).toFixed(1))
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!metricName.trim()) {
      setError('Please select or specify a valid metric name.');
      setSubmitting(false);
      return;
    }

    if (!validMeasurements) {
      setError('Enter finite numeric values for both baseline and follow-up metrics.');
      setSubmitting(false);
      return;
    }

    try {
      // Matches backend CreateOutcomePayload schema exactly
      const payload = {
        metric_name: metricName.trim(),
        baseline_value: baselineNumber,
        post_value: followUpNumber,
        measurement_date: measurementDate,
        evidence_notes: notes ? notes.trim() : undefined,
      };

      const result = await api<Outcome>(`/api/v1/interventions/${intervention.id}/outcomes`, {
        method: 'POST',
        body: payload,
      });

      onSuccess(result);
      onClose();
    } catch (err: unknown) {
      console.error('Failed to record outcome:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to record intervention outcome. Please check input values.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-outcome-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/70">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="record-outcome-title" className="text-sm font-bold text-slate-900 truncate">
                Record Intervention Outcome
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                {intervention.student_name || 'Student'} ({intervention.student_code || intervention.student_id})
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Metric Name / Domain
            </label>
            <select
              value={metricName}
              onChange={(e) => setMetricName(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="Assessment Average (%)">Assessment Average (%)</option>
              <option value="Attendance Rate (%)">Attendance Rate (%)</option>
              <option value="Subject Exam: Mathematics (%)">Subject Exam: Mathematics (%)</option>
              <option value="Subject Exam: Physics (%)">Subject Exam: Physics (%)</option>
              <option value="Assignment Submission Rate (%)">Assignment Submission Rate (%)</option>
              <option value="LMS Weekly Engagement Hours">LMS Weekly Engagement Hours</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Baseline (Pre-Intervention)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={baselineValue}
                onChange={(e) => setBaselineValue(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Follow-Up (Post-Intervention)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={followUpValue}
                onChange={(e) => setFollowUpValue(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Real-time Delta Preview Banner */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Observed Trajectory:</span>
              <div className="flex items-center gap-2 font-mono font-bold text-xs">
                <span className="text-slate-500">{baselineNumber?.toFixed(1) ?? '—'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className={absoluteChange !== null && absoluteChange >= 0 ? 'text-emerald-700' : 'text-slate-500'}>
                  {followUpNumber?.toFixed(1) ?? '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
              <span className="text-slate-500 text-[11px]">Calculated Delta:</span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    absoluteChange !== null && absoluteChange >= 0
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {absoluteChange === null ? 'Enter both values' : `${absoluteChange >= 0 ? '+' : ''}${absoluteChange} pts absolute`}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    percentageChange !== null && percentageChange >= 0
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {!validMeasurements
                    ? 'Enter both values'
                    : baselineNumber === 0
                    ? 'N/A (0 baseline)'
                    : percentageChange !== null && percentageChange >= 0
                    ? `+${percentageChange}% relative`
                    : `${percentageChange}% relative`}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Measurement Date
              </label>
              <input
                type="date"
                required
                value={measurementDate}
                onChange={(e) => setMeasurementDate(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Evaluator / Contextual Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contextual factors, qualitative observations, student feedback..."
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Mandatory Non-Causation Disclaimer Requirement */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5 leading-normal">
              <span className="font-bold text-amber-900">
                Ethical Non-Causation Governance:
              </span>
              <p className="text-amber-800">
                Observed metric changes correlate in time with the support plan but do not constitute mathematical proof of sole causation without controlled longitudinal evidence.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={submitting}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {submitting ? 'Saving Outcome...' : 'Save & Publish Outcome'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
