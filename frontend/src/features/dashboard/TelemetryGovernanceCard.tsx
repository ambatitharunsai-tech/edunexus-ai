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
    <Card className="border-slate-200/80 dark:border-[#35433B] shadow-xs hover:border-slate-300 dark:hover:border-[#4A5D52] transition-colors">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-none bg-indigo-50 dark:bg-[#1D332A] text-indigo-700 dark:text-[#56B594] shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-[#E2ECE6]">
                7-Domain Telemetry Coverage & Governance
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-[#8FA89B]">
                Auditable dataset synchronization and decoupled risk tier distributions
              </CardDescription>
            </div>
          </div>
          <Badge variant="neutral" className="bg-slate-100 dark:bg-[#1D2722] text-slate-700 dark:text-[#CBD5CF] border-slate-200 dark:border-[#35433B] text-xs shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-[#56B594] mr-1" />
            Ethical Neutrality Enforced
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Domain Coverage Progress Grid */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-[#CBD5CF] mb-2 font-medium">
            <span>Domain Ingestion Completeness</span>
            <span className="text-[11px] text-slate-400 dark:text-[#8FA89B]">Total Cohort: {totalStudents} Students</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {domains.map(([domain, count]) => {
              const label = DOMAIN_LABELS[domain.toLowerCase()] || domain;
              const pct = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
              const isFull = count === totalStudents;

              return (
                <div
                  key={domain}
                  className="p-2.5 rounded-none border border-slate-100 dark:border-[#35433B] bg-slate-50/70 dark:bg-[#1D2722]/70 hover:bg-slate-50 dark:hover:bg-[#1D2722] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-800 dark:text-[#E2ECE6] capitalize truncate" title={label}>
                      {label}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-[#CBD5CF] shrink-0 ml-1">
                      {count}/{totalStudents}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full bg-slate-200/80 dark:bg-[#25322B] rounded-none h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-none transition-all ${
                          isFull ? 'bg-teal-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-[#8FA89B]">
                      <span>{pct}% captured</span>
                      {isFull ? (
                        <span className="text-teal-700 dark:text-[#5EEAD4] flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Complete
                        </span>
                      ) : (
                        <span className="text-amber-700 dark:text-[#F6D289] flex items-center gap-0.5">
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
          <div className="pt-3 border-t border-slate-100 dark:border-[#35433B] grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicRiskDistribution && academicRiskDistribution.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-[#CBD5CF] uppercase tracking-wider block">
                  Academic Risk Breakdown
                </span>
                <div className="flex flex-wrap gap-2">
                  {academicRiskDistribution.map((tier) => (
                    <div
                      key={tier.tier}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] text-xs shadow-2xs"
                    >
                      <Badge variant={getTierBadgeVariant(tier.tier)} size="sm">
                        {tier.label}
                      </Badge>
                      <span className="font-bold text-slate-900 dark:text-[#E2ECE6]">{tier.count}</span>
                      <span className="text-[10px] text-slate-400 dark:text-[#8FA89B]">({tier.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {placementRiskDistribution && placementRiskDistribution.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-[#CBD5CF] uppercase tracking-wider block">
                  Placement Risk Breakdown
                </span>
                <div className="flex flex-wrap gap-2">
                  {placementRiskDistribution.map((tier) => (
                    <div
                      key={tier.tier}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19] text-xs shadow-2xs"
                    >
                      <Badge variant={getTierBadgeVariant(tier.tier)} size="sm">
                        {tier.label}
                      </Badge>
                      <span className="font-bold text-slate-900 dark:text-[#E2ECE6]">{tier.count}</span>
                      <span className="text-[10px] text-slate-400 dark:text-[#8FA89B]">({tier.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ethical Governance Footer Note */}
        <div className="p-3 rounded-none bg-slate-50 dark:bg-[#1D2722] border border-slate-200/70 dark:border-[#35433B] flex items-start gap-2.5 text-xs text-slate-600 dark:text-[#CBD5CF]">
          <Info className="w-4 h-4 text-indigo-600 dark:text-[#56B594] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Missing Telemetry Neutrality:</strong> Students lacking full 7-domain telemetry are classified under{' '}
            <code className="px-1 py-0.5 rounded-none bg-slate-200/70 dark:bg-[#25322B] font-mono text-[11px] text-slate-800 dark:text-[#E2ECE6]">insufficient_data</code>{' '}
            instead of receiving punitive risk scoring. Placement records and faculty feedback are assessed independently from academic exam results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
