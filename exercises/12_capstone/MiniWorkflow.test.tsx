import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MiniWorkflow } from './MiniWorkflow';

describe('MiniWorkflow', () => {
  it('starts at the Upload step', () => {
    render(<MiniWorkflow onUpload={vi.fn()} onProcess={vi.fn()} />);
    expect(screen.getByTestId('step')).toHaveTextContent('UPLOAD');
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  it('transitions to Processing after upload', async () => {
    const onUpload = vi.fn(async () => {});
    render(<MiniWorkflow onUpload={onUpload} onProcess={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /upload/i }));

    await waitFor(() => {
      expect(screen.getByTestId('step')).toHaveTextContent('PROCESSING');
    });
    expect(onUpload).toHaveBeenCalledTimes(1);
  });

  it('shows loading state during upload', async () => {
    let resolveUpload!: () => void;
    const onUpload = vi.fn(
      () => new Promise<void>((resolve) => { resolveUpload = resolve; })
    );

    render(<MiniWorkflow onUpload={onUpload} onProcess={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /upload/i }));

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    resolveUpload();
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  it('transitions to Done after processing', async () => {
    const onUpload = vi.fn(async () => {});
    const onProcess = vi.fn(async () => {});

    render(<MiniWorkflow onUpload={onUpload} onProcess={onProcess} />);

    // Upload
    fireEvent.click(screen.getByRole('button', { name: /upload/i }));
    await waitFor(() => {
      expect(screen.getByTestId('step')).toHaveTextContent('PROCESSING');
    });

    // Process
    fireEvent.click(screen.getByRole('button', { name: /process/i }));
    await waitFor(() => {
      expect(screen.getByTestId('step')).toHaveTextContent('DONE');
    });
    expect(onProcess).toHaveBeenCalledTimes(1);
  });

  it('shows completion message at Done', async () => {
    const onUpload = vi.fn(async () => {});
    const onProcess = vi.fn(async () => {});

    render(<MiniWorkflow onUpload={onUpload} onProcess={onProcess} />);

    fireEvent.click(screen.getByRole('button', { name: /upload/i }));
    await waitFor(() => {
      expect(screen.getByTestId('step')).toHaveTextContent('PROCESSING');
    });

    fireEvent.click(screen.getByRole('button', { name: /process/i }));
    await waitFor(() => {
      expect(screen.getByTestId('step')).toHaveTextContent('DONE');
    });

    expect(screen.getByText(/complete/i)).toBeInTheDocument();
  });

  it('handles upload error', async () => {
    const onUpload = vi.fn(async () => { throw new Error('Upload failed'); });

    render(<MiniWorkflow onUpload={onUpload} onProcess={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /upload/i }));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Upload failed');
    });
    // Should stay on Upload step
    expect(screen.getByTestId('step')).toHaveTextContent('UPLOAD');
  });
});
