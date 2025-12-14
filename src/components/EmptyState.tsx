import { ReactNode } from 'react';
import { FileX2, Inbox, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EmptyStateVariant = 'no-data' | 'no-results' | 'no-employees' | 'error';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const defaultContent: Record<EmptyStateVariant, { icon: ReactNode; title: string; description: string }> = {
  'no-data': {
    icon: <Inbox className="h-12 w-12 text-muted-foreground/50" />,
    title: 'No data available',
    description: 'There is no data to display at this time.',
  },
  'no-results': {
    icon: <Search className="h-12 w-12 text-muted-foreground/50" />,
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
  },
  'no-employees': {
    icon: <Users className="h-12 w-12 text-muted-foreground/50" />,
    title: 'No employees found',
    description: 'Add your first employee to get started.',
  },
  'error': {
    icon: <FileX2 className="h-12 w-12 text-destructive/50" />,
    title: 'Something went wrong',
    description: 'An error occurred while loading data. Please try again.',
  },
};

export function EmptyState({
  variant = 'no-data',
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  const defaults = defaultContent[variant];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4">
        {icon || defaults.icon}
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        {title || defaults.title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">
        {description || defaults.description}
      </p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
