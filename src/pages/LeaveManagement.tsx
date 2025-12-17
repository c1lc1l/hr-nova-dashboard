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
import { Plus, Filter, Eye } from "lucide-react";
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
  const [pendingStatusFilter, setPendingStatusFilter] = useState<string>("all");
  const [pendingTypeFilter, setPendingTypeFilter] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReasonDialog, setSelectedReasonDialog] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: "Approved" | "Rejected" | null;
    leaveId: string | null;
  }>({ open: false, action: null, leaveId: null });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState<LeaveRequestFormData>({
    type: "Annual",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  // Queries
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

  // Mutations
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

  // Derived data
  const myLeaves = useMemo(
    () => ((myLeaveQuery.data as LeaveRequest[]) || []),
    [myLeaveQuery.data],
  );

  const allPendingLeaves = useMemo(
    () => ((pendingQuery.data as LeaveRequest[]) || []),
    [pendingQuery.data],
  );

  const filteredMyLeaves = useMemo(() => {
    return myLeaves.filter((leave) => {
      const matchesStatus =
        statusFilter === "all" || leave.status === statusFilter;
      const matchesType =
        typeFilter === "all" || leave.type === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [myLeaves, statusFilter, typeFilter]);

  const filteredPendingLeaves = useMemo(() => {
    return allPendingLeaves.filter((leave) => {
      const matchesStatus =
        pendingStatusFilter === "all" || leave.status === pendingStatusFilter;
      const matchesType =
        pendingTypeFilter === "all" || leave.type === pendingTypeFilter;
      return matchesStatus && matchesType;
    });
  }, [allPendingLeaves, pendingStatusFilter, pendingTypeFilter]);

  const totalPages = Math.ceil(filteredMyLeaves.length / itemsPerPage) || 1;
  const paginatedLeaves = filteredMyLeaves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const selectedLeave =
    selectedReasonDialog
      ? [...allPendingLeaves, ...myLeaves].find(
          (leave) => leave.id === selectedReasonDialog,
        )
      : undefined;

  // Helpers
  const minFromDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10); // yyyy-mm-dd
  }, []);

  const validateDatesAndReason = () => {
    if (!formData.type || !formData.fromDate || !formData.toDate) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.reason.trim()) {
      toast({
        title: "Validation error",
        description: "Reason is required.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.fromDate < minFromDate) {
      toast({
        title: "Validation error",
        description: "From date must be at least 1 week from today.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.toDate < formData.fromDate) {
      toast({
        title: "Validation error",
        description: "To date cannot be earlier than From date.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDatesAndReason()) return;
    submitMutation.mutate(formData);
  };

  const handleReloadMyLeaves = () => {
    queryClient.invalidateQueries({ queryKey: ["my-leave"] });
  };

  const handleReloadPendingLeaves = () => {
    queryClient.invalidateQueries({ queryKey: ["pending-leave"] });
  };

  const openConfirm = (leaveId: string, action: "Approved" | "Rejected") => {
    setConfirmDialog({ open: true, action, leaveId });
  };

  const handleConfirmDecision = () => {
    if (!confirmDialog.leaveId || !confirmDialog.action) {
      setConfirmDialog({ open: false, action: null, leaveId: null });
      return;
    }
    decideMutation.mutate({
      id: confirmDialog.leaveId,
      decision: confirmDialog.action,
    });
    setConfirmDialog({ open: false, action: null, leaveId: null });
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
    {
      key: "reason",
      header: "Reason",
      render: (leave: LeaveRequest) => (
        <Button
          variant="ghost"
          size="sm"
          className="btn-primary h-6 px-2 text-xs"
          onClick={() => setSelectedReasonDialog(leave.id)}
        >
          <Eye className="h-3 w-3 mr-1" />
          View Reason
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header + Request Modal */}
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
                    min={minFromDate}
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
                    min={formData.fromDate || minFromDate}
                    value={formData.toDate}
                    onChange={(e) =>
                      setFormData({ ...formData, toDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason *</Label>
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
                  className="btn-destructive"
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

      {/* Reason Dialog */}
      <Dialog
        open={!!selectedReasonDialog}
        onOpenChange={() => setSelectedReasonDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Reason</DialogTitle>
            <DialogDescription>
              Reason provided for the leave request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedLeave?.reason ? (
              <p className="whitespace-pre-wrap text-sm text-foreground">
                {selectedLeave.reason}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No reason provided.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedReasonDialog(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Approve/Reject Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          setConfirmDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.action === "Approved" ? "Approve Leave" : "Reject Leave"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {confirmDialog.action?.toLowerCase()} this leave request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog({ open: false, action: null, leaveId: null })
              }
            >
              Cancel
            </Button>
            <Button
              variant={confirmDialog.action === "Approved" ? "default" : "destructive"}
              onClick={handleConfirmDecision}
              disabled={decideMutation.isPending}
            >
              {decideMutation.isPending ? "Processing..." : confirmDialog.action}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <Button variant="outline" size="sm" onClick={handleReloadMyLeaves}>
                Reload
              </Button>
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
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <CardTitle className="flex-1">Pending Approvals</CardTitle>
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={pendingStatusFilter}
                  onValueChange={(v) => {
                    setPendingStatusFilter(v);
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
                  value={pendingTypeFilter}
                  onValueChange={(v) => {
                    setPendingTypeFilter(v);
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReloadPendingLeaves}
                >
                  Reload
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredPendingLeaves}
              columns={[
                ...columns,
                {
                  key: "actions",
                  header: "Actions",
                  render: (leave: LeaveRequest) => (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="btn-primary"
                        onClick={() => openConfirm(leave.id, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="btn-destructive"
                        onClick={() => openConfirm(leave.id, "Rejected")}
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
