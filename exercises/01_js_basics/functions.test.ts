import { describe, it, expect, vi } from 'vitest';
import { createPrefixedLogger, once } from './functions';

describe('functions', () => {
  it('createPrefixedLogger', () => {
    const log = createPrefixedLogger('[API]');
    expect(log('ready')).toBe('[API] ready');
  });

  it('once', () => {
    const fn = vi.fn((x: number) => x * 2);
    const onlyOnce = once(fn);
    expect(onlyOnce(2)).toBe(4);
    expect(onlyOnce(10)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
