import { cn } from '@/lib/utils';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusChipProps {
  status: string;
  type?: StatusType;
  className?: string;
}

const statusColors: Record<StatusType, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  neutral: 'bg-muted text-muted-foreground'
};

const statusMapping: Record<string, StatusType> = {
  'Active': 'success',
  'Approved': 'success',
  'Completed': 'success',
  'Success': 'success',
  'Pending': 'warning',
  'In Progress': 'warning',
  'On Leave': 'warning',
  'Inactive': 'error',
  'Rejected': 'error',
  'Failed': 'error',
  'Not Started': 'neutral'
};

export function StatusChip({ status, type, className }: StatusChipProps) {
  const statusType = type || statusMapping[status] || 'neutral';

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusColors[statusType],
      className
    )}>
      {status}
    </span>
  );
}
