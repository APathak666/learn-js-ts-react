import { describe, it, expect } from 'vitest';
import { createApiClient, FetchFn } from './apiClient';

describe('apiClient', () => {
  it('getItems calls GET /items with headers', async () => {
    let captured: { url?: string; init?: RequestInit } = {};
    const fetchFn: FetchFn = async (url, init) => {
      captured = { url, init };
      return { ok: true, status: 200, json: async () => [{ id: '1', name: 'A' }] };
    };

    const api = createApiClient({ baseUrl: 'https://api.test', apiKey: 'key-1', fetchFn });
    const items = await api.getItems();

    expect(items).toEqual([{ id: '1', name: 'A' }]);
    expect(captured.url).toBe('https://api.test/items');
    const headers = captured.init?.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['X-Api-Key']).toBe('key-1');
  });

  it('createItem sends POST with body', async () => {
    let captured: { url?: string; init?: RequestInit } = {};
    const fetchFn: FetchFn = async (url, init) => {
      captured = { url, init };
      return { ok: true, status: 201, json: async () => ({ id: '2', name: 'New' }) };
    };

    const api = createApiClient({ baseUrl: 'https://api.test', fetchFn });
    const item = await api.createItem('New');

    expect(item).toEqual({ id: '2', name: 'New' });
    expect(captured.init?.method).toBe('POST');
    expect(captured.init?.body).toBe(JSON.stringify({ name: 'New' }));
  });

  it('throws on error response', async () => {
    const fetchFn: FetchFn = async () => ({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    });

    const api = createApiClient({ baseUrl: 'x', fetchFn });
    await expect(api.getItems()).rejects.toThrow('Server error');
  });

  it('omits X-Api-Key when not configured', async () => {
    let captured: RequestInit | undefined;
    const fetchFn: FetchFn = async (_url, init) => {
      captured = init;
      return { ok: true, status: 200, json: async () => [] };
    };

    const api = createApiClient({ baseUrl: 'x', fetchFn });
    await api.getItems();

    const headers = captured?.headers as Record<string, string>;
    expect(headers['X-Api-Key']).toBeUndefined();
  });
});
