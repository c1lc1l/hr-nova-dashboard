import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusChip } from "@/components/ui/status-chip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus } from "lucide-react";
import type { Employee } from "@/types";
import { fetchEmployees, createEmployee } from "@/services/employeeApi";
import { useToast } from "@/hooks/use-toast";

type NewEmployeeForm = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  city: string;
  joiningDate: string;
  phone: string;
  status: string;
  avatar?: string;
};

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<NewEmployeeForm>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    city: "",
    joiningDate: "",
    phone: "",
    status: "Active",
    avatar: "",
  });

  // Load employees from DynamoDB-backed API
  const { data: employeesData = [], isLoading } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const roles = useMemo(
    () => [...new Set(employeesData.map((e) => e.role))],
    [employeesData],
  );

  const cities = useMemo(
    () => [...new Set(employeesData.map((e) => e.city))],
    [employeesData],
  );

  const filteredEmployees = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return employeesData.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(q) ||
        employee.lastName.toLowerCase().includes(q) ||
        employee.email.toLowerCase().includes(q) ||
        employee.id.toLowerCase().includes(q);

      const matchesRole = roleFilter === "all" || employee.role === roleFilter;
      const matchesCity = cityFilter === "all" || employee.city === cityFilter;

      return matchesSearch && matchesRole && matchesCity;
    });
  }, [employeesData, searchQuery, roleFilter, cityFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      key: "employee",
      header: "Employee",
      render: (employee: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={employee.avatar ?? undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {employee.firstName[0]}
              {employee.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-card-foreground">
              {employee.firstName} {employee.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{employee.email}</p>
          </div>
        </div>
      ),
    },
    { key: "id", header: "ID" },
    { key: "role", header: "Role" },
    { key: "city", header: "City" },
    { key: "joiningDate", header: "Joining Date" },
    { key: "phone", header: "Phone" },
    {
      key: "status",
      header: "Status",
      render: (employee: Employee) => (
        <StatusChip status={employee.status} />
      ),
    },
  ];

  const createEmployeeMutation = useMutation({
    mutationFn: (values: NewEmployeeForm) => createEmployee(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Employee added",
        description: "The new employee has been created.",
      });
      setIsAddModalOpen(false);
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        city: "",
        joiningDate: "",
        phone: "",
        status: "Active",
        avatar: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unable to add employee.",
        variant: "destructive",
      });
    },
  });

  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newEmployee.firstName.trim() ||
      !newEmployee.lastName.trim() ||
      !newEmployee.email.trim() ||
      !newEmployee.role.trim()
    ) {
      toast({
        title: "Validation error",
        description: "First name, last name, email, and role are required.",
        variant: "destructive",
      });
      return;
    }

    createEmployeeMutation.mutate(newEmployee);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Employee Directory
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all employee information in one place.
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary gap-2">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>
                Create a new employee record for your organization.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleAddEmployeeSubmit}
              className="space-y-4 mt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name *</label>
                  <Input
                    value={newEmployee.firstName}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input
                    value={newEmployee.lastName}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role *</label>
                  <Input
                    placeholder="e.g. Software Engineer"
                    value={newEmployee.role}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={newEmployee.city}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Joining Date</label>
                  <Input
                    type="date"
                    value={newEmployee.joiningDate}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({
                        ...prev,
                        joiningDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={newEmployee.phone}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Avatar URL</label>
                <Input
                  value={newEmployee.avatar}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      avatar: e.target.value,
                    }))
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={newEmployee.status}
                  onValueChange={(v) =>
                    setNewEmployee((prev) => ({ ...prev, status: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="btn-outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={createEmployeeMutation.isPending}
                >
                  {createEmployeeMutation.isPending
                    ? "Saving..."
                    : "Save Employee"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table Card */}
      <Card className="bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* (Filters can be re-enabled later) */}
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            data={isLoading ? [] : paginatedEmployees}
            columns={columns}
            onRowClick={(employee) => navigate(`/employees/${employee.id}`)}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}