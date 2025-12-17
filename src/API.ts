/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLeaveRequestInput = {
  id?: string | null,
  employeeId: string,
  employeeName: string,
  employeeAvatar?: string | null,
  type: string,
  fromDate: string,
  toDate: string,
  days: number,
  status: string,
  reason?: string | null,
  createdAt?: string | null,
  reviewedBy?: string | null,
  reviewedAt?: string | null,
};

export type ModelLeaveRequestConditionInput = {
  employeeId?: ModelIDInput | null,
  employeeName?: ModelStringInput | null,
  employeeAvatar?: ModelStringInput | null,
  type?: ModelStringInput | null,
  fromDate?: ModelStringInput | null,
  toDate?: ModelStringInput | null,
  days?: ModelIntInput | null,
  status?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  reviewedBy?: ModelStringInput | null,
  reviewedAt?: ModelStringInput | null,
  and?: Array< ModelLeaveRequestConditionInput | null > | null,
  or?: Array< ModelLeaveRequestConditionInput | null > | null,
  not?: ModelLeaveRequestConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type LeaveRequest = {
  __typename: "LeaveRequest",
  id: string,
  employeeId: string,
  employeeName: string,
  employeeAvatar?: string | null,
  type: string,
  fromDate: string,
  toDate: string,
  days: number,
  status: string,
  reason?: string | null,
  createdAt: string,
  reviewedBy?: string | null,
  reviewedAt?: string | null,
  updatedAt: string,
};

export type UpdateLeaveRequestInput = {
  id: string,
  employeeId?: string | null,
  employeeName?: string | null,
  employeeAvatar?: string | null,
  type?: string | null,
  fromDate?: string | null,
  toDate?: string | null,
  days?: number | null,
  status?: string | null,
  reason?: string | null,
  createdAt?: string | null,
  reviewedBy?: string | null,
  reviewedAt?: string | null,
};

export type DeleteLeaveRequestInput = {
  id: string,
};

export type CreateLeaveBalanceInput = {
  id?: string | null,
  employeeId: string,
  annual: number,
  sick: number,
  personal: number,
  used: number,
};

export type ModelLeaveBalanceConditionInput = {
  employeeId?: ModelIDInput | null,
  annual?: ModelIntInput | null,
  sick?: ModelIntInput | null,
  personal?: ModelIntInput | null,
  used?: ModelIntInput | null,
  and?: Array< ModelLeaveBalanceConditionInput | null > | null,
  or?: Array< ModelLeaveBalanceConditionInput | null > | null,
  not?: ModelLeaveBalanceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type LeaveBalance = {
  __typename: "LeaveBalance",
  id: string,
  employeeId: string,
  annual: number,
  sick: number,
  personal: number,
  used: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLeaveBalanceInput = {
  id: string,
  employeeId?: string | null,
  annual?: number | null,
  sick?: number | null,
  personal?: number | null,
  used?: number | null,
};

export type DeleteLeaveBalanceInput = {
  id: string,
};

export type CreateEmployeeInput = {
  id?: string | null,
  cognitoId: string,
  cognitoRole: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  city?: string | null,
  joiningDate?: string | null,
  phone?: string | null,
  status: string,
  avatar?: string | null,
  department: string,
  idNumber: string,
};

export type ModelEmployeeConditionInput = {
  cognitoId?: ModelIDInput | null,
  cognitoRole?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelStringInput | null,
  city?: ModelStringInput | null,
  joiningDate?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  status?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  department?: ModelStringInput | null,
  idNumber?: ModelStringInput | null,
  and?: Array< ModelEmployeeConditionInput | null > | null,
  or?: Array< ModelEmployeeConditionInput | null > | null,
  not?: ModelEmployeeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Employee = {
  __typename: "Employee",
  id: string,
  cognitoId: string,
  cognitoRole: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  city?: string | null,
  joiningDate?: string | null,
  phone?: string | null,
  status: string,
  avatar?: string | null,
  department: string,
  idNumber: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateEmployeeInput = {
  id: string,
  cognitoId?: string | null,
  cognitoRole?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  role?: string | null,
  city?: string | null,
  joiningDate?: string | null,
  phone?: string | null,
  status?: string | null,
  avatar?: string | null,
  department?: string | null,
  idNumber?: string | null,
};

export type DeleteEmployeeInput = {
  id: string,
};

export type ModelLeaveRequestFilterInput = {
  id?: ModelIDInput | null,
  employeeId?: ModelIDInput | null,
  employeeName?: ModelStringInput | null,
  employeeAvatar?: ModelStringInput | null,
  type?: ModelStringInput | null,
  fromDate?: ModelStringInput | null,
  toDate?: ModelStringInput | null,
  days?: ModelIntInput | null,
  status?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  reviewedBy?: ModelStringInput | null,
  reviewedAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLeaveRequestFilterInput | null > | null,
  or?: Array< ModelLeaveRequestFilterInput | null > | null,
  not?: ModelLeaveRequestFilterInput | null,
};

export type ModelLeaveRequestConnection = {
  __typename: "ModelLeaveRequestConnection",
  items:  Array<LeaveRequest | null >,
  nextToken?: string | null,
};

export type ModelLeaveBalanceFilterInput = {
  id?: ModelIDInput | null,
  employeeId?: ModelIDInput | null,
  annual?: ModelIntInput | null,
  sick?: ModelIntInput | null,
  personal?: ModelIntInput | null,
  used?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLeaveBalanceFilterInput | null > | null,
  or?: Array< ModelLeaveBalanceFilterInput | null > | null,
  not?: ModelLeaveBalanceFilterInput | null,
};

export type ModelLeaveBalanceConnection = {
  __typename: "ModelLeaveBalanceConnection",
  items:  Array<LeaveBalance | null >,
  nextToken?: string | null,
};

export type ModelEmployeeFilterInput = {
  id?: ModelIDInput | null,
  cognitoId?: ModelIDInput | null,
  cognitoRole?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelStringInput | null,
  city?: ModelStringInput | null,
  joiningDate?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  status?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  department?: ModelStringInput | null,
  idNumber?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelEmployeeFilterInput | null > | null,
  or?: Array< ModelEmployeeFilterInput | null > | null,
  not?: ModelEmployeeFilterInput | null,
};

export type ModelEmployeeConnection = {
  __typename: "ModelEmployeeConnection",
  items:  Array<Employee | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionLeaveRequestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  employeeName?: ModelSubscriptionStringInput | null,
  employeeAvatar?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  fromDate?: ModelSubscriptionStringInput | null,
  toDate?: ModelSubscriptionStringInput | null,
  days?: ModelSubscriptionIntInput | null,
  status?: ModelSubscriptionStringInput | null,
  reason?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  reviewedBy?: ModelSubscriptionStringInput | null,
  reviewedAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLeaveRequestFilterInput | null > | null,
  or?: Array< ModelSubscriptionLeaveRequestFilterInput | null > | null,
  employeeId?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionLeaveBalanceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  annual?: ModelSubscriptionIntInput | null,
  sick?: ModelSubscriptionIntInput | null,
  personal?: ModelSubscriptionIntInput | null,
  used?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLeaveBalanceFilterInput | null > | null,
  or?: Array< ModelSubscriptionLeaveBalanceFilterInput | null > | null,
  employeeId?: ModelStringInput | null,
};

export type ModelSubscriptionEmployeeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cognitoRole?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  joiningDate?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  avatar?: ModelSubscriptionStringInput | null,
  department?: ModelSubscriptionStringInput | null,
  idNumber?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmployeeFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmployeeFilterInput | null > | null,
  cognitoId?: ModelStringInput | null,
};

export type CreateLeaveRequestMutationVariables = {
  input: CreateLeaveRequestInput,
  condition?: ModelLeaveRequestConditionInput | null,
};

export type CreateLeaveRequestMutation = {
  createLeaveRequest?:  {
    __typename: "LeaveRequest",
    id: string,
    employeeId: string,
    employeeName: string,
    employeeAvatar?: string | null,
    type: string,
    fromDate: string,
    toDate: string,
    days: number,
    status: string,
    reason?: string | null,
    createdAt: string,
    reviewedBy?: string | null,
    reviewedAt?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateLeaveRequestMutationVariables = {
  input: UpdateLeaveRequestInput,
  condition?: ModelLeaveRequestConditionInput | null,
};

export type UpdateLeaveRequestMutation = {
  updateLeaveRequest?:  {
    __typename: "LeaveRequest",
    id: string,
    employeeId: string,
    employeeName: string,
    employeeAvatar?: string | null,
    type: string,
    fromDate: string,
    toDate: string,
    days: number,
    status: string,
    reason?: string | null,
    createdAt: string,
    reviewedBy?: string | null,
    reviewedAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteLeaveRequestMutationVariables = {
  input: DeleteLeaveRequestInput,
  condition?: ModelLeaveRequestConditionInput | null,
};

export type DeleteLeaveRequestMutation = {
  deleteLeaveRequest?:  {
    __typename: "LeaveRequest",
    id: string,
    employeeId: string,
    employeeName: string,
    employeeAvatar?: string | null,
    type: string,
    fromDate: string,
    toDate: string,
    days: number,
    status: string,
    reason?: string | null,
    createdAt: string,
    reviewedBy?: string | null,
    reviewedAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateLeaveBalanceMutationVariables = {
  input: CreateLeaveBalanceInput,
  condition?: ModelLeaveBalanceConditionInput | null,
};

export type CreateLeaveBalanceMutation = {
  createLeaveBalance?:  {
    __typename: "LeaveBalance",
    id: string,
    employeeId: string,
    annual: number,
    sick: number,
    personal: number,
    used: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLeaveBalanceMutationVariables = {
  input: UpdateLeaveBalanceInput,
  condition?: ModelLeaveBalanceConditionInput | null,
};

export type UpdateLeaveBalanceMutation = {
  updateLeaveBalance?:  {
    __typename: "LeaveBalance",
    id: string,
    employeeId: string,
    annual: number,
    sick: number,
    personal: number,
    used: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLeaveBalanceMutationVariables = {
  input: DeleteLeaveBalanceInput,
  condition?: ModelLeaveBalanceConditionInput | null,
};

export type DeleteLeaveBalanceMutation = {
  deleteLeaveBalance?:  {
    __typename: "LeaveBalance",
    id: string,
    employeeId: string,
    annual: number,
    sick: number,
    personal: number,
    used: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEmployeeMutationVariables = {
  input: CreateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type CreateEmployeeMutation = {
  createEmployee?:  {
    __typename: "Employee",
    id: string,
    cognitoId: string,
    cognitoRole: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city?: string | null,
    joiningDate?: string | null,
    phone?: string | null,
    status: string,
    avatar?: string | null,
    department: string,
    idNumber: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEmployeeMutationVariables = {
  input: UpdateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type UpdateEmployeeMutation = {
  updateEmployee?:  {
    __typename: "Employee",
    id: string,
    cognitoId: string,
    cognitoRole: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city?: string | null,
    joiningDate?: string | null,
    phone?: string | null,
    status: string,
    avatar?: string | null,
    department: string,
    idNumber: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEmployeeMutationVariables = {
  input: DeleteEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type DeleteEmployeeMutation = {
  deleteEmployee?:  {
    __typename: "Employee",
    id: string,
    cognitoId: string,
    cognitoRole: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city?: string | null,
    joiningDate?: string | null,
    phone?: string | null,
    status: string,
    avatar?: string | null,
    department: string,
    idNumber: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLeaveRequestQueryVariables = {
  id: string,
};

export type GetLeaveRequestQuery = {
  getLeaveRequest?:  {
    __typename: "LeaveRequest",
    id: string,
    employeeId: string,
    employeeName: string,
    employeeAvatar?: string | null,
    type: string,
    fromDate: string,
    toDate: string,
    days: number,
    status: string,
    reason?: string | null,
    createdAt: string,
    reviewedBy?: string | null,
    reviewedAt?: string | null,
    updatedAt: string,
  } | null,
};

export type ListLeaveRequestsQueryVariables = {
  filter?: ModelLeaveRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLeaveRequestsQuery = {
  listLeaveRequests?:  {
    __typename: "ModelLeaveRequestConnection",
    items:  Array< {
      __typename: "LeaveRequest",
      id: string,
      employeeId: string,
      employeeName: string,
      employeeAvatar?: string | null,
      type: string,
      fromDate: string,
      toDate: string,
      days: number,
      status: string,
      reason?: string | null,
      createdAt: string,
      reviewedBy?: string | null,
      reviewedAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLeaveBalanceQueryVariables = {
  id: string,
};

export type GetLeaveBalanceQuery = {
  getLeaveBalance?:  {
    __typename: "LeaveBalance",
    id: string,
    employeeId: string,
    annual: number,
    sick: number,
    personal: number,
    used: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLeaveBalancesQueryVariables = {
  filter?: ModelLeaveBalanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLeaveBalancesQuery = {
  listLeaveBalances?:  {
    __typename: "ModelLeaveBalanceConnection",
    items:  Array< {
      __typename: "LeaveBalance",
      id: string,
      employeeId: string,
      annual: number,
      sick: number,
      personal: number,
      used: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEmployeeQueryVariables = {
  id: string,
};

export type GetEmployeeQuery = {
  getEmployee?:  {
    __typename: "Employee",
    id: string,
    cognitoId: string,
    cognitoRole: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city?: string | null,
    joiningDate?: string | null,
    phone?: string | null,
    status: string,
    avatar?: string | null,
    department: string,
    idNumber: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEmployeesQueryVariables = {
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmployeesQuery = {
  listEmployees?:  {
    __typename: "ModelEmployeeConnection",
    items:  Array< {
      __typename: "Employee",
      id: string,
      cognitoId: string,
      cognitoRole: string,
      firstName: string,
      lastName: string,
      email: string,
      role: string,
      city?: string | null,
      joiningDate?: string | null,
      phone?: string | null,
      status: string,
      avatar?: string | null,
      department: string,
      idNumber: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateLeaveRequestSubscriptionVariables = {
  filter?: ModelSubscriptionLeaveRequestFilterInput | null,
  employeeId?: string | null,
};

export type OnCreateLeaveRequestSubscription = {
  onCreateLeaveRequest?:  {
    __typename: "LeaveRequest",
    id: string,
    employeeId: string,
    employeeName: string,
    employeeAvatar?: string | null,
    type: string,
    fromDate: string,
    toDate: string,
    days: number,
    status: string,
    reason?: string | null,
    createdAt: string,
    reviewedBy?: string | null,
    reviewedAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateLeaveRequestSubscriptionVariables = {
  filter?: ModelSubscriptionLeaveRequestFilterInput | null,
  employeeId?: string | null,
};

export type OnUpdateLeaveRequestSubscription = {
  onUpdateLeaveRequest?:  {
    __typename: "LeaveRequest",
    id: string,
    employeeId: string,
    employeeName: string,
    employeeAvatar?: string | null,
    type: string,
    fromDate: string,
    toDate: string,
    days: number,
    status: string,
    reason?: string | null,
    createdAt: string,
    reviewedBy?: string | null,
    reviewedAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteLeaveRequestSubscriptionVariables = {
  filter?: ModelSubscriptionLeaveRequestFilterInput | null,
  employeeId?: string | null,
};

export type OnDeleteLeaveRequestSubscription = {
  onDeleteLeaveRequest?:  {
    __typename: "LeaveRequest",
    id: string,
    employeeId: string,
    employeeName: string,
    employeeAvatar?: string | null,
    type: string,
    fromDate: string,
    toDate: string,
    days: number,
    status: string,
    reason?: string | null,
    createdAt: string,
    reviewedBy?: string | null,
    reviewedAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateLeaveBalanceSubscriptionVariables = {
  filter?: ModelSubscriptionLeaveBalanceFilterInput | null,
  employeeId?: string | null,
};

export type OnCreateLeaveBalanceSubscription = {
  onCreateLeaveBalance?:  {
    __typename: "LeaveBalance",
    id: string,
    employeeId: string,
    annual: number,
    sick: number,
    personal: number,
    used: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLeaveBalanceSubscriptionVariables = {
  filter?: ModelSubscriptionLeaveBalanceFilterInput | null,
  employeeId?: string | null,
};

export type OnUpdateLeaveBalanceSubscription = {
  onUpdateLeaveBalance?:  {
    __typename: "LeaveBalance",
    id: string,
    employeeId: string,
    annual: number,
    sick: number,
    personal: number,
    used: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLeaveBalanceSubscriptionVariables = {
  filter?: ModelSubscriptionLeaveBalanceFilterInput | null,
  employeeId?: string | null,
};

export type OnDeleteLeaveBalanceSubscription = {
  onDeleteLeaveBalance?:  {
    __typename: "LeaveBalance",
    id: string,
    employeeId: string,
    annual: number,
    sick: number,
    personal: number,
    used: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEmployeeSubscriptionVariables = {
  filter?: ModelSubscriptionEmployeeFilterInput | null,
  cognitoId?: string | null,
};

export type OnCreateEmployeeSubscription = {
  onCreateEmployee?:  {
    __typename: "Employee",
    id: string,
    cognitoId: string,
    cognitoRole: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city?: string | null,
    joiningDate?: string | null,
    phone?: string | null,
    status: string,
    avatar?: string | null,
    department: string,
    idNumber: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEmployeeSubscriptionVariables = {
  filter?: ModelSubscriptionEmployeeFilterInput | null,
  cognitoId?: string | null,
};

export type OnUpdateEmployeeSubscription = {
  onUpdateEmployee?:  {
    __typename: "Employee",
    id: string,
    cognitoId: string,
    cognitoRole: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city?: string | null,
    joiningDate?: string | null,
    phone?: string | null,
    status: string,
    avatar?: string | null,
    department: string,
    idNumber: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEmployeeSubscriptionVariables = {
  filter?: ModelSubscriptionEmployeeFilterInput | null,
  cognitoId?: string | null,
};

export type OnDeleteEmployeeSubscription = {
  onDeleteEmployee?:  {
    __typename: "Employee",
    id: string,
    cognitoId: string,
    cognitoRole: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city?: string | null,
    joiningDate?: string | null,
    phone?: string | null,
    status: string,
    avatar?: string | null,
    department: string,
    idNumber: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
