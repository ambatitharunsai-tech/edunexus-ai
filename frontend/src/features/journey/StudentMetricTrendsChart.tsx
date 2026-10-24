import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';

interface StudentMetricTrendsChartProps {
  metricsTrend: Array<{
    period: string;
    attendance: number;
    score: number;
  }>;
}

export const StudentMetricTrendsChart: React.FC<StudentMetricTrendsChartProps> = ({ metricsTrend }) => {
  return (
    <Card className="border-[#E4E4E7] dark:border-[#29292D]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-bold text-[#18181B] dark:text-[#FAFAFA]">
            Student Metric Trajectories Over Time
          </CardTitle>
          <CardDescription className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
            Attendance consistency vs evaluation marks progression across semester cycles
          </CardDescription>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#71717A] dark:text-[#A1A1AA]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#818CF8] inline-block" />
            <span>Attendance %</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] inline-block" />
            <span>Assessment Score %</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#FB7185] font-medium">
            <span className="w-2.5 h-0.5 bg-[#FB7185] inline-block" />
            <span>80% Min</span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={metricsTrend}
              margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #27272A)" vertical={false} />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11, fill: 'var(--chart-axis, #A1A1AA)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--chart-grid, #27272A)' }}
              />
              <YAxis
                domain={[50, 100]}
                tick={{ fontSize: 11, fill: 'var(--chart-axis, #A1A1AA)' }}
                tickFormatter={(val) => `${val}%`}
                tickLine={false}
                axisLine={{ stroke: 'var(--chart-grid, #27272A)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--chart-tooltip-bg, #18181B)',
                  borderRadius: 0,
                  border: '1px solid var(--chart-tooltip-border, #3F3F46)',
                  color: 'var(--chart-tooltip-text, #FAFAFA)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                  fontSize: '12px',
                }}
                formatter={(val: any, name: any) => [
                  `${Number(val || 0)}%`,
                  name === 'attendance' ? 'Attendance Rate' : 'Evaluation Score',
                ]}
              />
              <ReferenceLine
                y={80}
                stroke="var(--chart-6, #FB7185)"
                strokeDasharray="4 4"
                label={{
                  value: '80% Benchmark',
                  position: 'top',
                  fill: 'var(--chart-6, #FB7185)',
                  fontSize: 10,
                  fontWeight: 600,
                }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                name="attendance"
                stroke="var(--chart-1, #818CF8)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: 'var(--chart-1, #818CF8)' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="score"
                name="score"
                stroke="var(--chart-2, #22D3EE)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: 'var(--chart-2, #22D3EE)' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
