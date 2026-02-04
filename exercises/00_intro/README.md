# 00_intro — Warm‑Up

This chapter is a gentle on‑ramp. The goal is to get you comfortable with TypeScript syntax and the “tests define behavior” workflow.

## Key Concepts

- **Functions**: reusable blocks of logic that take inputs and return outputs.
- **Types**: TypeScript adds type annotations (e.g., `string`, `number`) to catch mistakes early.
- **Exports/Imports**: each exercise file exports a function that the test imports.

## Examples

```ts
// A typed function that returns a string
export function hello(name: string): string {
  return `Hello, ${name}!`;
}
```

```ts
// Sum all numbers in an array
export function sum(numbers: number[]): number {
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}
```

## How To Think About The Tests

The tests call your functions with example inputs and check the outputs. Your job is to make the outputs match exactly. Start with the tests, then implement the minimal logic that satisfies them.
