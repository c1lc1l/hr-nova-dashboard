// ============================================
// Mock Service Implementations
// These implementations return mock data with simulated latency
// ============================================

import {
  ICoreHrService,
  ILeaveService,
  IPerformanceService,
  IAnalyticsService,
  IAdminService,
  IAuditService,
  IAuthService,
} from './interfaces';
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
import {
  mockEmployees,
  mockLeaveRequests,
  mockLeaveBalances,
  mockPerformanceReviews,
  mockDocuments,
  mockHistory,
  mockRolePermissions,
  mockAuditLogs,
  mockActivities,
  mockCurrentUser,
  employeeStatsData,
  performanceChartData,
} from './mockData';
import { config } from '@/config';

// Simulate network latency
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random error (for testing error states)
const maybeError = (errorRate: number = 0): boolean => Math.random() < errorRate;

// === Core HR Service ===
export const mockCoreHrService: ICoreHrService = {
  async listEmployees(filters, page = 1, pageSize = config.pagination.defaultPageSize) {
    await delay();

    let filtered = [...mockEmployees];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(e =>
        e.firstName.toLowerCase().includes(search) ||
        e.lastName.toLowerCase().includes(search) ||
        e.email.toLowerCase().includes(search) ||
        e.id.toLowerCase().includes(search)
      );
    }

    if (filters?.role && filters.role !== 'all') {
      filtered = filtered.filter(e => e.role === filters.role);
    }

    if (filters?.department && filters.department !== 'all') {
      filtered = filtered.filter(e => e.department === filters.department);
    }

    if (filters?.city && filters.city !== 'all') {
      filtered = filtered.filter(e => e.city === filters.city);
    }

    if (filters?.status && filters.status !== 'all') {
      filtered = filtered.filter(e => e.status === filters.status);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const data = filtered.slice((page - 1) * pageSize, page * pageSize);

    return { data, total, page, pageSize, totalPages };
  },

  async getEmployee(id) {
    await delay(200);
    return mockEmployees.find(e => e.id === id) || null;
  },

  async createEmployee(data) {
    await delay(400);
    const newEmployee: Employee = {
      ...data,
      id: `EMP${String(mockEmployees.length + 1).padStart(3, '0')}`,
      status: 'Active',
    };
    return newEmployee;
  },

  async updateEmployee(id, data) {
    await delay(300);
    const employee = mockEmployees.find(e => e.id === id);
    if (!employee) throw new Error('Employee not found');
    return { ...employee, ...data };
  },

  async deleteEmployee(id) {
    await delay(300);
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Employee not found');
  },

  async getEmployeeDocuments(employeeId) {
    await delay(200);
    return mockDocuments.filter(d => d.employeeId === employeeId);
  },

  async uploadDocument(employeeId, file, type) {
    await delay(500);
    const doc: Document = {
      id: `DOC${String(mockDocuments.length + 1).padStart(3, '0')}`,
      employeeId,
      name: file.name,
      type,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${Math.round(file.size / 1024)} KB`,
    };
    return doc;
  },

  async deleteDocument(documentId) {
    await delay(300);
  },

  async getEmployeeHistory(employeeId) {
    await delay(200);
    return mockHistory.filter(h => h.employeeId === employeeId);
  },

  async addHistoryEntry(employeeId, entry) {
    await delay(300);
    const newEntry: EmploymentHistoryEntry = {
      ...entry,
      id: `H${String(mockHistory.length + 1).padStart(3, '0')}`,
      employeeId,
    };
    return newEntry;
  },
};

// === Leave Service ===
export const mockLeaveService: ILeaveService = {
  async listLeaveRequests(filters, page = 1, pageSize = config.pagination.defaultPageSize) {
    await delay();

    let filtered = [...mockLeaveRequests];

    if (filters?.status && filters.status !== 'all') {
      filtered = filtered.filter(l => l.status === filters.status);
    }

    if (filters?.type && filters.type !== 'all') {
      filtered = filtered.filter(l => l.type === filters.type);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const data = filtered.slice((page - 1) * pageSize, page * pageSize);

    return { data, total, page, pageSize, totalPages };
  },

  async getLeaveRequest(id) {
    await delay(200);
    return mockLeaveRequests.find(l => l.id === id) || null;
  },

  async getEmployeeLeaveRequests(employeeId) {
    await delay(200);
    return mockLeaveRequests.filter(l => l.employeeId === employeeId);
  },

  async getLeaveBalance(employeeId) {
    await delay(200);
    return mockLeaveBalances.find(b => b.employeeId === employeeId) || {
      employeeId,
      annual: 15,
      sick: 10,
      personal: 5,
      used: 0,
    };
  },

  async submitLeaveRequest(employeeId, data) {
    await delay(500);
    
    // Simulate validation error
    if (new Date(data.fromDate) > new Date(data.toDate)) {
      throw new Error('From date must be before to date');
    }

    const employee = mockEmployees.find(e => e.id === employeeId);
    const days = Math.ceil((new Date(data.toDate).getTime() - new Date(data.fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const request: LeaveRequest = {
      id: `LV${String(mockLeaveRequests.length + 1).padStart(3, '0')}`,
      employeeId,
      employeeName: employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown',
      employeeAvatar: employee?.avatar,
      type: data.type,
      fromDate: data.fromDate,
      toDate: data.toDate,
      days,
      status: 'Pending',
      reason: data.reason,
      createdAt: new Date().toISOString().split('T')[0],
    };

    return request;
  },

  async updateLeaveStatus(id, status, reviewerId) {
    await delay(300);
    const request = mockLeaveRequests.find(l => l.id === id);
    if (!request) throw new Error('Leave request not found');
    return {
      ...request,
      status,
      reviewedBy: reviewerId,
      reviewedAt: new Date().toISOString().split('T')[0],
    };
  },

  async cancelLeaveRequest(id) {
    await delay(300);
  },
};

// === Performance Service ===
export const mockPerformanceService: IPerformanceService = {
  async listReviews(filters, page = 1, pageSize = config.pagination.defaultPageSize) {
    await delay();

    let filtered = [...mockPerformanceReviews];

    if (filters?.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    if (filters?.cycle) {
      filtered = filtered.filter(r => r.cycle === filters.cycle);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const data = filtered.slice((page - 1) * pageSize, page * pageSize);

    return { data, total, page, pageSize, totalPages };
  },

  async getReview(id) {
    await delay(200);
    return mockPerformanceReviews.find(r => r.id === id) || null;
  },

  async getEmployeeReviews(employeeId) {
    await delay(200);
    return mockPerformanceReviews.filter(r => r.employeeId === employeeId);
  },

  async createReview(data) {
    await delay(400);
    const review: PerformanceReview = {
      ...data,
      id: `PR${String(mockPerformanceReviews.length + 1).padStart(3, '0')}`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    return review;
  },

  async updateReview(id, data) {
    await delay(300);
    const review = mockPerformanceReviews.find(r => r.id === id);
    if (!review) throw new Error('Review not found');
    return {
      ...review,
      ...data,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
  },

  async submitReview(id) {
    await delay(400);
    const review = mockPerformanceReviews.find(r => r.id === id);
    if (!review) throw new Error('Review not found');
    return {
      ...review,
      status: 'Completed' as const,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
  },

  async getReviewStats() {
    await delay(200);
    const completed = mockPerformanceReviews.filter(r => r.status === 'Completed').length;
    const pending = mockPerformanceReviews.filter(r => r.status !== 'Completed').length;
    const rated = mockPerformanceReviews.filter(r => r.overallRating > 0);
    const avgRating = rated.length > 0
      ? rated.reduce((sum, r) => sum + r.overallRating, 0) / rated.length
      : 0;

    return { completed, pending, avgRating };
  },
};

// === Analytics Service ===
export const mockAnalyticsService: IAnalyticsService = {
  async getDashboardKpis() {
    await delay(200);
    return [
      { id: 'kpi-1', name: 'Total Employees', value: 248, trend: 5.2, unit: '' },
      { id: 'kpi-2', name: 'Pending Leaves', value: 12, trend: -2, unit: '' },
      { id: 'kpi-3', name: 'Attendance Rate', value: 94.5, trend: 1.3, unit: '%' },
    ];
  },

  async getHeadcountByDepartment() {
    await delay(200);
    return employeeStatsData;
  },

  async getTurnoverTrend(period) {
    await delay(200);
    return [
      { period: 'Jan', rate: 2.1 },
      { period: 'Feb', rate: 1.8 },
      { period: 'Mar', rate: 2.4 },
      { period: 'Apr', rate: 1.9 },
      { period: 'May', rate: 1.5 },
      { period: 'Jun', rate: 1.7 },
    ];
  },

  async getPerformanceTrend(period) {
    await delay(200);
    return performanceChartData.map(d => ({ period: d.week, score: d.score }));
  },

  async getRecentActivities(limit = 5) {
    await delay(200);
    return mockActivities.slice(0, limit);
  },
};

// === Admin Service ===
export const mockAdminService: IAdminService = {
  async listRoles() {
    await delay(200);
    return mockRolePermissions;
  },

  async createRole(role) {
    await delay(400);
    return role;
  },

  async updateRolePermissions(role, permissions) {
    await delay(300);
    return { role: role as RolePermission['role'], permissions: permissions as RolePermission['permissions'] };
  },

  async deleteRole(role) {
    await delay(300);
  },

  async getSystemSettings() {
    await delay(200);
    return {
      reviewCycleLength: 90,
      autoApproveLeave: false,
      requireManagerApproval: true,
      enableAuditTrail: true,
    };
  },

  async updateSystemSettings(settings) {
    await delay(300);
  },
};

// === Audit Service ===
export const mockAuditService: IAuditService = {
  async listAuditEntries(filters, page = 1, pageSize = config.pagination.defaultPageSize) {
    await delay();

    let filtered = [...mockAuditLogs];

    if (filters?.entityType && filters.entityType !== 'all') {
      filtered = filtered.filter(a => a.entityType === filters.entityType);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(a =>
        a.actor.toLowerCase().includes(search) ||
        a.action.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const data = filtered.slice((page - 1) * pageSize, page * pageSize);

    return { data, total, page, pageSize, totalPages };
  },

  async getAuditEntry(id) {
    await delay(200);
    return mockAuditLogs.find(a => a.id === id) || null;
  },

  async verifyBlockchainEntry(id) {
    await delay(500);
    const entry = mockAuditLogs.find(a => a.id === id);
    return {
      verified: entry?.verified || false,
      txId: entry?.blockchainTxId,
    };
  },

  async exportAuditLog(filters) {
    await delay(1000);
    return new Blob(['audit log export'], { type: 'text/csv' });
  },
};

// === Auth Service ===
export const mockAuthService: IAuthService = {
  async login(email, password) {
    await delay(500);
    // Demo: accept any credentials
    return mockCurrentUser;
  },

  async logout() {
    await delay(300);
  },

  async getCurrentUser() {
    await delay(200);
    return mockCurrentUser;
  },

  async refreshToken() {
    await delay(200);
    return 'mock-jwt-token';
  },

  async forgotPassword(email) {
    await delay(500);
  },

  async resetPassword(token, newPassword) {
    await delay(500);
  },
};
