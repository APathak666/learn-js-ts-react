# 02 — Asynchronous JavaScript

## Start Here: Why Async Exists

In C, when you call `sleep(3)` or `read(fd, buf, n)`, the entire program stops and waits. Nothing else happens until that call returns. This is **blocking** I/O.

JavaScript cannot do this. It runs inside a browser, and the browser has one thread for everything: running your code, painting pixels, handling button clicks. If your JS code blocks for 3 seconds, the entire page freezes -- no scrolling, no clicking, nothing. The user thinks the tab crashed.

So JavaScript uses a completely different model: **you never wait. Instead, you say "do this later, and here's what to run when it's done."**

This is what "asynchronous" means. Not "parallel." Not "multithreaded." Just: **start something, keep going, deal with the result later.**

## Step 1: Callbacks (The Old Way)

The simplest async tool in JS is `setTimeout`. It says "run this function after N milliseconds":

```js
console.log("before");

setTimeout(() => {
  console.log("inside timeout");
}, 1000);

console.log("after");
```

Output:
```
before
after
inside timeout    ← appears 1 second later
```

**Read that carefully.** `"after"` prints BEFORE `"inside timeout"`. Why? Because `setTimeout` doesn't pause. It schedules the function for later and immediately moves on to the next line.

The function you pass to `setTimeout` is called a **callback** -- it "calls back" when the time is up.

### How This Works Internally: The Event Loop

JavaScript has a simple loop at its core:

```
1. Run all synchronous code until there's nothing left to run.
2. Check the queue: did any timer expire? Any click happen? Any network response arrive?
3. If yes, run its callback.
4. Go back to step 1.
```

That's the **event loop**. Your code runs to completion, then JS checks if anything async has finished, runs its callback, and repeats. This is why `"after"` prints before `"inside timeout"` -- step 1 (all sync code) finishes before step 2 (checking the timer).

### The Problem with Callbacks

Callbacks work, but they get ugly fast. Imagine: fetch a user, then fetch their posts, then fetch comments on the first post:

```js
fetchUser(id, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});
```

This is called **callback hell**. Each step is nested inside the previous one. Error handling makes it even worse. Promises were invented to fix this.

## Step 2: Promises

A Promise is an **object that represents a value you don't have yet**. Think of it like a ticket at a restaurant: you order food, they give you a number, you sit down and wait. The ticket isn't food -- it's a promise that food will arrive.

A Promise is always in one of three states:

```
PENDING ──→ FULFILLED (succeeded, has a value)
         └→ REJECTED  (failed, has an error)
```

Once it moves to fulfilled or rejected, it stays there forever. It never goes back to pending.

### Creating a Promise

You create a Promise with `new Promise(...)`. You give it a function, and that function receives two callbacks: `resolve` (to succeed) and `reject` (to fail):

```js
const myPromise = new Promise((resolve, reject) => {
  // This code runs immediately.
  // Call resolve(value) when you're done.
  // Call reject(error) if something went wrong.
});
```

Here's a concrete example -- a promise that resolves after 1 second:

```js
const waitOneSecond = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("done waiting");
  }, 1000);
});
```

Let's trace through what happens:
1. `new Promise(...)` runs the function immediately.
2. Inside, `setTimeout` schedules `resolve("done waiting")` for 1 second from now.
3. `new Promise(...)` returns the Promise object. It's in the PENDING state.
4. 1 second later, the event loop runs the timeout callback.
5. `resolve("done waiting")` fires. The Promise moves to FULFILLED with value `"done waiting"`.

The key insight: **the Promise constructor wires together "start async work" and "signal when it's done" in one place.**

### Reacting to a Promise: `.then` and `.catch`

You don't read a Promise's value directly. You attach callbacks:

```js
waitOneSecond.then((value) => {
  console.log(value);  // "done waiting" -- runs after 1 second
});
```

`.then(fn)` says "when this promise fulfills, call `fn` with the value."

`.catch(fn)` says "when this promise rejects, call `fn` with the error."

```js
const risky = new Promise((resolve, reject) => {
  reject(new Error("something broke"));
});

risky.catch((err) => {
  console.log(err.message);  // "something broke"
});
```

### Chaining

`.then` returns a **new** Promise. This lets you chain steps without nesting:

```js
fetchUser(id)
  .then((user) => fetchPosts(user.id))     // returns a new Promise
  .then((posts) => fetchComments(posts[0].id))  // returns another
  .then((comments) => console.log(comments))
  .catch((err) => console.error(err));  // catches errors from ANY step
```

Compare this to the callback hell version. Same logic, flat and readable.

### `Promise.race` -- First One Wins

`Promise.race` takes an array of Promises and returns a new Promise that settles as soon as **any one** of them settles:

```js
const a = new Promise((resolve) => setTimeout(() => resolve("a"), 100));
const b = new Promise((resolve) => setTimeout(() => resolve("b"), 500));

Promise.race([a, b]).then((winner) => {
  console.log(winner);  // "a" -- because it resolved first (100ms < 500ms)
});
```

