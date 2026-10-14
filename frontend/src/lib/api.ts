// EduNexus AI — API fetch wrapper for backend calls

const DEFAULT_API_URL = 'http://localhost:8000';
const API_URL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
export const apiUrl = (endpoint: string) => `${API_URL}${endpoint}`;

// Default demo staff bearer token for explicit sign-in flows and evaluator demos.
export const DEMO_BEARER_TOKEN = 'edunexus-demo-advisor-token';

export function getAuthToken(): string {
  try {
    return localStorage.getItem('edunexus_auth_token') || '';
  } catch {
    return '';
  }
}

export function setAuthToken(token: string): void {
  try {
    localStorage.setItem('edunexus_auth_token', token);
  } catch {
    // LocalStorage unavailable in non-browser environment
  }
}

interface FetchOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function api<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    const errorMsg = error.detail || error?.error?.message || `API error: ${response.status}`;
    throw new Error(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
  }

  return response.json();
}

export async function apiUpload<T>(endpoint: string, file: File): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Upload error: ${response.status}`);
  }

  return response.json();
}

