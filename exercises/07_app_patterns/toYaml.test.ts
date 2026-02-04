import { describe, it, expect } from 'vitest';
import { toYaml } from './toYaml';

describe('toYaml', () => {
  it('serializes nested objects and arrays', () => {
    const input = {
      training: { num_epochs: 10, batch_size: 5 },
      model: { hidden_dim: 256 },
      tags: ['a', 'b']
    };

    const yaml = toYaml(input).trim();
    expect(yaml).toBe([
      'training:',
      '  num_epochs: 10',
      '  batch_size: 5',
      'model:',
      '  hidden_dim: 256',
      'tags:',
      '  - a',
      '  - b'
    ].join('\n'));
  });

  it('skips null/undefined', () => {
    const yaml = toYaml({ a: null, b: undefined, c: 1 }).trim();
    expect(yaml).toBe('c: 1');
  });
});
