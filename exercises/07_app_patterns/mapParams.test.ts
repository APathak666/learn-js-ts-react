import { describe, it, expect } from 'vitest';
import { mapStructure, ParameterType } from './mapParams';

describe('mapParams', () => {
  it('maps parameters and targets', () => {
    const result = mapStructure({
      suggestedParameters: [
        { name: 'Fin Gap', type: 'GEOMETRY', description: 'gap', min: 0.2, max: 0.4, unit: 'mm' },
        { name: 'Flow Rate', type: 'BOUNDARY_CONDITION', description: 'flow', value: 1.65, unit: 'LPM' }
      ],
      suggestedTargets: [
        { name: 'Pressure', type: 'OUTPUT_SCALAR', description: 'out', unit: 'Pa' }
      ]
    });

    expect(result.inputs.length).toBe(2);
    expect(result.inputs[0].type).toBe(ParameterType.GEOMETRY);
    expect(result.inputs[0].nominal).toBe(0.3);
    expect(result.inputs[0].isFixed).toBe(false);
    expect(result.inputs[1].isFixed).toBe(true);

    expect(result.targets.length).toBe(1);
    expect(result.targets[0].type).toBe(ParameterType.OUTPUT_SCALAR);
  });
});
