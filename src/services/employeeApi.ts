import { generateClient } from "aws-amplify/api";
import type { GraphQLResult } from "@aws-amplify/api";
import type { Employee } from "@/types";

const client = generateClient();

type ListEmployeesResult = {
  listEmployees: {
    items: Employee[];
    nextToken?: string | null;
  };
};

type CreateEmployeeResult = {
  createEmployee: Employee;
};

export interface EmployeeStats {
  department: string;
  count: number;
}

type CreateEmployeeInput = {
  id: string;              // "idNumber-PCU-Department"
  cognitoId: string;       // maps to Cognito sub
  cognitoRole: string;     // "System Admin" | "HR Admin" | "Manager" | "Employee"
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  city?: string;
  joiningDate?: string;    // AWSDate: "YYYY-MM-DD"
  phone?: string;
  status: string;
  avatar?: string;
  department: string;
  idNumber: string;
};

// Fetch all employees with pagination support
export async function fetchEmployees(): Promise<Employee[]> {
  let allEmployees: Employee[] = [];
  let nextToken: string | null = null;

  do {
    const res = await client.graphql({
      query: /* GraphQL */ `
        query ListEmployees($nextToken: String) {
          listEmployees(nextToken: $nextToken) {
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
            nextToken
          }
        }
      `,
      variables: { nextToken },
    }) as GraphQLResult<ListEmployeesResult>;

    const items = res.data?.listEmployees.items ?? [];
    allEmployees = allEmployees.concat(items);
    nextToken = res.data?.listEmployees.nextToken ?? null;
  } while (nextToken);

  return allEmployees;
}

// Optimized: Fetch only department field for stats (more efficient)
export async function fetchEmployeeStats(): Promise<EmployeeStats[]> {
  let allDepartments: string[] = [];
  let nextToken: string | null = null;

  do {
    const res = await client.graphql({
      query: /* GraphQL */ `
        query ListEmployeeDepartments($nextToken: String) {
          listEmployees(nextToken: $nextToken) {
            items {
              department
            }
            nextToken
          }
        }
      `,
      variables: { nextToken },
    }) as GraphQLResult<{
      listEmployees: {
        items: Pick<Employee, 'department'>[];
        nextToken?: string | null;
      };
    }>;

    const departments = res.data?.listEmployees.items
      ?.map(item => item.department)
      .filter(Boolean) ?? [];
    
    allDepartments = allDepartments.concat(departments);
    nextToken = res.data?.listEmployees.nextToken ?? null;
  } while (nextToken);

  // Group and count departments
  const stats = allDepartments.reduce((acc: Record<string, number>, dept: string) => {
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(stats)
    .map(([department, count]) => ({ department, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

// Cache-friendly total count
export async function fetchEmployeeCount(): Promise<number> {
  const stats = await fetchEmployeeStats();
  return stats.reduce((total, stat) => total + stat.count, 0);
}

// Create employee with full fields
export async function createEmployee(input: CreateEmployeeInput): Promise<Employee> {
  const res = await client.graphql({
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
  }) as GraphQLResult<CreateEmployeeResult>;

  if (!res.data?.createEmployee) {
    console.error("createEmployee error result:", res);
    throw new Error("Failed to create employee");
  }

  return res.data.createEmployee;
}
