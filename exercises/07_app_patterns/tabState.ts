export interface Project {
  id: string;
  name: string;
}

export interface SessionTab {
  id: string;
  title: string;
  project: Project;
}

// TODO: create a new tab and make it active.
export function createTab(
  tabs: SessionTab[],
  newId: string,
  title: string,
  projectName: string
): { tabs: SessionTab[]; activeId: string } {
  return { tabs, activeId: '' };
}

// TODO: remove a tab and choose the next active tab.
// If the closed tab was active, activate the previous tab if it exists,
// otherwise the first tab, otherwise null.
export function closeTab(
  tabs: SessionTab[],
  activeId: string | null,
  tabId: string
): { tabs: SessionTab[]; activeId: string | null } {
  return { tabs, activeId };
}

// TODO: update the active tab. If project.name changes, sync title to it.
export function updateActiveTab(
  tabs: SessionTab[],
  activeId: string | null,
  updates: Partial<SessionTab>
): SessionTab[] {
  return tabs;
}
