import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#27272A] dark:text-[#E4E4E7] select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#71717A] dark:text-[#A1A1AA]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full rounded-none border border-[#D4D4D8] dark:border-[#3F3F46] bg-[#FFFFFF] dark:bg-[#111113] px-3.5 py-2 text-sm text-[#18181B] dark:text-[#FAFAFA] shadow-2xs placeholder:text-[#A1A1AA] dark:placeholder:text-[#71717A] transition-colors',
              'hover:border-[#A1A1AA] dark:hover:border-[#71717A]',
              'focus:border-[#6366F1] dark:focus:border-[#818CF8] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20',
              'disabled:cursor-not-allowed disabled:bg-[#F4F4F5] dark:disabled:bg-[#18181B] disabled:text-[#A1A1AA] dark:disabled:text-[#52525B] disabled:border-[#E4E4E7] dark:disabled:border-[#27272A]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#DC2626] dark:border-[#F87171] focus:border-[#DC2626] dark:focus:border-[#F87171] focus:ring-[#DC2626]/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#71717A] dark:text-[#A1A1AA]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#B91C1C] dark:text-[#FCA5A5] font-medium" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
