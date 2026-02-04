# 01_js_basics — Core JavaScript

This chapter focuses on the fundamentals used everywhere in the app: strings, arrays, objects, and immutability.

## Key Concepts

- **Strings**: manipulating text (e.g., lowercasing, trimming, concatenation).
- **Arrays**: transforming lists with `map`, `filter`, and `reduce`.
- **Objects**: grouping related data into a single value.
- **Immutability**: return new objects/arrays instead of mutating existing ones.
- **Higher‑order functions**: functions that return functions.

## Examples

### Strings

```ts
// Title‑case each word
"cold plate" -> "Cold Plate"
```

```ts
// Concatenate with formatting
const label = unit ? `${name} (${unit})` : name;
```

### Arrays

```ts
// Filter: keep only even numbers
const evens = numbers.filter(n => n % 2 === 0);

// Reduce: sum
const total = numbers.reduce((acc, n) => acc + n, 0);
```

### Objects & Immutability

```ts
// Create a new object instead of mutating
const updated = { ...project, name: "New" };

// Add to an array immutably
const nextFiles = [...project.files, "b.zip"];
```

### Higher‑Order Functions

```ts
// Function that returns another function
const log = (prefix: string) => (msg: string) => `${prefix} ${msg}`;
```

## Why This Matters In The App

In `godela_v0_frontend`, state updates are done immutably (e.g., updating tabs, datasets, and messages). You’ll constantly map/filter arrays and create new objects when updating state.
