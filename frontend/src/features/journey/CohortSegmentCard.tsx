import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Users2, CheckCircle2 } from 'lucide-react';
import type { StudentSegmentProfile } from '../../types';

interface CohortSegmentCardProps {
  segmentProfile?: StudentSegmentProfile;
}

export const CohortSegmentCard: React.FC<CohortSegmentCardProps> = ({ segmentProfile }) => {
  if (!segmentProfile) return null;

  const { segment_id, segment_label, description, recommended_action, action_type, tagline, badge_color } = segmentProfile;

  const colorClasses: Record<string, { bg: string; border: string; text: string; badgeVariant: 'success' | 'info' | 'warning' | 'danger' | 'neutral' }> = {
    emerald: { bg: 'bg-emerald-50/70', border: 'border-emerald-200', text: 'text-emerald-900', badgeVariant: 'success' },
    blue: { bg: 'bg-blue-50/70', border: 'border-blue-200', text: 'text-blue-900', badgeVariant: 'info' },
    amber: { bg: 'bg-amber-50/70', border: 'border-amber-200', text: 'text-amber-900', badgeVariant: 'warning' },
    rose: { bg: 'bg-rose-50/70', border: 'border-rose-200', text: 'text-rose-900', badgeVariant: 'danger' },
    purple: { bg: 'bg-purple-50/70', border: 'border-purple-200', text: 'text-purple-900', badgeVariant: 'neutral' },
  };

  const currentTheme = colorClasses[badge_color] || colorClasses.purple;

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
              <Users2 className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Actionable Student Segmentation
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Rule-based institutional cohort classification with customized intervention guidance
              </CardDescription>
            </div>
          </div>
          <Badge variant={currentTheme.badgeVariant} size="sm">
            Action: {action_type.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Banner with Segment Label and Description */}
        <div className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.bg}`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-black ${currentTheme.text}`}>
              {segment_label}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 text-slate-600 border border-slate-200 uppercase">
              Cohort ID: {segment_id}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-600 italic mb-1.5">
            "{tagline}"
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Pathway */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Targeted Institutional Action Pathway
          </span>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800 hover:bg-slate-100/70 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{recommended_action}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
