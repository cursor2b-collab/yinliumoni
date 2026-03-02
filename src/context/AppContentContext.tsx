import React, { createContext, useContext } from 'react';
import { useAppContent, type AppContent } from '../hooks/useAppContent';

const AppContentContext = createContext<{ data: AppContent; loading: boolean } | null>(null);

export function AppContentProvider({ children }: { children: React.ReactNode }) {
  const value = useAppContent();
  return (
    <AppContentContext.Provider value={value}>
      {children}
    </AppContentContext.Provider>
  );
}

export function useAppContentContext() {
  const ctx = useContext(AppContentContext);
  if (!ctx) {
    return {
      data: null,
      loading: false,
    };
  }
  return ctx;
}
