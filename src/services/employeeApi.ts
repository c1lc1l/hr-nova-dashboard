// src/services/employeeApi.ts
import { generateClient } from "aws-amplify/api";
import type { GraphQLResult } from "@aws-amplify/api";
import type { Employee } from "@/types";

const client = generateClient();

type ListEmployeesResult = {
  listEmployees: { items: Employee[] };
};

type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  city?: string;
  joiningDate?: string;
  phone?: string;
  status: string;
  avatar?: string;
};

type CreateEmployeeResult = {
  createEmployee: Employee;
};

export async function fetchEmployees(): Promise<Employee[]> {
  const res = (await client.graphql({
    query: /* GraphQL */ `
      query ListEmployees {
        listEmployees {
          items {
            id
            firstName
            lastName
            email
            role
            city
            joiningDate
            phone
            status
            avatar
          }
        }
      }
    `,
  })) as GraphQLResult<ListEmployeesResult>;

  return res.data?.listEmployees.items ?? [];
}

export async function createEmployee(
  input: CreateEmployeeInput,
): Promise<Employee> {
  const res = (await client.graphql({
    query: /* GraphQL */ `
      mutation CreateEmployee($input: CreateEmployeeInput!) {
        createEmployee(input: $input) {
          id
          firstName
          lastName
          email
          role
          city
          joiningDate
          phone
          status
          avatar
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
