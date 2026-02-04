import { describe, it, expect } from 'vitest';
import { formatBytes, makeDataset } from './types';

describe('types', () => {
  it('formatBytes', () => {
    expect(formatBytes(500)).toBe('500 B');
    expect(formatBytes(1024 * 1024)).toBe('1.0 MB');
  });

  it('makeDataset', () => {
    expect(makeDataset('Demo', 2, 1024)).toEqual({
      name: 'Demo',
      fileCount: 2,
      size: '1024 B'
    });
  });
});
