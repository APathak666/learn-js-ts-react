# 05 — React Basics

React is a library for building UIs out of **components** -- small, reusable functions that return what should appear on screen. This chapter covers the core model: components, props, state, events, lists, and conditional rendering.

## Components

A React component is a function that returns JSX (HTML-like syntax):

```tsx
function Greeting() {
  return <h1>Hello!</h1>;
}
```

JSX looks like HTML but it's actually JavaScript. It gets compiled to function calls. A few key differences from HTML:
- `class` becomes `className`
- `for` becomes `htmlFor`
- Style is an object: `style={{ color: "red" }}` not `style="color: red"`
- All tags must be closed: `<br />` not `<br>`

## Props

Props are inputs to a component. They flow **down** from parent to child:

```tsx
interface BadgeProps {
  label: string;
  color: string;
}

function Badge({ label, color }: BadgeProps) {
  return <span style={{ color }}>{label}</span>;
}

// Usage:
<Badge label="Active" color="green" />
```

Props are **read-only**. A component never modifies its own props.

### Optional Props and Callbacks

Props can be optional, including callback functions:

```tsx
interface CardProps {
  title: string;
  onClick?: () => void;
}

function Card({ title, onClick }: CardProps) {
  return <div onClick={onClick}><h2>{title}</h2></div>;
}

// With callback:
<Card title="Item" onClick={() => console.log("clicked")} />

// Without:
<Card title="Item" />
```

When `onClick` is `undefined`, React simply ignores it -- no crash.

## State with `useState`

State is data that changes over time. When state changes, React re-renders the component:

```tsx
import { useState } from 'react';

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
```

`useState(initialValue)` returns a pair: the current value and a setter function. Calling the setter triggers a re-render with the new value.

### State Update Rules

- **Never mutate state directly.** Always use the setter.
- The setter replaces the value entirely. For objects/arrays, create a new one.
- State updates may be batched -- you might not see the new value immediately.

```tsx
// Incrementing a counter:
const [count, setCount] = useState(0);

// This works:
setCount(count + 1);

// For updates based on previous state, use the function form:
setCount(prev => prev + 1);
```

## Event Handling

Events in React work like HTML events but use camelCase and take functions:

```tsx
function Form() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
```

Common events: `onClick`, `onChange`, `onSubmit`, `onKeyDown`.

## Lists and Keys

Render arrays with `.map()`. Every item needs a `key` prop:

```tsx
function NameList({ names }: { names: string[] }) {
  return (
    <ul>
      {names.map((name, i) => (
        <li key={i}>{name}</li>
      ))}
    </ul>
  );
}
```

Keys help React figure out which items changed, were added, or removed. Use a stable unique identifier (like an `id` field) when possible. Array indices work for static lists but cause bugs with reordering.

### Empty State

Always handle the case where the list is empty:

```tsx
if (items.length === 0) {
  return <p>No items</p>;
}
return <ul>{items.map(/* ... */)}</ul>;
```

## Conditional Rendering

React doesn't have directives like `v-if`. You just use JavaScript:

**Ternary** -- for either/or:
```tsx
{isLoading ? <Spinner /> : <Content />}
```

**Logical AND** -- for show/hide:
```tsx
{error && <p className="error">{error}</p>}
```

**Early return** -- for guard clauses:
```tsx
function Panel({ isLoading, error, children }) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <>{children}</>;
}
```

The priority pattern (loading > error > content) is extremely common in real apps.

## Exercises

| File | What to do |
|------|-----------|
| `Counter.tsx` | A counter with Increment and Reset buttons using `useState` |
| `PropsCard.tsx` | Display props and call an `onSelect` callback on click |
| `List.tsx` | Render a list of items, or "No items" when empty |
| `ConditionalPanel.tsx` | Show loading, error, or children based on props |

## Running

```sh
npm test -- exercises/05_react_basics
```

## Further Reading

- [React: Your First Component](https://react.dev/learn/your-first-component)
- [React: State](https://react.dev/learn/state-a-components-memory)
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
