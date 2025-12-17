import { generateClient } from "aws-amplify/api";
import type { GraphQLResult } from "@aws-amplify/api";
import type { Employee } from "@/types";

const client = generateClient();

type ListEmployeesResult = {
  listEmployees: {
    items: Employee[];
  };
};

type CreateEmployeeInput = {
  id: string;            // "idNumber-PCU-Department"
  cognitoId: string;     // maps to Cognito sub
  cognitoRole: string;   // "System Admin" | "HR Admin" | "Manager" | "Employee"
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  city?: string;
  joiningDate?: string;  // AWSDate: "YYYY-MM-DD"
  phone?: string;
  status: string;
  avatar?: string;
  department: string;
  idNumber: string;
};

type CreateEmployeeResult = {
  createEmployee: Employee;
};
export interface EmployeeStats {
  department: string;
  count: number;
}

export async function fetchEmployeeStats(): Promise<EmployeeStats[]> {
  const response = await fetch('/api/employee/stats', {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}
export async function fetchEmployees(): Promise<Employee[]> {
  const res = (await client.graphql({
    query: /* GraphQL */ `
      query ListEmployees {
        listEmployees {
          items {
            id
            cognitoId
            cognitoRole
            firstName
            lastName
            email
            role
            city
            joiningDate
            phone
            status
            avatar
            department
            idNumber
          }
        }
      }
    `,
  })) as GraphQLResult<ListEmployeesResult>;

  return res.data?.listEmployees.items ?? [];
}

export async function fetchEmployeeCount(): Promise<number> {
  const employees = await fetchEmployees();
  return employees.length;
}

export async function createEmployee(
  input: CreateEmployeeInput,
): Promise<Employee> {
  const res = (await client.graphql({
    query: /* GraphQL */ `
      mutation CreateEmployee($input: CreateEmployeeInput!) {
        createEmployee(input: $input) {
          id
          cognitoId
          cognitoRole
          firstName
          lastName
          email
          role
          city
          joiningDate
          phone
          status
          avatar
          department
          idNumber
        }
      }
    `,
    variables: { input },
  })) as GraphQLResult<CreateEmployeeResult>;

  if (!res.data?.createEmployee) {
    console.error("createEmployee error result:", res);
    throw new Error("Failed to create employee");
  }

  return res.data.createEmployee;
}
