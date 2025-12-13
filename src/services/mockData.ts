import { Employee, LeaveRequest, PerformanceReview, Document, HistoryEvent, RolePermission, AuditLog, Activity } from '@/types';

export const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    city: 'San Francisco',
    joiningDate: '2021-03-15',
    status: 'Active',
    manager: 'Michael Chen',
    employmentType: 'Full-time',
    address: '123 Tech Lane, San Francisco, CA 94102'
  },
  {
    id: 'EMP002',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Engineering Manager',
    department: 'Engineering',
    city: 'San Francisco',
    joiningDate: '2019-07-22',
    status: 'Active',
    employmentType: 'Full-time',
    address: '456 Innovation Blvd, San Francisco, CA 94103'
  },
  {
    id: 'EMP003',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'Product Designer',
    department: 'Design',
    city: 'New York',
    joiningDate: '2022-01-10',
    status: 'Active',
    manager: 'Lisa Park',
    employmentType: 'Full-time',
    address: '789 Design Ave, New York, NY 10001'
  },
  {
    id: 'EMP004',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@company.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    role: 'Data Analyst',
    department: 'Analytics',
    city: 'Austin',
    joiningDate: '2022-06-01',
    status: 'Active',
    manager: 'Sarah Johnson',
    employmentType: 'Full-time',
    address: '321 Data Dr, Austin, TX 78701'
  },
  {
    id: 'EMP005',
    firstName: 'Lisa',
    lastName: 'Park',
    email: 'lisa.park@company.com',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'Design Director',
    department: 'Design',
    city: 'New York',
    joiningDate: '2018-11-05',
    status: 'On Leave',
    employmentType: 'Full-time',
    address: '654 Creative St, New York, NY 10002'
  },
  {
    id: 'EMP006',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'HR Specialist',
    department: 'Human Resources',
    city: 'Chicago',
    joiningDate: '2020-04-20',
    status: 'Active',
    manager: 'Amanda Foster',
    employmentType: 'Full-time',
    address: '987 People Ave, Chicago, IL 60601'
  },
  {
    id: 'EMP007',
    firstName: 'Amanda',
    lastName: 'Foster',
    email: 'amanda.foster@company.com',
    phone: '+1 (555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    role: 'HR Director',
    department: 'Human Resources',
    city: 'Chicago',
    joiningDate: '2017-09-12',
    status: 'Active',
    employmentType: 'Full-time',
    address: '159 HR Lane, Chicago, IL 60602'
  },
  {
    id: 'EMP008',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.taylor@company.com',
    phone: '+1 (555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    role: 'Backend Developer',
    department: 'Engineering',
    city: 'Seattle',
    joiningDate: '2021-08-30',
    status: 'Active',
    manager: 'Michael Chen',
    employmentType: 'Full-time',
    address: '753 Code Way, Seattle, WA 98101'
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'LV001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    type: 'Annual',
    fromDate: '2024-02-15',
    toDate: '2024-02-20',
    days: 4,
    status: 'Approved',
    reason: 'Family vacation',
    createdAt: '2024-02-01'
  },
  {
    id: 'LV002',
    employeeId: 'EMP003',
    employeeName: 'Emily Rodriguez',
    employeeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    type: 'Sick',
    fromDate: '2024-02-12',
    toDate: '2024-02-13',
    days: 2,
    status: 'Pending',
    reason: 'Medical appointment',
    createdAt: '2024-02-10'
  },
  {
    id: 'LV003',
    employeeId: 'EMP004',
    employeeName: 'David Kim',
    employeeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    type: 'Personal',
    fromDate: '2024-02-25',
    toDate: '2024-02-26',
    days: 2,
    status: 'Pending',
    reason: 'Personal matters',
    createdAt: '2024-02-08'
  },
  {
    id: 'LV004',
    employeeId: 'EMP005',
    employeeName: 'Lisa Park',
    employeeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    type: 'Maternity',
    fromDate: '2024-01-15',
    toDate: '2024-04-15',
    days: 60,
    status: 'Approved',
    reason: 'Maternity leave',
    createdAt: '2024-01-10'
  },
  {
    id: 'LV005',
    employeeId: 'EMP006',
    employeeName: 'James Wilson',
    employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    type: 'Annual',
    fromDate: '2024-03-01',
    toDate: '2024-03-05',
    days: 3,
    status: 'Rejected',
    reason: 'Conference attendance',
    createdAt: '2024-02-05'
  }
];

