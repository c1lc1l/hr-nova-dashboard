// ============================================
// Domain Types for HR NOVA
// ============================================

// === Employee Types ===
export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
  department: string;
  city: string;
  joiningDate: string;
  status: EmployeeStatus;
  manager?: string;
  employmentType: EmploymentType;
  address?: string;
}

export interface EmploymentHistoryEntry {
  id: string;
  employeeId: string;
  date: string;
  type: 'Hired' | 'Promoted' | 'Role Change' | 'Warning' | 'Award' | 'Transfer';
  description: string;
  previousValue?: string;
  newValue?: string;
}

// === Document Types ===
export type DocumentType = 'Contract' | 'ID' | 'Certificate' | 'Policy' | 'Other';

export interface Document {
  id: string;
  employeeId: string;
  name: string;
  type: DocumentType;
  uploadDate: string;
  size: string;
  url?: string;
}

// === Leave Types ===
export type LeaveType = 'Annual' | 'Sick' | 'Personal' | 'Maternity' | 'Paternity' | 'Unpaid';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  type: LeaveType;
  fromDate: string;
  toDate: string;
  days: number;
  status: LeaveStatus;
  reason?: string;
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface LeaveBalance {
  employeeId: string;
  annual: number;
  sick: number;
  personal: number;
  used: number;
}

// === Performance Types ===
export type ReviewStatus = 'Completed' | 'In Progress' | 'Not Started';

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  rating?: number;
  dueDate?: string;
}

export interface Competency {
  id: string;
  name: string;
  rating: number;
  comments?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  employeeAvatar?: string;
  cycle: string;
  period: string;
  overallRating: number;
  status: ReviewStatus;
  lastUpdated: string;
  goals?: Goal[];
  competencies?: Competency[];
  comments?: string;
  reviewerId?: string;
}

// === Analytics Types ===
export interface KpiMetric {
  id: string;
  name: string;
  value: number | string;
  trend: number;
  unit?: string;
  period?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  [key: string]: string | number;
}

// === Audit Types ===
export type AuditEntityType = 'Employee' | 'Leave' | 'Review' | 'Document' | 'System';
export type AuditActionStatus = 'Success' | 'Failed';

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorId?: string;
  action: string;
  entityType: AuditEntityType;
  entityId?: string;
  status: AuditActionStatus;
  verified: boolean;
  blockchainTxId?: string;
  metadata?: Record<string, unknown>;
}

// Alias for backward compatibility
export type AuditLog = AuditEntry;

// === Role & Permission Types ===
export type AppRole = 'System Admin' | 'HR Admin' | 'Manager' | 'Employee';
export type Module = 'Core HR' | 'Leave' | 'Performance' | 'Dashboard' | 'Audit';

export interface Permission {
  module: Module;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
}

export interface RolePermission {
  role: AppRole;
  permissions: Record<Module, boolean>;
}

// === User Types ===
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: AppRole;
}

// === Activity Types ===
export type ActivityType = 'leave' | 'employee' | 'review' | 'document' | 'system';

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
  actorId?: string;
  actorName?: string;
  entityId?: string;
}

// === History Types (legacy alias) ===
export type HistoryEvent = EmploymentHistoryEntry;

// === API Response Types ===
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

// === Form Types ===
export interface LeaveRequestFormData {
  type: LeaveType;
  fromDate: string;
  toDate: string;
  reason?: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  city: string;
  joiningDate: string;
  employmentType: EmploymentType;
  manager?: string;
  address?: string;
}

// === Filter Types ===
export interface EmployeeFilters {
  search: string;
  role: string;
  department: string;
  city: string;
  status: EmployeeStatus | 'all';
}

export interface LeaveFilters {
  status: LeaveStatus | 'all';
  type: LeaveType | 'all';
  dateRange?: { from: string; to: string };
}

export interface AuditFilters {
  entityType: AuditEntityType | 'all';
  dateRange?: { from: string; to: string };
  search: string;
}
