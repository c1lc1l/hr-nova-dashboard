import { generateClient } from "aws-amplify/api";
import { createLeaveRequest, updateLeaveRequest } from "@/graphql/mutations";
import { listLeaveRequests } from "@/graphql/queries";
import { LeaveRequest, LeaveRequestFormData } from "@/types";

const client = generateClient();

type CreateLeaveResponse = {
  data: { createLeaveRequest: LeaveRequest };
};

type ListLeaveResponse = {
  data: { listLeaveRequests?: { items?: LeaveRequest[] | null } | null };
};

type UpdateLeaveResponse = {
  data: { updateLeaveRequest: LeaveRequest };
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

  try {
    const res = (await client.graphql({
      query: createLeaveRequest,
      variables: { input },
      authMode: "userPool",
    })) as CreateLeaveResponse;

    return res.data.createLeaveRequest;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    if (error?.errors?.[0]) {
        console.error(
        "submitLeaveRequest GraphQL error:",
        error.errors[0].message,
        error.errors[0]
        );
    } else {
        console.error("submitLeaveRequest error:", error);
    }
    throw error;
    }
}


export async function fetchMyLeave(employeeId: string) {
  const res = (await client.graphql({
    query: listLeaveRequests,
    variables: {
      filter: { employeeId: { eq: employeeId } },
    },
    authMode: "userPool",
  })) as ListLeaveResponse;

  return res.data.listLeaveRequests?.items ?? [];
}

export async function fetchPendingLeave() {
  const res = (await client.graphql({
    query: listLeaveRequests,
    variables: {
      filter: { status: { eq: "Pending" } },
    },
    authMode: "userPool",
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
    // Only overwrite reason if a note is provided, otherwise leave as-is
    ...(note ? { reason: note } : {}),
  };

  const res = (await client.graphql({
    query: updateLeaveRequest,
    variables: { input },
    authMode: "userPool",
  })) as UpdateLeaveResponse;

  return res.data.updateLeaveRequest;
}
