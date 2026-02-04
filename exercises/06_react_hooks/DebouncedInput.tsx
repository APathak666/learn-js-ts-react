import React, { useEffect, useState } from 'react';

interface DebouncedInputProps {
  delayMs: number;
  onDebouncedChange: (value: string) => void;
}

// TODO: call onDebouncedChange after delayMs since the last keystroke.
export const DebouncedInput: React.FC<DebouncedInputProps> = ({ delayMs, onDebouncedChange }) => {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type..."
    />
  );
};
