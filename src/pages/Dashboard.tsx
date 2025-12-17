import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";

import { KpiCard } from "@/components/charts/KpiCard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { BarChartCard } from "@/components/charts/BarChartCard";

import {
  Users,
  Calendar,
  Clock,
  Brain,
  FileText,
  UserCheck,
  Star,
  CheckCircle,
} from "lucide-react";

import { User, LeaveRequest, AiInsight } from "@/types";
import { fetchPendingLeave } from "@/services/leaveApi";
import {
  fetchEmployeeCount,
  fetchEmployeeStats,
  EmployeeStats,
} from "@/services/employeeApi";
import { fetchAiInsights } from "@/services/analyticsApi";
import { performanceChartData, mockActivities } from "@/services/mockData";

interface DashboardProps {
  user: User | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const navigate = useNavigate();
  const { hasRole } = useAuth();

  const canApprove = hasRole(["System Admin", "HR Admin", "Manager"]);

  // Queries
  const employeeCountQuery = useQuery({
    queryKey: ["employee-count"],
    queryFn: fetchEmployeeCount,
  });

  const employeeStatsQuery = useQuery({
    queryKey: ["employee-stats"],
    queryFn: fetchEmployeeStats,
  });

  const aiInsightsQuery = useQuery<AiInsight[], Error>({
    queryKey: ["ai-insights"],
    queryFn: fetchAiInsights,
    staleTime: 5 * 60 * 1000,      // 5 minutes
    gcTime: 30 * 60 * 1000,     // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  const employeeStats = (employeeStatsQuery.data || []) as EmployeeStats[];

  const pendingQuery = useQuery({
    queryKey: ["pending-leave-dashboard"],
    queryFn: fetchPendingLeave,
    enabled: canApprove,
  });

  // Derived values
  const pendingLeavesCount = useMemo(() => {
    if (!canApprove || !pendingQuery.data) return "0";

    const pending = (pendingQuery.data as LeaveRequest[]).filter(
      (leave) => leave.status === "Pending",
    );

    return pending.length.toString();
  }, [canApprove, pendingQuery.data]);

  const totalEmployees = (employeeCountQuery.data ?? 0).toString();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "leave":
        return <Calendar className="h-4 w-4 text-primary" />;
      case "employee":
        return <UserCheck className="h-4 w-4 text-emerald-500" />;
      case "review":
        return <Star className="h-4 w-4 text-amber-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-violet-500" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <main className="space-y-6">
      <PageHeader
        title="Welcome Back!"
        description="Here's what's happening in your organization today."
      />

      {/* KPI row */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KpiCard
          title="Total Employees"
          value={totalEmployees}
          trend={5.2}
          icon={<Users className="h-6 w-6 text-primary" />}
          onViewDetails={() => navigate("/employees")}
        />

        <KpiCard
          title="Pending Leaves"
          value={pendingLeavesCount}
          trend={-2}
          icon={<Calendar className="h-6 w-6 text-primary" />}
          onViewDetails={() => navigate("/leave")}
        />

        <KpiCard
          title="Attendance Rate"
          value="94.5%"
          trend={1.3}
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: insights + performance */}
        <div className="space-y-6 lg:col-span-2">
          {/* AI‑Powered Analytics */}
          <Card className="bg-card border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">AI-Powered Analytics</CardTitle>
                <StatusChip status="Beta" type="info" className="ml-auto" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {aiInsightsQuery.isLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading insights…
                </p>
              )}

              {aiInsightsQuery.isError && (
                <p className="text-sm text-destructive">
                  Unable to load insights right now.
                </p>
              )}

              {aiInsightsQuery.data?.map((insight) => (
                <AnalyticsAlert
                  key={insight.id}
                  tone={
                    insight.severity === "warning"
                      ? "amber"
                      : insight.severity === "critical"
                      ? "blue"
                      : "emerald"
                  }
                  title={insight.title}
                  body={insight.body}
                />
              ))}

              {aiInsightsQuery.data?.length === 0 &&
                !aiInsightsQuery.isLoading &&
                !aiInsightsQuery.isError && (
                  <p className="text-sm text-muted-foreground">
                    No insights available yet. Check back after more activity.
                  </p>
                )}
            </CardContent>
          </Card>

          {/* Performance trend */}
          {/* <LineChartCard
            title="Performance Trend (Sarah Johnson)"
            data={performanceChartData}
            dataKey="score"
            xAxisKey="week"
          /> */}
        </div>

        {/* Right column: stats + activity */}
        <div className="space-y-6">
          {/* Employee statistics by department */}
          <BarChartCard<EmployeeStats>
            title="Employee Statistics"
            data={employeeStats}
            dataKey="count"
            xAxisKey="department"
          />

          {/* Recent activities (currently mock) */}
          {/* <Card className="bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activities</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {mockActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 rounded-full bg-muted/50 p-2">
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm text-card-foreground">
                      {activity.message}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card> */}
        </div>
      </section>
    </main>
  );
}

/**
 * Small, reusable alert block for AI analytics.
 * Easily extended later for dynamic content.
 */
interface AnalyticsAlertProps {
  tone: "amber" | "blue" | "emerald";
  title: string;
  body: string;
}

function AnalyticsAlert({ tone, title, body }: AnalyticsAlertProps) {
  const toneStyles: Record<
    AnalyticsAlertProps["tone"],
    { container: string; dot: string }
  > = {
    amber: {
      container:
        "bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800",
      dot: "bg-amber-500",
    },
    blue: {
      container:
        "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800",
      dot: "bg-blue-500",
    },
    emerald: {
      container:
        "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800",
      dot: "bg-emerald-500",
    },
  };

  const { container, dot } = toneStyles[tone];

  return (
    <div className={`rounded-lg border p-4 ${container}`}>
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-opacity-20 p-1.5">
          <div className={`h-2 w-2 rounded-full ${dot} animate-pulse`} />
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
        </div>
      </div>
    </div>
  );
}