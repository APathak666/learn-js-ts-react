import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropsCard } from './PropsCard';

describe('PropsCard', () => {
  it('renders and handles click', () => {
    const onSelect = vi.fn();
    render(<PropsCard name="Cold Plate" status="READY" onSelect={onSelect} />);

    expect(screen.getByText('Cold Plate')).toBeInTheDocument();
    expect(screen.getByText('READY')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cold Plate'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
