# 06_react_hooks — Effects, Refs, Callbacks

This chapter focuses on React hooks that handle lifecycle, DOM access, and performance patterns used in the app.

## Key Concepts

- **`useEffect`**: run side effects after render (timers, network calls).
- **`useRef`**: store mutable values and access DOM elements.
- **`useCallback`**: memoize functions to avoid unnecessary re-renders.
- **Controlled inputs**: input value stored in React state.
- **Debouncing**: delay work until the user stops typing.

## Examples

### Timer with `useEffect`

```tsx
const [seconds, setSeconds] = useState(0);
useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);
}, []);
```

### Scrolling a DOM Node with `useRef`

```tsx
const containerRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
}, [messages]);
```

### Debounced Input

```tsx
useEffect(() => {
  const id = setTimeout(() => onDebouncedChange(value), delayMs);
  return () => clearTimeout(id);
}, [value, delayMs]);
```
