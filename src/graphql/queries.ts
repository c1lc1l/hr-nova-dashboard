/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getLeaveRequest = /* GraphQL */ `query GetLeaveRequest($id: ID!) {
  getLeaveRequest(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetLeaveRequestQueryVariables,
  APITypes.GetLeaveRequestQuery
>;
export const listLeaveRequests = /* GraphQL */ `query ListLeaveRequests(
  $filter: ModelLeaveRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listLeaveRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLeaveRequestsQueryVariables,
  APITypes.ListLeaveRequestsQuery
>;
export const getLeaveBalance = /* GraphQL */ `query GetLeaveBalance($id: ID!) {
  getLeaveBalance(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetLeaveBalanceQueryVariables,
  APITypes.GetLeaveBalanceQuery
>;
export const listLeaveBalances = /* GraphQL */ `query ListLeaveBalances(
  $filter: ModelLeaveBalanceFilterInput
  $limit: Int
  $nextToken: String
) {
  listLeaveBalances(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLeaveBalancesQueryVariables,
  APITypes.ListLeaveBalancesQuery
>;