export const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: 'PR001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    employeeRole: 'Senior Software Engineer',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    cycle: 'Q4 2023',
    period: 'Oct - Dec 2023',
    overallRating: 4.5,
    status: 'Completed',
    lastUpdated: '2024-01-15',
    goals: [
      { id: 'G1', title: 'Complete API migration', description: 'Migrate legacy API to new architecture', progress: 100, rating: 5 },
      { id: 'G2', title: 'Mentor junior developers', description: 'Provide guidance to 2 junior developers', progress: 80, rating: 4 }
    ],
    competencies: [
      { id: 'C1', name: 'Technical Skills', rating: 5, comments: 'Excellent technical proficiency' },
      { id: 'C2', name: 'Communication', rating: 4, comments: 'Clear and effective communicator' },
      { id: 'C3', name: 'Leadership', rating: 4, comments: 'Shows strong leadership potential' }
    ],
    comments: 'Sarah has exceeded expectations this quarter. Her technical leadership on the API migration was instrumental to the project success.'
  },
  {
    id: 'PR002',
    employeeId: 'EMP003',
    employeeName: 'Emily Rodriguez',
    employeeRole: 'Product Designer',
    employeeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    cycle: 'Q4 2023',
    period: 'Oct - Dec 2023',
    overallRating: 4.2,
    status: 'In Progress',
    lastUpdated: '2024-01-20',
    goals: [
      { id: 'G1', title: 'Redesign dashboard', description: 'Complete new dashboard design system', progress: 90, rating: 4 },
      { id: 'G2', title: 'User research', description: 'Conduct 10 user interviews', progress: 100, rating: 5 }
    ],
    competencies: [
      { id: 'C1', name: 'Design Skills', rating: 5 },
      { id: 'C2', name: 'Collaboration', rating: 4 }
    ]
  },
  {
    id: 'PR003',
    employeeId: 'EMP004',
    employeeName: 'David Kim',
    employeeRole: 'Data Analyst',
    employeeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    cycle: 'Q4 2023',
    period: 'Oct - Dec 2023',
    overallRating: 0,
    status: 'Not Started',
    lastUpdated: '2024-01-05'
  },
  {
    id: 'PR004',
    employeeId: 'EMP008',
    employeeName: 'Robert Taylor',
    employeeRole: 'Backend Developer',
    employeeAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    cycle: 'Q4 2023',
    period: 'Oct - Dec 2023',
    overallRating: 3.8,
    status: 'Completed',
    lastUpdated: '2024-01-18'
  }
];

export const mockDocuments: Document[] = [
  { id: 'DOC001', name: 'Employment Contract.pdf', type: 'Contract', uploadDate: '2021-03-15', size: '245 KB' },
  { id: 'DOC002', name: 'ID Verification.pdf', type: 'ID', uploadDate: '2021-03-15', size: '1.2 MB' },
  { id: 'DOC003', name: 'AWS Certification.pdf', type: 'Certificate', uploadDate: '2023-06-20', size: '890 KB' },
  { id: 'DOC004', name: 'NDA Agreement.pdf', type: 'Policy', uploadDate: '2021-03-15', size: '156 KB' }
];

export const mockHistory: HistoryEvent[] = [
  { id: 'H001', date: '2024-01-15', type: 'Promoted', description: 'Promoted to Senior Software Engineer' },
  { id: 'H002', date: '2023-06-01', type: 'Award', description: 'Employee of the Quarter - Q2 2023' },
  { id: 'H003', date: '2022-03-15', type: 'Role Change', description: 'Transitioned to Tech Lead role' },
  { id: 'H004', date: '2021-03-15', type: 'Hired', description: 'Joined as Software Engineer' }
];

