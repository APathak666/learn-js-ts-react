import { describe, it, expect } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('sums numbers', () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([])).toBe(0);
    expect(sum([10, -2, 5])).toBe(13);
  });
});
