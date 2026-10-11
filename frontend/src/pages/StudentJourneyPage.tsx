import React, { useState } from 'react';
import {
  Calendar,
  AlertTriangle,
  BookOpen,
  HeartHandshake,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'academic' | 'attendance' | 'intervention' | 'milestone';
  title: string;
  description: string;
  metric?: string;
  severity?: 'neutral' | 'positive' | 'warning' | 'critical';
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'e-1',
    date: 'Oct 10, 2025',
    type: 'attendance',
    title: 'Attendance Trajectory Improved',
    description: '10 consecutive attended school days recorded following personalized mentoring session.',
    metric: '+7.4% Attendance Recovery',
    severity: 'positive',
  },
  {
    id: 'e-2',
    date: 'Sep 28, 2025',
    type: 'intervention',
    title: 'Academic Support Plan Initiated',
    description: 'Peer tutoring paired for Advanced Mathematics; bi-weekly check-in assigned to Counselor Dr. Verma.',
    metric: 'Intervention Plan: Active',
    severity: 'neutral',
  },
  {
    id: 'e-3',
    date: 'Sep 15, 2025',
    type: 'attendance',
    title: 'Attendance Variance Threshold Flagged',
    description: 'Unexcused absences in week 3 caused attendance rate to drop to 74.5% (below 80% threshold).',
    metric: 'Attendance Rate: 74.5%',
    severity: 'critical',
  },
  {
    id: 'e-4',
    date: 'Aug 22, 2025',
    type: 'academic',
    title: 'Midterm Assessment Cycle Completed',
    description: 'Average score across 5 subjects: 68.2%. Mathematics variance detected (-18% vs baseline).',
    metric: 'Math: 54% | Science: 76%',
    severity: 'warning',
  },
  {
    id: 'e-5',
    date: 'Jun 15, 2025',
    type: 'milestone',
    title: 'Academic Term Enrolled',
    description: 'Aarav Sharma enrolled in Grade 11 (Science & Tech Track), Section A.',
    metric: 'Baseline Established',
    severity: 'neutral',
  },
];

export const StudentJourneyPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = mockTimelineEvents.filter(
    (event) => filterType === 'all' || event.type === filterType
  );

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'academic':
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case 'attendance':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'intervention':
        return <HeartHandshake className="w-4 h-4 text-emerald-600" />;
      case 'milestone':
        return <GraduationCap className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Student Profile Overview Header */}
      <Card className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center text-white text-lg font-bold">
                AS
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold tracking-tight">Aarav Sharma</h2>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-slate-200">
                    STU-001
                  </span>
                  <Badge variant="danger" dot>
                    High Focus Tier
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Grade 11 • Section A • Academic Year 2025-26 • Enrolled Jun 2025
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<HeartHandshake className="w-4 h-4" />}
              >
                Log New Intervention
              </Button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10 text-xs">
            <div>
              <p className="text-slate-400">Current Attendance</p>
              <p className="text-base font-bold text-amber-400 mt-0.5">74.5%</p>
              <p className="text-[10px] text-slate-400">Target: ≥80.0%</p>
            </div>
            <div>
              <p className="text-slate-400">Academic Score Avg</p>
              <p className="text-base font-bold text-white mt-0.5">68.2%</p>
              <p className="text-[10px] text-slate-400">5 Assessment Units</p>
            </div>
            <div>
              <p className="text-slate-400">Engagement Score</p>
              <p className="text-base font-bold text-indigo-300 mt-0.5">52 / 100</p>
              <p className="text-[10px] text-slate-400">Co-curricular & Platform</p>
            </div>
            <div>
              <p className="text-slate-400">Active Interventions</p>
              <p className="text-base font-bold text-emerald-400 mt-0.5">1 Plan</p>
              <p className="text-[10px] text-slate-400">Dr. Verma (Assigned)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Explainable Risk Factors Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <CardTitle>Explainable Risk Analysis & Contributing Factors</CardTitle>
            </div>
            <Badge variant="warning" size="sm">Requires Human Review</Badge>
          </div>
          <CardDescription>
            Decomposition of observed metrics contributing to student support recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">1. Attendance Factor</span>
                <span className="text-indigo-600 font-bold">35% Weight</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                74.5% attendance rate in the past 60 days. Triggers support flag when below 80%.
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-amber-500 h-full w-[74.5%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">2. Academic Factor</span>
                <span className="text-indigo-600 font-bold">40% Weight</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                68.2% average score with variance in Mathematics (54%). Baseline target is 70%.
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-indigo-600 h-full w-[68.2%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">3. Engagement Factor</span>
                <span className="text-indigo-600 font-bold">25% Weight</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Moderate extracurricular and learning portal sessions recorded (4 activities in 60 days).
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full w-[52%]" />
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Human-in-the-Loop Safeguard:</strong> This risk profile is purely descriptive to support educators and counselors. No automatic disciplinary or punitive action may be taken on this basis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chronological Journey Timeline */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Chronological Journey Timeline</CardTitle>
            <CardDescription>
              Sequential log of student milestones, academic assessments, and intervention touchpoints
            </CardDescription>
          </div>
          {/* Timeline Filters */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs self-start">
            {['all', 'academic', 'attendance', 'intervention'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${
                  filterType === type
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {filteredEvents.map((event) => (
              <div key={event.id} className="relative flex items-start gap-4 group">
                {/* Timeline node icon */}
                <div className="absolute -left-6 mt-1 w-6 h-6 rounded-full bg-white border-2 border-slate-300 group-hover:border-indigo-600 flex items-center justify-center shrink-0 shadow-2xs transition-colors">
                  {getEventIcon(event.type)}
                </div>

                {/* Event Card */}
                <div className="flex-1 p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-2xs space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{event.title}</span>
                      <span className="text-[11px] text-slate-400">• {event.date}</span>
                    </div>
                    {event.metric && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 self-start">
                        {event.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
