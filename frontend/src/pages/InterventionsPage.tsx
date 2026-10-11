import React, { useState } from 'react';
import {
  User,
  Plus,
  Clock,
  Info,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface InterventionItem {
  id: string;
  studentName: string;
  studentId: string;
  type: string;
  description: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'planned' | 'in_progress' | 'completed';
  startDate: string;
  followUpDate: string;
  metricBefore?: string;
  metricAfter?: string;
}

const mockInterventions: InterventionItem[] = [
  {
    id: 'int-1',
    studentName: 'Aarav Sharma',
    studentId: 'STU-001',
    type: 'Academic Peer Mentorship',
    description: 'Bi-weekly calculus & physics coaching sessions with senior peer mentor.',
    assignedTo: 'Dr. Verma (Math Dept)',
    priority: 'high',
    status: 'in_progress',
    startDate: 'Sep 28, 2025',
    followUpDate: 'Oct 18, 2025',
    metricBefore: 'Math: 54%',
    metricAfter: 'Math: 68% (Target)',
  },
  {
    id: 'int-2',
    studentName: 'Vikram Reddy',
    studentId: 'STU-005',
    type: 'Attendance Advisory & Counseling',
    description: 'Parent-teacher conference and daily morning attendance confirmation check-in.',
    assignedTo: 'Counselor Priya Nair',
    priority: 'urgent',
    status: 'in_progress',
    startDate: 'Oct 02, 2025',
    followUpDate: 'Oct 16, 2025',
    metricBefore: 'Att: 64%',
    metricAfter: 'Att: 76% (Past 7d)',
  },
  {
    id: 'int-3',
    studentName: 'Rohan Mehta',
    studentId: 'STU-003',
    type: 'Schedule Adjustment',
    description: 'Reassigned lab block to minimize transit conflicts causing morning lates.',
    assignedTo: 'Academic Dean Office',
    priority: 'medium',
    status: 'completed',
    startDate: 'Aug 10, 2025',
    followUpDate: 'Sep 10, 2025',
    metricBefore: 'Tardies: 8/mo',
    metricAfter: 'Tardies: 1/mo',
  },
  {
    id: 'int-4',
    studentName: 'Diya Patel',
    studentId: 'STU-002',
    type: 'Extracurricular Re-engagement',
    description: 'Enrollment in Robotics club and collaborative study group.',
    assignedTo: 'Prof. S. Gupta',
    priority: 'low',
    status: 'planned',
    startDate: 'Oct 20, 2025',
    followUpDate: 'Nov 10, 2025',
  },
];

export const InterventionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'planned' | 'completed'>('all');

  const filteredInterventions = mockInterventions.filter(
    (item) => activeTab === 'all' || item.status === activeTab
  );

  const getPriorityBadge = (priority: InterventionItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger" size="sm" dot>Urgent Priority</Badge>;
      case 'high':
        return <Badge variant="warning" size="sm" dot>High Priority</Badge>;
      case 'medium':
        return <Badge variant="primary" size="sm" dot>Medium Priority</Badge>;
      case 'low':
        return <Badge variant="neutral" size="sm">Low Priority</Badge>;
    }
  };

  const getStatusBadge = (status: InterventionItem['status']) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'planned':
        return <Badge variant="warning">Planned</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Intervention Planning & Tracking</h2>
          <p className="text-xs text-slate-500">
            Assign, schedule, and track personalized interventions with before/after outcome metrics.
          </p>
        </div>
        <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          New Intervention Plan
        </Button>
      </div>

      {/* Outcome Tracking Scientific Guidance Banner */}
      <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-xl flex items-start gap-3 text-xs text-indigo-950">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-indigo-900">
            Responsible Outcome Tracking Guideline
          </p>
          <p className="text-[11px] text-indigo-800 leading-normal">
            Before-and-after outcome comparisons represent observed metric correlations. Causation cannot be asserted without controlled evidence.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'all', label: 'All Plans', count: mockInterventions.length },
          { key: 'in_progress', label: 'In Progress', count: 2 },
          { key: 'planned', label: 'Planned', count: 1 },
          { key: 'completed', label: 'Completed', count: 1 },
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

      {/* Intervention Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInterventions.map((item) => (
          <Card key={item.id} hoverable className="space-y-3">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{item.studentName}</span>
                    <span className="font-mono text-xs text-slate-400">({item.studentId})</span>
                  </div>
                  <h4 className="text-xs font-semibold text-indigo-600 mt-0.5">
                    {item.type}
                  </h4>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {getStatusBadge(item.status)}
                  {getPriorityBadge(item.priority)}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-normal">
                {item.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.assignedTo}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Follow-up: {item.followUpDate}</span>
                </div>
              </div>

              {/* Before/After Metric Preview */}
              {item.metricBefore && item.metricAfter && (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">Outcome Tracking:</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Before: {item.metricBefore}
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                      After: {item.metricAfter}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
