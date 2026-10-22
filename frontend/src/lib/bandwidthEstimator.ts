// EduNexus AI — Bandwidth Speed Estimator (Client-Side)
// Measures download throughput using a same-origin static binary probe asset.
// No data is collected, logged, or sent to external services.

export const EXPECTED_PROBE_SIZE_BYTES = 5_242_880; // Exactly 5 MiB (5 * 1024 * 1024 bytes)
export const MIN_REALISTIC_DURATION_MS = 20; // Guard against sub-millisecond divisions & unrealistic speeds

export interface SpeedTestResult {
  speedMbps: number;
  latencyMs: number;
  status: 'idle' | 'running' | 'complete' | 'error' | 'cancelled';
  recommendation: string;
  errorMessage?: string;
  bytesLoaded?: number;
  durationMs?: number;
}

export interface SpeedTestOptions {
  probeUrl?: string;
  signal?: AbortSignal;
  timeoutMs?: number;
  minDurationMs?: number;
  onProgress?: (progress: number, bytesLoaded: number) => void;
}

export const SPEED_RECOMMENDATIONS = {
  POOR: 'Low bandwidth (< 1 Mbps). EduNexus AI may load slowly. Consider using a wired connection or enabling compact navigation in settings.',
  FAIR: 'Moderate bandwidth (1–5 Mbps). Adequate for viewing dashboards and student profiles. Complex chart rendering may experience brief pauses.',
  GOOD: 'Good bandwidth (5–25 Mbps). Smooth experience across all dashboards, risk models, and timeline analytics.',
  EXCELLENT: 'High-speed bandwidth (25+ Mbps). Optimal performance for real-time telemetry updates and bulk CSV data operations.',
};

/**
 * Return human-readable guidance based on measured throughput in Mbps.
 */
export function getSpeedRecommendation(mbps: number): string {
  if (mbps < 1.0) {
    return SPEED_RECOMMENDATIONS.POOR;
  }
  if (mbps < 5.0) {
    return SPEED_RECOMMENDATIONS.FAIR;
  }
  if (mbps < 25.0) {
    return SPEED_RECOMMENDATIONS.GOOD;
  }
  return SPEED_RECOMMENDATIONS.EXCELLENT;
}

// Module-level test lock to prevent concurrent speed tests
let isTestInProgress = false;

/**
 * Check if a speed test is currently in progress.
 */
export function isSpeedTestRunning(): boolean {
  return isTestInProgress;
}

/**
 * Reset test lock (primarily for test suite isolation).
 */
export function _resetSpeedTestLock(): void {
  isTestInProgress = false;
}

/**
 * Execute client-side download speed estimation.
 * Only returns status 'complete' after exactly 5,242,880 bytes have been verified.
 */
