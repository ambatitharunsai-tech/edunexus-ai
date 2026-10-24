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
            className="block text-xs font-semibold text-slate-700 dark:text-slate-200 select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full rounded-none border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-2xs placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-colors',
              'focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20',
              'disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800/60 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:border-slate-200 dark:disabled:border-slate-700/60',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500 dark:border-rose-400 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-rose-600 dark:text-rose-400 font-medium" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-600 dark:text-slate-300">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
