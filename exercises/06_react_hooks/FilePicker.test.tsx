import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { FilePicker } from './FilePicker';

describe('FilePicker', () => {
  it('calls onFiles', () => {
    const onFiles = vi.fn();
    render(<FilePicker onFiles={onFiles} />);

    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['abc'], 'demo.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0][0][0].name).toBe('demo.txt');
  });
});
