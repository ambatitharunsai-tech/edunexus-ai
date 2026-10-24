import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  runSpeedTest,
  getSpeedRecommendation,
  SPEED_RECOMMENDATIONS,
  EXPECTED_PROBE_SIZE_BYTES,
  MIN_REALISTIC_DURATION_MS,
  _resetSpeedTestLock,
  isSpeedTestRunning,
} from '../lib/bandwidthEstimator';

describe('Bandwidth Speed Estimator', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    _resetSpeedTestLock();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    _resetSpeedTestLock();
  });

  describe('Constants and Helpers', () => {
    it('defines expected probe size as exactly 5 MiB (5,242,880 bytes)', () => {
      expect(EXPECTED_PROBE_SIZE_BYTES).toBe(5 * 1024 * 1024);
      expect(EXPECTED_PROBE_SIZE_BYTES).toBe(5242880);
    });

    it('defines minimum realistic duration threshold', () => {
      expect(MIN_REALISTIC_DURATION_MS).toBeGreaterThan(0);
    });

    it('reports whether a test is currently running', () => {
      expect(isSpeedTestRunning()).toBe(false);
    });
  });

  describe('getSpeedRecommendation()', () => {
    it('returns poor recommendation for < 1 Mbps', () => {
      expect(getSpeedRecommendation(0.5)).toBe(SPEED_RECOMMENDATIONS.POOR);
      expect(getSpeedRecommendation(0.99)).toBe(SPEED_RECOMMENDATIONS.POOR);
    });

    it('returns fair recommendation for 1 - 5 Mbps', () => {
      expect(getSpeedRecommendation(1.0)).toBe(SPEED_RECOMMENDATIONS.FAIR);
      expect(getSpeedRecommendation(3.2)).toBe(SPEED_RECOMMENDATIONS.FAIR);
      expect(getSpeedRecommendation(4.99)).toBe(SPEED_RECOMMENDATIONS.FAIR);
    });

    it('returns good recommendation for 5 - 25 Mbps', () => {
      expect(getSpeedRecommendation(5.0)).toBe(SPEED_RECOMMENDATIONS.GOOD);
      expect(getSpeedRecommendation(15.4)).toBe(SPEED_RECOMMENDATIONS.GOOD);
      expect(getSpeedRecommendation(24.99)).toBe(SPEED_RECOMMENDATIONS.GOOD);
    });

    it('returns excellent recommendation for >= 25 Mbps', () => {
      expect(getSpeedRecommendation(25.0)).toBe(SPEED_RECOMMENDATIONS.EXCELLENT);
      expect(getSpeedRecommendation(100.0)).toBe(SPEED_RECOMMENDATIONS.EXCELLENT);
    });
  });

  describe('runSpeedTest()', () => {
    it('handles immediately cancelled signal', async () => {
      const controller = new AbortController();
      controller.abort();

      const result = await runSpeedTest({ signal: controller.signal });
      expect(result.status).toBe('cancelled');
      expect(result.speedMbps).toBe(0);
      expect(isSpeedTestRunning()).toBe(false);
    });

    it('successfully computes download throughput for full 5,242,880 bytes', async () => {
      const mockData = new Uint8Array(EXPECTED_PROBE_SIZE_BYTES);

      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': String(EXPECTED_PROBE_SIZE_BYTES) }),
          arrayBuffer: () => Promise.resolve(mockData.buffer),
        } as unknown as Response)
      );

      let reportedProgress = 0;
      let reportedBytes = 0;

      const result = await runSpeedTest({
        probeUrl: '/probe.bin',
        onProgress: (pct, bytes) => {
          reportedProgress = pct;
          reportedBytes = bytes;
        },
      });

      expect(result.status).toBe('complete');
      expect(result.speedMbps).toBeGreaterThan(0);
      expect(result.bytesLoaded).toBe(EXPECTED_PROBE_SIZE_BYTES);
      expect(result.recommendation).toBeTruthy();
      expect(reportedProgress).toBe(100);
      expect(reportedBytes).toBe(EXPECTED_PROBE_SIZE_BYTES);
      expect(isSpeedTestRunning()).toBe(false);
    });

    it('successfully completes when Content-Length header is missing but full 5,242,880 bytes arrive', async () => {
      const mockData = new Uint8Array(EXPECTED_PROBE_SIZE_BYTES);

      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers(), // No content-length header
          arrayBuffer: () => Promise.resolve(mockData.buffer),
        } as unknown as Response)
      );

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('complete');
      expect(result.bytesLoaded).toBe(EXPECTED_PROBE_SIZE_BYTES);
      expect(result.speedMbps).toBeGreaterThan(0);
    });

    it('rejects incomplete arrayBuffer response with fewer bytes than expected', async () => {
      // Only 10,000 bytes instead of 5,242,880
      const truncatedData = new Uint8Array(10_000);

      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers(),
          arrayBuffer: () => Promise.resolve(truncatedData.buffer),
        } as unknown as Response)
      );

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toContain('Incomplete or truncated download');
      expect(result.errorMessage).toContain('10000 bytes');
      expect(result.errorMessage).toContain('5242880 bytes');
    });

    it('rejects truncated ReadableStream download that ends prematurely', async () => {
      // Simulate stream that yields 1,000,000 bytes then closes
      const chunk = new Uint8Array(1_000_000);
      let chunkSent = false;

      const mockReader = {
        read: vi.fn().mockImplementation(() => {
          if (!chunkSent) {
            chunkSent = true;
            return Promise.resolve({ done: false, value: chunk });
          }
          return Promise.resolve({ done: true, value: undefined });
        }),
        releaseLock: vi.fn(),
        cancel: vi.fn(),
      };

      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': String(EXPECTED_PROBE_SIZE_BYTES) }),
          body: {
            getReader: () => mockReader,
          },
        } as unknown as Response)
      );

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toContain('Incomplete or truncated download');
      expect(result.errorMessage).toContain('1000000 bytes');
    });

    it('rejects inconsistent Content-Length header smaller than expected', async () => {
      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': '1048576' }), // 1 MiB declared
          arrayBuffer: () => Promise.resolve(new Uint8Array(1048576).buffer),
        } as unknown as Response)
      );

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toContain('Inconsistent Content-Length header');
    });

    it('rejects non-numeric or invalid Content-Length header', async () => {
      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': 'invalid-size' }),
          arrayBuffer: () => Promise.resolve(new Uint8Array(EXPECTED_PROBE_SIZE_BYTES).buffer),
        } as unknown as Response)
      );

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toContain('Inconsistent Content-Length header');
    });

    it('rejects inconsistent Content-Length header larger than expected', async () => {
      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': '10485760' }), // 10 MiB declared
          arrayBuffer: () => Promise.resolve(new Uint8Array(10485760).buffer),
        } as unknown as Response)
      );

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toContain('Inconsistent Content-Length header');
    });

    it('prevents concurrent speed tests and releases lock when completed', async () => {
      let resolveFirstFetch!: (val: unknown) => void;
      const firstFetchPromise = new Promise((res) => {
        resolveFirstFetch = res;
      });

      globalThis.fetch = vi.fn().mockImplementation(() => firstFetchPromise);

      // Start first test (pending)
      const firstTestPromise = runSpeedTest({ probeUrl: '/probe.bin' });
      expect(isSpeedTestRunning()).toBe(true);

      // Attempt second concurrent test immediately
      const secondResult = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(secondResult.status).toBe('error');
      expect(secondResult.errorMessage).toBe('Concurrent speed tests are not permitted.');
      expect(secondResult.speedMbps).toBe(0);

      // Resolve first test
      const mockData = new Uint8Array(EXPECTED_PROBE_SIZE_BYTES);
      resolveFirstFetch({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-length': String(EXPECTED_PROBE_SIZE_BYTES) }),
        arrayBuffer: () => Promise.resolve(mockData.buffer),
      });

      const firstResult = await firstTestPromise;
      expect(firstResult.status).toBe('complete');
      expect(isSpeedTestRunning()).toBe(false);

      // Subsequent test can now run without conflict
      const thirdResult = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(thirdResult.status).toBe('complete');
    });

    it('handles HTTP errors (e.g. 404 or 500)', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as unknown as Response);

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toContain('404');
      expect(isSpeedTestRunning()).toBe(false);
    });

    it('handles network failure (e.g. offline / connection refused)', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toContain('Failed to fetch');
      expect(isSpeedTestRunning()).toBe(false);
    });

    it('handles timeout when probe takes longer than timeoutMs', async () => {
      globalThis.fetch = vi.fn().mockImplementation((_url, init) => {
        return new Promise((_, reject) => {
          init?.signal?.addEventListener('abort', () => {
            const err = new DOMException('The user aborted a request.', 'AbortError');
            reject(err);
          });
        });
      });

      const result = await runSpeedTest({
        probeUrl: '/probe.bin',
        timeoutMs: 50,
      });

      expect(result.status).toBe('error');
      expect(result.speedMbps).toBe(0);
      expect(result.errorMessage).toBe('Speed test timed out.');
      expect(isSpeedTestRunning()).toBe(false);
    });

    it('handles external cancellation during active fetch', async () => {
      const controller = new AbortController();

      globalThis.fetch = vi.fn().mockImplementation((_url, init) => {
        return new Promise((_, reject) => {
          init?.signal?.addEventListener('abort', () => {
            const err = new DOMException('The user aborted a request.', 'AbortError');
            reject(err);
          });
        });
      });

      const testPromise = runSpeedTest({
        probeUrl: '/probe.bin',
        signal: controller.signal,
        timeoutMs: 5000,
      });

      setTimeout(() => {
        controller.abort();
      }, 20);

      const result = await testPromise;
      expect(result.status).toBe('cancelled');
      expect(result.speedMbps).toBe(0);
      expect(isSpeedTestRunning()).toBe(false);
    });

    it('handles cancellation mid-stream during ReadableStream reading', async () => {
      const controller = new AbortController();
      let readCount = 0;

      const mockReader = {
        read: vi.fn().mockImplementation(() => {
          readCount++;
          if (readCount === 1) {
            controller.abort();
            return Promise.resolve({ done: false, value: new Uint8Array(1_000_000) });
          }
          return Promise.resolve({ done: true, value: undefined });
        }),
        releaseLock: vi.fn(),
        cancel: vi.fn().mockResolvedValue(undefined),
      };

      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': String(EXPECTED_PROBE_SIZE_BYTES) }),
          body: {
            getReader: () => mockReader,
          },
        } as unknown as Response)
      );

      const result = await runSpeedTest({
        probeUrl: '/probe.bin',
        signal: controller.signal,
      });

      expect(result.status).toBe('cancelled');
      expect(result.speedMbps).toBe(0);
      expect(isSpeedTestRunning()).toBe(false);
    });

    it('clamps duration to minDurationMs to prevent unrealistic speed measurements on near-zero elapsed time', async () => {
      const mockData = new Uint8Array(EXPECTED_PROBE_SIZE_BYTES);

      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': String(EXPECTED_PROBE_SIZE_BYTES) }),
          arrayBuffer: () => Promise.resolve(mockData.buffer),
        } as unknown as Response)
      );

      // Force minDurationMs to 50ms
      const result = await runSpeedTest({
        probeUrl: '/probe.bin',
        minDurationMs: 50,
      });

      expect(result.status).toBe('complete');
      // Maximum theoretical speed with 50ms duration: (5242880 * 8) / (0.05 * 1000000) = 838.86 Mbps
      expect(result.speedMbps).toBeLessThanOrEqual(838.86);
      expect(result.speedMbps).toBeGreaterThan(0);
    });
  });
});
