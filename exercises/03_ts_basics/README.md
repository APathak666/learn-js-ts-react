# 03 — TypeScript Foundations

This is the most important chapter. TypeScript's type system is what turns JavaScript from "hope it works" into "the compiler proves it works." Everything here -- annotations, unions, enums, interfaces, generics -- shows up in every single TypeScript file you'll ever read or write.

## Why Types Matter

JavaScript is dynamically typed. This code runs fine until it doesn't:

```js
function area(shape) {
  return shape.width * shape.height;
}

area({ width: 10, height: 5 })  // 50
area({ width: 10 })              // NaN -- silent bug
area("rectangle")                // NaN -- silent bug
```

TypeScript catches these at compile time, before your code ever runs:

```ts
function area(shape: { width: number; height: number }): number {
  return shape.width * shape.height;
}

area({ width: 10 })       // Error: missing 'height'
area("rectangle")          // Error: string is not assignable
```

## Type Annotations

### Variables

```ts
const name: string = "Alice";
const age: number = 30;
const active: boolean = true;
const tags: string[] = ["admin", "user"];
```

TypeScript can usually **infer** these, so you don't always need to write them. But function parameters always need annotations -- TypeScript won't guess those:

```ts
// TypeScript infers the return type as number, but parameters must be annotated:
function add(a: number, b: number) {
  return a + b;
}
```

### Function Signatures

A full function signature annotates both inputs and output:

```ts
function greet(name: string, loud: boolean): string {
  if (loud) return `HELLO ${name.toUpperCase()}!`;
  return `Hello, ${name}.`;
}
```

The return type (`: string` after the parentheses) is optional but recommended -- it documents intent and catches mistakes:

```ts
// Without return type -- bug goes unnoticed:
function divide(a: number, b: number) {
  if (b === 0) return;  // returns undefined -- probably a bug
  return a / b;
}

// With return type -- TypeScript catches it:
function divide(a: number, b: number): number {
  if (b === 0) return;  // Error: undefined is not assignable to number
  return a / b;
}
```

### Optional Parameters

A `?` after a parameter name makes it optional. Its type becomes `T | undefined`:

```ts
function format(value: number, decimals?: number): string {
  if (decimals !== undefined) {
    return value.toFixed(decimals);
  }
  return String(value);
}

format(3.14159)     // "3.14159"
format(3.14159, 2)  // "3.14"
```

## Union Types

A union says "this value can be one of these types." Written with `|`:

```ts
type Direction = "north" | "south" | "east" | "west";

function move(dir: Direction) {
  // TypeScript knows dir can only be one of these four strings.
  // Passing "up" would be a compile error.
}
```

### String Literal Unions

The most common use case: restricting a string to a set of known values.

```ts
type LogLevel = "debug" | "info" | "warn" | "error";

function log(level: LogLevel, message: string) { /* ... */ }

log("info", "started");   // ok
log("verbose", "detail");  // Error: "verbose" is not assignable to LogLevel
```

This is much safer than using bare `string` -- typos become compile errors.

### Working with Unions

Since the value could be any member of the union, you often need to check which one it is:

```ts
type Result = "success" | "error" | "pending";

function icon(result: Result): string {
  switch (result) {
    case "success": return "check";
    case "error":   return "x";
    case "pending":  return "clock";
  }
}
```

A common task: convert from an internal format (e.g. `"SUCCESS"`) to a display format (e.g. `"Success"`). Think about string methods that capitalize and lowercase.

## Enums

Enums define a set of named constants. By default, they're numbered starting from 0:

```ts
enum Color {
  Red,    // 0
  Green,  // 1
  Blue,   // 2
}

const c: Color = Color.Green;
c === 1  // true
```

### Why Enums?

They're useful for representing discrete states or steps in a workflow:

```ts
enum OrderStatus {
  Created,     // 0
  Processing,  // 1
  Shipped,     // 2
  Delivered,   // 3
}

function hasShipped(status: OrderStatus): boolean {
  return status >= OrderStatus.Shipped;
}

hasShipped(OrderStatus.Created)   // false
hasShipped(OrderStatus.Shipped)   // true
hasShipped(OrderStatus.Delivered) // true
```

