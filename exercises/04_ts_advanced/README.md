# 04 — Advanced TypeScript

These are the TypeScript features that separate "I know TypeScript" from "I'm productive in a large TypeScript codebase." They show up in library code, API layers, and state management.

## Type Narrowing

TypeScript's `unknown` type is the safe version of `any` -- it means "could be anything, but you must check before using it." You **narrow** it by doing runtime checks:

```ts
function stringify(value: unknown): string {
  if (typeof value === "string") {
    return value;  // TypeScript knows it's a string here
  }
  if (typeof value === "number") {
    return String(value);  // TypeScript knows it's a number here
  }
  if (value instanceof Error) {
    return value.message;  // TypeScript knows it's an Error here
  }
  return "unknown";
}
```

Each `if` branch narrows the type. After `typeof value === "string"`, TypeScript treats `value` as `string` within that block.

### Why This Matters

`catch` blocks give you `unknown`:

```ts
try {
  riskyOperation();
} catch (err) {
  // err is `unknown` -- you must narrow before using
  if (err instanceof Error) {
    console.log(err.message);  // safe
  }
}
```

The exercises ask you to handle `unknown` errors safely -- extracting a message from Error objects, strings, and anything else.

## Utility Types

TypeScript has built-in types that transform other types. The three most common:

### `Partial<T>` -- Make All Fields Optional

```ts
interface User {
  id: string;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>;
// equivalent to:
// { id?: string; name?: string; email?: string }
```

Useful for update operations where you only change some fields.

### `Pick<T, K>` -- Keep Only Certain Fields

```ts
type UserPreview = Pick<User, "id" | "name">;
// equivalent to:
// { id: string; name: string }
```

Useful for API responses or summaries that don't need every field.

### `Omit<T, K>` -- Remove Certain Fields

```ts
type UserInput = Omit<User, "id">;
// equivalent to:
// { name: string; email: string }
```

Useful when the caller shouldn't provide certain fields (like auto-generated IDs).

### Combining Them

You can compose utility types:

```ts
// "Everything except id, and all of it optional"
type UserPatch = Partial<Omit<User, "id">>;
// { name?: string; email?: string }
```

When applying a partial update to an object, the spread operator does the right thing:

```ts
const updated = { ...original, ...patch };
// patch only overrides the fields it contains
```

## `keyof`

`keyof T` produces a union of all property names of `T`:

```ts
interface Config {
  host: string;
  port: number;
  debug: boolean;
}

type ConfigKey = keyof Config;  // "host" | "port" | "debug"
```

### Type-Safe Property Access

Combined with generics, `keyof` lets you write functions that safely access any property:

```ts
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const config = { host: "localhost", port: 3000 };
get(config, "host")  // string -- TypeScript knows the return type
get(config, "port")  // number
get(config, "nope")  // Error: "nope" is not assignable to "host" | "port"
```

`T[K]` is an **indexed access type** -- it means "the type of property K on type T." When K is `"host"`, `T[K]` is `string`. When K is `"port"`, `T[K]` is `number`.

The same pattern works for setting properties. Think about how you'd return a new object with one property changed (without mutation).

## `as const`

By default, TypeScript widens literal values:

```ts
const colors = ["red", "green", "blue"];
// type: string[]  -- TypeScript forgets the exact values

const config = { mode: "dark", version: 2 };
// type: { mode: string; version: number }  -- "dark" becomes string
```

`as const` prevents this widening:

```ts
const colors = ["red", "green", "blue"] as const;
// type: readonly ["red", "green", "blue"]  -- exact tuple

const config = { mode: "dark", version: 2 } as const;
// type: { readonly mode: "dark"; readonly version: 2 }
```

### Deriving Union Types from `as const`

This is the killer feature. You can extract a union type from a const array:

```ts
const ROLES = ["admin", "editor", "viewer"] as const;
type Role = (typeof ROLES)[number];  // "admin" | "editor" | "viewer"
```

How this works:
1. `typeof ROLES` is `readonly ["admin", "editor", "viewer"]`
2. Indexing with `[number]` extracts the element type
3. Result: `"admin" | "editor" | "viewer"`

This is better than defining the array and the type separately, because they can't get out of sync.

### Type Guards with `as const`

Once you have a const array and its derived type, you can write a type guard:

```ts
function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

isRole("admin")    // true, and TypeScript narrows to Role
isRole("hacker")   // false
```

A type guard is a function whose return type is `value is SomeType`. When it returns `true`, TypeScript narrows the parameter's type in the calling code.

## Exercises

| File | What to do |
|------|-----------|
| `type_narrowing.ts` | Extract an error message from an `unknown` value |
| `utility_types.ts` | Apply a partial update immutably; extract a summary with specific fields |
| `keyof.ts` | Get and set object properties with full type safety |
| `const_assertions.ts` | Use `as const` to derive a union type; write a type guard |

## Running

```sh
npm test -- exercises/04_ts_advanced
```

## Further Reading

- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Handbook: keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
