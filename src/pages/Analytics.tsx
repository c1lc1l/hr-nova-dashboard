import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/charts/KpiCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Users, UserMinus, DollarSign, Clock, TrendingUp, Award } from 'lucide-react';
import { performanceChartData, employeeStatsData } from '@/services/mockData';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('quarter');

  const turnoverData = [
    { month: 'Jan', rate: 2.1 },
    { month: 'Feb', rate: 1.8 },
    { month: 'Mar', rate: 2.4 },
    { month: 'Apr', rate: 1.9 },
    { month: 'May', rate: 1.5 },
    { month: 'Jun', rate: 1.7 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">HR Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Key metrics and insights for your organization.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Headcount"
          value="248"
          trend={5.2}
          icon={<Users className="h-6 w-6 text-primary" />}
        />
        <KpiCard
          title="Turnover Rate"
          value="1.7%"
          trend={-0.5}
          icon={<UserMinus className="h-6 w-6 text-primary" />}
        />
        <KpiCard
          title="Avg. Tenure"
          value="2.8 yrs"
          trend={0.3}
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
        <KpiCard
          title="Engagement Score"
          value="78%"
          trend={4}
          icon={<Award className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartCard
          title="Turnover Trend"
          data={turnoverData}
          dataKey="rate"
          xAxisKey="month"
        />
        <BarChartCard
          title="Headcount by Department"
          data={employeeStatsData}
          dataKey="count"
          xAxisKey="department"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartCard
          title="Performance Trend"
          data={performanceChartData}
          dataKey="score"
          xAxisKey="week"
        />
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">Retention Improving</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    Employee retention has improved by 8% compared to last quarter.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Hiring Target Met</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Q4 hiring target of 25 new hires achieved ahead of schedule.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200">Training Investment</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Consider increasing L&D budget - high performers request more training.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
