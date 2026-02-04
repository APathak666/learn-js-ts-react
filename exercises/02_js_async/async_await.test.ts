import { describe, it, expect } from 'vitest';
import { fetchJson, FetchFn } from './async_await';

describe('async_await', () => {
  it('returns parsed JSON', async () => {
    const fetchFn: FetchFn = async () => ({
      ok: true,
      status: 200,
      json: async () => ({ ok: true })
    });

    const data = await fetchJson<{ ok: boolean }>(fetchFn, '/status');
    expect(data.ok).toBe(true);
  });

  it('throws on non-ok', async () => {
    const fetchFn: FetchFn = async () => ({
      ok: false,
      status: 404,
      json: async () => ({})
    });

    await expect(fetchJson(fetchFn, '/missing')).rejects.toThrow('HTTP 404');
  });
});
