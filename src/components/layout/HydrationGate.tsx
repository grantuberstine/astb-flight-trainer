import { useEffect, useState } from 'react';
import { useProgressStore } from '../../stores/progress-store';
import { useGamificationStore } from '../../stores/gamification-store';
import { useSettingsStore } from '../../stores/settings-store';

export function HydrationGate({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(() => {
    return (
      useProgressStore.persist.hasHydrated() &&
      useGamificationStore.persist.hasHydrated() &&
      useSettingsStore.persist.hasHydrated()
    );
  });

  useEffect(() => {
    if (hydrated) return;

    const unsubs = [
      useProgressStore.persist.onFinishHydration(() => checkAll()),
      useGamificationStore.persist.onFinishHydration(() => checkAll()),
      useSettingsStore.persist.onFinishHydration(() => checkAll()),
    ];

    function checkAll() {
      if (
        useProgressStore.persist.hasHydrated() &&
        useGamificationStore.persist.hasHydrated() &&
        useSettingsStore.persist.hasHydrated()
      ) {
        setHydrated(true);
      }
    }

    // Check once immediately in case stores hydrated between render and effect
    checkAll();

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [hydrated]);

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-navy-900">
        <p className="text-gold-400 text-lg">Loading your flight data...</p>
      </div>
    );
  }

  return <>{children}</>;
}
