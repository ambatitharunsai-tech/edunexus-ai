import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  api,
  getCachedApiData,
  clearApiCache,
  setAuthToken,
} from '../lib/api';

describe('API Caching & Request Deduplication', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    clearApiCache();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('deduplicates concurrent in-flight GET requests for the same endpoint', async () => {
    const mockData = { total: 42, name: 'Overview' };
    let fetchCount = 0;

    globalThis.fetch = vi.fn().mockImplementation(async () => {
      fetchCount++;
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 20));
      return {
        ok: true,
        json: async () => mockData,
      } as unknown as Response;
    });

    // Fire 3 simultaneous GET calls
    const [res1, res2, res3] = await Promise.all([
      api<typeof mockData>('/api/v1/dashboard/overview'),
      api<typeof mockData>('/api/v1/dashboard/overview'),
      api<typeof mockData>('/api/v1/dashboard/overview'),
    ]);

    expect(fetchCount).toBe(1);
    expect(res1).toEqual(mockData);
    expect(res2).toEqual(mockData);
    expect(res3).toEqual(mockData);
  });

  it('serves subsequent requests from in-memory cache without refetching within TTL', async () => {
    const mockData = { status: 'healthy' };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);
    globalThis.fetch = mockFetch;

    const first = await api<typeof mockData>('/api/v1/health');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(first).toEqual(mockData);

    // Second call should come from in-memory cache
    const second = await api<typeof mockData>('/api/v1/health');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(second).toEqual(mockData);

    // Synchronous cache lookup should also succeed
    const cached = getCachedApiData<typeof mockData>('/api/v1/health');
    expect(cached).toEqual(mockData);
  });

  it('bypasses in-memory cache when bypassCache is explicitly set to true', async () => {
    const mockData = { count: 10 };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);
    globalThis.fetch = mockFetch;

    await api('/api/v1/data');
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Bypass cache forces a fresh network call
    await api('/api/v1/data', { bypassCache: true });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('clears in-memory cache when mutating methods (POST, PATCH, DELETE) are executed', async () => {
    const mockData = { list: ['a', 'b'] };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);
    globalThis.fetch = mockFetch;

    // Cache a GET response
    await api('/api/v1/interventions');
    expect(getCachedApiData('/api/v1/interventions')).toEqual(mockData);

    // Perform a POST mutation
    await api('/api/v1/interventions', {
      method: 'POST',
      body: { title: 'New intervention' },
    });

    // Cache should be cleared
    expect(getCachedApiData('/api/v1/interventions')).toBeNull();

    // Next GET should trigger network fetch
    await api('/api/v1/interventions');
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('supports manually clearing specific or all cache entries', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as unknown as Response);
    globalThis.fetch = mockFetch;

    await api('/api/v1/students');
    await api('/api/v1/overview');

    expect(getCachedApiData('/api/v1/students')).toBeTruthy();
    expect(getCachedApiData('/api/v1/overview')).toBeTruthy();

    clearApiCache('/api/v1/students');
    expect(getCachedApiData('/api/v1/students')).toBeNull();
    expect(getCachedApiData('/api/v1/overview')).toBeTruthy();

    clearApiCache();
    expect(getCachedApiData('/api/v1/overview')).toBeNull();
  });

  it('does not store failed responses in the cache', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ detail: 'Internal server error' }),
    } as unknown as Response);
    globalThis.fetch = mockFetch;

    await expect(api('/api/v1/error-endpoint')).rejects.toThrow('Internal server error');
    expect(getCachedApiData('/api/v1/error-endpoint')).toBeNull();
  });

  it('supports request abort through AbortSignal', async () => {
    const controller = new AbortController();
    globalThis.fetch = vi.fn().mockImplementation(
      (_url: string, init?: RequestInit) =>
        new Promise((_, reject) => {
          if (init?.signal?.aborted) {
            const err = new Error('The operation was aborted');
            err.name = 'AbortError';
            reject(err);
            return;
          }
          init?.signal?.addEventListener('abort', () => {
            const err = new Error('The operation was aborted');
            err.name = 'AbortError';
            reject(err);
          });
        })
    );

    const apiPromise = api('/api/v1/slow-call', { signal: controller.signal });
    controller.abort();

    await expect(apiPromise).rejects.toThrow(/aborted/i);
    expect(getCachedApiData('/api/v1/slow-call')).toBeNull();
  });

  it('invalidates cache when auth token changes', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ role: 'staff' }),
    } as unknown as Response);
    globalThis.fetch = mockFetch;

    await api('/api/v1/profile');
    expect(getCachedApiData('/api/v1/profile')).toBeTruthy();

    setAuthToken('new-user-token');
    expect(getCachedApiData('/api/v1/profile')).toBeNull();
  });
});
