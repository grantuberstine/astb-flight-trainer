import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { indexedDBStorage } from '../lib/storage';

interface SettingsState {
  testDate: string | null;
  soundEnabled: boolean;
  theme: string;

  setTestDate: (date: string | null) => void;
  toggleSound: () => void;
  setTheme: (theme: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      testDate: null,
      soundEnabled: true,
      theme: 'dark',

      setTestDate: (date) => set({ testDate: date }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'astb-settings',
      storage: indexedDBStorage,
      version: 1,
      partialize: (state) => ({
        testDate: state.testDate,
        soundEnabled: state.soundEnabled,
        theme: state.theme,
      }),
    },
  ),
);
