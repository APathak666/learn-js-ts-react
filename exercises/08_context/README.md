# 08 — Context: Sharing State Across Components

These exercises practice the React Context API — the pattern used in real codebases to share state without passing props through every level.

## Exercises

### ThemeToggle.tsx
Build a `ThemeProvider` context that holds a `theme` string (`'light'` or `'dark'`) and a `toggleTheme` function. Then build a `ThemeToggle` component that consumes this context to display and toggle the theme.

**What the tests expect:**
- A `ThemeProvider` that wraps children and provides `{ theme, toggleTheme }`.
- A `ThemeToggle` component that renders the current theme in a `data-testid="theme"` span and a button to toggle it.
- Starts as `'light'`, toggles to `'dark'`, toggles back to `'light'`.

### TabContext.tsx
Build a `TabProvider` that manages a list of tabs — each tab has an `id` and `title`. The context should expose `tabs`, `activeId`, `createTab`, `closeTab`, and `setActiveId`.

**What the tests expect:**
- Starts with no tabs and `activeId` of `null`.
- `createTab(title)` adds a tab and makes it active.
- `closeTab(id)` removes the tab; if it was active, activates the previous tab (or `null` if none remain).

## Concepts (see BOOK.md Chapter 13)
- `createContext`, `useContext`, Provider pattern
- `useCallback` for stable function references
- State management without prop drilling
