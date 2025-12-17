/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createLeaveRequest = /* GraphQL */ `mutation CreateLeaveRequest(
  $input: CreateLeaveRequestInput!
  $condition: ModelLeaveRequestConditionInput
) {
  createLeaveRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateLeaveRequestMutationVariables,
  APITypes.CreateLeaveRequestMutation
>;
export const updateLeaveRequest = /* GraphQL */ `mutation UpdateLeaveRequest(
  $input: UpdateLeaveRequestInput!
  $condition: ModelLeaveRequestConditionInput
) {
  updateLeaveRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateLeaveRequestMutationVariables,
  APITypes.UpdateLeaveRequestMutation
>;
export const deleteLeaveRequest = /* GraphQL */ `mutation DeleteLeaveRequest(
  $input: DeleteLeaveRequestInput!
  $condition: ModelLeaveRequestConditionInput
) {
  deleteLeaveRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteLeaveRequestMutationVariables,
  APITypes.DeleteLeaveRequestMutation
>;
export const createLeaveBalance = /* GraphQL */ `mutation CreateLeaveBalance(
  $input: CreateLeaveBalanceInput!
  $condition: ModelLeaveBalanceConditionInput
) {
  createLeaveBalance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateLeaveBalanceMutationVariables,
  APITypes.CreateLeaveBalanceMutation
>;
export const updateLeaveBalance = /* GraphQL */ `mutation UpdateLeaveBalance(
  $input: UpdateLeaveBalanceInput!
  $condition: ModelLeaveBalanceConditionInput
) {
  updateLeaveBalance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateLeaveBalanceMutationVariables,
  APITypes.UpdateLeaveBalanceMutation
>;
export const deleteLeaveBalance = /* GraphQL */ `mutation DeleteLeaveBalance(
  $input: DeleteLeaveBalanceInput!
  $condition: ModelLeaveBalanceConditionInput
) {
  deleteLeaveBalance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteLeaveBalanceMutationVariables,
  APITypes.DeleteLeaveBalanceMutation
>;
