import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  HeartHandshake,
  GraduationCap,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import type { JourneyTimelineEvent, TimelineEventType } from '../../types';

interface JourneyTimelineProps {
  events: JourneyTimelineEvent[];
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ events }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = events.filter(
    (e) => filterType === 'all' || e.event_type === filterType
  );

  const getEventIcon = (type: TimelineEventType) => {
    switch (type) {
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
            { key: 'all', label: 'All Events' },
            { key: 'academic', label: 'Academics' },
            { key: 'attendance', label: 'Attendance' },
            { key: 'intervention', label: 'Interventions' },
            { key: 'milestone', label: 'Milestones' },
            { key: 'engagement', label: 'LMS Activity' },
          ].map((tab) => {
            const isActive = filterType === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterType(tab.key)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-2xs'
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
                  {getEventIcon(evt.event_type)}
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
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-800 self-start shadow-2xs">
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
