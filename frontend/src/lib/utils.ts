// EduNexus AI — Utility functions

import { clsx, type ClassValue } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import type { RiskLevel } from '../types';

/** Merge class names conditionally */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a date string to a readable format */
export function formatDate(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'MMM d, yyyy');
  } catch {
    return dateStr;
  }
}

/** Format a date to relative time (e.g., "2 days ago") */
export function formatRelative(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}

/** Get a color class for a risk level */
export function getRiskColor(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    insufficient_data: 'text-slate-600 bg-slate-50',
    low: 'text-green-600 bg-green-50',
    moderate: 'text-amber-600 bg-amber-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-orange-600 bg-orange-50',
    critical: 'text-red-600 bg-red-50',
  };
  return colors[level] || colors.low;
}

/** Get badge class for a risk level */
export function getRiskBadgeClass(level: RiskLevel): string {
  const classes: Record<RiskLevel, string> = {
    insufficient_data: 'bg-slate-100 text-slate-600',
    low: 'badge-low',
    moderate: 'badge-medium',
    medium: 'badge-medium',
    high: 'badge-high',
    critical: 'badge-critical',
  };
  return classes[level] || classes.low;
}

/** Format a percentage with one decimal */
export function formatPercent(value: number | undefined | null): string {
  if (value === undefined || value === null) return 'N/A';
  return `${value.toFixed(1)}%`;
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function safeStorageGet(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      return null;
    }
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeStorageSet(key: string, value: string): void {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      return;
    }
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures in privacy-restricted or non-browser contexts.
  }
}

export function safeStorageRemove(key: string): void {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      return;
    }
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage failures in privacy-restricted or non-browser contexts.
  }
}

/** Full name from first + last */
export function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

/** Status badge color */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    planned: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    graduated: 'bg-blue-100 text-blue-800',
    transferred: 'bg-yellow-100 text-yellow-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

/** Priority badge color */
export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
  };
  return colors[priority] || 'bg-gray-100 text-gray-700';
}
