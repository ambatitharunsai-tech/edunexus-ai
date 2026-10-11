// EduNexus AI — TypeScript interfaces

export interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  grade: string;
  section?: string;
  enrollment_date: string;
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
  created_at?: string;
  updated_at?: string;
  // Computed
  attendance_rate?: number;
  avg_score?: number;
  risk_level?: RiskLevel;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface StudentDetail extends Student {
  attendance: AttendanceRecord[];
  assessments: AssessmentRecord[];
  engagements: EngagementRecord[];
  risk: RiskScore | null;
  interventions: Intervention[];
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  created_at?: string;
}

export interface AssessmentRecord {
  id: string;
  student_id: string;
  subject: string;
  assessment_type: string;
  score: number;
  max_score: number;
  date: string;
  created_at?: string;
}

export interface EngagementRecord {
  id: string;
  student_id: string;
  activity_type: string;
  description?: string;
  duration_minutes?: number;
  date: string;
  created_at?: string;
}

export interface RiskFactor {
  factor: string;
  detail: string;
  value: number;
  weight: number;
  contribution: number;
}

export interface RiskScore {
  id: string;
  student_id: string;
  overall_risk: RiskLevel;
  risk_score: number;
  attendance_factor?: number;
  academic_factor?: number;
  engagement_factor?: number;
  explanation: RiskFactor[];
  computed_at?: string;
  requires_review: boolean;
}

export interface Intervention {
  id: string;
  student_id: string;
  type: string;
  description: string;
  assigned_to?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date?: string;
  follow_up_date?: string;
  completed_date?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  outcomes?: Outcome[];
}

export interface Outcome {
  id: string;
  intervention_id: string;
  metric_name: string;
  value_before?: number;
  value_after?: number;
  measurement_date: string;
  notes?: string;
  created_at?: string;
}

export interface OverviewStats {
  total_students: number;
  active_students: number;
  average_attendance: number;
  at_risk_count: number;
  pending_interventions: number;
  risk_distribution: Record<RiskLevel, number>;
}

export interface TrendPoint {
  date: string;
  value: number;
  label?: string;
}

export interface StudentListResponse {
  students: Student[];
  total: number;
  page: number;
  page_size: number;
}

export interface CsvValidationError {
  row: number;
  column: string;
  message: string;
}

export interface CsvPreviewResponse {
  file_name: string;
  data_type: string;
  total_rows: number;
  valid_rows: number;
  errors: CsvValidationError[];
  sample_data: Record<string, string>[];
}

export interface CsvImportResponse {
  imported: number;
  skipped: number;
  errors: CsvValidationError[];
}
