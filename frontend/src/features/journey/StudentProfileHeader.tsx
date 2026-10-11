import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  HeartHandshake,
  Mail,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import type { StudentJourneyProfileResponse } from '../../types';

interface StudentProfileHeaderProps {
  profile: StudentJourneyProfileResponse;
  onOpenIntervention: () => void;
}

export const StudentProfileHeader: React.FC<StudentProfileHeaderProps> = ({
  profile,
  onOpenIntervention,
}) => {
  const { student, department, risk_profile } = profile;
  const initials = `${student.first_name[0] || ''}${student.last_name[0] || ''}`.toUpperCase();

  const riskVariant = {
    critical: 'danger',
    high: 'warning',
    medium: 'warning',
    low: 'success',
  }[risk_profile.overall_risk] as 'danger' | 'warning' | 'success';

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 space-y-4">
      {/* Navigation & Controls */}
      <div className="flex items-center justify-between">
        <Link
          to="/students"
          className="inline-flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students Directory</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant={riskVariant} size="sm">
            {risk_profile.overall_risk.toUpperCase()} PRIORITY
          </Badge>
          <span className="text-xs text-slate-300 font-mono">
            Risk Index: <strong className="text-white">{risk_profile.risk_score}</strong>/100
          </span>
        </div>
      </div>

      {/* Main Profile Info Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pt-1">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/60 border border-indigo-400/40 flex items-center justify-center text-white text-xl font-black shadow-inner select-none shrink-0">
            {initials}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold tracking-tight text-white">
                {student.first_name} {student.last_name}
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-white/10 text-indigo-200 border border-white/15">
                {student.student_id}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {student.status.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>{department}</span>
              </span>
              <span>•</span>
              <span>
                {student.current_grade || student.grade || 'Current Cohort'} {student.academic_term ? `(${student.academic_term})` : ''}
              </span>
              <span>•</span>
              <span>Section {student.section || 'A'}</span>
            </p>

            <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-0.5">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{student.email || `${student.student_id.toLowerCase()}@edunexus-demo.example`}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Enrolled: {student.enrollment_date}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            size="sm"
            onClick={onOpenIntervention}
            className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-sm font-semibold"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Create Support Plan</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
