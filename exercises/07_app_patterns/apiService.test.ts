import { describe, it, expect } from 'vitest';
import { createApiService, FetchFn } from './apiService';

describe('apiService', () => {
  it('preprocessInit posts with api key', async () => {
    let captured: { url?: string; init?: RequestInit } = {};
    const fetchFn: FetchFn = async (url, init) => {
      captured = { url, init };
      return {
        ok: true,
        status: 200,
        json: async () => ({
          session_uuid: 's1',
          upload_urls: { 'data.zip': 'u1', 'datapipe_config.yaml': 'u2' }
        })
      };
    };

    const api = createApiService({ baseUrl: 'https://api.test', apiKey: 'key-123', fetchFn });
    const result = await api.preprocessInit('s1');

    expect(result.session_uuid).toBe('s1');
    expect(captured.url).toBe('https://api.test/job/preprocess/init');
    expect(captured.init?.method).toBe('POST');
    expect(captured.init?.body).toBe(JSON.stringify({ session_uuid: 's1' }));
    const headers = captured.init?.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['X-Api-Key']).toBe('key-123');
  });

  it('throws on non-ok', async () => {
    const fetchFn: FetchFn = async () => ({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Bad' })
    });

    const api = createApiService({ baseUrl: 'x', fetchFn });
    await expect(api.preprocessInit('s1')).rejects.toThrow('Bad');
  });
});
