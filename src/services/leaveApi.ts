// src/services/leaveApi.ts

import { generateClient } from "aws-amplify/api";
import { createLeaveRequest, updateLeaveRequest } from "@/graphql/mutations";
import { listLeaveRequests } from "@/graphql/queries";
import { LeaveRequestFormData } from "@/types";

const client = generateClient();

type CreateLeaveResponse = {
  data: { createLeaveRequest: unknown };
};

type ListLeaveResponse = {
  data: { listLeaveRequests?: { items?: unknown[] } };
};

type UpdateLeaveResponse = {
  data: { updateLeaveRequest: unknown };
};

export async function submitLeaveRequest(
  form: LeaveRequestFormData & { employeeId: string; employeeName: string }
) {
  const days =
    1 +
    (new Date(form.toDate).getTime() - new Date(form.fromDate).getTime()) /
      86400000;

  const input = {
    employeeId: form.employeeId,
    employeeName: form.employeeName,
    type: form.type,
    fromDate: form.fromDate,
    toDate: form.toDate,
    days: Math.round(days),
    status: "Pending",
    reason: form.reason,
    createdAt: new Date().toISOString(),
  };

  const res = (await client.graphql({
    query: createLeaveRequest,
    variables: { input },
  })) as CreateLeaveResponse;

  return res.data.createLeaveRequest;
}

export async function fetchMyLeave(employeeId: string) {
  const res = (await client.graphql({
    query: listLeaveRequests,
    variables: {
      filter: { employeeId: { eq: employeeId } },
    },
  })) as ListLeaveResponse;

  return res.data.listLeaveRequests?.items ?? [];
}

export async function fetchPendingLeave() {
  const res = (await client.graphql({
    query: listLeaveRequests,
    variables: {
      filter: { status: { eq: "Pending" } },
    },
  })) as ListLeaveResponse;

  return res.data.listLeaveRequests?.items ?? [];
}


export async function decideLeaveRequest(
  id: string,
  decision: "Approved" | "Rejected",
  approverName: string,
  note?: string
) {
  const input = {
    id,
    status: decision,
    reviewedBy: approverName,
    reviewedAt: new Date().toISOString(),
    reason: note,
  };

  const res = (await client.graphql({
    query: updateLeaveRequest,
    variables: { input },
  })) as UpdateLeaveResponse;

  return res.data.updateLeaveRequest;
}
