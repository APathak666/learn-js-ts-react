import { describe, it, expect, vi } from 'vitest';
import { pollUntil } from './polling';

describe('polling', () => {
  it('resolves when predicate passes', async () => {
    vi.useFakeTimers();
    let count = 0;
    const fn = async () => ++count;

    const p = pollUntil(fn, (n) => n >= 3, { intervalMs: 100, maxAttempts: 5 });

    // attempt 1 immediately
    await Promise.resolve();
    vi.advanceTimersByTime(100); // attempt 2
    await Promise.resolve();
    vi.advanceTimersByTime(100); // attempt 3
    await Promise.resolve();

    const result = await p;
    expect(result.status).toBe('SUCCESS');
    if (result.status === 'SUCCESS') {
      expect(result.value).toBe(3);
    }

    vi.useRealTimers();
  });

  it('times out', async () => {
    vi.useFakeTimers();
    const fn = async () => 1;

    const p = pollUntil(fn, (n) => n > 10, { intervalMs: 50, maxAttempts: 2 });
    await Promise.resolve();
    vi.advanceTimersByTime(50);
    await Promise.resolve();
    vi.advanceTimersByTime(50);
    await Promise.resolve();

    const result = await p;
    expect(result.status).toBe('TIMEOUT');
    vi.useRealTimers();
  });
});
