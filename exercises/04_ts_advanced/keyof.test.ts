import { describe, it, expect } from 'vitest';
import { getProp, setProp } from './keyof';

describe('keyof', () => {
  it('getProp', () => {
    const obj = { name: 'A', count: 2 };
    expect(getProp(obj, 'name')).toBe('A');
    expect(getProp(obj, 'count')).toBe(2);
  });

  it('setProp', () => {
    const obj = { name: 'A', count: 2 };
    const next = setProp(obj, 'count', 3);
    expect(next.count).toBe(3);
    expect(obj.count).toBe(2);
  });
});
