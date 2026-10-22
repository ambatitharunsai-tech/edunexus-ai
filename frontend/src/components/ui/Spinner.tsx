import React from 'react';
import { cn } from '../../lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
  label = 'Loading...',
  showLabel = false,
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const labelSizeMap = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm font-medium',
    xl: 'text-sm font-medium',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center justify-center gap-2.5 text-slate-700 dark:text-slate-200"
    >
      <svg
        className={cn(
          'spinner-circle animate-spin text-indigo-600 dark:text-indigo-400 shrink-0',
          sizeMap[size],
          className
        )}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background track circle for visibility against both light and dark backgrounds */}
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="2.75"
          className="opacity-20"
        />
        {/* Active rotating arc */}
        <path
          d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          className="opacity-95"
        />
      </svg>
      {showLabel ? (
        <span className={cn('text-slate-700 dark:text-slate-200 select-none', labelSizeMap[size])}>
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
};
