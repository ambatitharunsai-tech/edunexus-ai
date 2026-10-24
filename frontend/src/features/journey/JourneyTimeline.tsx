import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  HeartHandshake,
  GraduationCap,
  Activity,
  AlertTriangle,
  Briefcase,
  Award,
  MessageSquare,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import type { JourneyTimelineEvent } from '../../types';

interface JourneyTimelineProps {
  events?: JourneyTimelineEvent[];
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ events = [] }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = (events || []).filter((e) => {
    if (filterType === 'all') return true;
    if (filterType === 'placement') {
      return (
        e.title.toLowerCase().includes('placement') ||
        e.description.toLowerCase().includes('placement')
      );
    }
    return e.event_type === filterType;
  });

  const getEventIcon = (evt: JourneyTimelineEvent) => {
    const titleLower = evt.title.toLowerCase();
    if (titleLower.includes('placement')) {
      return <Briefcase className="w-3.5 h-3.5 text-emerald-600" />;
    }
    if (titleLower.includes('skill')) {
      return <Award className="w-3.5 h-3.5 text-purple-600" />;
    }
    if (titleLower.includes('feedback') || titleLower.includes('observation') || titleLower.includes('sentiment')) {
      return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
    }

    switch (evt.event_type) {
      case 'academic':
        return <BookOpen className="w-3.5 h-3.5 text-teal-600" />;
      case 'attendance':
        return <Calendar className="w-3.5 h-3.5 text-indigo-600" />;
      case 'intervention':
        return <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />;
      case 'milestone':
        return <GraduationCap className="w-3.5 h-3.5 text-purple-600" />;
      case 'engagement':
        return <Activity className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const getSeverityPill = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-rose-300 bg-rose-50/70 text-rose-800';
      case 'warning':
        return 'border-amber-300 bg-amber-50/70 text-amber-800';
      case 'success':
        return 'border-emerald-300 bg-emerald-50/70 text-emerald-800';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-700';
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-base font-bold text-slate-900">
            Chronological Journey Timeline
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Sequential historical record of academic evaluations, attendance changes, and support touchpoints
          </CardDescription>
        </div>

        {/* Timeline Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
          {[
            { key: 'all', label: 'All Touchpoints' },
            { key: 'academic', label: 'Academics' },
            { key: 'attendance', label: 'Attendance' },
            { key: 'intervention', label: 'Support Plans' },
            { key: 'placement', label: 'Placement' },
            { key: 'milestone', label: 'Milestones & Skills' },
            { key: 'engagement', label: 'LMS & Campus' },
          ].map((tab) => {
            const isActive = filterType === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterType(tab.key)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        {filteredEvents.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No events match the selected timeline category.
          </div>
        ) : (
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {filteredEvents.map((evt) => (
              <div key={evt.id} className="relative flex items-start gap-4 group">
                {/* Node Dot */}
                <div className="absolute -left-6 mt-1 w-6 h-6 rounded-full bg-white border-2 border-slate-300 group-hover:border-indigo-600 flex items-center justify-center shrink-0 shadow-2xs transition-colors">
                  {getEventIcon(evt)}
                </div>

                {/* Event Card */}
                <div
                  className={`flex-1 p-4 rounded-xl border ${getSeverityPill(
                    evt.severity
                  )} shadow-2xs space-y-1.5 transition-colors`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{evt.title}</span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        • {evt.date}
                      </span>
                    </div>
                    {evt.metric_badge && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border self-start shadow-2xs ${
                          evt.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : evt.severity === 'warning'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : evt.severity === 'success'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-white/90 text-slate-800 border-slate-200'
                        }`}
                      >
                        {evt.metric_badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {evt.description}
                  </p>
                  {evt.is_data_gap && (
                    <div className="pt-1 text-[11px] text-amber-700 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span>{evt.gap_reason || 'Data point pending submission.'}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
