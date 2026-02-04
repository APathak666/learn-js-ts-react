import { describe, it, expect } from 'vitest';
import { describeParameter } from './interfaces';

describe('interfaces', () => {
  it('describeParameter', () => {
    expect(describeParameter({
      id: '1',
      name: 'Flow Rate',
      type: 'BOUNDARY_CONDITION',
      value: 1.65,
      unit: 'LPM',
      isFixed: true
    })).toBe('Flow Rate = 1.65 LPM');

    expect(describeParameter({
      id: '2',
      name: 'Fin Gap',
      type: 'GEOMETRY',
      min: 0.2,
      max: 0.4,
      unit: 'mm'
    })).toBe('Fin Gap [0.2-0.4] mm');

    expect(describeParameter({
      id: '3',
      name: 'Pressure',
      type: 'OUTPUT_SCALAR'
    })).toBe('Pressure');
  });
});
