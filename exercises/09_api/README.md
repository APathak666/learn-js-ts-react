# 09 — API Communication

These exercises practice building typed API clients — the pattern used to communicate with backend servers.

## Exercises

### typedFetch.ts
Build a generic `typedFetch<T>(url, init?)` function that wraps the Fetch API. It should make the request, check if the response is OK, parse JSON, and return it typed as `T`. If the response is not OK, throw an `Error` with the status text.

**What the tests expect:**
- Returns parsed JSON typed as `T` on success.
- Throws on non-OK responses (e.g., 404).
- Passes through any `RequestInit` options (headers, method, body).

### apiClient.ts
Build a `createApiClient(baseUrl, apiKey?)` factory that returns an object with `getItems()` and `createItem(data)` methods. The client should prepend the base URL, set JSON headers, and include an `X-Api-Key` header when an API key is provided.

**What the tests expect:**
- `getItems()` sends GET to `{baseUrl}/items` with correct headers.
- `createItem(data)` sends POST with JSON body.
- Throws on error responses.
- Omits `X-Api-Key` header when no key is provided.

## Concepts (see BOOK.md Chapter 14)
- The Fetch API, `Response` object, JSON parsing
- Generics for typed responses
- Factory functions for configurable clients
- Error handling in async code
