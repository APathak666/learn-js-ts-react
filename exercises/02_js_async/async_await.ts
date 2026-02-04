export interface FetchResponse<T = any> {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
}

export type FetchFn = (url: string, init?: RequestInit) => Promise<FetchResponse>;

// TODO: use fetchFn to GET JSON. Throw on non-ok with message "HTTP <status>".
export async function fetchJson<T>(fetchFn: FetchFn, url: string): Promise<T> {
  return {} as T;
}
