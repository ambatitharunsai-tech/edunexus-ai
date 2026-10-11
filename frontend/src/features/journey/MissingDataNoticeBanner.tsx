import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import type { MissingDataNotice } from '../../types';

interface MissingDataNoticeBannerProps {
  notices: MissingDataNotice[];
}

export const MissingDataNoticeBanner: React.FC<MissingDataNoticeBannerProps> = ({ notices }) => {
  if (!notices || notices.length === 0) return null;

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2.5">
      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
        <AlertCircle className="w-4 h-4 text-amber-600" />
        <span>Telemetry Transparency & Missing Data Disclosures ({notices.length})</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {notices.map((notice, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-white border border-amber-200/80 shadow-2xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{notice.metric}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                {notice.status}
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {notice.message}
            </p>
            <div className="pt-1 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-teal-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{notice.impact_on_scoring}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
