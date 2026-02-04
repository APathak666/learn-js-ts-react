import { describe, it, expect } from 'vitest';
import { addFile, removeFile, ProjectWithFiles } from './immutability';

describe('immutability', () => {
  it('addFile does not mutate', () => {
    const p: ProjectWithFiles = { id: '1', files: ['a.zip'] };
    const next = addFile(p, 'b.zip');
    expect(next.files).toEqual(['a.zip', 'b.zip']);
    expect(p.files).toEqual(['a.zip']);
  });

  it('removeFile does not mutate', () => {
    const p: ProjectWithFiles = { id: '1', files: ['a.zip', 'b.zip'] };
    const next = removeFile(p, 'a.zip');
    expect(next.files).toEqual(['b.zip']);
    expect(p.files).toEqual(['a.zip', 'b.zip']);
  });
});
