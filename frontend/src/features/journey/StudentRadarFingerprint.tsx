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
    <Card className="border-[#E4E4E7] dark:border-[#29292D]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-none bg-indigo-50 dark:bg-[#1E1B4B] text-[#4F46E5] dark:text-[#A5B4FC] border border-[#E4E4E7] dark:border-[#3F3F46]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-[#18181B] dark:text-[#FAFAFA]">
                7-Domain Competency Radar
              </CardTitle>
              <CardDescription className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
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
              <PolarGrid stroke="var(--chart-grid, #27272A)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: 'var(--chart-axis, #A1A1AA)', fontSize: 10, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: 'var(--chart-axis, #71717A)', fontSize: 9 }}
              />
              <Radar
                name={studentName}
                dataKey="score"
                stroke="var(--chart-1, #818CF8)"
                fill="var(--chart-1, #818CF8)"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--chart-tooltip-bg, #18181B)',
                  borderRadius: 0,
                  border: '1px solid var(--chart-tooltip-border, #3F3F46)',
                  color: 'var(--chart-tooltip-text, #FAFAFA)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
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
