# 06 — React Hooks

Hooks are how React components interact with the outside world: timers, the DOM, browser APIs, network requests. This chapter covers `useEffect`, `useRef`, and patterns built on top of them.

## `useEffect` -- Side Effects

`useEffect` runs code **after** the component renders. It's for anything that isn't pure rendering: timers, subscriptions, DOM manipulation, data fetching.

```tsx
useEffect(() => {
  // This runs after every render
  console.log("rendered");
});
```

### Dependency Array

The second argument controls _when_ the effect runs:

```tsx
// Runs after EVERY render:
useEffect(() => { /* ... */ });

// Runs only ONCE (on mount):
useEffect(() => { /* ... */ }, []);

// Runs when `count` changes:
useEffect(() => { /* ... */ }, [count]);
```

The dependency array is a list of values. The effect re-runs only when one of them changes (compared by `Object.is`).

### Cleanup Function

If your effect creates something that needs to be torn down (a timer, a subscription, an event listener), return a cleanup function:

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  return () => clearInterval(id);  // cleanup
}, []);
```

The cleanup runs:
- Before the effect re-runs (if dependencies changed)
- When the component unmounts

**This is critical for timers.** If you `setInterval` without cleaning up, the interval keeps running even after the component is gone, causing memory leaks and errors.

### Debouncing with `useEffect`

Debouncing means "wait until the user stops doing something before acting." The pattern:

1. User types -> state updates on every keystroke
2. An effect watches that state and sets a `setTimeout`
3. If the user types again before the timeout fires, the cleanup cancels the old timeout
4. Only when the user pauses long enough does the callback fire

```tsx
const [query, setQuery] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    onSearch(query);  // only fires after the pause
  }, 300);

  return () => clearTimeout(timer);  // cancel on re-type
}, [query]);
```

The cleanup function is what makes debouncing work -- every keystroke cancels the previous timer and starts a new one.

## `useRef` -- Mutable Values and DOM Access

`useRef` creates a mutable container that persists across renders **without** triggering re-renders when changed.

### Two Use Cases

**1. Accessing DOM elements:**

```tsx
function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </>
  );
}
```

Attach a ref to a JSX element with the `ref` prop. After render, `inputRef.current` points to the actual DOM node. You can call any DOM method on it: `.focus()`, `.click()`, `.scrollTo()`, etc.

**2. Storing mutable values:**

```tsx
const renderCount = useRef(0);

useEffect(() => {
  renderCount.current += 1;
  // This doesn't cause a re-render
});
```

Unlike state, changing `.current` doesn't trigger a re-render. Use this for values you need to track but don't want to display.

### Triggering Hidden Inputs

A common pattern: you want a styled button but need an `<input type="file">` for the file picker dialog. Hide the input and use a ref to click it programmatically:

```tsx
const fileRef = useRef<HTMLInputElement>(null);

<button onClick={() => fileRef.current?.click()}>Upload</button>
<input type="file" hidden ref={fileRef} onChange={handleFiles} />
```

### Auto-Scrolling

When new content is added to a scrollable container (like a chat), you often want to scroll to the bottom automatically. Use a ref on the container and set `scrollTop` in an effect that watches the content:

```tsx
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
}, [messages]);  // re-run when messages change
```

## Exercises

| File | What to do |
|------|-----------|
| `Timer.tsx` | Tick a seconds counter every 1s using `useEffect` + `setInterval` |
| `DebouncedInput.tsx` | Call a callback only after the user stops typing for `delayMs` |
| `FilePicker.tsx` | Click a hidden file input via a ref; pass selected files to a callback |
| `AutoScrollChat.tsx` | Auto-scroll a chat container to the bottom when messages change |

## Running

```sh
npm test -- exercises/06_react_hooks
```

## Further Reading

- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React: useRef](https://react.dev/reference/react/useRef)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
