import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KpiCard } from '@/components/charts/KpiCard';
import { StatusChip } from '@/components/ui/status-chip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { mockPerformanceReviews } from '@/services/mockData';

export default function PerformanceReview() {
  const navigate = useNavigate();

  const completedCount = mockPerformanceReviews.filter(r => r.status === 'Completed').length;
  const pendingCount = mockPerformanceReviews.filter(r => r.status !== 'Completed').length;
  const avgRating = mockPerformanceReviews
    .filter(r => r.overallRating > 0)
    .reduce((sum, r) => sum + r.overallRating, 0) / completedCount || 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(rating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-muted'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Performance Review</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage employee performance evaluations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Completed Reviews"
          value={completedCount}
          trend={12}
          icon={<CheckCircle className="h-6 w-6 text-primary" />}
        />
        <KpiCard
          title="Pending Reviews"
          value={pendingCount}
          trend={-5}
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
        <KpiCard
          title="Average Rating"
          value={`${(avgRating * 20).toFixed(0)}%`}
          trend={8}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Reviews List */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockPerformanceReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/30 transition-colors cursor-pointer gap-4"
              onClick={() => navigate(`/performance/${review.id}`)}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.employeeAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {review.employeeName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-card-foreground">{review.employeeName}</p>
                  <p className="text-sm text-muted-foreground">{review.employeeRole}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div className="text-sm">
                  <p className="text-muted-foreground">Cycle</p>
                  <p className="font-medium text-card-foreground">{review.cycle}</p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Rating</p>
                  {review.overallRating > 0 ? renderStars(review.overallRating) : (
                    <p className="text-muted-foreground">Not rated</p>
                  )}
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Updated</p>
                  <p className="font-medium text-card-foreground">{review.lastUpdated}</p>
                </div>
                <StatusChip status={review.status} />
                <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
