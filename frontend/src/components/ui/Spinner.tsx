import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
  label = 'Loading...',
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      role="status"
      className="inline-flex items-center justify-center gap-2 text-slate-500"
    >
      <Loader2
        className={cn('animate-spin text-indigo-600', sizes[size], className)}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};
