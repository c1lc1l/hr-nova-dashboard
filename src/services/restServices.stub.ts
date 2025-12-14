// ============================================
// REST Service Implementations (Stub)
// TODO: Implement these when AWS backend is ready
// ============================================

import { getApiUrl, config } from '@/config';
import {
  ICoreHrService,
  ILeaveService,
  IPerformanceService,
  IAnalyticsService,
  IAdminService,
  IAuditService,
  IAuthService,
} from './interfaces';

// ============================================
// HTTP Client Helper
// ============================================

async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown
): Promise<T> {
  const token = localStorage.getItem(config.auth.tokenStorageKey);

  const response = await fetch(getApiUrl(path), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message);
  }

  return response.json();
}

// ============================================
// Core HR Service (REST Implementation)
// ============================================

export const restCoreHrService: ICoreHrService = {
  async listEmployees(filters, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.role && filters.role !== 'all' && { role: filters.role }),
      ...(filters?.city && filters.city !== 'all' && { city: filters.city }),
    });
    return apiRequest('GET', `/employees?${params}`);
  },

  async getEmployee(id) {
    return apiRequest('GET', `/employees/${id}`);
  },

  async createEmployee(data) {
    return apiRequest('POST', '/employees', data);
  },

  async updateEmployee(id, data) {
    return apiRequest('PATCH', `/employees/${id}`, data);
  },

  async deleteEmployee(id) {
    return apiRequest('DELETE', `/employees/${id}`);
  },

  async getEmployeeDocuments(employeeId) {
    return apiRequest('GET', `/employees/${employeeId}/documents`);
  },

  async uploadDocument(employeeId, file, type) {
    // For file uploads, use FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const token = localStorage.getItem(config.auth.tokenStorageKey);
    const response = await fetch(getApiUrl(`/employees/${employeeId}/documents`), {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  },

  async deleteDocument(documentId) {
    return apiRequest('DELETE', `/documents/${documentId}`);
  },

  async getEmployeeHistory(employeeId) {
    return apiRequest('GET', `/employees/${employeeId}/history`);
  },

  async addHistoryEntry(employeeId, entry) {
    return apiRequest('POST', `/employees/${employeeId}/history`, entry);
  },
};

// ============================================
// Leave Service (REST Implementation)
// ============================================

export const restLeaveService: ILeaveService = {
  async listLeaveRequests(filters, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      ...(filters?.status && filters.status !== 'all' && { status: filters.status }),
      ...(filters?.type && filters.type !== 'all' && { type: filters.type }),
    });
    return apiRequest('GET', `/leave-requests?${params}`);
  },

  async getLeaveRequest(id) {
    return apiRequest('GET', `/leave-requests/${id}`);
  },

  async getEmployeeLeaveRequests(employeeId) {
    return apiRequest('GET', `/employees/${employeeId}/leave-requests`);
  },

  async getLeaveBalance(employeeId) {
    return apiRequest('GET', `/employees/${employeeId}/leave-balance`);
  },

  async submitLeaveRequest(employeeId, data) {
    return apiRequest('POST', `/employees/${employeeId}/leave-requests`, data);
  },

  async updateLeaveStatus(id, status, reviewerId) {
    return apiRequest('PATCH', `/leave-requests/${id}/status`, { status, reviewerId });
  },

  async cancelLeaveRequest(id) {
    return apiRequest('DELETE', `/leave-requests/${id}`);
  },
};

// ============================================
// Performance Service (REST Implementation)
// ============================================

export const restPerformanceService: IPerformanceService = {
  async listReviews(filters, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.cycle && { cycle: filters.cycle }),
    });
    return apiRequest('GET', `/performance-reviews?${params}`);
  },

  async getReview(id) {
    return apiRequest('GET', `/performance-reviews/${id}`);
  },

  async getEmployeeReviews(employeeId) {
    return apiRequest('GET', `/employees/${employeeId}/performance-reviews`);
  },

  async createReview(data) {
    return apiRequest('POST', '/performance-reviews', data);
  },

  async updateReview(id, data) {
    return apiRequest('PATCH', `/performance-reviews/${id}`, data);
  },

  async submitReview(id) {
    return apiRequest('POST', `/performance-reviews/${id}/submit`);
  },

  async getReviewStats() {
    return apiRequest('GET', '/performance-reviews/stats');
  },
};

