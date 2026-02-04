import { describe, it, expect } from 'vitest';
import { createProject, renameProject, Project } from './objects';

describe('objects', () => {
  it('createProject uses defaults', () => {
    const p = createProject({ id: '1', name: 'Cold Plate' });
    expect(p).toEqual({
      id: '1',
      name: 'Cold Plate',
      templateId: 'CFD-CHT',
      description: ''
    });
  });

  it('renameProject does not mutate original', () => {
    const original: Project = {
      id: '1',
      name: 'Old',
      templateId: 'MAG',
      description: 'test'
    };
    const updated = renameProject(original, 'New');
    expect(updated.name).toBe('New');
    expect(original.name).toBe('Old');
  });
});
