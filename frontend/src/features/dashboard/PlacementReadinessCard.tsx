import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Briefcase, Code, Brain, Users } from 'lucide-react';

interface PlacementReadinessCardProps {
  placementSummary?: {
    average_aptitude: number | null;
    average_coding: number | null;
    average_mock_interview: number | null;
    tier_distribution: Record<string, number>;
  };
}

export const PlacementReadinessCard: React.FC<PlacementReadinessCardProps> = ({ placementSummary }) => {
  if (!placementSummary) return null;

  const { average_aptitude, average_coding, average_mock_interview, tier_distribution } = placementSummary;

  const totalTiers = Object.values(tier_distribution || {}).reduce((a, b) => a + b, 0);

  return (
    <Card className="border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-slate-900">
                Placement & Career Readiness
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Aptitude screening, technical coding tests, and mock HR performance
              </CardDescription>
            </div>
          </div>
          <Badge variant="neutral" className="bg-indigo-50/50 text-indigo-700 border-indigo-200 text-xs">
            Placement Cell Sync
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Key Placement Dimensions */}
        <div className="grid grid-cols-3 gap-3 my-2">
          <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 flex flex-col">
            <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1">
              <Brain className="w-3.5 h-3.5 text-indigo-600" />
              <span>Aptitude</span>
            </div>
            <span className="text-xl font-bold text-slate-900">{average_aptitude == null ? 'Not recorded' : `${average_aptitude}%`}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Quant & Reasoning</span>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 flex flex-col">
            <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1">
              <Code className="w-3.5 h-3.5 text-indigo-600" />
              <span>Coding</span>
            </div>
            <span className="text-xl font-bold text-slate-900">{average_coding == null ? 'Not recorded' : `${average_coding}%`}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Algorithms & Syntax</span>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 flex flex-col">
            <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Mock HR</span>
            </div>
            <span className="text-xl font-bold text-slate-900">{average_mock_interview == null ? 'Not recorded' : `${average_mock_interview}%`}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Communication</span>
          </div>
        </div>

        {/* Readiness Tier Distribution Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
            <span className="font-medium text-slate-700">Placement Cohort Distribution</span>
            <span className="text-[11px] text-slate-400">Total: {totalTiers} candidates</span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
            <div
              style={{ width: `${((tier_distribution.advanced_hire || 0) / (totalTiers || 1)) * 100}%` }}
              className="bg-emerald-500 h-full transition-all"
              title={`Advanced Hire: ${tier_distribution.advanced_hire || 0}`}
            />
            <div
              style={{ width: `${((tier_distribution.placement_ready || 0) / (totalTiers || 1)) * 100}%` }}
              className="bg-indigo-500 h-full transition-all"
              title={`Placement Ready: ${tier_distribution.placement_ready || 0}`}
            />
            <div
              style={{ width: `${((tier_distribution.developing || 0) / (totalTiers || 1)) * 100}%` }}
              className="bg-amber-400 h-full transition-all"
              title={`Developing: ${tier_distribution.developing || 0}`}
            />
            <div
              style={{ width: `${((tier_distribution.not_ready || 0) / (totalTiers || 1)) * 100}%` }}
              className="bg-rose-500 h-full transition-all"
              title={`Not Ready: ${tier_distribution.not_ready || 0}`}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600">Advanced: <strong className="text-slate-900">{tier_distribution.advanced_hire || 0}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-slate-600">Ready: <strong className="text-slate-900">{tier_distribution.placement_ready || 0}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-600">Developing: <strong className="text-slate-900">{tier_distribution.developing || 0}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-600">Priority: <strong className="text-slate-900">{tier_distribution.not_ready || 0}</strong></span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
