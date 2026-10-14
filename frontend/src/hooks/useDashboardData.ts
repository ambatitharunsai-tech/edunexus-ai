import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import type {
  DashboardOverviewResponse,
  CreateInterventionPayload,
} from '../types';

// Built-in synthetic fallback matching backend dataset structure
export function useDashboardData() {
  const [data, setData] = useState<DashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api<DashboardOverviewResponse>('/api/v1/dashboard/overview');
      setData(response);
      setIsOfflineFallback(false);
    } catch (err: unknown) {
      setData(null);
      setError(err instanceof Error ? err.message : "Dashboard request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createIntervention = useCallback(
    async (payload: CreateInterventionPayload): Promise<boolean> => {
      try {
        await api('/api/v1/interventions', {
          method: 'POST',
          body: payload,
        });
        // Refresh dashboard overview to reflect new intervention
        await fetchData();
        return true;
      } catch (err) {
        console.error('Failed to create intervention:', err);
        return false;
      }
    },
    [fetchData]
  );

  return {
    data,
    loading,
    error,
    isOfflineFallback,
    refetch: fetchData,
    createIntervention,
  };
}