export const mockRolePermissions: RolePermission[] = [
  { role: 'System Admin', permissions: { 'Core HR': true, 'Leave': true, 'Performance': true, 'Dashboard': true, 'Audit': true } },
  { role: 'HR Admin', permissions: { 'Core HR': true, 'Leave': true, 'Performance': true, 'Dashboard': true, 'Audit': false } },
  { role: 'Manager', permissions: { 'Core HR': false, 'Leave': true, 'Performance': true, 'Dashboard': true, 'Audit': false } },
  { role: 'Employee', permissions: { 'Core HR': false, 'Leave': true, 'Performance': false, 'Dashboard': true, 'Audit': false } }
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'AL001', timestamp: '2024-02-10 14:32:15', actor: 'Amanda Foster', action: 'Leave Approved', entity: 'Leave', entityId: 'LV001', status: 'Success', verified: true, blockchainTxId: '0x1a2b3c...' },
  { id: 'AL002', timestamp: '2024-02-10 11:20:45', actor: 'Michael Chen', action: 'Performance Review Completed', entity: 'Review', entityId: 'PR001', status: 'Success', verified: true, blockchainTxId: '0x4d5e6f...' },
  { id: 'AL003', timestamp: '2024-02-09 16:45:30', actor: 'James Wilson', action: 'Employee Record Updated', entity: 'Employee', entityId: 'EMP003', status: 'Success', verified: true, blockchainTxId: '0x7g8h9i...' },
  { id: 'AL004', timestamp: '2024-02-09 09:15:22', actor: 'System', action: 'Document Uploaded', entity: 'Document', entityId: 'DOC003', status: 'Success', verified: true, blockchainTxId: '0xj0k1l2...' },
  { id: 'AL005', timestamp: '2024-02-08 13:50:18', actor: 'Amanda Foster', action: 'Role Permission Changed', entity: 'System', status: 'Success', verified: false },
  { id: 'AL006', timestamp: '2024-02-08 10:30:05', actor: 'Sarah Johnson', action: 'Leave Request Submitted', entity: 'Leave', entityId: 'LV002', status: 'Success', verified: true, blockchainTxId: '0xm3n4o5...' }
];

export const mockActivities: Activity[] = [
  { id: 'A001', type: 'leave', message: 'Leave request approved for Sarah Johnson', timestamp: '2 hours ago' },
  { id: 'A002', type: 'employee', message: 'New employee Robert Taylor joined Engineering', timestamp: '5 hours ago' },
  { id: 'A003', type: 'review', message: 'Performance review completed for Emily Rodriguez', timestamp: '1 day ago' },
  { id: 'A004', type: 'document', message: 'Contract document verified for David Kim', timestamp: '2 days ago' },
  { id: 'A005', type: 'leave', message: 'Leave request submitted by James Wilson', timestamp: '3 days ago' }
];

export const mockCurrentUser = {
  id: 'USR001',
  firstName: 'Amanda',
  lastName: 'Foster',
  email: 'amanda.foster@company.com',
  avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
  role: 'HR Admin' as const
};

export const performanceChartData = [
  { week: 'Week 1', score: 75 },
  { week: 'Week 2', score: 78 },
  { week: 'Week 3', score: 82 },
  { week: 'Week 4', score: 80 },
  { week: 'Week 5', score: 85 },
  { week: 'Week 6', score: 88 },
  { week: 'Week 7', score: 87 },
  { week: 'Week 8', score: 92 }
];

export const employeeStatsData = [
  { department: 'Engineering', count: 45 },
  { department: 'Design', count: 18 },
  { department: 'HR', count: 12 },
  { department: 'Analytics', count: 15 },
  { department: 'Marketing', count: 22 }
];
