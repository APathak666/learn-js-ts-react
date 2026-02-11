# 00 — Warm-Up

This chapter makes sure your setup works and you're comfortable with the workflow: read the test, implement the function, run the test.

## What You Need to Know

### Template Literals

JavaScript has three ways to make strings:

```js
const a = 'single quotes';
const b = "double quotes";
const c = `backtick template literals`;
```

Only backtick strings let you embed expressions with `${}`:

```js
const name = "world";
const greeting = `Hello, ${name}!`;  // "Hello, world!"
```

This works with any expression, not just variables:

```js
`2 + 2 = ${2 + 2}`             // "2 + 2 = 4"
`upper: ${"hi".toUpperCase()}`  // "upper: HI"
```

### Summing an Array

When you need to combine a list into a single value, the two common patterns are:

**`for...of` loop:**
```js
function total(prices: number[]): number {
  let result = 0;
  for (const p of prices) {
    result += p;
  }
  return result;
}

total([10, 20, 30])  // 60
total([])            // 0
```

**`reduce`:**
```js
function total(prices: number[]): number {
  return prices.reduce((acc, p) => acc + p, 0);
}
```

Both are fine. Pick whichever feels clearer to you.

## Exercises

| File | What to do |
|------|-----------|
| `hello.ts` | Return a greeting string using template literals |
| `sum.ts` | Return the sum of all numbers in an array (empty array returns `0`) |

## Running

```sh
npm test -- exercises/00_intro
```
