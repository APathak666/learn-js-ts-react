# 02_js_async — Asynchronous JavaScript (Real Concepts)

This chapter is about how JavaScript actually handles time, I/O, and concurrency. It’s the core of modern JS and the backbone of frontend development (API calls, polling, file uploads, timers, and UI updates).

If you understand this README, you’ll have the conceptual foundation needed to solve the exercises and reason about real app behavior.

## Mental Model: The Event Loop

JavaScript in the browser runs on a single thread. It can *start* async work (like network requests or timers), but it does not block while waiting. Instead:

1. **Call Stack** runs your current synchronous code.
2. When async work finishes, its callback is queued.
3. The **Event Loop** pulls queued callbacks onto the stack when it’s free.

There are *two* important queues:

- **Task (macrotask) queue**: `setTimeout`, `setInterval`, UI events, network callbacks.
- **Microtask queue**: Promise callbacks (`.then`, `catch`, `finally`) and `queueMicrotask`.

**Rule of thumb:** Microtasks run *before* the next task, once the current stack is empty.

## Promises: The Core Abstraction

A Promise represents a value you will have later.

```ts
const p = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

p.then(value => {
  console.log(value); // "done" after 1s
});
```

Promise states:

- **pending** → not finished
- **fulfilled** → finished successfully (has value)
- **rejected** → finished with error (has reason)

## async/await: Cleaner Syntax

`async/await` is just syntax over Promises. It lets you write async code that *looks* synchronous.

```ts
async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

Key points:

- `await` **pauses** inside the async function, not the whole program.
- If the awaited Promise rejects, it throws.
- You handle errors with `try/catch`.

## Error Handling (Critical)

Every async boundary can fail: network, timeouts, invalid JSON, server errors.

```ts
async function safeCall() {
  try {
    const data = await fetchJson('/status');
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
```

**Important:** If you don’t handle rejection, you get unhandled promise rejections that are painful to debug.

## Concurrency vs. Parallelism

- **Concurrency:** start multiple async tasks without waiting for each one to finish first.
- **Parallelism:** actually running in parallel (the browser or server handles this).

In JS you *start* tasks concurrently:

```ts
const a = fetch('/a');
const b = fetch('/b');
const [ra, rb] = await Promise.all([a, b]);
```

Patterns you should know:

- `Promise.all` → wait for all, fail if any fail.
- `Promise.allSettled` → wait for all, never throws.
- `Promise.race` → whichever finishes first.

## Timeouts

Real apps need to fail fast if something hangs.

```ts
function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}
```

This is used when you *must not* wait forever for a slow backend.

## Polling (Used In Godela)

Polling means repeatedly checking until some condition is met. The app does this for job status.

```ts
async function pollUntil(fn, predicate, { intervalMs, maxAttempts }) {
  for (let i = 0; i < maxAttempts; i++) {
    const value = await fn();
    if (predicate(value)) return { status: 'SUCCESS', value };
    await delay(intervalMs);
  }
  return { status: 'TIMEOUT' };
}
```

Why it matters:

- The backend returns “PENDING/RUNNING” first.
- The frontend keeps checking until “COMPLETED/FAILED.”

## Practical Pitfalls (Learn These Now)

- **Forgetting `await`**: leads to returning a Promise instead of a value.
- **Unhandled rejections**: wrap await in `try/catch` when needed.
- **Race conditions**: results arriving out of order; use sequence ids or cancellations.
- **Leaky timers**: always clean up intervals/timeouts in UI components.

## How This Maps to the Exercises

- `promises.ts`: build `delay` and `withTimeout`.
- `async_await.ts`: write a typed `fetchJson` with error handling.
- `error_handling.ts`: handle invalid JSON safely.
- `polling.ts`: implement a reliable polling loop.
