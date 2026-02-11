export interface FetchResponse<T = any> {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
}

export type FetchFn = (url: string, init?: RequestInit) => Promise<FetchResponse>;

// TODO: implement a generic typed fetch wrapper.
// - Call fetchFn with url and init.
// - If response is not ok, throw an Error with message "HTTP <status>".
// - Otherwise parse and return the JSON body, typed as T.
export async function typedFetch<T>(
  fetchFn: FetchFn,
  url: string,
  init?: RequestInit
): Promise<T> {
  return {} as T;
}
