import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { List } from './List';

describe('List', () => {
  it('renders items', () => {
    render(<List items={['a', 'b']} />);
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<List items={[]} />);
    expect(screen.getByText('No items')).toBeInTheDocument();
  });
});
