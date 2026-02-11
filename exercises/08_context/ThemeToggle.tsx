import React, { createContext, useContext, useState } from 'react';

// TODO: Create a ThemeContext that provides { theme, toggleTheme }.
// theme should be "light" or "dark", starting at "light".
// toggleTheme should switch between them.

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// TODO: implement the provider.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// TODO: implement the toggle button.
// It should display the current theme and call toggleTheme on click.
export const ThemeToggle: React.FC = () => {
  return <button>TODO</button>;
};
