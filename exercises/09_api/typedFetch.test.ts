import { describe, it, expect } from 'vitest';
import { typedFetch, FetchFn } from './typedFetch';

describe('typedFetch', () => {
  it('returns parsed JSON on success', async () => {
    const fetchFn: FetchFn = async () => ({
      ok: true,
      status: 200,
      json: async () => ({ id: '1', name: 'Test' }),
    });

    const data = await typedFetch<{ id: string; name: string }>(fetchFn, '/test');
    expect(data).toEqual({ id: '1', name: 'Test' });
  });

  it('throws on non-ok response', async () => {
    const fetchFn: FetchFn = async () => ({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    await expect(typedFetch(fetchFn, '/missing')).rejects.toThrow('HTTP 404');
  });

  it('passes init options through', async () => {
    let captured: RequestInit | undefined;
    const fetchFn: FetchFn = async (_url, init) => {
      captured = init;
      return { ok: true, status: 200, json: async () => ({}) };
    };

    await typedFetch(fetchFn, '/test', { method: 'POST', body: '{}' });
    expect(captured?.method).toBe('POST');
    expect(captured?.body).toBe('{}');
  });
});
