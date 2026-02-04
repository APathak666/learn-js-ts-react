import { describe, it, expect, vi } from 'vitest';
import { delay, withTimeout } from './promises';

describe('promises', () => {
  it('delay resolves after time', async () => {
    vi.useFakeTimers();
    const done = vi.fn();
    delay(100).then(done);
    expect(done).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    await Promise.resolve();
    expect(done).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('withTimeout rejects after ms', async () => {
    vi.useFakeTimers();
    const slow = new Promise<string>((resolve) => setTimeout(() => resolve('ok'), 200));
    const p = withTimeout(slow, 50);
    vi.advanceTimersByTime(50);
    await expect(p).rejects.toThrow('Timeout');
    vi.useRealTimers();
  });

  it('withTimeout resolves when fast enough', async () => {
    vi.useFakeTimers();
    const fast = new Promise<string>((resolve) => setTimeout(() => resolve('ok'), 50));
    const p = withTimeout(fast, 200);
    vi.advanceTimersByTime(50);
    await expect(p).resolves.toBe('ok');
    vi.useRealTimers();
  });
});
