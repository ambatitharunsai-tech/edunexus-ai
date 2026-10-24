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
    <Card className="border-[#E4E4E7] dark:border-[#29292D] shadow-xs hover:border-[#D4D4D8] dark:hover:border-[#3F3F46] transition-colors">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="p-2 rounded-none bg-[#F4F4F5] dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#A5B4FC] shrink-0 border border-[#E4E4E7] dark:border-[#3F3F46]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                Academic vs Placement Risk Matrix
              </CardTitle>
              <CardDescription className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                Independent decoupled analysis preventing false conflation between exam and career risks
              </CardDescription>
            </div>
          </div>
          <Badge variant="neutral" className="text-xs shrink-0 self-start sm:self-auto">
            Decoupled Logic
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
          {/* Top Left: Low Academic Risk / Low Placement Risk (Cyan Low-Risk) */}
          <Link
            to="/students?academic_risk=low&placement_risk=low"
            className="p-3 rounded-none border border-[#67E8F9] dark:border-[#155E75] bg-[#CFFAFE] dark:bg-[#083344] hover:bg-[#BAF7FC] dark:hover:bg-[#0A4257] transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-[#0E7490] dark:text-[#67E8F9] text-[11px] leading-tight flex-1 min-w-[7rem]">Academic Safe • Placement Ready</span>
              <span className="text-base font-bold text-[#0E7490] dark:text-[#67E8F9] shrink-0">{lowLow}</span>
            </div>
            <p className="text-[11px] text-[#155E75] dark:text-[#A5F3FC]">Both indicators on track. Low risk across all criteria.</p>
            <span className="mt-2 text-[10px] font-bold text-[#0E7490] dark:text-[#67E8F9] flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Top Right: Low Academic Risk / High Placement Risk (Blue Information) */}
          <Link
            to="/students?academic_risk=low&placement_risk=high"
            className="p-3 rounded-none border border-[#93C5FD] dark:border-[#1D4ED8] bg-[#DBEAFE] dark:bg-[#172554] hover:bg-[#BFDBFE] dark:hover:bg-[#1E3A8A] transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-[#1D4ED8] dark:text-[#93C5FD] text-[11px] leading-tight flex-1 min-w-[7rem]">Academic Safe • Placement At-Risk</span>
              <span className="text-base font-bold text-[#1D4ED8] dark:text-[#93C5FD] shrink-0">{lowHigh}</span>
            </div>
            <p className="text-[11px] text-[#1E40AF] dark:text-[#BFDBFE]">Strong coursework/CGPA, but low coding test or 0 mock interviews.</p>
            <span className="mt-2 text-[10px] font-bold text-[#1D4ED8] dark:text-[#93C5FD] flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Bottom Left: High Academic Risk / Low Placement Risk (Amber Warning) */}
          <Link
            to="/students?academic_risk=high&placement_risk=low"
            className="p-3 rounded-none border border-[#FCD34D] dark:border-[#92400E] bg-[#FEF3C7] dark:bg-[#451A03] hover:bg-[#FDE68A] dark:hover:bg-[#592204] transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-[#92400E] dark:text-[#FCD34D] text-[11px] leading-tight flex-1 min-w-[7rem]">Academic At-Risk • Placement Ready</span>
              <span className="text-base font-bold text-[#92400E] dark:text-[#FCD34D] shrink-0">{highLow}</span>
            </div>
            <p className="text-[11px] text-[#78350F] dark:text-[#FDE68A]">Low placement risk alongside high academic risk; review recorded factors.</p>
            <span className="mt-2 text-[10px] font-bold text-[#92400E] dark:text-[#FCD34D] flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Bottom Right: High Academic Risk / High Placement Risk (Rose High Risk) */}
          <Link
            to="/students?academic_risk=high&placement_risk=high"
            className="p-3 rounded-none border border-[#FDA4AF] dark:border-[#9F1239] bg-[#FFE4E6] dark:bg-[#4C0519] hover:bg-[#FECDD3] dark:hover:bg-[#630720] transition-colors group block"
          >
            <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
              <span className="font-semibold text-[#9F1239] dark:text-[#FDA4AF] text-[11px] leading-tight flex-1 min-w-[7rem]">Priority Dual Risk</span>
              <span className="text-base font-bold text-[#9F1239] dark:text-[#FDA4AF] shrink-0">{highHigh}</span>
            </div>
            <p className="text-[11px] text-[#881337] dark:text-[#FECDD3]">Simultaneous exam struggles and placement preparation deficit.</p>
            <span className="mt-2 text-[10px] font-bold text-[#9F1239] dark:text-[#FDA4AF] flex items-center gap-1 group-hover:underline">
              <span>View Students</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] text-center mt-2 pt-2 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center gap-4">
          <Link to="/students?risk_tier=insufficient_data" className="hover:text-[#4F46E5] dark:hover:text-[#A5B4FC] hover:underline">
            Awaiting telemetry: <strong>{insufficientData}</strong>
          </Link>
          <span>•</span>
          <Link to="/students?risk_tier=medium" className="hover:text-[#4F46E5] dark:hover:text-[#A5B4FC] hover:underline">
            Moderate / developing: <strong>{moderate}</strong> students
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
