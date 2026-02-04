import { describe, it, expect } from 'vitest';
import { getById, groupBy } from './generics';

describe('generics', () => {
  it('getById', () => {
    const items = [{ id: 'a', v: 1 }, { id: 'b', v: 2 }];
    expect(getById(items, 'b')?.v).toBe(2);
    expect(getById(items, 'c')).toBeUndefined();
  });

  it('groupBy', () => {
    const items = [
      { id: '1', type: 'A' },
      { id: '2', type: 'B' },
      { id: '3', type: 'A' }
    ];
    const grouped = groupBy(items, (i) => i.type);
    expect(grouped.A.length).toBe(2);
    expect(grouped.B.length).toBe(1);
  });
});
