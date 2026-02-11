# 11 — Polling and State Machines

These exercises practice polling patterns and workflow state machines — core patterns in job-tracking UIs.

## Exercises

### StepMachine.ts
Implement four utility functions for a workflow with steps: Upload → Configure → Processing → Training → Complete.

- `nextStep(current)` — return the next step, or Complete if already there.
- `isSetupPhase(step)` — return true for Upload and Configure.
- `isTerminal(step)` — return true only for Complete.
- `stepIndex(step)` — return 0 for Upload, 1 for Configure, etc.

Use the `STEP_ORDER` array already defined in the file.

### JobPoller.tsx
Build a component that polls a job status function at a regular interval and displays the result.

**What the tests expect:**
- Displays current state in a span with `data-testid="status"`.
- Starts as `'PENDING'`.
- Calls `getStatus()` immediately on mount, then every `intervalMs`.
- Updates the displayed state with each poll result.
- Stops polling when state reaches `'COMPLETED'` or `'FAILED'`.
- Cleans up the interval on unmount.

**Hints:**
- Use `useEffect` with `setInterval` for polling.
- Use `useRef` to track the current state inside the interval callback (closures capture stale state otherwise).
- Return a cleanup function from `useEffect` that calls `clearInterval`.

## Concepts (see BOOK.md Chapter 16)
- `setInterval` / `clearInterval` in `useEffect`
- `useRef` for mutable values that don't trigger re-renders
- State machine patterns with enums
- Terminal state detection to stop side effects
