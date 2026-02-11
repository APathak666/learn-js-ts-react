# 12 — Capstone: Mini Workflow

This exercise ties together everything from the previous chapters into a single component.

## Exercise

### MiniWorkflow.tsx
Build a component that implements a three-step workflow: **Upload → Processing → Done**.

The component receives two async callback props:
- `onUpload: () => Promise<void>` — called when the user clicks Upload.
- `onProcess: () => Promise<void>` — called when the user clicks Process.

**What the tests expect:**
- Display the current step (`'UPLOAD'`, `'PROCESSING'`, or `'DONE'`) in a span with `data-testid="step"`.
- At the **Upload** step: show a button labeled "Upload". On click, call `onUpload()`. On success, advance to Processing.
- At the **Processing** step: show a button labeled "Process". On click, call `onProcess()`. On success, advance to Done.
- At the **Done** step: show a message containing the word "Complete" (no more buttons).
- While an async action is in flight, show a span with `data-testid="loading"`. Hide it when the action resolves or rejects.
- If `onUpload` or `onProcess` throws, show the error message in a span with `data-testid="error"` and stay on the current step (don't advance).

**Concepts used:**
- `useState` for step and loading/error state
- Conditional rendering based on current step
- Async event handlers with try/catch
- Loading and error UI patterns
