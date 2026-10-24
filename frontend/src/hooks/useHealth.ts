import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export interface HealthState {
  status: 'online' | 'offline' | 'checking';
  version?: string;
  service?: string;
  environment?: string;
  timestamp?: string;
  error?: string;
}

export function useHealth(pollIntervalMs = 30000) {
  const [health, setHealth] = useState<HealthState>({ status: 'checking' });

  const checkHealth = async () => {
    try {
      const data = await api<{
        status: string;
        service: string;
        version: string;
        environment: string;
        timestamp: string;
      }>('/api/v1/health');

      setHealth({
        status: data.status === 'healthy' ? 'online' : 'offline',
        version: data.version,
        service: data.service,
        environment: data.environment,
        timestamp: data.timestamp,
      });
    } catch (err: unknown) {
      setHealth({
        status: 'offline',
        error: err instanceof Error ? err.message : 'Backend unreachable',
      });
    }
  };

  useEffect(() => {
    checkHealth();
    if (pollIntervalMs > 0) {
      const interval = setInterval(checkHealth, pollIntervalMs);
      return () => clearInterval(interval);
    }
  }, [pollIntervalMs]);

  return { health, checkHealth };
}
