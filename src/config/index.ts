// ============================================
// Application Configuration
// ============================================

export const config = {
  // API Configuration
  // TODO: Replace with actual AWS API Gateway URL when backend is ready
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
  },

  // Feature Flags
  features: {
    useMockData: true, // Set to false when connecting to real backend
    enableBlockchainVerification: true,
    enableAiInsights: true,
  },

  // Auth Configuration
  // TODO: Replace with Cognito configuration
  auth: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
    tokenStorageKey: 'hr_nova_token',
    userStorageKey: 'hr_nova_user',
  },

  // Pagination Defaults
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
  },

  // Date Formats
  dateFormats: {
    display: 'MMM dd, yyyy',
    input: 'yyyy-MM-dd',
    timestamp: 'yyyy-MM-dd HH:mm:ss',
  },

  // Role-based Access Control
  rbac: {
    adminRoles: ['System Admin', 'HR Admin'] as const,
    managerRoles: ['System Admin', 'HR Admin', 'Manager'] as const,
  },
} as const;

// Helper to check if using mock data
export const isUsingMockData = () => config.features.useMockData;

// Helper to get full API URL
export const getApiUrl = (path: string) => `${config.api.baseUrl}${path}`;
