import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const variants = {
    neutral:
      'bg-[#F4F4F5] text-[#3F3F46] border-[#D4D4D8] dark:bg-[#27272A] dark:text-[#D4D4D8] dark:border-[#52525B]',
    primary:
      'bg-[#EEF2FF] text-[#3730A3] border-[#818CF8] dark:bg-[#1E1B4B] dark:text-[#A5B4FC] dark:border-[#4338CA]',
    success:
      'bg-[#CFFAFE] text-[#0E7490] border-[#67E8F9] dark:bg-[#083344] dark:text-[#67E8F9] dark:border-[#155E75]',
    warning:
      'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] dark:bg-[#451A03] dark:text-[#FCD34D] dark:border-[#92400E]',
    danger:
      'bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5] dark:bg-[#450A0A] dark:text-[#FCA5A5] dark:border-[#991B1B]',
    info:
      'bg-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD] dark:bg-[#172554] dark:text-[#93C5FD] dark:border-[#1D4ED8]',
  };

  const dotColors = {
    neutral: 'bg-[#71717A] dark:bg-[#A1A1AA]',
    primary: 'bg-[#4F46E5] dark:bg-[#818CF8]',
    success: 'bg-[#0E7490] dark:bg-[#67E8F9]',
    warning: 'bg-[#92400E] dark:bg-[#FCD34D]',
    danger: 'bg-[#B91C1C] dark:bg-[#FCA5A5]',
    info: 'bg-[#1D4ED8] dark:bg-[#93C5FD]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-none border shadow-2xs select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-none shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
