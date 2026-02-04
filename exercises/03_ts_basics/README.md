# 03_ts_basics — TypeScript Foundations

This chapter teaches the core TypeScript features you’ll see everywhere in the app: types, unions, enums, interfaces, and generics.

## Key Concepts

- **Type annotations**: describe what values a variable or function can hold.
- **Unions**: a value that can be one of several literal options.
- **Enums**: named constants, good for states like steps.
- **Interfaces**: structure of objects.
- **Generics**: reusable types that work with multiple data shapes.

## Examples

### Type Annotations

```ts
function formatBytes(bytes: number): string {
  return `${bytes} B`;
}
```

### Unions

```ts
type Status = 'DRAFT' | 'TRAINING' | 'READY';

function isBusy(s: Status) {
  return s === 'TRAINING';
}
```

### Enums

```ts
enum AppStep {
  UPLOAD = 'UPLOAD',
  STRUCTURE = 'STRUCTURE',
  TRAINING = 'TRAINING'
}
```

### Interfaces

```ts
interface Project {
  id: string;
  name: string;
  status: Status;
}
```

### Generics

```ts
function getById<T extends { id: string }>(items: T[], id: string) {
  return items.find(i => i.id === id);
}
```
