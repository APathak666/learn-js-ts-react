import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('starts with light theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('toggles to dark on click', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('toggles back to light', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('light')).toBeInTheDocument();
  });
});
