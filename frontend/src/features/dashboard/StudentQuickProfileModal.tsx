import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  GraduationCap,
  CalendarCheck,
  Activity,
  HeartHandshake,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import type { FollowUpStudentItem } from '../../types';

interface StudentQuickProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: FollowUpStudentItem | null;
  onOpenIntervention: (student: FollowUpStudentItem) => void;
}

export const StudentQuickProfileModal: React.FC<StudentQuickProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onOpenIntervention,
}) => {
  if (!student) return null;

  const riskBadgeVariant = {
    insufficient_data: 'neutral',
    critical: 'danger',
    high: 'warning',
    moderate: 'warning',
    medium: 'warning',
    low: 'success',
  }[student.risk_level] as 'danger' | 'warning' | 'success';

  // Compute factor weights for transparent visual display
  const attDelta = roundNumber(80.0 - (student.attendance_rate ?? 80));
  const scoreDelta = roundNumber(75.0 - (student.avg_score ?? 75));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Success Dossier & Risk Signals"
      description="Transparent, multi-dimensional assessment profile for advisory discretion and personalized intervention planning."
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Student Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap sm:flex-nowrap items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              {student.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-bold text-slate-900 truncate">{student.name}</h4>
                <Badge variant={riskBadgeVariant} size="sm">
                  {student.risk_level.toUpperCase()} PRIORITY
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                ID: <span className="font-mono font-semibold text-slate-700">{student.student_id}</span> • {student.grade} Section {student.section || 'Not recorded'}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div className="text-xs text-slate-400 font-medium">Composite Risk Index</div>
            <div className="text-xl font-black text-slate-900 mt-0.5 flex items-center sm:justify-end gap-1">
              <span>{student.risk_score}</span>
              <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
          </div>
        </div>

        {/* Primary Flag Banner */}
        <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-900">Primary Observable Signal:</span>{' '}
            <span className="text-amber-800">{student.primary_risk_factor}</span>
            <div className="text-[11px] text-amber-700 mt-1">
              Last recorded event: <span className="font-medium">{student.last_interaction}</span> • Workflow State: <span className="font-medium">{student.status}</span>
            </div>
          </div>
        </div>

        {/* Explainable Factor Breakdown Grid */}
        <div className="space-y-2.5">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Explainable Factor Breakdown (Transparent Weights)
          </h5>

          {/* Factor 1: Attendance */}
          <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Attendance Signal (35% Weight)</span>
              </div>
              <span className="font-bold text-slate-900">{student.attendance_rate == null ? "Not recorded" : `${student.attendance_rate}%`}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  student.attendance_rate != null && student.attendance_rate < 80 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, student.attendance_rate ?? 0)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {student.attendance_rate != null && student.attendance_rate < 80.0
                ? `${attDelta}% below the 80% institutional threshold.`
                : 'See the full journey for recorded attendance and missing-data details.'}
            </p>
          </div>

          {/* Factor 2: Academic */}
          <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                <span>Academic Evaluation (40% Weight)</span>
              </div>
              <span className="font-bold text-slate-900">{student.avg_score == null ? "Not recorded" : `${student.avg_score}%`}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  student.avg_score != null && student.avg_score < 60 ? 'bg-rose-500' : student.avg_score != null && student.avg_score < 75 ? 'bg-amber-500' : 'bg-teal-500'
                }`}
                style={{ width: `${Math.min(100, student.avg_score ?? 0)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {student.avg_score != null && student.avg_score < 75.0
                ? `${scoreDelta}% below the prototype assessment benchmark.`
                : 'See the full journey for available academic evaluations.'}
            </p>
          </div>

          {/* Factor 3: LMS Activity */}
          <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Activity className="w-3.5 h-3.5 text-purple-600" />
                <span>Digital LMS Engagement (25% Weight)</span>
              </div>
              <span className="font-semibold text-slate-700">Digital Logins & Submissions</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Tracking assignment timeliness, discussion board participation, and portal access frequency.
            </p>
          </div>
        </div>

        {/* Ethical Governance Notice */}
        <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            <strong>Advisory Human-in-the-Loop Principle:</strong> This risk index is an empirical summary designed solely to prioritize counselor outreach. It never initiates automated sanctions or punitive academic actions.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100">
          <Link
            to={`/journey?student_id=${student.id}`}
            className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            onClick={onClose}
          >
            <span>View Full Journey Timeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Dismiss
            </Button>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
              onClick={() => {
                onClose();
                onOpenIntervention(student);
              }}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Launch Support Plan</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

function roundNumber(num: number): number {
  return Math.round(num * 10) / 10;
}