// ============================================
// Analytics Service (REST Implementation)
// ============================================

export const restAnalyticsService: IAnalyticsService = {
  async getDashboardKpis() {
    return apiRequest('GET', '/analytics/kpis');
  },

  async getHeadcountByDepartment() {
    return apiRequest('GET', '/analytics/headcount-by-department');
  },

  async getTurnoverTrend(period) {
    return apiRequest('GET', `/analytics/turnover-trend?period=${period}`);
  },

  async getPerformanceTrend(period) {
    return apiRequest('GET', `/analytics/performance-trend?period=${period}`);
  },

  async getRecentActivities(limit = 5) {
    return apiRequest('GET', `/analytics/activities?limit=${limit}`);
  },
};

// ============================================
// Admin Service (REST Implementation)
// ============================================

export const restAdminService: IAdminService = {
  async listRoles() {
    return apiRequest('GET', '/admin/roles');
  },

  async createRole(role) {
    return apiRequest('POST', '/admin/roles', role);
  },

  async updateRolePermissions(role, permissions) {
    return apiRequest('PATCH', `/admin/roles/${encodeURIComponent(role)}`, { permissions });
  },

  async deleteRole(role) {
    return apiRequest('DELETE', `/admin/roles/${encodeURIComponent(role)}`);
  },

  async getSystemSettings() {
    return apiRequest('GET', '/admin/settings');
  },

  async updateSystemSettings(settings) {
    return apiRequest('PUT', '/admin/settings', settings);
  },
};

// ============================================
// Audit Service (REST Implementation)
// ============================================

export const restAuditService: IAuditService = {
  async listAuditEntries(filters, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      ...(filters?.entityType && filters.entityType !== 'all' && { entityType: filters.entityType }),
      ...(filters?.search && { search: filters.search }),
    });
    return apiRequest('GET', `/audit-logs?${params}`);
  },

  async getAuditEntry(id) {
    return apiRequest('GET', `/audit-logs/${id}`);
  },

  async verifyBlockchainEntry(id) {
    return apiRequest('POST', `/audit-logs/${id}/verify`);
  },

  async exportAuditLog(filters) {
    const token = localStorage.getItem(config.auth.tokenStorageKey);
    const response = await fetch(getApiUrl('/audit-logs/export'), {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  },
};

// ============================================
// Auth Service (REST Implementation with Cognito)
// ============================================

export const restAuthService: IAuthService = {
  async login(email, password) {
    // TODO: Integrate with AWS Cognito
    // import { Auth } from 'aws-amplify';
    // const user = await Auth.signIn(email, password);
    // const session = await Auth.currentSession();
    // localStorage.setItem(config.auth.tokenStorageKey, session.getIdToken().getJwtToken());
    // return mapCognitoUserToUser(user);

    return apiRequest('POST', '/auth/login', { email, password });
  },

  async logout() {
    // TODO: await Auth.signOut();
    localStorage.removeItem(config.auth.tokenStorageKey);
    localStorage.removeItem(config.auth.userStorageKey);
  },

  async getCurrentUser() {
    // TODO: const cognitoUser = await Auth.currentAuthenticatedUser();
    return apiRequest('GET', '/auth/me');
  },

  async refreshToken() {
    // TODO: const session = await Auth.currentSession();
    // return session.getIdToken().getJwtToken();
    return apiRequest('POST', '/auth/refresh');
  },

  async forgotPassword(email) {
    // TODO: await Auth.forgotPassword(email);
    return apiRequest('POST', '/auth/forgot-password', { email });
  },

  async resetPassword(token, newPassword) {
    // TODO: await Auth.forgotPasswordSubmit(email, code, newPassword);
    return apiRequest('POST', '/auth/reset-password', { token, newPassword });
  },
};
