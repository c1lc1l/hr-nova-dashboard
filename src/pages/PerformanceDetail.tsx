import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusChip } from '@/components/ui/status-chip';
import { ArrowLeft, Star, Brain, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { mockPerformanceReviews } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';

export default function PerformanceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const review = useMemo(() => 
    mockPerformanceReviews.find(r => r.id === id),
    [id]
  );

  const [comments, setComments] = useState(review?.comments || '');

  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">Review not found</p>
        <Button variant="link" onClick={() => navigate('/performance')}>
          Back to Reviews
        </Button>
      </div>
    );
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= Math.round(rating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-muted'
            } ${interactive ? 'cursor-pointer hover:text-amber-300' : ''}`}
          />
        ))}
      </div>
    );
  };

  const handleSave = () => {
    toast({
      title: 'Review Saved',
      description: 'Performance review has been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="gap-2 -ml-2"
        onClick={() => navigate('/performance')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reviews
      </Button>

      {/* Employee Header */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={review.employeeAvatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {review.employeeName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-card-foreground">{review.employeeName}</h1>
                <StatusChip status={review.status} />
              </div>
              <p className="text-muted-foreground mt-1">{review.employeeRole}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>Cycle: {review.cycle}</span>
                <span>Period: {review.period}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Rating</p>
              <div className="flex items-center gap-2 mt-1">
                {review.overallRating > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-card-foreground">{review.overallRating}</span>
                    {renderStars(review.overallRating)}
                  </>
                ) : (
                  <span className="text-muted-foreground">Not rated yet</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goals */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {review.goals?.map((goal) => (
                <div key={goal.id} className="p-4 rounded-lg border bg-background">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-card-foreground">{goal.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                    </div>
                    {goal.rating && renderStars(goal.rating, true)}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-card-foreground">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </div>
              )) || (
                <p className="text-muted-foreground">No goals defined for this review.</p>
              )}
            </CardContent>
          </Card>

          {/* Competencies */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Competencies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {review.competencies?.map((comp) => (
                <div key={comp.id} className="flex items-center justify-between p-4 rounded-lg border bg-background">
                  <div>
                    <p className="font-medium text-card-foreground">{comp.name}</p>
                    {comp.comments && (
                      <p className="text-sm text-muted-foreground mt-1">{comp.comments}</p>
                    )}
                  </div>
                  {renderStars(comp.rating, true)}
                </div>
              )) || (
                <p className="text-muted-foreground">No competencies defined for this review.</p>
              )}
            </CardContent>
          </Card>

          {/* Overall Comments */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Overall Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add your overall comments about the employee's performance..."
                rows={5}
              />
              <Button className="mt-4" onClick={handleSave}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-card-foreground">Trend Summary</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Performance has improved by 15% compared to the previous quarter. Strong growth in technical competencies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">Development Actions</p>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 mt-2 space-y-1 list-disc list-inside">
                      <li>Consider leadership training program</li>
                      <li>Assign mentoring responsibilities</li>
                      <li>Cross-functional project exposure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">Strengths</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                      Exceptional problem-solving skills and team collaboration. Consistently meets deadlines.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
