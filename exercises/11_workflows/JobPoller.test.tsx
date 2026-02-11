import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JobPoller, JobState } from './JobPoller';

describe('JobPoller', () => {
  it('shows initial PENDING state', () => {
    const getStatus = vi.fn(async () => 'PENDING' as JobState);
    render(<JobPoller getStatus={getStatus} intervalMs={100} />);
    expect(screen.getByTestId('status')).toHaveTextContent('PENDING');
  });

  it('polls and updates state', async () => {
    vi.useFakeTimers();
    const states: JobState[] = ['PENDING', 'RUNNING', 'COMPLETED'];
    const getStatus = vi.fn(async () => states.shift() || 'COMPLETED');

    render(<JobPoller getStatus={getStatus} intervalMs={100} />);

    // First poll (immediate)
    await vi.advanceTimersByTimeAsync(0);
    expect(screen.getByTestId('status')).toHaveTextContent('PENDING');

    // Second poll
    await vi.advanceTimersByTimeAsync(100);
    expect(screen.getByTestId('status')).toHaveTextContent('RUNNING');

    // Third poll
    await vi.advanceTimersByTimeAsync(100);
    expect(screen.getByTestId('status')).toHaveTextContent('COMPLETED');

    // Should stop polling after COMPLETED
    await vi.advanceTimersByTimeAsync(100);
    expect(getStatus).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });

  it('stops polling on FAILED', async () => {
    vi.useFakeTimers();
    const states: JobState[] = ['RUNNING', 'FAILED'];
    const getStatus = vi.fn(async () => states.shift() || 'FAILED');

    render(<JobPoller getStatus={getStatus} intervalMs={50} />);

    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(50);

    expect(screen.getByTestId('status')).toHaveTextContent('FAILED');

    await vi.advanceTimersByTimeAsync(200);
    expect(getStatus).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
