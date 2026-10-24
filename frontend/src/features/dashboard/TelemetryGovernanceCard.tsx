import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Database, ShieldCheck, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import type { RiskDistributionTier } from '../../types';

interface TelemetryGovernanceCardProps {
  domainCoverage: Record<string, number>;
  totalStudents: number;
  academicRiskDistribution?: RiskDistributionTier[];
  placementRiskDistribution?: RiskDistributionTier[];
}

const DOMAIN_LABELS: Record<string, string> = {
  academic: 'Academic Performance',
  attendance: 'Attendance Records',
  placement: 'Placement & Career',
  lms: 'LMS Activity & Portal',
  engagement: 'Co-Curricular Engagement',
  skills: 'Technical & Soft Skills',
  feedback: 'Faculty & Advisor Feedback',
};

export const TelemetryGovernanceCard: React.FC<TelemetryGovernanceCardProps> = ({
  domainCoverage,
  totalStudents,
  academicRiskDistribution,
  placementRiskDistribution,
}) => {
  const domains = Object.entries(domainCoverage || {});

  const getTierBadgeVariant = (tier: string): 'danger' | 'warning' | 'success' | 'neutral' => {
    switch (tier.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'danger';
      case 'moderate':
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'neutral';
    }
  };

  return (
    <Card className="border-[#E4E4E7] dark:border-[#29292D] shadow-xs hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] transition-colors">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-none bg-indigo-50 dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#A5B4FC] shrink-0 border border-[#E4E4E7] dark:border-[#3F3F46]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                7-Domain Telemetry Coverage & Governance
              </CardTitle>
              <CardDescription className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                Auditable dataset synchronization and decoupled risk tier distributions
              </CardDescription>
            </div>
          </div>
          <Badge variant="neutral" className="text-xs shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#67E8F9] mr-1" />
            Ethical Neutrality Enforced
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Domain Coverage Progress Grid */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#52525B] dark:text-[#A1A1AA] mb-2 font-medium">
            <span>Domain Ingestion Completeness</span>
            <span className="text-[11px] text-[#71717A] dark:text-[#71717A]">Total Cohort: {totalStudents} Students</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {domains.map(([domain, count]) => {
              const label = DOMAIN_LABELS[domain.toLowerCase()] || domain;
              const pct = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
              const isFull = count === totalStudents;

              return (
                <div
                  key={domain}
                  className="p-2.5 rounded-none border border-[#E4E4E7] dark:border-[#27272A] bg-slate-50/70 dark:bg-[#111113] hover:bg-slate-50 dark:hover:bg-[#141416] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-[#18181B] dark:text-[#FAFAFA] capitalize truncate" title={label}>
                      {label}
                    </span>
                    <span className="text-[11px] font-semibold text-[#52525B] dark:text-[#A1A1AA] shrink-0 ml-1">
                      {count}/{totalStudents}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full bg-[#E4E4E7] dark:bg-[#27272A] rounded-none h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-none transition-all ${
                          isFull ? 'bg-[#0891B2] dark:bg-[#22D3EE]' : 'bg-[#D97706] dark:bg-[#FBBF24]'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#71717A] dark:text-[#71717A]">
                      <span>{pct}% captured</span>
                      {isFull ? (
                        <span className="text-[#0E7490] dark:text-[#67E8F9] flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Complete
                        </span>
                      ) : (
                        <span className="text-[#92400E] dark:text-[#FCD34D] flex items-center gap-0.5">
                          <AlertCircle className="w-3 h-3" /> Partial
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decoupled Risk Distributions */}
        {(academicRiskDistribution || placementRiskDistribution) && (
          <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#27272A] grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicRiskDistribution && academicRiskDistribution.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#18181B] dark:text-[#FAFAFA] uppercase tracking-wider block">
                  Academic Risk Breakdown
                </span>
                <div className="flex flex-wrap gap-2">
                  {academicRiskDistribution.map((tier) => (
                    <div
                      key={tier.tier}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#141416] text-xs shadow-2xs"
                    >
                      <Badge variant={getTierBadgeVariant(tier.tier)} size="sm">
                        {tier.label}
                      </Badge>
                      <span className="font-bold text-[#18181B] dark:text-[#FAFAFA]">{tier.count}</span>
                      <span className="text-[10px] text-[#71717A] dark:text-[#71717A]">({tier.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {placementRiskDistribution && placementRiskDistribution.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#18181B] dark:text-[#FAFAFA] uppercase tracking-wider block">
                  Placement Risk Breakdown
                </span>
                <div className="flex flex-wrap gap-2">
                  {placementRiskDistribution.map((tier) => (
                    <div
                      key={tier.tier}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#141416] text-xs shadow-2xs"
                    >
                      <Badge variant={getTierBadgeVariant(tier.tier)} size="sm">
                        {tier.label}
                      </Badge>
                      <span className="font-bold text-[#18181B] dark:text-[#FAFAFA]">{tier.count}</span>
                      <span className="text-[10px] text-[#71717A] dark:text-[#71717A]">({tier.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ethical Governance Footer Note */}
        <div className="p-3 rounded-none bg-slate-50 dark:bg-[#111113] border border-[#E4E4E7] dark:border-[#27272A] flex items-start gap-2.5 text-xs text-[#52525B] dark:text-[#A1A1AA]">
          <Info className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Missing Telemetry Neutrality:</strong> Students lacking full 7-domain telemetry are classified under{' '}
            <code className="px-1 py-0.5 rounded-none bg-[#E4E4E7] dark:bg-[#27272A] font-mono text-[11px] text-[#18181B] dark:text-[#FAFAFA]">insufficient_data</code>{' '}
            instead of receiving punitive risk scoring. Placement records and faculty feedback are assessed independently from academic exam results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
