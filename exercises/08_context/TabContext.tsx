import React, { createContext, useCallback, useContext, useState } from 'react';

export interface Tab {
  id: string;
  title: string;
}

interface TabContextType {
  tabs: Tab[];
  activeId: string | null;
  createTab: (id: string, title: string) => void;
  closeTab: (id: string) => void;
  setActiveId: (id: string) => void;
}

const TabContext = createContext<TabContextType | null>(null);

export function useTabContext(): TabContextType {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('useTabContext must be used within TabProvider');
  return ctx;
}

// TODO: implement the provider.
// - createTab: append a new tab and make it active.
// - closeTab: remove the tab. If it was active, activate the previous tab,
//   or the first remaining tab, or null.
// - setActiveId: set the active tab.
export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const createTab = useCallback((id: string, title: string) => {
    // TODO
  }, []);

  const closeTab = useCallback((id: string) => {
    // TODO
  }, []);

  return (
    <TabContext.Provider value={{ tabs, activeId, createTab, closeTab, setActiveId }}>
      {children}
    </TabContext.Provider>
  );
};