Because the numeric values are sequential, you can use comparisons like `>=` to check if a status has reached a certain point. This is handy for "is the process past step X?" checks.

### String Enums

You can also assign string values:

```ts
enum FileType {
  CSV = "CSV",
  JSON = "JSON",
  XML = "XML",
}
```

String enums are more readable in logs and debugging, but you can't do numeric comparisons on them.

## Interfaces

An interface describes the shape of an object -- what properties it has and what types they are:

```ts
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;       // optional
}

function greetUser(user: User): string {
  return `Hi, ${user.name}!`;
}
```

### Optional Properties

The `?` makes a property optional. It can be present or absent:

```ts
interface SearchOptions {
  query: string;
  limit?: number;
  offset?: number;
}

// All valid:
search({ query: "test" })
search({ query: "test", limit: 10 })
search({ query: "test", limit: 10, offset: 20 })
```

### Describing Complex Objects

Interfaces can have properties of any type, including other interfaces and unions:

```ts
type Severity = "low" | "medium" | "high";

interface Alert {
  id: string;
  message: string;
  severity: Severity;
  value?: number;
  threshold?: number;
}
```

When a function takes such an interface, it can branch on which optional fields are present:

```ts
function describe(alert: Alert): string {
  if (alert.value !== undefined && alert.threshold !== undefined) {
    return `${alert.message}: ${alert.value}/${alert.threshold}`;
  }
  return alert.message;
}
```

The pattern of "check if optional field exists, then use it" comes up a lot.

### `interface` vs `type`

Both can describe object shapes. The practical difference is small:

```ts
// These are nearly equivalent:
interface Point { x: number; y: number }
type Point = { x: number; y: number };
```

Convention: use `interface` for object shapes, `type` for unions, aliases, and computed types.

## Generics

Generics let you write functions and types that work with **any** type while preserving type safety. They're like function parameters, but for types.

### The Problem Generics Solve

Without generics, you'd have to either lose type info or write separate functions:

```ts
// Loses type info -- returns `any`:
function first(items: any[]): any {
  return items[0];
}

const n = first([1, 2, 3]);  // n is `any`, not `number`
```

With generics, the type flows through:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]);      // n is number
const s = first(["a", "b"]);     // s is string
```

`T` is a **type parameter**. When you call `first([1, 2, 3])`, TypeScript infers `T = number` from the argument.

### Constrained Generics

Sometimes you need the generic type to have certain properties. Use `extends`:

```ts
function getName<T extends { name: string }>(item: T): string {
  return item.name;
}

getName({ name: "Alice", age: 30 })  // "Alice" -- ok, has `name`
getName({ id: 1 })                    // Error: missing `name`
```

The constraint `T extends { name: string }` means "T can be any type, as long as it has a `name: string` property." The function can access `item.name` safely.

### Generic Functions: Real Patterns

**Wrapping values:**
```ts
function wrap<T>(value: T): { value: T } {
  return { value };
}

wrap(42)       // { value: 42 }  -- type is { value: number }
wrap("hello")  // { value: "hello" }  -- type is { value: string }
```

**Working with key-value structures:**
```ts
function entries<K extends string, V>(record: Record<K, V>): [K, V][] {
  return Object.entries(record) as [K, V][];
}
```

**Callback with typed input:**
```ts
function transform<T, U>(items: T[], fn: (item: T) => U): U[] {
  return items.map(fn);
}

transform([1, 2, 3], n => String(n))  // ["1", "2", "3"] -- string[]
```

### Building a `Record`

`Record<K, V>` is a built-in generic type meaning "an object whose keys are type K and values are type V":

```ts
const scores: Record<string, number> = {
  alice: 95,
  bob: 87,
};
```

You'll often build Records by iterating over an array and grouping items by some key.

## Exercises

| File | What to do |
|------|-----------|
| `types.ts` | Format byte sizes into human-readable strings; build a typed object |
| `unions.ts` | Convert status codes to display labels; check if a status is "busy" |
| `enums.ts` | Define a workflow enum; check if a step is in the setup phase |
| `interfaces.ts` | Describe a complex parameter object in different formats based on its fields |
| `generics.ts` | Find an item by ID in a generic array; group items by a key function |

## Running

```sh
npm test -- exercises/03_ts_basics
```

## Further Reading

- [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook: Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
