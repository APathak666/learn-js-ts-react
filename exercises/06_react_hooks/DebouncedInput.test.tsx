import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { DebouncedInput } from './DebouncedInput';

describe('DebouncedInput', () => {
  it('debounces changes', () => {
    vi.useFakeTimers();
    const onDebouncedChange = vi.fn();
    const { getByPlaceholderText } = render(
      <DebouncedInput delayMs={200} onDebouncedChange={onDebouncedChange} />
    );
    const input = getByPlaceholderText('Type...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: 'ab' } });

    // Not yet
    expect(onDebouncedChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(onDebouncedChange).toHaveBeenCalledTimes(1);
    expect(onDebouncedChange).toHaveBeenCalledWith('ab');
    vi.useRealTimers();
  });
});
