import { useState, useEffect, useCallback, useRef } from 'react';
import { api, getCachedApiData } from '../lib/api';
import type {
  DashboardOverviewResponse,
  CreateInterventionPayload,
} from '../types';

export function useDashboardData() {
  // Synchronously initialize from in-memory cache if available, preventing full-screen spinner on navigation
  const initialCache = getCachedApiData<DashboardOverviewResponse>('/api/v1/dashboard/overview');
  const [data, setData] = useState<DashboardOverviewResponse | null>(() => initialCache);
  const [loading, setLoading] = useState<boolean>(() => !initialCache);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState<boolean>(false);

  // Keep ref to current data to avoid re-creating callbacks and prevent state wiping
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const fetchData = useCallback(async (options: { bypassCache?: boolean } = {}) => {
    // Only display full-screen loading spinner if there is no existing valid data to show
    if (!dataRef.current) {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await api<DashboardOverviewResponse>('/api/v1/dashboard/overview', {
        bypassCache: options.bypassCache,
      });
      setData(response);
      setIsOfflineFallback(false);
      setError(null);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Dashboard request failed';
      setError(errMsg);
      // Only clear data if we didn't have any cached data before
      if (!dataRef.current) {
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // If we already have fresh cached data, revalidate silently in the background
    void fetchData();
  }, [fetchData]);

  const createIntervention = useCallback(
    async (payload: CreateInterventionPayload): Promise<boolean> => {
      try {
        await api('/api/v1/interventions', {
          method: 'POST',
          body: payload,
        });
        // Refresh dashboard overview with bypassCache to reflect new intervention immediately
        await fetchData({ bypassCache: true });
        return true;
      } catch (err) {
        console.error('Failed to create intervention:', err);
        return false;
      }
    },
    [fetchData]
  );

  const refetch = useCallback(async () => {
    return fetchData({ bypassCache: true });
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    isOfflineFallback,
    refetch,
    createIntervention,
  };
}
