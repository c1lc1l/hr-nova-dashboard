/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateLeaveRequest = /* GraphQL */ `subscription OnCreateLeaveRequest(
  $filter: ModelSubscriptionLeaveRequestFilterInput
  $employeeId: String
) {
  onCreateLeaveRequest(filter: $filter, employeeId: $employeeId) {
    id
    employeeId
    employeeName
    employeeAvatar
    type
    fromDate
    toDate
    days
    status
    reason
    createdAt
    reviewedBy
    reviewedAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLeaveRequestSubscriptionVariables,
  APITypes.OnCreateLeaveRequestSubscription
>;
export const onUpdateLeaveRequest = /* GraphQL */ `subscription OnUpdateLeaveRequest(
  $filter: ModelSubscriptionLeaveRequestFilterInput
  $employeeId: String
) {
  onUpdateLeaveRequest(filter: $filter, employeeId: $employeeId) {
    id
    employeeId
    employeeName
    employeeAvatar
    type
    fromDate
    toDate
    days
    status
    reason
    createdAt
    reviewedBy
    reviewedAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLeaveRequestSubscriptionVariables,
  APITypes.OnUpdateLeaveRequestSubscription
>;
export const onDeleteLeaveRequest = /* GraphQL */ `subscription OnDeleteLeaveRequest(
  $filter: ModelSubscriptionLeaveRequestFilterInput
  $employeeId: String
) {
  onDeleteLeaveRequest(filter: $filter, employeeId: $employeeId) {
    id
    employeeId
    employeeName
    employeeAvatar
    type
    fromDate
    toDate
    days
    status
    reason
    createdAt
    reviewedBy
    reviewedAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLeaveRequestSubscriptionVariables,
  APITypes.OnDeleteLeaveRequestSubscription
>;
export const onCreateLeaveBalance = /* GraphQL */ `subscription OnCreateLeaveBalance(
  $filter: ModelSubscriptionLeaveBalanceFilterInput
  $employeeId: String
) {
  onCreateLeaveBalance(filter: $filter, employeeId: $employeeId) {
    id
    employeeId
    annual
    sick
    personal
    used
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLeaveBalanceSubscriptionVariables,
  APITypes.OnCreateLeaveBalanceSubscription
>;
export const onUpdateLeaveBalance = /* GraphQL */ `subscription OnUpdateLeaveBalance(
  $filter: ModelSubscriptionLeaveBalanceFilterInput
  $employeeId: String
) {
  onUpdateLeaveBalance(filter: $filter, employeeId: $employeeId) {
    id
    employeeId
    annual
    sick
    personal
    used
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLeaveBalanceSubscriptionVariables,
  APITypes.OnUpdateLeaveBalanceSubscription
>;
export const onDeleteLeaveBalance = /* GraphQL */ `subscription OnDeleteLeaveBalance(
  $filter: ModelSubscriptionLeaveBalanceFilterInput
  $employeeId: String
) {
  onDeleteLeaveBalance(filter: $filter, employeeId: $employeeId) {
    id
    employeeId
    annual
    sick
    personal
    used
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLeaveBalanceSubscriptionVariables,
  APITypes.OnDeleteLeaveBalanceSubscription
>;
