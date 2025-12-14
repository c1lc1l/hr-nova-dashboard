// ============================================
// Service Interfaces
// These interfaces define the contract for data services.
// Mock and REST implementations must conform to these.
// ============================================

import {
  Employee,
  EmploymentHistoryEntry,
  Document,
  LeaveRequest,
  LeaveBalance,
  LeaveRequestFormData,
  PerformanceReview,
  RolePermission,
  AuditEntry,
  Activity,
  User,
  KpiMetric,
  PaginatedResponse,
  EmployeeFilters,
  LeaveFilters,
  AuditFilters,
} from '@/types';

// === Core HR Service ===
export interface ICoreHrService {
  // Employees
  listEmployees(filters?: Partial<EmployeeFilters>, page?: number, pageSize?: number): Promise<PaginatedResponse<Employee>>;
  getEmployee(id: string): Promise<Employee | null>;
  createEmployee(data: Omit<Employee, 'id'>): Promise<Employee>;
  updateEmployee(id: string, data: Partial<Employee>): Promise<Employee>;
  deleteEmployee(id: string): Promise<void>;

  // Documents
  getEmployeeDocuments(employeeId: string): Promise<Document[]>;
  uploadDocument(employeeId: string, file: File, type: Document['type']): Promise<Document>;
  deleteDocument(documentId: string): Promise<void>;

  // History
  getEmployeeHistory(employeeId: string): Promise<EmploymentHistoryEntry[]>;
  addHistoryEntry(employeeId: string, entry: Omit<EmploymentHistoryEntry, 'id' | 'employeeId'>): Promise<EmploymentHistoryEntry>;
}

// === Leave Service ===
export interface ILeaveService {
  listLeaveRequests(filters?: Partial<LeaveFilters>, page?: number, pageSize?: number): Promise<PaginatedResponse<LeaveRequest>>;
  getLeaveRequest(id: string): Promise<LeaveRequest | null>;
  getEmployeeLeaveRequests(employeeId: string): Promise<LeaveRequest[]>;
  getLeaveBalance(employeeId: string): Promise<LeaveBalance>;
  submitLeaveRequest(employeeId: string, data: LeaveRequestFormData): Promise<LeaveRequest>;
  updateLeaveStatus(id: string, status: LeaveRequest['status'], reviewerId: string): Promise<LeaveRequest>;
  cancelLeaveRequest(id: string): Promise<void>;
}

// === Performance Service ===
export interface IPerformanceService {
  listReviews(filters?: { status?: string; cycle?: string }, page?: number, pageSize?: number): Promise<PaginatedResponse<PerformanceReview>>;
  getReview(id: string): Promise<PerformanceReview | null>;
  getEmployeeReviews(employeeId: string): Promise<PerformanceReview[]>;
  createReview(data: Omit<PerformanceReview, 'id' | 'lastUpdated'>): Promise<PerformanceReview>;
  updateReview(id: string, data: Partial<PerformanceReview>): Promise<PerformanceReview>;
  submitReview(id: string): Promise<PerformanceReview>;
  getReviewStats(): Promise<{ completed: number; pending: number; avgRating: number }>;
}

// === Analytics Service ===
export interface IAnalyticsService {
  getDashboardKpis(): Promise<KpiMetric[]>;
  getHeadcountByDepartment(): Promise<{ department: string; count: number }[]>;
  getTurnoverTrend(period: string): Promise<{ period: string; rate: number }[]>;
  getPerformanceTrend(period: string): Promise<{ period: string; score: number }[]>;
  getRecentActivities(limit?: number): Promise<Activity[]>;
}

// === Admin Service ===
export interface IAdminService {
  listRoles(): Promise<RolePermission[]>;
  createRole(role: RolePermission): Promise<RolePermission>;
  updateRolePermissions(role: string, permissions: Record<string, boolean>): Promise<RolePermission>;
  deleteRole(role: string): Promise<void>;
  getSystemSettings(): Promise<Record<string, unknown>>;
  updateSystemSettings(settings: Record<string, unknown>): Promise<void>;
}

// === Audit Service ===
export interface IAuditService {
  listAuditEntries(filters?: Partial<AuditFilters>, page?: number, pageSize?: number): Promise<PaginatedResponse<AuditEntry>>;
  getAuditEntry(id: string): Promise<AuditEntry | null>;
  verifyBlockchainEntry(id: string): Promise<{ verified: boolean; txId?: string }>;
  exportAuditLog(filters?: Partial<AuditFilters>): Promise<Blob>;
}

// === Auth Service ===
export interface IAuthService {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(): Promise<string>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}
