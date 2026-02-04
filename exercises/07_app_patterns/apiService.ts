export interface FetchResponse<T = any> {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
}

export type FetchFn = (url: string, init?: RequestInit) => Promise<FetchResponse>;

export interface PreprocessInitResponse {
  session_uuid: string;
  upload_urls: {
    'data.zip': string;
    'datapipe_config.yaml': string;
  };
}

export interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  fetchFn: FetchFn;
}

// TODO: implement createApiService with preprocessInit.
export function createApiService(config: ApiConfig) {
  const fetchWithAuth = async (url: string, init: RequestInit = {}): Promise<FetchResponse> => {
    return config.fetchFn(url, init);
  };

  const preprocessInit = async (sessionUuid: string): Promise<PreprocessInitResponse> => {
    return {
      session_uuid: sessionUuid,
      upload_urls: { 'data.zip': '', 'datapipe_config.yaml': '' }
    };
  };

  return { preprocessInit };
}
