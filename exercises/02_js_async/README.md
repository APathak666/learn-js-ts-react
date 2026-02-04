# 02_js_async — Asynchronous JavaScript

This chapter teaches how JavaScript handles time, I/O, and concurrency. The app relies on async work for API calls, polling, and file uploads.

## Key Concepts

- **Promises**: represent work that will finish later.
- **async/await**: cleaner syntax for waiting on promises.
- **Error handling**: `try/catch` for async workflows.
- **Timeouts**: fail fast if something takes too long.
- **Polling**: repeat an async call until a condition is met.

## Examples

### Promise Basics

```ts
const p = new Promise(resolve => {
  setTimeout(() => resolve("done"), 1000);
});
```

### async/await

```ts
async function getData() {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

### Timeout Wrapper

```ts
function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))
  ]);
}
```

### Polling

```ts
// Call fn every interval until predicate passes or attempts run out
async function pollUntil(fn, predicate, { intervalMs, maxAttempts }) {
  for (let i = 0; i < maxAttempts; i++) {
    const value = await fn();
    if (predicate(value)) return { status: "SUCCESS", value };
    await delay(intervalMs);
  }
  return { status: "TIMEOUT" };
}
```

## Why This Matters In The App

The preprocessing and training views repeatedly call backend APIs to check job status. Understanding polling, timeouts, and error handling makes these flows reliable and predictable.
