import { describe, it, expect, vi } from 'vitest';
import { pollJobStatus, JobState } from './pollJobStatus';

describe('pollJobStatus', () => {
  it('returns COMPLETED', async () => {
    vi.useFakeTimers();
    const states: JobState[] = ['PENDING', 'RUNNING', 'COMPLETED'];
    const getStatus = vi.fn(async () => states.shift() || 'COMPLETED');

    const p = pollJobStatus(getStatus, { intervalMs: 100, maxAttempts: 5 });

    await Promise.resolve();
    vi.advanceTimersByTime(100);
    await Promise.resolve();
    vi.advanceTimersByTime(100);
    await Promise.resolve();

    const result = await p;
    expect(result).toBe('COMPLETED');
    expect(getStatus).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });

  it('returns TIMEOUT', async () => {
    vi.useFakeTimers();
    const getStatus = vi.fn(async () => 'RUNNING' as JobState);
    const p = pollJobStatus(getStatus, { intervalMs: 50, maxAttempts: 2 });

    await Promise.resolve();
    vi.advanceTimersByTime(50);
    await Promise.resolve();
    vi.advanceTimersByTime(50);
    await Promise.resolve();

    const result = await p;
    expect(result).toBe('TIMEOUT');
    vi.useRealTimers();
  });
});
