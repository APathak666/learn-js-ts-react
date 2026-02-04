import { describe, it, expect } from 'vitest';
import { createTab, closeTab, updateActiveTab, SessionTab } from './tabState';

describe('tabState', () => {
  it('createTab adds a tab and activates it', () => {
    const result = createTab([], 't1', 'New Model', 'Project A');
    expect(result.activeId).toBe('t1');
    expect(result.tabs.length).toBe(1);
    expect(result.tabs[0].title).toBe('New Model');
  });

  it('closeTab chooses previous tab when closing active', () => {
    const tabs: SessionTab[] = [
      { id: 't1', title: 'One', project: { id: 'p1', name: 'One' } },
      { id: 't2', title: 'Two', project: { id: 'p2', name: 'Two' } }
    ];
    const result = closeTab(tabs, 't2', 't2');
    expect(result.tabs.map(t => t.id)).toEqual(['t1']);
    expect(result.activeId).toBe('t1');
  });

  it('updateActiveTab syncs title to project name', () => {
    const tabs: SessionTab[] = [
      { id: 't1', title: 'Old', project: { id: 'p1', name: 'Old' } }
    ];
    const updated = updateActiveTab(tabs, 't1', {
      project: { id: 'p1', name: 'New' }
    });
    expect(updated[0].title).toBe('New');
  });
});
