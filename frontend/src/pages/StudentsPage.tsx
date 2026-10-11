import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';

interface StudentPreview {
  id: string;
  studentId: string;
  name: string;
  grade: string;
  section: string;
  attendanceRate: number;
  averageScore: number;
  riskTier: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'review';
}

const mockStudents: StudentPreview[] = [
  {
    id: 's-1',
    studentId: 'STU-001',
    name: 'Aarav Sharma',
    grade: 'Grade 11',
    section: 'A',
    attendanceRate: 74.5,
    averageScore: 68.2,
    riskTier: 'high',
    status: 'review',
  },
  {
    id: 's-2',
    studentId: 'STU-002',
    name: 'Diya Patel',
    grade: 'Grade 10',
    section: 'B',
    attendanceRate: 91.0,
    averageScore: 84.5,
    riskTier: 'low',
    status: 'active',
  },
  {
    id: 's-3',
    studentId: 'STU-003',
    name: 'Rohan Mehta',
    grade: 'Grade 12',
    section: 'A',
    attendanceRate: 79.2,
    averageScore: 71.0,
    riskTier: 'medium',
    status: 'active',
  },
  {
    id: 's-4',
    studentId: 'STU-004',
    name: 'Ananya Iyer',
    grade: 'Grade 11',
    section: 'C',
    attendanceRate: 96.5,
    averageScore: 92.4,
    riskTier: 'low',
    status: 'active',
  },
  {
    id: 's-5',
    studentId: 'STU-005',
    name: 'Vikram Reddy',
    grade: 'Grade 10',
    section: 'A',
    attendanceRate: 64.0,
    averageScore: 59.5,
    riskTier: 'critical',
    status: 'review',
  },
];

export const StudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade =
      selectedGrade === 'all' || student.grade.toLowerCase().includes(selectedGrade);
    const matchesRisk =
      selectedRisk === 'all' || student.riskTier === selectedRisk;
    return matchesSearch && matchesGrade && matchesRisk;
  });

  const getRiskBadge = (tier: StudentPreview['riskTier']) => {
    switch (tier) {
      case 'low':
        return <Badge variant="success" dot>Low Risk</Badge>;
      case 'medium':
        return <Badge variant="warning" dot>Moderate</Badge>;
      case 'high':
        return <Badge variant="danger" dot>High Focus</Badge>;
      case 'critical':
        return <Badge variant="danger" dot>Critical Flag</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Student Directory</h2>
          <p className="text-xs text-slate-500">
            Search, filter, and inspect cohort records with explainable risk indicators.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export Cohort
          </Button>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Student
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              className="py-1.5"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Grade:</span>
            </div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Filter by Grade"
            >
              <option value="all">All Grades</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Risk:</span>
            </div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Filter by Risk Tier"
            >
              <option value="all">All Tiers</option>
              <option value="low">Low Risk</option>
              <option value="medium">Moderate</option>
              <option value="high">High Focus</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Grade / Section</th>
                <th className="py-3 px-4">Attendance Rate</th>
                <th className="py-3 px-4">Avg Score</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4 text-right">Journey Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/75 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                      {student.studentId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{student.name}</div>
                      <span className="text-[11px] text-slate-400">
                        {student.studentId.toLowerCase()}@edunexus-demo.example
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium">
                      {student.grade} - Section {student.section}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={
                          student.attendanceRate < 80
                            ? 'font-bold text-rose-600'
                            : 'font-medium text-slate-800'
                        }
                      >
                        {student.attendanceRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {student.averageScore.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4">{getRiskBadge(student.riskTier)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link to="/journey">
                        <Button
                          variant="ghost"
                          size="sm"
                          rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                        >
                          View Journey
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No students match the selected search or filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredStudents.length} of {mockStudents.length} records (Demo Cohort)
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-700">Page 1 of 1</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
