import { describe, it, expect } from 'vitest';
import { updateProject, toSummary, Project } from './utility_types';

describe('utility_types', () => {
  it('updateProject', () => {
    const p: Project = {
      id: '1',
      name: 'Old',
      status: 'DRAFT',
      description: 'x'
    };
    const next = updateProject(p, { name: 'New', status: 'READY' });
    expect(next).toEqual({
      id: '1',
      name: 'New',
      status: 'READY',
      description: 'x'
    });
    expect(p.name).toBe('Old');
  });

  it('toSummary', () => {
    const p: Project = { id: '1', name: 'A', status: 'TRAINING', description: 'd' };
    expect(toSummary(p)).toEqual({ id: '1', name: 'A', status: 'TRAINING' });
  });
});
