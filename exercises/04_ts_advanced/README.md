# 04_ts_advanced — TypeScript Power Tools

This chapter covers advanced TypeScript features that make large codebases safer and easier to refactor.

## Key Concepts

- **Type narrowing**: safely handling `unknown` and unions.
- **Utility types**: `Partial`, `Pick`, `Omit` for reshaping types.
- **`keyof`**: enforce valid property access.
- **`as const`**: freeze values into literal types.
- **Type guards**: functions that refine types at runtime.

## Examples

### Type Narrowing

```ts
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'Unknown error';
}
```

### Utility Types

```ts
type ProjectUpdate = Partial<Omit<Project, 'id'>>;
```

### `keyof`

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### `as const` and Type Guards

```ts
const PARAMETER_TYPES = ['GEOMETRY', 'BOUNDARY_CONDITION', 'OUTPUT_SCALAR'] as const;
type ParameterType = (typeof PARAMETER_TYPES)[number];

function isParameterType(value: string): value is ParameterType {
  return PARAMETER_TYPES.includes(value as ParameterType);
}
```

## Why This Matters In The App

These features help keep types aligned as the app grows: safer error handling, type‑safe object updates, and more reliable runtime checks.
