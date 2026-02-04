import { describe, it, expect } from 'vitest';
import { PARAMETER_TYPES, isParameterType } from './const_assertions';

describe('const_assertions', () => {
  it('PARAMETER_TYPES contains expected values', () => {
    expect(PARAMETER_TYPES).toContain('GEOMETRY');
  });

  it('isParameterType', () => {
    expect(isParameterType('GEOMETRY')).toBe(true);
    expect(isParameterType('NOPE')).toBe(false);
  });
});
