import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropZone } from './DropZone';

describe('DropZone', () => {
  it('shows default text', () => {
    render(<DropZone onFiles={() => {}} />);
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
  });

  it('shows drag-over text', () => {
    render(<DropZone onFiles={() => {}} />);
    const zone = screen.getByTestId('dropzone');
    fireEvent.dragOver(zone, { dataTransfer: { files: [] } });
    expect(screen.getByText('Release to upload')).toBeInTheDocument();
  });

  it('reverts on drag leave', () => {
    render(<DropZone onFiles={() => {}} />);
    const zone = screen.getByTestId('dropzone');
    fireEvent.dragOver(zone, { dataTransfer: { files: [] } });
    fireEvent.dragLeave(zone);
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
  });

  it('calls onFiles on drop', () => {
    const onFiles = vi.fn();
    render(<DropZone onFiles={onFiles} />);
    const zone = screen.getByTestId('dropzone');
    const file = new File(['content'], 'test.zip', { type: 'application/zip' });
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0][0][0].name).toBe('test.zip');
  });
});
