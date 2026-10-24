import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Compass } from 'lucide-react';
import type { DomainScoreBreakdown } from '../../types';

interface StudentRadarFingerprintProps {
  domainBreakdowns?: DomainScoreBreakdown[];
  studentName?: string;
}

export const StudentRadarFingerprint: React.FC<StudentRadarFingerprintProps> = ({
  domainBreakdowns,
  studentName = 'Student',
}) => {
  if (!domainBreakdowns || domainBreakdowns.length === 0) return null;

  const data = domainBreakdowns.map((b) => ({
    subject: b.domain.replace('_', ' ').toUpperCase(),
    score: b.raw_score !== null ? b.raw_score : 50,
    fullMark: 100,
    isMissing: b.is_missing,
  }));

  const validScores = domainBreakdowns.filter((b) => !b.is_missing && b.raw_score !== null);
  const studentAverage = validScores.length
    ? Math.round(validScores.reduce((acc, curr) => acc + (curr.raw_score || 0), 0) / validScores.length)
    : 70;

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">
                7-Domain Competency Radar
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Holistic multi-dimensional fingerprint for {studentName}
              </CardDescription>
            </div>
          </div>
          <Badge variant="neutral" size="sm">
            Mean Index: {studentAverage}/100
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#94a3b8', fontSize: 9 }}
              />
              <Radar
                name={studentName}
                dataKey="score"
                stroke="#0d9488"
                fill="#0d9488"
                fillOpacity={0.35}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #ffffff)',
                  borderRadius: 0,
                  border: '1px solid var(--tooltip-border, #e2e8f0)',
                  color: 'var(--tooltip-text, #1e293b)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '11px',
                }}
                formatter={(val: any, _name: any, item: any) => [
                  item.payload.isMissing ? 'Missing Data (Neutral)' : `${Number(val || 0)}/100`,
                  'Domain Score',
                ]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
