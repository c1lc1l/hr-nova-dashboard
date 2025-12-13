// Employee Types
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
  status: 'Active' | 'Inactive' | 'On Leave';
  manager?: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  address?: string;
}

// Leave Types
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
}

// Performance Types
export type ReviewStatus = 'Completed' | 'In Progress' | 'Not Started';

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
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  rating?: number;
}

export interface Competency {
  id: string;
  name: string;
  rating: number;
  comments?: string;
}

// Document Types
export interface Document {
  id: string;
  name: string;
  type: 'Contract' | 'ID' | 'Certificate' | 'Policy' | 'Other';
  uploadDate: string;
  size: string;
}

// History Types
export interface HistoryEvent {
  id: string;
  date: string;
  type: 'Hired' | 'Promoted' | 'Role Change' | 'Warning' | 'Award' | 'Transfer';
  description: string;
}

// Role & Permission Types
export type AppRole = 'System Admin' | 'HR Admin' | 'Manager' | 'Employee';
export type Module = 'Core HR' | 'Leave' | 'Performance' | 'Dashboard' | 'Audit';

export interface RolePermission {
  role: AppRole;
  permissions: Record<Module, boolean>;
}

// Audit Types
export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: 'Employee' | 'Leave' | 'Review' | 'Document' | 'System';
  entityId?: string;
  status: 'Success' | 'Failed';
  verified: boolean;
  blockchainTxId?: string;
}

// Activity Types
export interface Activity {
  id: string;
  type: 'leave' | 'employee' | 'review' | 'document';
  message: string;
  timestamp: string;
}

// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: AppRole;
}
