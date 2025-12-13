// API Service Layer - Ready to integrate with AWS backend
import { Employee, LeaveRequest, PerformanceReview, Document, HistoryEvent, RolePermission, AuditLog, Activity, User } from '@/types';
import { 
  mockEmployees, 
  mockLeaveRequests, 
  mockPerformanceReviews, 
  mockDocuments, 
  mockHistory, 
  mockRolePermissions, 
  mockAuditLogs, 
  mockActivities,
  mockCurrentUser 
} from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(500);
    // TODO: Replace with Cognito authentication
    if (email && password) {
      return mockCurrentUser;
    }
    throw new Error('Invalid credentials');
  },
  
  logout: async (): Promise<void> => {
    await delay(300);
    // TODO: Replace with Cognito logout
  },
  
  getCurrentUser: async (): Promise<User> => {
    await delay(200);
    return mockCurrentUser;
  }
};

// Employees API
export const employeesApi = {
  getAll: async (): Promise<Employee[]> => {
    await delay(300);
    return mockEmployees;
  },
  
  getById: async (id: string): Promise<Employee | undefined> => {
    await delay(200);
    return mockEmployees.find(e => e.id === id);
  },
  
  create: async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    await delay(400);
    const newEmployee = { ...employee, id: `EMP${String(mockEmployees.length + 1).padStart(3, '0')}` };
    return newEmployee as Employee;
  },
  
  update: async (id: string, data: Partial<Employee>): Promise<Employee> => {
    await delay(300);
    const employee = mockEmployees.find(e => e.id === id);
    if (!employee) throw new Error('Employee not found');
    return { ...employee, ...data };
  },
  
  getDocuments: async (employeeId: string): Promise<Document[]> => {
    await delay(200);
    return mockDocuments;
  },
  
  getHistory: async (employeeId: string): Promise<HistoryEvent[]> => {
    await delay(200);
    return mockHistory;
  }
};

// Leave API
export const leaveApi = {
  getAll: async (): Promise<LeaveRequest[]> => {
    await delay(300);
    return mockLeaveRequests;
  },
  
  getByEmployee: async (employeeId: string): Promise<LeaveRequest[]> => {
    await delay(200);
    return mockLeaveRequests.filter(l => l.employeeId === employeeId);
  },
  
  create: async (request: Omit<LeaveRequest, 'id' | 'createdAt'>): Promise<LeaveRequest> => {
    await delay(400);
    return {
      ...request,
      id: `LV${String(mockLeaveRequests.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0]
    } as LeaveRequest;
  },
  
  updateStatus: async (id: string, status: LeaveRequest['status']): Promise<LeaveRequest> => {
    await delay(300);
    const request = mockLeaveRequests.find(l => l.id === id);
    if (!request) throw new Error('Leave request not found');
    return { ...request, status };
  }
};

// Performance API
export const performanceApi = {
  getAll: async (): Promise<PerformanceReview[]> => {
    await delay(300);
    return mockPerformanceReviews;
  },
  
  getById: async (id: string): Promise<PerformanceReview | undefined> => {
    await delay(200);
    return mockPerformanceReviews.find(r => r.id === id);
  },
  
  update: async (id: string, data: Partial<PerformanceReview>): Promise<PerformanceReview> => {
    await delay(400);
    const review = mockPerformanceReviews.find(r => r.id === id);
    if (!review) throw new Error('Review not found');
    return { ...review, ...data };
  }
};

// Admin API
export const adminApi = {
  getRoles: async (): Promise<RolePermission[]> => {
    await delay(200);
    return mockRolePermissions;
  },
  
  updateRolePermissions: async (role: string, permissions: Record<string, boolean>): Promise<RolePermission> => {
    await delay(300);
    return { role: role as RolePermission['role'], permissions: permissions as RolePermission['permissions'] };
  }
};

// Audit API
export const auditApi = {
  getAll: async (): Promise<AuditLog[]> => {
    await delay(300);
    return mockAuditLogs;
  },
  
  getByEntity: async (entity: string): Promise<AuditLog[]> => {
    await delay(200);
    return mockAuditLogs.filter(a => a.entity === entity);
  }
};

// Dashboard API
export const dashboardApi = {
  getActivities: async (): Promise<Activity[]> => {
    await delay(200);
    return mockActivities;
  },
  
  getKpis: async () => {
    await delay(200);
    return {
      totalEmployees: 248,
      employeesTrend: 5.2,
      pendingLeaves: 12,
      leavesTrend: -2,
      attendanceRate: 94.5,
      attendanceTrend: 1.3
    };
  }
};
