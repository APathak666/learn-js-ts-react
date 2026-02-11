import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TabProvider, useTabContext } from './TabContext';

// Helper component that exposes context for testing
function TestHarness() {
  const { tabs, activeId, createTab, closeTab } = useTabContext();
  return (
    <div>
      <span data-testid="count">{tabs.length}</span>
      <span data-testid="active">{activeId ?? 'none'}</span>
      <span data-testid="titles">{tabs.map(t => t.title).join(',')}</span>
      <button onClick={() => createTab('t1', 'First')}>Create First</button>
      <button onClick={() => createTab('t2', 'Second')}>Create Second</button>
      <button onClick={() => closeTab('t1')}>Close First</button>
      <button onClick={() => closeTab('t2')}>Close Second</button>
    </div>
  );
}

describe('TabContext', () => {
  it('starts empty', () => {
    render(<TabProvider><TestHarness /></TabProvider>);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('active')).toHaveTextContent('none');
  });

  it('createTab adds and activates', () => {
    render(<TabProvider><TestHarness /></TabProvider>);
    fireEvent.click(screen.getByText('Create First'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('active')).toHaveTextContent('t1');
  });

  it('createTab activates the newest tab', () => {
    render(<TabProvider><TestHarness /></TabProvider>);
    fireEvent.click(screen.getByText('Create First'));
    fireEvent.click(screen.getByText('Create Second'));
    expect(screen.getByTestId('active')).toHaveTextContent('t2');
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  it('closeTab selects previous tab', () => {
    render(<TabProvider><TestHarness /></TabProvider>);
    fireEvent.click(screen.getByText('Create First'));
    fireEvent.click(screen.getByText('Create Second'));
    fireEvent.click(screen.getByText('Close Second'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('active')).toHaveTextContent('t1');
  });

  it('closeTab selects null when last tab closed', () => {
    render(<TabProvider><TestHarness /></TabProvider>);
    fireEvent.click(screen.getByText('Create First'));
    fireEvent.click(screen.getByText('Close First'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('active')).toHaveTextContent('none');
  });
});
