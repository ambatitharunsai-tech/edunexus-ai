import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Award, AlertCircle, CheckCircle2, Scale, Info } from 'lucide-react';
import type { SuccessScoreProfile } from '../../types';

interface StudentSuccessScoreCardProps {
  successProfile?: SuccessScoreProfile;
}

export const StudentSuccessScoreCard: React.FC<StudentSuccessScoreCardProps> = ({ successProfile }) => {
  if (!successProfile) return null;

  const {
    success_score,
    success_tier,
    data_coverage_pct,
    available_domains_count,
    status,
    missing_domains,
    domain_breakdowns,
    missing_data_notice,
  } = successProfile;

  const tierBadgeMap: Record<string, { label: string; variant: 'success' | 'info' | 'warning' | 'danger' }> = {
    thriving: { label: 'Thriving (High Readiness)', variant: 'success' },
    proficient: { label: 'Proficient (Stable Trajectory)', variant: 'info' },
    developing: { label: 'Developing (Support Advised)', variant: 'warning' },
    needs_support: { label: 'Needs Support (High Focus)', variant: 'danger' },
  };

  const tierInfo = (success_tier && tierBadgeMap[success_tier]) || {
    label: 'Under Evaluation',
    variant: 'neutral' as const,
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Student Success Score (7-Domain Index)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Comprehensive 0–100 positive achievement index with dynamic weight rescaling
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={tierInfo.variant} size="sm">
              {tierInfo.label}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Score and Coverage KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Main Score */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50/50 border border-teal-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                Success Score
              </span>
              <div className="text-3xl font-black text-teal-900 mt-0.5">
                {success_score !== null ? `${success_score.toFixed(1)}` : 'N/A'}
                <span className="text-sm font-semibold text-teal-600 ml-1">/ 100</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-teal-600/10 text-teal-700 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
          </div>

          {/* Data Coverage */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Domain Coverage
              </span>
              <div className="text-2xl font-bold text-slate-800 mt-0.5">
                {available_domains_count} <span className="text-sm text-slate-500 font-medium">of 7 Domains</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {data_coverage_pct.toFixed(0)}% reporting completeness
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-slate-200/60 text-slate-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* Telemetry Status */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Telemetry Health
              </span>
              <div className="text-sm font-bold text-slate-800 mt-1 capitalize">
                {status.replace('_', ' ')}
              </div>
              <span className="text-[11px] text-slate-500">
                {missing_domains.length === 0
                  ? 'All 7 sources verified'
                  : `${missing_domains.length} source(s) unrecorded`}
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Missing Data Rescaling Notice (if any domain is missing) */}
        {missing_data_notice && (
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Missing-Data Neutrality Activated:</span>
              <p className="text-[11px] leading-relaxed text-amber-800">{missing_data_notice}</p>
            </div>
          </div>
        )}

        {/* Factor Breakdown Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-[#35433B] rounded-none">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#EEF2F6] dark:bg-[#1D2722] border-b border-slate-200 dark:border-[#35433B] text-slate-700 dark:text-[#CBD5CF] font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3 text-center">Measured Score</th>
                <th className="py-2.5 px-3 text-center">Initial Weight</th>
                <th className="py-2.5 px-3 text-center">Normalized Weight</th>
                <th className="py-2.5 px-3 text-right">Contribution</th>
                <th className="py-2.5 px-3">Telemetry Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#25322B] text-slate-700 dark:text-[#CBD5CF]">
              {domain_breakdowns.map((b) => (
                <tr key={b.domain} className={b.is_missing ? 'bg-amber-50/30 dark:bg-[#261F14]/40' : 'hover:bg-slate-50/60 dark:hover:bg-[#1D2722]/60'}>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-[#E2ECE6] capitalize">
                    {b.domain.replace('_', ' ')}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {b.is_missing ? (
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-amber-100 dark:bg-[#261F14] text-amber-800 dark:text-[#F6D289] border border-amber-200 dark:border-[#45331C]">
                        Missing Data
                      </span>
                    ) : (
                      <span className="font-bold text-slate-800 dark:text-[#E2ECE6]">
                        {b.raw_score !== null ? b.raw_score.toFixed(1) : 'N/A'}/100
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-500 dark:text-[#8FA89B]">
                    {(b.assigned_weight * 100).toFixed(0)}%
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-indigo-700 dark:text-[#56B594]">
                    {(b.normalized_weight * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-[#E2ECE6]">
                    +{b.weighted_contribution.toFixed(1)} pts
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-500 dark:text-[#8FA89B]">
                    {Object.entries(b.telemetry_summary || {})
                      .slice(0, 2)
                      .map(([k, v]) => `${k.replace('_', ' ')}: ${v}`)
                      .join(' • ') || 'Standard metrics recorded'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
