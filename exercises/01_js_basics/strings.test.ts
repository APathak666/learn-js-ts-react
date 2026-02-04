import { describe, it, expect } from 'vitest';
import { toTitleCase, formatMetricLabel } from './strings';

describe('strings', () => {
  it('toTitleCase', () => {
    expect(toTitleCase('cold plate')).toBe('Cold Plate');
    expect(toTitleCase('  heat-sink  ')).toBe('Heat-sink');
    expect(toTitleCase('')).toBe('');
  });

  it('formatMetricLabel', () => {
    expect(formatMetricLabel('Pressure', 'Pa')).toBe('Pressure (Pa)');
    expect(formatMetricLabel('Temperature')).toBe('Temperature');
  });
});
