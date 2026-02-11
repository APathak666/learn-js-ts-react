# 07 — Real-World Patterns

This chapter ties everything together with patterns from production codebases: serialization, state management, API wrappers, data mapping, and polling. Each exercise is a self-contained problem that mirrors something you'd find in a real app.

## YAML Serialization

YAML is a human-readable data format used for config files. The basic rules:

```yaml
name: my-project
version: 2
training:
  epochs: 10
  batch_size: 32
tags:
  - alpha
  - beta
```

The rules to implement:
- **Primitives**: `key: value` on one line (strings are unquoted)
- **Nested objects**: indent children by 2 spaces, no value on the parent line
- **Arrays**: each element on its own line prefixed with `- `, indented under the key
- **null/undefined**: skip the entry entirely

Your function needs to handle arbitrary nesting by tracking the current indentation level. Recursion is the natural approach: when you encounter an object as a value, recurse with increased indent.

Expected output for `{ a: { b: 1 }, c: [2, 3] }`:

```
a:
  b: 1
c:
  - 2
  - 3
```

## Tab State Management

Browser-style tabs where one is active at a time. All operations must be immutable.

**Create**: Append a new tab, make it the active one. A tab has an `id`, `title`, and a `project` object (with `id` and `name`). The project ID should match the tab ID.

**Close**: Remove the tab. If the closed tab was the active one, the new active tab should be:
- The tab before it (if one exists)
- Otherwise the first remaining tab
- Otherwise `null` (no tabs left)

**Update**: Apply partial updates to the active tab. If the project's name changes, sync the tab's title to match.

Think about these as pure functions: `(currentState, action) => newState`. Never mutate the input arrays or objects.

## API Service Wrapper

A common pattern: centralize all API calls behind a service object that handles:

- **Base URL**: prepended to all paths
- **Headers**: `Content-Type: application/json` on every request, plus auth headers like `X-Api-Key` when configured
- **Error handling**: check `response.ok` and throw on failure
- **JSON parsing**: parse response body automatically

The wrapper takes a `fetchFn` (instead of calling `fetch` directly) so it's testable. The structure looks like:

```ts
function createApiService(config) {
  const fetchWithAuth = async (url, init) => {
    // build headers, prepend base URL, call config.fetchFn
  };

  const someEndpoint = async (params) => {
    const response = await fetchWithAuth("/path", { method: "POST", body: ... });
    // handle errors, parse JSON, return
  };

  return { someEndpoint };
}
```

Check the test to see the exact endpoint path, HTTP method, headers, and body format expected.

## Parameter Mapping

Raw data from an API often doesn't match the shape your UI needs. This exercise maps an `ExtractedStructure` (with `suggestedParameters` and `suggestedTargets`) into typed `SimulationParameter` arrays.

Things the mapping needs to do:
- Generate a unique `id` for each parameter (e.g. `param-0`, `param-1`, ...)
- Map the string `type` field to the `ParameterType` enum
- Compute a `nominal` value: the midpoint of `min` and `max` when both exist
- Determine `isFixed`: `true` when `value` is set (no min/max range), `false` when min/max define a range
- Carry over all other fields (`name`, `description`, `unit`, `min`, `max`, `value`)

Targets follow a similar pattern but with a different ID prefix (e.g. `target-0`).

## Polling

Same concept as chapter 02 but for job status. A job goes through states: `PENDING` -> `RUNNING` -> `COMPLETED` (or `FAILED` / `CANCELLED`).

The poll loop:
1. Call `getStatus()`
2. If the state is terminal (`COMPLETED`, `FAILED`, or `CANCELLED`), return it
3. Otherwise wait `intervalMs`, then try again
4. After `maxAttempts`, return `"TIMEOUT"`

The first check should be immediate (no initial delay).

## Exercises

| File | What to do |
|------|-----------|
| `toYaml.ts` | Recursive object-to-YAML serializer |
| `tabState.ts` | Create, close, and update tabs immutably |
| `apiService.ts` | Fetch wrapper with base URL, auth headers, and error handling |
| `mapParams.ts` | Map raw extracted parameters into typed simulation parameters |
| `pollJobStatus.ts` | Poll a job status function until terminal or timeout |

## Running

```sh
npm test -- exercises/07_app_patterns
```
