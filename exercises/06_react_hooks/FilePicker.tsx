import React, { useRef } from 'react';

interface FilePickerProps {
  onFiles: (files: File[]) => void;
}

// TODO: clicking the button should open the hidden input, and on change call onFiles.
export const FilePicker: React.FC<FilePickerProps> = ({ onFiles }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus;
  }

  return (
    <div>
      <button onClick={handleClick}>Choose Files</button>
      <input type="file" multiple hidden ref={inputRef} data-testid="file-input" />
    </div>
  );
};
