import React, { useState } from 'react';

interface DropZoneProps {
  onFiles: (files: File[]) => void;
}

// TODO: implement a drag-and-drop zone.
// - Show "Drop files here" by default.
// - When a user drags files over, show "Release to upload" (use onDragOver and onDragLeave).
// - On drop, call onFiles with the dropped files.
// - Remember: e.preventDefault() is required in onDragOver for onDrop to fire.
export const DropZone: React.FC<DropZoneProps> = ({ onFiles }) => {
  return (
    <div data-testid="dropzone">
      Drop files here
    </div>
  );
};
