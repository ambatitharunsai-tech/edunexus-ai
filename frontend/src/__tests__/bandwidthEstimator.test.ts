import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  runSpeedTest,
  getSpeedRecommendation,
  SPEED_RECOMMENDATIONS,
} from '../lib/bandwidthEstimator';

describe('Bandwidth Speed Estimator', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    });

    it('successfully computes download throughput', async () => {
      // Create a 5 MiB (5,242,880 bytes) mock buffer
      const mockData = new Uint8Array(5 * 1024 * 1024);

      globalThis.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-length': String(mockData.byteLength) }),
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
      expect(result.bytesLoaded).toBe(5 * 1024 * 1024);
      expect(result.recommendation).toBeTruthy();
      expect(reportedProgress).toBe(100);
      expect(reportedBytes).toBe(5 * 1024 * 1024);
    });

    it('handles HTTP errors (e.g. 404 or 500)', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as unknown as Response);

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.errorMessage).toContain('404');
    });

    it('handles network failure', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

      const result = await runSpeedTest({ probeUrl: '/probe.bin' });
      expect(result.status).toBe('error');
      expect(result.errorMessage).toContain('Failed to fetch');
    });

    it('handles timeout when probe takes longer than timeoutMs', async () => {
      // Mock fetch that hangs until aborted
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
      expect(result.errorMessage).toBe('Speed test timed out.');
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

      // Abort externally after a small delay
      setTimeout(() => {
        controller.abort();
      }, 20);

      const result = await testPromise;
      expect(result.status).toBe('cancelled');
    });
  });
});
