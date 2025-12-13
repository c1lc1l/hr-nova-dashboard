import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  onViewDetails?: () => void;
}

export function KpiCard({ title, value, trend, icon, onViewDetails }: KpiCardProps) {
  const isPositive = trend >= 0;

  return (
    <Card className="bg-card hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-card-foreground mt-2">{value}</p>
            <div className="flex items-center mt-2 gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={cn(
                "text-sm font-medium",
                isPositive ? "text-emerald-500" : "text-destructive"
              )}>
                {isPositive ? '+' : ''}{trend}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl">
            {icon}
          </div>
        </div>
        {onViewDetails && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-4 w-full justify-between text-primary hover:text-primary"
            onClick={onViewDetails}
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
