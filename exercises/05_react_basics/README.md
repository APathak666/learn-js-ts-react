# 05_react_basics — Components & State

This chapter introduces React’s component model and the core patterns used across the UI.

## Key Concepts

- **Components**: functions that return UI.
- **Props**: input values passed into a component.
- **State**: local, mutable data managed by `useState`.
- **Events**: user interactions like clicks and input changes.
- **Lists & keys**: rendering arrays of items with stable keys.
- **Conditional rendering**: show different UI based on state.

## Examples

### Component with Props

```tsx
function Card({ name, status }: { name: string; status: string }) {
  return (
    <div>
      <h3>{name}</h3>
      <span>{status}</span>
    </div>
  );
}
```

### State & Events

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>{count}</button>
  );
}
```

### Lists & Keys

```tsx
<ul>
  {items.map(item => (
    <li key={item.id}>{item.label}</li>
  ))}
</ul>
```

### Conditional Rendering

```tsx
if (isLoading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;
return <div>Ready</div>;
```

## Why This Matters In The App

All UI in `godela_v0_frontend` is composed of functional components with props, state, and event handlers. List rendering and conditional UI are everywhere (tabs, datasets, chat messages, status panels).
