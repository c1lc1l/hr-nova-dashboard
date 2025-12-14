// ============================================
// Service Layer Entry Point
// Switch between mock and real implementations here
// ============================================

import { config } from '@/config';
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
  mockCoreHrService,
  mockLeaveService,
  mockPerformanceService,
  mockAnalyticsService,
  mockAdminService,
  mockAuditService,
  mockAuthService,
} from './mockServices';

// TODO: Import REST implementations when backend is ready
// import { restCoreHrService } from './restServices';

// ============================================
// Service Instances
// Change these to REST implementations when connecting to real backend
// ============================================

export const coreHrService: ICoreHrService = config.features.useMockData
  ? mockCoreHrService
  : mockCoreHrService; // TODO: Replace with restCoreHrService

export const leaveService: ILeaveService = config.features.useMockData
  ? mockLeaveService
  : mockLeaveService; // TODO: Replace with restLeaveService

export const performanceService: IPerformanceService = config.features.useMockData
  ? mockPerformanceService
  : mockPerformanceService; // TODO: Replace with restPerformanceService

export const analyticsService: IAnalyticsService = config.features.useMockData
  ? mockAnalyticsService
  : mockAnalyticsService; // TODO: Replace with restAnalyticsService

export const adminService: IAdminService = config.features.useMockData
  ? mockAdminService
  : mockAdminService; // TODO: Replace with restAdminService

export const auditService: IAuditService = config.features.useMockData
  ? mockAuditService
  : mockAuditService; // TODO: Replace with restAuditService

export const authService: IAuthService = config.features.useMockData
  ? mockAuthService
  : mockAuthService; // TODO: Replace with restAuthService

// Re-export interfaces for convenience
export type {
  ICoreHrService,
  ILeaveService,
  IPerformanceService,
  IAnalyticsService,
  IAdminService,
  IAuditService,
  IAuthService,
};

// Re-export mock data for components that need direct access
export * from './mockData';
