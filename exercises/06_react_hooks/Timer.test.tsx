import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timer } from './Timer';

describe('Timer', () => {
  it('ticks every second', () => {
    vi.useFakeTimers();
    render(<Timer />);
    const seconds = screen.getByTestId('seconds');
    expect(seconds).toHaveTextContent('0');
    vi.advanceTimersByTime(1000);
    expect(seconds).toHaveTextContent('1');
    vi.advanceTimersByTime(2000);
    expect(seconds).toHaveTextContent('3');
    vi.useRealTimers();
  });
});
