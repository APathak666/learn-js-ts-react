# 07_app_patterns — Godela App Patterns

This chapter mirrors patterns from `godela_v0_frontend`. The exercises are intentionally “real‑ish” so you internalize the same logic used in the app.

## Key Concepts

- **YAML serialization**: build a config string for backend jobs.
- **Tab state management**: create, close, and update tabs immutably.
- **API wrapper**: centralize fetch + auth logic.
- **Parameter mapping**: convert AI‑extracted structures into app state.
- **Job polling**: wait for preprocessing/training to finish.

## Examples

### YAML Serialization

```ts
const config = {
  training: { num_epochs: 10, batch_size: 5 },
  model: { hidden_dim: 256 },
  tags: ['a', 'b']
};

// Expected YAML:
// training:
//   num_epochs: 10
//   batch_size: 5
// model:
//   hidden_dim: 256
// tags:
//   - a
//   - b
```

### Tab State

```ts
const newTab = { id: 't3', title: 'New', project: { id: 'p3', name: 'New' } };
const nextTabs = [...tabs, newTab];
const activeId = 't3';
```

### API Wrapper

```ts
const headers = {
  'Content-Type': 'application/json',
  ...(apiKey ? { 'X-Api-Key': apiKey } : {})
};

const res = await fetch(`${baseUrl}/job/preprocess/init`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ session_uuid })
});
```

### Parameter Mapping

```ts
const inputs = structure.suggestedParameters.map((p, i) => ({
  id: `in-${i}`,
  name: p.name,
  type: p.type as ParameterType,
  nominal: p.min && p.max ? (p.min + p.max) / 2 : undefined,
  isFixed: p.type !== 'GEOMETRY'
}));
```

### Job Polling

```ts
for (let i = 0; i < maxAttempts; i++) {
  const state = await getStatus();
  if (state === 'COMPLETED') return 'COMPLETED';
  await delay(intervalMs);
}
return 'TIMEOUT';
```

## Why This Matters In The App

These are the same patterns used in `App.tsx`, `ConfigView`, and the API services. If you can solve these exercises confidently, you can implement real features in the codebase.
