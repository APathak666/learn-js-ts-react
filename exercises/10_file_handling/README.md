# 10 — Files and Drag-and-Drop

These exercises practice file validation and drag-and-drop UI — patterns used for upload interfaces.

## Exercises

### FileValidator.ts
Build a `validateFile(file, constraints)` function that checks a `File` object against size and extension constraints. Return an object with `valid: boolean` and `errors: string[]`.

**What the tests expect:**
- Returns `{ valid: true, errors: [] }` for files within constraints.
- Returns an error string when the file exceeds `maxSizeMB`.
- Returns an error string when the file extension is not in `allowedExtensions`.
- Returns multiple errors when both constraints are violated.

### DropZone.tsx
Build a `DropZone` component that handles drag-and-drop file input. It receives an `onFiles` callback prop.

**What the tests expect:**
- Shows "Drop files here" text by default.
- Shows "Release to upload" during dragOver.
- Reverts to default text on dragLeave.
- Calls `onFiles` with the dropped files on drop.
- Has `data-testid="dropzone"` on the drop target element.

## Concepts (see BOOK.md Chapter 15)
- The `File` API and `FileList`
- Drag-and-drop events: `onDragOver`, `onDragLeave`, `onDrop`
- `event.preventDefault()` for drag-and-drop
- State-driven visual feedback
