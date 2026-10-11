import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { HeartHandshake, CheckCircle2, AlertCircle } from 'lucide-react';
import type { CreateInterventionPayload, FollowUpStudentItem } from '../../types';

interface CreateInterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStudent?: FollowUpStudentItem | null;
  studentsList: FollowUpStudentItem[];
  onSubmit: (payload: CreateInterventionPayload) => Promise<boolean>;
}

export const CreateInterventionModal: React.FC<CreateInterventionModalProps> = ({
  isOpen,
  onClose,
  preselectedStudent,
  studentsList,
  onSubmit,
}) => {
  const targetStudent = preselectedStudent || (studentsList.length > 0 ? studentsList[0] : null);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(targetStudent?.id || '');
  const [title, setTitle] = useState<string>(targetStudent ? `Support Plan: ${targetStudent.name}` : '');
  const [interventionType, setInterventionType] = useState<string>('academic_tutoring');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>(
    targetStudent?.risk_level === 'critical' ? 'urgent' : targetStudent?.risk_level === 'high' ? 'high' : 'medium'
  );
  const [targetCompletionDate, setTargetCompletionDate] = useState<string>(() => {
    const target = new Date();
    target.setDate(target.getDate() + 30);
    return target.toISOString().split('T')[0];
  });
  const [assignedStaff, setAssignedStaff] = useState<string>('Academic Support Team');
  const [description, setDescription] = useState<string>(
    targetStudent ? `Personalized support plan addressing primary signal: ${targetStudent.primary_risk_factor}.` : ''
  );
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Sync state if preselected student changes
  useEffect(() => {
    if (!isOpen) return;
    if (preselectedStudent) {
      setSelectedStudentId(preselectedStudent.id);
      setTitle(`Targeted Support: ${preselectedStudent.name}`);
      setDescription(
        `Personalized support plan addressing primary signal: ${preselectedStudent.primary_risk_factor}.`
      );
      setPriority(
        preselectedStudent.risk_level === 'critical'
          ? 'urgent'
          : preselectedStudent.risk_level === 'high'
          ? 'high'
          : 'medium'
      );
    }
  }, [preselectedStudent, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) {
      setSubmitError('Please select a student.');
      return;
    }
    if (!title.trim()) {
      setSubmitError('Please enter a descriptive plan title.');
      return;
    }
    if (!description.trim()) {
      setSubmitError('Please enter intervention strategy details.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload: CreateInterventionPayload = {
      student_id: selectedStudentId,
      title: title.trim(),
      description: description.trim(),
      intervention_type: interventionType,
      priority,
      start_date: new Date().toISOString().split('T')[0],
      target_completion_date: targetCompletionDate || undefined,
      assigned_staff_name: assignedStaff.trim() || 'Academic Support Team',
      notes: notes.trim() || undefined,
    };

    const isOk = await onSubmit(payload);
    setSubmitting(false);

    if (isOk) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1200);
    } else {
      setSubmitError('Failed to save intervention. Check connection or try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Student Support Intervention"
      description="Design a structured, multi-stakeholder support plan with follow-up milestones and transparent outcome monitoring."
      maxWidth="lg"
    >
      {success ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-in zoom-in-75 duration-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">Intervention Plan Logged</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              The support plan has been activated with status &apos;Planned&apos;. Milestone tracking is active.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Student Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Student <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                const sId = e.target.value;
                setSelectedStudentId(sId);
                const match = studentsList.find((s) => s.id === sId);
                if (match) {
                  setTitle(`Support Plan: ${match.name}`);
                  setDescription(`Intervention addressing: ${match.primary_risk_factor}`);
                }
              }}
              className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            >
              {studentsList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.student_id}) — {s.grade} [{s.risk_level.toUpperCase()} RISK: {s.risk_score}]
                </option>
              ))}
            </select>
          </div>

          {/* Intervention Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Plan Title <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Remedial Concept Tutoring"
              className="text-xs"
              required
            />
          </div>

          {/* Type & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Support Category
              </label>
              <select
                value={interventionType}
                onChange={(e) => setInterventionType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="academic_tutoring">Academic Tutoring</option>
                <option value="attendance_counseling">Attendance Counseling</option>
                <option value="peer_mentoring">Peer Mentorship</option>
                <option value="parental_engagement">Parental Advisory</option>
                <option value="wellness_check">Wellness & Counseling</option>
                <option value="schedule_adjustment">Schedule Adjustment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Priority Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
                className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent / Critical</option>
              </select>
            </div>
          </div>

          {/* Dates & Assigned Officer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Completion Date
              </label>
              <Input
                type="date"
                value={targetCompletionDate}
                onChange={(e) => setTargetCompletionDate(e.target.value)}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Officer / Mentor
              </label>
              <Input
                type="text"
                value={assignedStaff}
                onChange={(e) => setAssignedStaff(e.target.value)}
                placeholder="e.g. Prof. Ramanujan, Success Team"
                className="text-xs"
              />
            </div>
          </div>

          {/* Description & Action Plan */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Strategy Details & Milestones <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline specific weekly commitments, scheduled sessions, and observable success markers..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Initial Baseline Notes (Optional)
            </label>
            <Input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Baseline score 54%; targeting 70% in 4-week post-test."
              className="text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
              disabled={submitting}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{submitting ? 'Activating...' : 'Activate Support Plan'}</span>
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
