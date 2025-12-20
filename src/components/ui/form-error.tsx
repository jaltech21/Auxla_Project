import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-sm text-destructive mt-1.5',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

interface FormSuccessProps {
  show?: boolean;
  className?: string;
}

export function FormSuccess({ show, className }: FormSuccessProps) {
  if (!show) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-sm text-green-600 dark:text-green-500 mt-1.5',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <svg
        className="h-3.5 w-3.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>Looks good!</span>
    </div>
  );
}
