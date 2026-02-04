import { describe, it, expect } from 'vitest';
import { safeJsonParse } from './error_handling';

describe('error_handling', () => {
  it('parses valid JSON', () => {
    const result = safeJsonParse('{"a":1}');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ a: 1 });
    }
  });

  it('returns error on invalid JSON', () => {
    const result = safeJsonParse('{"a":');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});
