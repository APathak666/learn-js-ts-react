import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConditionalPanel } from './ConditionalPanel';

describe('ConditionalPanel', () => {
  it('shows loading', () => {
    render(<ConditionalPanel isLoading={true}>Hi</ConditionalPanel>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error', () => {
    render(<ConditionalPanel isLoading={false} error="Boom">Hi</ConditionalPanel>);
    expect(screen.getByText('Boom')).toBeInTheDocument();
  });

  it('shows children', () => {
    render(<ConditionalPanel isLoading={false}>Hi</ConditionalPanel>);
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });
});
