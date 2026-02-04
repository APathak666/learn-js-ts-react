import { describe, it, expect } from 'vitest';
import { statusLabel, isBusy } from './unions';

describe('unions', () => {
  it('statusLabel', () => {
    expect(statusLabel('DRAFT')).toBe('Draft');
    expect(statusLabel('TRAINING')).toBe('Training');
    expect(statusLabel('READY')).toBe('Ready');
  });

  it('isBusy', () => {
    expect(isBusy('TRAINING')).toBe(true);
    expect(isBusy('READY')).toBe(false);
  });
});
