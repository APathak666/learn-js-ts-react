import { describe, it, expect } from 'vitest';
import { buildProjectId, nextVersion } from './variables';

describe('variables', () => {
  it('buildProjectId', () => {
    expect(buildProjectId('Cold Plate', 3)).toBe('project-3-cold-plate');
    expect(buildProjectId('Magnet Array', 1)).toBe('project-1-magnet-array');
  });

  it('nextVersion', () => {
    expect(nextVersion(1)).toBe(2);
    expect(nextVersion(10)).toBe(11);
  });
});
