import { describe, it, expect } from 'vitest';
import { hello } from './hello';

describe('hello', () => {
  it('greets by name', () => {
    expect(hello('Ada')).toBe('Hello, Ada!');
    expect(hello('Linus')).toBe('Hello, Linus!');
  });
});
