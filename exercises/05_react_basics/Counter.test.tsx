import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('increments and resets', () => {
    render(<Counter />);
    const count = screen.getByTestId('count');
    const inc = screen.getByText('Increment');
    const reset = screen.getByText('Reset');

    expect(count).toHaveTextContent('0');
    fireEvent.click(inc);
    expect(count).toHaveTextContent('1');
    fireEvent.click(inc);
    expect(count).toHaveTextContent('2');
    fireEvent.click(reset);
    expect(count).toHaveTextContent('0');
  });
});
