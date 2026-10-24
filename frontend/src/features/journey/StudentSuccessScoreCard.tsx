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
    <Card className="border-[#E4E4E7] dark:border-[#29292D]">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-none bg-indigo-50 dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#A5B4FC] border border-[#E4E4E7] dark:border-[#3F3F46]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-[#18181B] dark:text-[#FAFAFA]">
                Student Success Score (7-Domain Index)
              </CardTitle>
              <CardDescription className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
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
          <div className="p-4 rounded-none bg-[#F4F4F5] dark:bg-[#111113] border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider">
                Success Score
              </span>
              <div className="text-3xl font-black text-[#18181B] dark:text-[#FAFAFA] mt-0.5">
                {success_score !== null ? `${success_score.toFixed(1)}` : 'N/A'}
                <span className="text-sm font-semibold text-[#71717A] dark:text-[#71717A] ml-1">/ 100</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-none bg-[#E4E4E7] dark:bg-[#27272A] text-[#18181B] dark:text-[#FAFAFA] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
          </div>

          {/* Data Coverage */}
          <div className="p-4 rounded-none bg-[#F4F4F5] dark:bg-[#111113] border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#71717A] dark:text-[#71717A] uppercase tracking-wider">
                Domain Coverage
              </span>
              <div className="text-2xl font-bold text-[#18181B] dark:text-[#FAFAFA] mt-0.5">
                {available_domains_count} <span className="text-sm text-[#71717A] font-medium">of 7 Domains</span>
              </div>
              <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                {data_coverage_pct.toFixed(0)}% reporting completeness
              </span>
            </div>
            <div className="w-11 h-11 rounded-none bg-[#E4E4E7] dark:bg-[#27272A] text-[#52525B] dark:text-[#A1A1AA] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* Telemetry Status */}
          <div className="p-4 rounded-none bg-[#F4F4F5] dark:bg-[#111113] border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#71717A] dark:text-[#71717A] uppercase tracking-wider">
                Telemetry Health
              </span>
              <div className="text-sm font-bold text-[#18181B] dark:text-[#FAFAFA] mt-1 capitalize">
                {status.replace('_', ' ')}
              </div>
              <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                {missing_domains.length === 0
                  ? 'All 7 sources verified'
                  : `${missing_domains.length} source(s) unrecorded`}
              </span>
            </div>
            <div className="w-11 h-11 rounded-none bg-[#EEF2FF] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#A5B4FC] flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Missing Data Rescaling Notice (if any domain is missing) */}
        {missing_data_notice && (
          <div className="p-3 bg-[#FEF3C7] dark:bg-[#451A03] border border-[#FCD34D] dark:border-[#92400E] rounded-none text-xs text-[#92400E] dark:text-[#FCD34D] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#92400E] dark:text-[#FCD34D] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Missing-Data Neutrality Activated:</span>
              <p className="text-[11px] leading-relaxed text-[#78350F] dark:text-[#FDE68A]">{missing_data_notice}</p>
            </div>
          </div>
        )}

        {/* Factor Breakdown Table */}
        <div className="overflow-x-auto border border-[#E4E4E7] dark:border-[#27272A] rounded-none">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F4F5] dark:bg-[#1C1C20] border-b border-[#E4E4E7] dark:border-[#27272A] text-[#18181B] dark:text-[#E4E4E7] font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3 text-center">Measured Score</th>
                <th className="py-2.5 px-3 text-center">Initial Weight</th>
                <th className="py-2.5 px-3 text-center">Normalized Weight</th>
                <th className="py-2.5 px-3 text-right">Contribution</th>
                <th className="py-2.5 px-3">Telemetry Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#27272A] text-[#27272A] dark:text-[#D4D4D8]">
              {domain_breakdowns.map((b) => (
                <tr key={b.domain} className={b.is_missing ? 'bg-amber-50/30 dark:bg-[#451A03]/20' : 'hover:bg-[#F4F4F5] dark:hover:bg-[#242428]'}>
                  <td className="py-2.5 px-3 font-semibold text-[#18181B] dark:text-[#FAFAFA] capitalize">
                    {b.domain.replace('_', ' ')}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {b.is_missing ? (
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#FEF3C7] dark:bg-[#451A03] text-[#92400E] dark:text-[#FCD34D] border border-[#FCD34D] dark:border-[#92400E]">
                        Missing Data
                      </span>
                    ) : (
                      <span className="font-bold text-[#18181B] dark:text-[#E4E4E7]">
                        {b.raw_score !== null ? b.raw_score.toFixed(1) : 'N/A'}/100
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center text-[#71717A] dark:text-[#71717A]">
                    {(b.assigned_weight * 100).toFixed(0)}%
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-[#4F46E5] dark:text-[#A5B4FC]">
                    {(b.normalized_weight * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#18181B] dark:text-[#FAFAFA]">
                    +{b.weighted_contribution.toFixed(1)} pts
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
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
