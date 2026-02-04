# learn-js-ts-react

Progressive, test‑driven exercises to get you productive in JavaScript, TypeScript, and React for modern frontend codebases. Every file has a `TODO` and a matching test. You make tests pass in order.

## How It Works

- Each exercise is a small, focused problem.
- Tests are the spec. Read them first.
- You only edit the exercise file, not the test.
- Difficulty ramps up by folder number.
- The last section (`07_app_patterns`) mirrors patterns in the real app.

## Quick Start

1. Install deps:
   `npm install`
2. Run everything:
   `npm test`
3. Run one exercise:
   `npm test -- exercises/01_js_basics/arrays.test.ts`
4. Watch mode:
   `npm run test:watch`

## Progression

- `00_intro`
  - Warm‑up, syntax, simple functions.
- `01_js_basics`
  - Strings, arrays, objects, immutability, higher‑order functions.
- `02_js_async`
  - Promises, async/await, error handling, polling.
- `03_ts_basics`
  - Types, unions, enums, interfaces, generics.
- `04_ts_advanced`
  - Narrowing, utility types, `keyof`, `as const`.
- `05_react_basics`
  - Components, props, state, lists, conditional rendering.
- `06_react_hooks`
  - Effects, refs, callbacks, debounced input.
- `07_app_patterns`
  - YAML serialization, tab state, API wrapper, parameter mapping, polling.

## Recommended Flow

- Start at `00_intro` and move forward only after tests pass.
- Keep each exercise small and readable; avoid clever solutions.
- When stuck, re‑read the test file first.

## File Layout

- `exercises/` — all problems, grouped by topic
- `setupTests.ts` — test setup (jest‑dom matchers for React tests)
- `vitest.config.ts` — test runner config
- `tsconfig.json` — TypeScript compiler config
