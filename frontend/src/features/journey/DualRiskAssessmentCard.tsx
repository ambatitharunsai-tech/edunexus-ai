import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { BookOpen, Briefcase, AlertTriangle, HeartHandshake } from 'lucide-react';
import type { IndependentRiskSignal } from '../../types';

interface DualRiskAssessmentCardProps {
  academicRiskProfile?: IndependentRiskSignal;
  placementRiskProfile?: IndependentRiskSignal;
  onOpenIntervention?: () => void;
}

export const DualRiskAssessmentCard: React.FC<DualRiskAssessmentCardProps> = ({
  academicRiskProfile,
  placementRiskProfile,
  onOpenIntervention,
}) => {
  if (!academicRiskProfile && !placementRiskProfile) return null;

  const getTierVariant = (tier?: string): 'success' | 'warning' | 'danger' | 'neutral' => {
    if (tier === 'insufficient_data') return 'neutral';
    if (tier === 'critical') return 'danger';
    if (tier === 'high' || tier === 'moderate' || tier === 'medium') return 'warning';
    return 'success';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Decoupled Dual-Risk Assessment
          </h3>
          <p className="text-xs text-slate-500">
            Independent signals preventing false conflation between classroom performance and career readiness
          </p>
        </div>
        {onOpenIntervention && (
          <Button
            size="sm"
            onClick={onOpenIntervention}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 text-xs shadow-2xs"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Targeted Support</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Card 1: Academic Risk Signal */}
        {academicRiskProfile && (
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-sm font-bold text-slate-900">
                      Academic Risk Signal
                    </CardTitle>
                    <CardDescription className="text-[11px] text-slate-500">
                      Attendance fidelity & subject evaluations
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <Badge variant={getTierVariant(academicRiskProfile.tier)} size="sm">
                    {(academicRiskProfile.tier || 'low').toUpperCase()} RISK
                  </Badge>
                  <span className="text-xs font-bold text-slate-800">
                    {academicRiskProfile.score == null ? 'Insufficient data' : `${academicRiskProfile.score}/100`}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              {academicRiskProfile.is_critical_flag && (
                <div role="alert" className="flex items-start gap-2.5 border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-900">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  <span className="min-w-0 font-semibold text-[11px] leading-relaxed">
                    Prototype attendance alert: Attendance below 75% triggers priority review
                  </span>
                </div>
              )}

              {/* Factors */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Contributing Factors
                </span>
                <div className="space-y-1">
                  {(academicRiskProfile.contributing_factors || []).map((f, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800">{f.description}</span>
                        <div className="text-[10px] text-slate-400">
                          Observed: <strong className="text-slate-600">{String(f.observed_value)}</strong> (Threshold: {String(f.threshold)})
                        </div>
                      </div>
                      <Badge
                        variant={getTierVariant(f.severity)}
                        size="sm"
                        className="text-[10px] py-0 px-1.5"
                      >
                        {f.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="flex items-start gap-2.5 border border-blue-100 bg-blue-50/60 p-2.5 text-[11px] leading-relaxed text-blue-900">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                <p className="min-w-0">
                  <strong>Faculty Pathway:</strong> {academicRiskProfile.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Card 2: Placement Risk Signal */}
        {placementRiskProfile && (
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-sm font-bold text-slate-900">
                      Placement Risk Signal
                    </CardTitle>
                    <CardDescription className="text-[11px] text-slate-500">
                      Coding competency, aptitude & mock interview drills
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <Badge variant={getTierVariant(placementRiskProfile.tier)} size="sm">
                    {(placementRiskProfile.tier || 'low').toUpperCase()} RISK
                  </Badge>
                  <span className="text-xs font-bold text-slate-800">
                    {placementRiskProfile.score == null ? 'Insufficient data' : `${placementRiskProfile.score}/100`}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              {placementRiskProfile.is_critical_flag && (
                <div role="alert" className="flex items-start gap-2.5 border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-900">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  <span className="min-w-0 font-semibold text-[11px] leading-relaxed">
                    Zero Mock Interview Attendance Flag: Placement eligibility at imminent risk
                  </span>
                </div>
              )}

              {/* Factors */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Contributing Factors
                </span>
                <div className="space-y-1">
                  {(placementRiskProfile.contributing_factors || []).map((f, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800">{f.description}</span>
                        <div className="text-[10px] text-slate-400">
                          Observed: <strong className="text-slate-600">{String(f.observed_value)}</strong> (Threshold: {String(f.threshold)})
                        </div>
                      </div>
                      <Badge
                        variant={getTierVariant(f.severity)}
                        size="sm"
                        className="text-[10px] py-0 px-1.5"
                      >
                        {f.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-100 text-[11px] text-purple-900">
                <strong>Placement Cell Pathway:</strong> {placementRiskProfile.recommendation}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