If the first to settle is a rejection, the race rejects. This is the key building block for timeouts -- race the real work against a timer.

### `Promise.all` -- Wait for Everyone

`Promise.all` takes an array and waits for ALL to fulfill:

```js
Promise.all([
  fetchUser(),    // starts immediately
  fetchPosts(),   // starts immediately (not waiting for fetchUser)
]).then(([user, posts]) => {
  // both done
});
```

If any one rejects, the whole thing rejects immediately.

## Step 3: `async`/`await`

Promises are better than callbacks, but chaining `.then` still reads inside-out. `async`/`await` lets you write async code that looks like normal synchronous C-style code:

```js
async function loadData() {
  const user = await fetchUser(id);         // "pause" until resolved
  const posts = await fetchPosts(user.id);  // "pause" until resolved
  return posts;
}
```

### How it actually works

`await` does NOT block the program (remember, JS can't block). What it does:

1. Takes a Promise.
2. Pauses **this function only** (other code, timers, events keep running).
3. When the Promise resolves, the function resumes and `await` evaluates to the resolved value.
4. If the Promise rejects, `await` throws an error (which you can catch with `try/catch`).

An `async` function always returns a Promise. Even if you write `return 5`, the caller gets `Promise<number>` that resolves to 5.

### Error Handling

In C you check return codes. In async JS, you use `try/catch`:

```js
async function safeFetch(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Failed:", err);
    throw err;  // re-throw if you want callers to know
  }
}
```

If `fetch` rejects (network error) or you `throw`, execution jumps to `catch`. Exactly like C++ exceptions or Go's panic/recover, except it's the standard way to handle errors in async code.

### The Result Object Pattern

Instead of throwing, you can return a structured result:

```js
function safeParse(input: string): { ok: true; value: any } | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(input) };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

const result = safeParse('{"a": 1}');
if (result.ok) {
  console.log(result.value);  // { a: 1 }
} else {
  console.log(result.error);
}
```

This is similar to Rust's `Result<T, E>` or Go's `(value, err)` tuple. The caller checks `ok` instead of wrapping everything in try/catch.

## Putting It All Together: Patterns You Need

### Pattern 1: Delay

"Return a Promise that resolves after N milliseconds."

In C terms: `sleep(n)` but non-blocking. The program keeps running, and the promise resolves when the time is up.

You need: `new Promise(...)` + `setTimeout` inside it. The setTimeout callback calls `resolve`.

### Pattern 2: Timeout

"Given a Promise that might take forever, add a deadline. If it doesn't resolve within N ms, reject."

Think of it as: two horses racing. Horse A is the real work. Horse B is a timer that rejects after N ms. Whichever finishes first determines the outcome. If A wins, you get the result. If B wins, you get a "Timeout" error.

You need: `Promise.race([...])` with two promises -- the original one and a timer that rejects.

### Pattern 3: Fetch with Error Handling

"Call an API, parse the JSON, but throw if the response status is not OK."

You need: `async`/`await`, check `response.ok`, throw with a message, otherwise return `response.json()`.

### Pattern 4: Polling

"Keep calling a function every N ms until the result passes a check, or give up after K attempts."

Like polling a hardware register in embedded C: read, check, sleep, repeat. Except the "sleep" is a `delay()` promise (non-blocking), and the "read" is an async function.

```
loop:
  result = await fn()
  if predicate(result): return SUCCESS with result
  if attempts exhausted: return TIMEOUT
  await delay(intervalMs)
  goto loop
```

## Common Mistakes

| Mistake | Symptom | C equivalent |
|---------|---------|-------------|
| Forgetting `await` | You get a Promise object instead of the value | Like forgetting to dereference a pointer -- you have the address, not the data |
| Forgetting `async` on the function | `await` is a syntax error | Like using a keyword without the right header |
| No `.catch` or `try/catch` | Errors vanish silently | Like ignoring a return code from `read()` |
| Creating a Promise but never calling `resolve` | Promise stays pending forever | Like a thread that deadlocks |

## Exercises

| File | What to do |
|------|-----------|
| `promises.ts` | Implement `delay(ms)` (non-blocking sleep) and `withTimeout(promise, ms)` (add a deadline to any promise) |
| `async_await.ts` | Fetch JSON from a URL with `async`/`await`; throw `"HTTP <status>"` on failure |
| `error_handling.ts` | Safe JSON parser -- returns `{ ok, value }` or `{ ok, error }` instead of throwing |
| `polling.ts` | Poll an async function until a predicate passes or max attempts are exhausted |

## Running

```sh
npm test -- exercises/02_js_async
```

## Further Reading

- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [JavaScript.info: Event Loop](https://javascript.info/event-loop)
- [JavaScript.info: Promise basics](https://javascript.info/promise-basics)
