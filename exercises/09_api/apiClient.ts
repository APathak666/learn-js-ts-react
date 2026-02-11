export interface FetchResponse<T = any> {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
}

export type FetchFn = (url: string, init?: RequestInit) => Promise<FetchResponse>;

export interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
  fetchFn: FetchFn;
}

export interface Item {
  id: string;
  name: string;
}

// TODO: implement createApiClient.
// It should return an object with:
//   getItems(): GET <baseUrl>/items → Item[]
//   createItem(name: string): POST <baseUrl>/items with body { name } → Item
//
// Every request must include:
//   - Content-Type: application/json
//   - X-Api-Key: <apiKey> (if apiKey is provided)
//
// On non-ok response, throw an Error with the response's error message
// (parse JSON body, use .error or .message field, fallback to "Request failed").
export function createApiClient(config: ApiClientConfig) {
  const getItems = async (): Promise<Item[]> => {
    return [];
  };

  const createItem = async (name: string): Promise<Item> => {
    return { id: '', name: '' };
  };

  return { getItems, createItem };
}
