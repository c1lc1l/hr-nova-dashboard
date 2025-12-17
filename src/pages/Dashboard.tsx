import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/charts/KpiCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { StatusChip } from '@/components/ui/status-chip';
import { PageHeader } from '@/components/PageHeader';
import { Users, Calendar, Clock, Brain, FileText, UserCheck, Star, CheckCircle } from 'lucide-react';
import { mockActivities, performanceChartData, employeeStatsData } from '@/services/mockData';
import { User } from '@/types';

interface DashboardProps {
  user: User | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const navigate = useNavigate();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'leave': return <Calendar className="h-4 w-4 text-primary" />;
      case 'employee': return <UserCheck className="h-4 w-4 text-emerald-500" />;
      case 'review': return <Star className="h-4 w-4 text-amber-500" />;
      case 'document': return <FileText className="h-4 w-4 text-violet-500" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <main className="space-y-6">
      <PageHeader
        title={`Welcome Back!`} //, ${user?.firstName || 'Admin'}
        description="Here's what's happening in your organization today."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Total Employees"
          value="248"
          trend={5.2}
          icon={<Users className="h-6 w-6 text-primary" />}
          onViewDetails={() => navigate('/employees')}
        />
        <KpiCard
          title="Pending Leaves"
          value="12"
          trend={-2}
          icon={<Calendar className="h-6 w-6 text-primary" />}
          onViewDetails={() => navigate('/leave')}
        />
        <KpiCard
          title="Attendance Rate"
          value="94.5%"
          trend={1.3}
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - AI Insights & Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI-Powered Analytics */}
          <Card className="bg-card border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">AI-Powered Analytics</CardTitle>
                <StatusChip status="Beta" type="info" className="ml-auto" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-amber-500/20 rounded-full">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">Attrition Risk Alert</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      3 employees in Engineering show high attrition risk based on engagement patterns. Consider scheduling 1-on-1s.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-blue-500/20 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">Leave Pattern Anomaly</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Unusual increase in sick leave requests detected in Q4. Suggest reviewing workload distribution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-emerald-500/20 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">Performance Forecast</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                      Overall team performance trending 8% higher than last quarter. Design team leads improvement.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <LineChartCard
            title="Performance Trend (Sarah Johnson)"
            data={performanceChartData}
            dataKey="score"
            xAxisKey="week"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Employee Statistics */}
          <BarChartCard
            title="Employee Statistics"
            data={employeeStatsData}
            dataKey="count"
            xAxisKey="department"
          />

          {/* Recent Activities */}
          <Card className="bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-muted/50 rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-card-foreground line-clamp-2">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
