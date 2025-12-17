import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/ui/data-table";
import { StatusChip } from "@/components/ui/status-chip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Filter } from "lucide-react";
import {
  LeaveRequest,
  LeaveType,
  LeaveStatus,
  LeaveRequestFormData,
} from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  submitLeaveRequest,
  fetchMyLeave,
  fetchPendingLeave,
  decideLeaveRequest,
} from "@/services/leaveApi";

const leaveTypes: LeaveType[] = [
  "Annual",
  "Sick",
  "Personal",
  "Maternity",
  "Paternity",
  "Unpaid",
];

const leaveStatuses: LeaveStatus[] = [
  "Pending",
  "Approved",
  "Rejected",
  "Cancelled",
];

export default function LeaveManagement() {
  const { toast } = useToast();
  const { user, hasRole } = useAuth();
  const queryClient = useQueryClient();

  const canApprove = hasRole(["System Admin", "HR Admin", "Manager"]);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState<LeaveRequestFormData>({
    type: "Annual",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const myLeaveQuery = useQuery({
    queryKey: ["my-leave", user?.id],
    queryFn: () => fetchMyLeave(user!.id),
    enabled: !!user,
  });

  const pendingQuery = useQuery({
    queryKey: ["pending-leave"],
    queryFn: fetchPendingLeave,
    enabled: canApprove,
  });

  const submitMutation = useMutation({
    mutationFn: (values: LeaveRequestFormData) =>
      submitLeaveRequest({
        ...values,
        employeeId: user!.id,
        employeeName: `${user!.firstName} ${user!.lastName}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-leave"] });
      toast({
        title: "Leave request submitted",
        description: "Your leave request has been submitted for approval.",
      });
      setFormData({ type: "Annual", fromDate: "", toDate: "", reason: "" });
      setIsModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unable to submit leave request.",
        variant: "destructive",
      });
    },
  });

  const decideMutation = useMutation({
    mutationFn: ({
      id,
      decision,
      note,
    }: {
      id: string;
      decision: "Approved" | "Rejected";
      note?: string;
    }) =>
      decideLeaveRequest(
        id,
        decision,
        `${user!.firstName} ${user!.lastName}`,
        note,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-leave"] });
      queryClient.invalidateQueries({ queryKey: ["my-leave"] });
      toast({ title: "Leave request updated" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unable to update leave request.",
        variant: "destructive",
      });
    },
  });

  const allLeaves: LeaveRequest[] = (myLeaveQuery.data as LeaveRequest[]) || [];

  const filteredLeaves = useMemo(() => {
    return allLeaves.filter((leave) => {
      const matchesStatus = statusFilter === "all" || leave.status === statusFilter;
      const matchesType = typeFilter === "all" || leave.type === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [allLeaves, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage) || 1;
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type || !formData.fromDate || !formData.toDate) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate(formData);
  };

  const columns = [
    {
      key: "employee",
      header: "Employee",
      render: (leave: LeaveRequest) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={leave.employeeAvatar ?? undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {leave.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-card-foreground">
            {leave.employeeName}
          </span>
        </div>
      ),
    },
    { key: "type", header: "Type" },
    { key: "fromDate", header: "From" },
    { key: "toDate", header: "To" },
    { key: "days", header: "Days" },
    {
      key: "status",
      header: "Status",
      render: (leave: LeaveRequest) => <StatusChip status={leave.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage employee leave requests.
          </p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
              <DialogDescription>
                Submit a new leave request for approval.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Leave Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v: LeaveType) =>
                    setFormData({ ...formData, type: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date *</Label>
                  <Input
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) =>
                      setFormData({ ...formData, fromDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>To Date *</Label>
                  <Input
                    type="date"
                    value={formData.toDate}
                    onChange={(e) =>
                      setFormData({ ...formData, toDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea
                  placeholder="Provide a reason for your leave request..."
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Remaining Balance:{" "}
                  <span className="font-semibold text-card-foreground">
                    15 days
                  </span>
                  {/* TODO: hook up real LeaveBalance */}
                </p>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* My leave table */}
      <Card className="bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <CardTitle className="flex-1">My Leave Requests</CardTitle>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {leaveStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={typeFilter}
                onValueChange={(v) => {
                  setTypeFilter(v);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={paginatedLeaves}
            columns={columns}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Pending approvals for approvers */}
      {canApprove && (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={(pendingQuery.data as LeaveRequest[]) || []}
              columns={[
                ...columns,
                {
                  key: "actions",
                  header: "Actions",
                  render: (leave: LeaveRequest) => (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          decideMutation.mutate({
                            id: leave.id,
                            decision: "Approved",
                          })
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                        onClick={() =>
                          decideMutation.mutate({
                            id: leave.id,
                            decision: "Rejected",
                          })
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  ),
                },
              ]}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
