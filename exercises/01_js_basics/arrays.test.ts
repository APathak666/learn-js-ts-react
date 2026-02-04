import { describe, it, expect } from 'vitest';
import { onlyEven, sumNumbers, unique } from './arrays';

describe('arrays', () => {
  it('onlyEven', () => {
    expect(onlyEven([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
  });

  it('sumNumbers', () => {
    expect(sumNumbers([1, 2, 3])).toBe(6);
    expect(sumNumbers([])).toBe(0);
  });

  it('unique', () => {
    expect(unique([1, 1, 2, 3, 2])).toEqual([1, 2, 3]);
    expect(unique(['a', 'a', 'b'])).toEqual(['a', 'b']);
  });
});
