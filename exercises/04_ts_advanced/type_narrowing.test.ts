import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './type_narrowing';

describe('type_narrowing', () => {
  it('handles Error', () => {
    expect(getErrorMessage(new Error('fail'))).toBe('fail');
  });

  it('handles string', () => {
    expect(getErrorMessage('boom')).toBe('boom');
  });

  it('handles other types', () => {
    expect(getErrorMessage(123)).toBe('Unknown error');
  });
});