export async function runSpeedTest(options: SpeedTestOptions = {}): Promise<SpeedTestResult> {
  const {
    probeUrl = '/probe.bin',
    signal,
    timeoutMs = 15000,
    minDurationMs = MIN_REALISTIC_DURATION_MS,
    onProgress,
  } = options;

  // Prevent concurrent tests
  if (isTestInProgress) {
    return {
      speedMbps: 0,
      latencyMs: 0,
      status: 'error',
      recommendation: 'A speed test is already running. Please wait for it to complete.',
      errorMessage: 'Concurrent speed tests are not permitted.',
    };
  }

  // Check early cancellation
  if (signal?.aborted) {
    return {
      speedMbps: 0,
      latencyMs: 0,
      status: 'cancelled',
      recommendation: 'Test cancelled before execution.',
    };
  }

  isTestInProgress = true;

  // Create internal abort controller coordinating user cancellation and timeout
  const internalController = new AbortController();

  const handleExternalAbort = () => {
    internalController.abort();
  };

  if (signal) {
    signal.addEventListener('abort', handleExternalAbort, { once: true });
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let isTimedOut = false;

  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => {
      isTimedOut = true;
      internalController.abort();
    }, timeoutMs);
  }

  try {
    // Append timestamp to prevent intermediate browser/proxy caching
    const cacheBuster = probeUrl.includes('?')
      ? `&_t=${Date.now()}`
      : `?_t=${Date.now()}`;
    const targetUrl = `${probeUrl}${cacheBuster}`;

    const startTime = performance.now();
    const response = await fetch(targetUrl, {
      signal: internalController.signal,
      cache: 'no-store',
    });

    const responseReceivedTime = performance.now();
    const latencyMs = Math.round(responseReceivedTime - startTime);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText || 'Unable to download probe asset'}`);
    }

    // Validate Content-Length header if present
    const contentLengthHeader = response.headers.get('content-length');
    if (contentLengthHeader !== null && contentLengthHeader.trim() !== '') {
      const parsedLength = Number(contentLengthHeader.trim());
      if (!Number.isInteger(parsedLength) || parsedLength !== EXPECTED_PROBE_SIZE_BYTES) {
        throw new Error(
          `Inconsistent Content-Length header: expected ${EXPECTED_PROBE_SIZE_BYTES} bytes, but received "${contentLengthHeader}".`
        );
      }
    }

    let bytesLoaded = 0;

    if (response.body && typeof response.body.getReader === 'function') {
      const reader = response.body.getReader();
      try {
        while (true) {
          // Check for mid-stream cancellation
          if (signal?.aborted || internalController.signal.aborted) {
            await reader.cancel().catch(() => {});
            break;
          }

          const { done, value } = await reader.read();
          if (done) break;

          if (value) {
            bytesLoaded += value.byteLength;
            if (onProgress) {
              const progress = Math.min(100, Math.round((bytesLoaded / EXPECTED_PROBE_SIZE_BYTES) * 100));
              onProgress(progress, bytesLoaded);
            }
          }
        }
      } finally {
        reader.releaseLock?.();
      }
    } else {
      // Fallback for environments lacking ReadableStream (e.g. jsdom / older browsers)
      const buffer = await response.arrayBuffer();
      bytesLoaded = buffer.byteLength;
      if (onProgress) {
        const progress = Math.min(100, Math.round((bytesLoaded / EXPECTED_PROBE_SIZE_BYTES) * 100));
        onProgress(progress, bytesLoaded);
      }
    }

    // Cancellation check immediately after reading
    if (signal?.aborted || internalController.signal.aborted) {
      if (isTimedOut) {
        return {
          speedMbps: 0,
          latencyMs: 0,
          status: 'error',
          recommendation: 'Connection test timed out. Your network might be experiencing heavy congestion or disconnects.',
          errorMessage: 'Speed test timed out.',
        };
      }
      return {
        speedMbps: 0,
        latencyMs: 0,
        status: 'cancelled',
        recommendation: 'Speed measurement cancelled.',
      };
    }

    // Verify exact byte count received (reject incomplete/truncated downloads)
    if (bytesLoaded !== EXPECTED_PROBE_SIZE_BYTES) {
      throw new Error(
        `Incomplete or truncated download: received ${bytesLoaded} bytes, expected exactly ${EXPECTED_PROBE_SIZE_BYTES} bytes.`
      );
    }

    const endTime = performance.now();
    const rawDurationMs = endTime - startTime;
    // Guard against zero, negative, or unrealistically short durations
    const durationMs = Math.max(minDurationMs, rawDurationMs);
    const durationSeconds = durationMs / 1000;

    // Convert bytes to Megabits: (bytes * 8) / 1,000,000
    const bitsLoaded = bytesLoaded * 8;
    const speedMbps = Number(((bitsLoaded / durationSeconds) / 1_000_000).toFixed(2));

    return {
      speedMbps,
      latencyMs,
      status: 'complete',
      recommendation: getSpeedRecommendation(speedMbps),
      bytesLoaded,
      durationMs: Math.round(rawDurationMs),
    };
  } catch (error: unknown) {
    if (signal?.aborted && !isTimedOut) {
      return {
        speedMbps: 0,
        latencyMs: 0,
        status: 'cancelled',
        recommendation: 'Speed measurement cancelled.',
      };
    }

    if (isTimedOut) {
      return {
        speedMbps: 0,
        latencyMs: 0,
        status: 'error',
        recommendation: 'Connection test timed out. Your network might be experiencing heavy congestion or disconnects.',
        errorMessage: 'Speed test timed out.',
      };
    }

    const errorMsg = error instanceof Error ? error.message : 'Unknown network failure';
    return {
      speedMbps: 0,
      latencyMs: 0,
      status: 'error',
      recommendation: 'Unable to measure bandwidth due to a network connection error.',
      errorMessage: errorMsg,
    };
  } finally {
    isTestInProgress = false;
    if (timeoutId) clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', handleExternalAbort);
    }
  }
}
