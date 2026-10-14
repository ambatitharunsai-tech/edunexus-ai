import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Users2, ArrowRight } from 'lucide-react';

interface SegmentationItem {
  segment_id: string;
  label: string;
  count: number;
  percentage: number;
  badge_color: string;
  tagline: string;
}

interface StudentSegmentationCardProps {
  segmentDistribution?: SegmentationItem[];
}

export const StudentSegmentationCard: React.FC<StudentSegmentationCardProps> = ({ segmentDistribution }) => {
  if (!segmentDistribution || segmentDistribution.length === 0) return null;

  const colorMap: Record<string, { bg: string; text: string; border: string; pill: string }> = {
    emerald: { bg: 'bg-emerald-50/70', text: 'text-emerald-800', border: 'border-emerald-200', pill: 'bg-emerald-600' },
    blue: { bg: 'bg-blue-50/70', text: 'text-blue-800', border: 'border-blue-200', pill: 'bg-blue-600' },
    amber: { bg: 'bg-amber-50/70', text: 'text-amber-800', border: 'border-amber-200', pill: 'bg-amber-500' },
    rose: { bg: 'bg-rose-50/70', text: 'text-rose-800', border: 'border-rose-200', pill: 'bg-rose-600' },
    purple: { bg: 'bg-purple-50/70', text: 'text-purple-800', border: 'border-purple-200', pill: 'bg-purple-600' },
  };

  return (
    <Card className="border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
              <Users2 className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-slate-900">
                Actionable Student Segmentation
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Recorded indicators guide support pathways; incomplete records await review
              </CardDescription>
            </div>
          </div>
          <Badge variant="neutral" className="bg-purple-50/50 text-purple-700 border-purple-200 text-xs">
            Bonus Capability
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-1">
          {segmentDistribution.map((item) => {
            const style = colorMap[item.badge_color] || colorMap.purple;
            return (
              <div
                key={item.segment_id}
                className={`p-3 rounded-lg border ${style.border} ${style.bg} flex flex-col justify-between transition-all hover:shadow-xs`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${style.text}`}>
                      {item.tagline}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {item.count} <span className="text-[10px] font-normal text-slate-500">({item.percentage}%)</span>
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 mb-1 leading-tight">
                    {item.label}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60">
                  <Link
                    to={`/students?segment=${item.segment_id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 hover:underline"
                  >
                    View Cohort <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
