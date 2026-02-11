import { describe, it, expect } from 'vitest';
import { validateFiles } from './FileValidator';

function makeFile(name: string, sizeMB: number): File {
  const bytes = sizeMB * 1024 * 1024;
  return new File([new ArrayBuffer(bytes)], name);
}

describe('FileValidator', () => {
  const constraints = { maxSizeMB: 10, allowedExtensions: ['.zip', '.csv'] };

  it('accepts valid files', () => {
    const files = [makeFile('data.zip', 5), makeFile('table.csv', 2)];
    const result = validateFiles(files, constraints);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('rejects oversized files', () => {
    const files = [makeFile('big.zip', 20)];
    const result = validateFiles(files, constraints);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('big.zip');
    expect(result.errors[0]).toContain('10MB');
  });

  it('rejects invalid extensions', () => {
    const files = [makeFile('image.png', 1)];
    const result = validateFiles(files, constraints);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('image.png');
    expect(result.errors[0]).toContain('extension');
  });

  it('collects multiple errors', () => {
    const files = [makeFile('big.png', 20)];
    const result = validateFiles(files, constraints);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(2);
  });
});
