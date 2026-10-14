import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface DualRiskMatrixCardProps {
  dualRiskMatrix?: Record<string, number>;
}

export const DualRiskMatrixCard: React.FC<DualRiskMatrixCardProps> = ({ dualRiskMatrix }) => {
  if (!dualRiskMatrix) return null;

  const lowLow = dualRiskMatrix.academic_low_placement_low || 0;
  const lowHigh = dualRiskMatrix.academic_low_placement_high || 0;
  const highLow = dualRiskMatrix.academic_high_placement_low || 0;
  const highHigh = dualRiskMatrix.academic_high_placement_high || 0;
  const moderate = dualRiskMatrix.moderate_quadrants || 0;
  const insufficientData = dualRiskMatrix.insufficient_data || 0;

  return (
    <Card className="border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base font-semibold text-slate-900">
                Academic vs Placement Risk Matrix
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Independent decoupled analysis preventing false conflation between exam and career risks
              </CardDescription>
            </div>
          </div>
          <Badge variant="neutral" className="bg-amber-50/50 text-amber-800 border-amber-200 text-xs shrink-0 self-start sm:self-auto">
            Decoupled Logic
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
          {/* Top Left: Low Academic Risk / Low Placement Risk */}
          <Link
            to="/students?academic_risk=low&placement_risk=low"
            className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-emerald-900 group-hover:text-emerald-950 text-[11px] leading-tight flex-1 min-w-[7rem]">Academic Safe • Placement Ready</span>
              <span className="text-base font-bold text-emerald-800 shrink-0">{lowLow}</span>
            </div>
            <p className="text-[11px] text-emerald-700">Both indicators on track. Low risk across all criteria.</p>
            <span className="mt-2 text-[10px] font-bold text-emerald-800 flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Top Right: Low Academic Risk / High Placement Risk */}
          <Link
            to="/students?academic_risk=low&placement_risk=high"
            className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-blue-900 group-hover:text-blue-950 text-[11px] leading-tight flex-1 min-w-[7rem]">Academic Safe • Placement At-Risk</span>
              <span className="text-base font-bold text-blue-800 shrink-0">{lowHigh}</span>
            </div>
            <p className="text-[11px] text-blue-700">Strong coursework/CGPA, but low coding test or 0 mock interviews.</p>
            <span className="mt-2 text-[10px] font-bold text-blue-800 flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Bottom Left: High Academic Risk / Low Placement Risk */}
          <Link
            to="/students?academic_risk=high&placement_risk=low"
            className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-amber-900 group-hover:text-amber-950 text-[11px] leading-tight flex-1 min-w-[7rem]">Academic At-Risk • Placement Ready</span>
              <span className="text-base font-bold text-amber-800 shrink-0">{highLow}</span>
            </div>
            <p className="text-[11px] text-amber-700">Low placement risk alongside high academic risk; review recorded factors.</p>
            <span className="mt-2 text-[10px] font-bold text-amber-800 flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Bottom Right: High Academic Risk / High Placement Risk */}
          <Link
            to="/students?academic_risk=high&placement_risk=high"
            className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-rose-900 group-hover:text-rose-950 text-[11px] leading-tight flex-1 min-w-[7rem]">Priority Dual Risk</span>
              <span className="text-base font-bold text-rose-800 shrink-0">{highHigh}</span>
            </div>
            <p className="text-[11px] text-rose-700">Simultaneous exam struggles and placement preparation deficit.</p>
            <span className="mt-2 text-[10px] font-bold text-rose-800 flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        <div className="text-[11px] text-slate-500 text-center mt-2 pt-2 border-t border-slate-100 flex items-center justify-center gap-4">
          <Link to="/students?risk_tier=insufficient_data" className="hover:text-indigo-600 hover:underline">
            Awaiting telemetry: <strong>{insufficientData}</strong>
          </Link>
          <span>•</span>
          <Link to="/students?risk_tier=medium" className="hover:text-indigo-600 hover:underline">
            Moderate / developing: <strong>{moderate}</strong> students
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
