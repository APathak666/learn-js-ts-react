# 01 — Core JavaScript

The fundamentals that everything else builds on: strings, arrays, objects, immutability, and higher-order functions. If these are solid, the rest of the exercises will feel natural.

## Strings

### Common Methods

```js
"  hello  ".trim()          // "hello"
"hello".toUpperCase()       // "HELLO"
"Hello".toLowerCase()       // "hello"
"a-b-c".split("-")         // ["a", "b", "c"]
["a", "b", "c"].join(", ") // "a, b, c"
```

### Transforming Words

A very common pattern: split a string into words, transform each word, join them back:

```js
function shout(sentence: string): string {
  return sentence
    .split(" ")
    .map(word => word.toUpperCase())
    .join(" ");
}

shout("go away")  // "GO AWAY"
```

Watch out for edge cases: extra whitespace, empty strings, single-character words. `"a"[0]` is `"a"`, but `""[0]` is `undefined`.

### Optional Parameters and Conditional Output

Template literals are your friend for building formatted output:

```js
function tag(label: string, suffix?: string): string {
  if (suffix !== undefined) {
    return `${label} [${suffix}]`;
  }
  return label;
}

tag("Speed", "m/s")  // "Speed [m/s]"
tag("Ratio")          // "Ratio"
```

## Arrays

### The Big Three: `map`, `filter`, `reduce`

These are the workhorses. You'll use them constantly.

**`map`** -- transform every element, same length in, same length out:

```js
[1, 2, 3].map(n => n * 10)         // [10, 20, 30]
["ada", "bob"].map(s => s.length)   // [3, 3]
```

**`filter`** -- keep elements that pass a test:

```js
[1, 2, 3, 4, 5].filter(n => n > 3)          // [4, 5]
["cat", "", "dog"].filter(s => s.length > 0) // ["cat", "dog"]
```

**`reduce`** -- collapse an array into a single value:

```js
[1, 2, 3].reduce((sum, n) => sum + n, 0)   // 6

// Can build any shape -- objects, arrays, strings:
["a", "b", "a"].reduce((counts, letter) => {
  counts[letter] = (counts[letter] || 0) + 1;
  return counts;
}, {} as Record<string, number>)
// { a: 2, b: 1 }
```

### Removing Duplicates

There are multiple approaches. One uses a data structure that only stores unique values. Another uses array methods to check if an element has appeared before:

```js
// Set approach:
[...new Set([1, 1, 2, 3, 2])]  // [1, 2, 3]
```

Think about what `indexOf` returns and how it relates to the current index.

## Objects

### Creating with Defaults

When some fields are optional in the input but required in the output, fill in defaults:

```js
interface Config {
  host: string;
  port: number;
  debug: boolean;
}

function createConfig(input: { host: string; port?: number }): Config {
  return {
    host: input.host,
    port: input.port ?? 3000,
    debug: false,
  };
}

createConfig({ host: "localhost" })
// { host: "localhost", port: 3000, debug: false }

createConfig({ host: "prod", port: 8080 })
// { host: "prod", port: 8080, debug: false }
```

Note: `??` (nullish coalescing) uses the right side only when the left is `null` or `undefined`, not for other falsy values like `0` or `""`.

### Updating without Mutation

The spread operator `...` copies all properties into a new object. Properties listed after the spread override:

```js
const original = { name: "Alice", age: 30 };
const updated = { ...original, age: 31 };

updated   // { name: "Alice", age: 31 }
original  // { name: "Alice", age: 30 }  -- unchanged
```

This is the standard pattern for immutable updates in JS/React codebases.

## Immutability

Never modify the original. Always return a new copy.

```js
// Adding to an array:
const files = ["a.txt", "b.txt"];
const withNew = [...files, "c.txt"];
// withNew: ["a.txt", "b.txt", "c.txt"]
// files:   ["a.txt", "b.txt"]  -- unchanged

// Removing from an array:
const without = files.filter(f => f !== "a.txt");
// without: ["b.txt"]
// files:   ["a.txt", "b.txt"]  -- unchanged
```

When an object contains an array, you need to spread both the object and the array:

```js
const project = { id: "1", tags: ["alpha"] };
const updated = { ...project, tags: [...project.tags, "beta"] };
// updated.tags: ["alpha", "beta"]
// project.tags: ["alpha"]  -- unchanged
```

The tests in this chapter verify that originals are not mutated. If a test says `expect(original.x).toBe(oldValue)`, your function must not touch the original.

## Higher-Order Functions

A higher-order function either takes a function as an argument or returns one.

### Returning a Function (Closures)

```js
function multiplier(factor: number) {
  return (x: number) => x * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

double(5)  // 10
triple(5)  // 15
```

The inner function "closes over" `factor` -- it remembers the value even after `multiplier` has returned.

### Run-Once Pattern

Sometimes you need a function that only executes its real logic once, returning the first result for all subsequent calls. Think about what state you'd need to track in the closure:

- Has it been called before?
- What did it return the first time?

```js
const init = once(() => {
  console.log("initializing...");
  return 42;
});

init()  // logs "initializing...", returns 42
init()  // no log, returns 42
init()  // no log, returns 42
```

## Exercises

| File | What to do |
|------|-----------|
| `variables.ts` | Build a slug-style ID from a name and number; increment a version |
| `strings.ts` | Title-case a string; format a label with an optional unit |
| `arrays.ts` | Filter evens, sum numbers, deduplicate an array |
| `objects.ts` | Create an object with defaults; rename without mutating |
| `immutability.ts` | Add/remove items from an array field without mutating the original |
| `functions.ts` | Build a prefixed logger; implement a `once` wrapper |

## Running

```sh
npm test -- exercises/01_js_basics
```
