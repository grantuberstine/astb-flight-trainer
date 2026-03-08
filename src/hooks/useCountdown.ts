import { useState, useRef, useCallback, useEffect } from 'react';

export function useCountdown(totalSeconds: number) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(true);
  const endTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTick = useCallback(() => {
    clearTick();
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const left = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
      setRemaining(left);
      if (left <= 0) {
        clearTick();
      }
    }, 1000);
  }, [clearTick]);

  const pause = useCallback(() => {
    setIsPaused(true);
    clearTick();
    // Store current remaining so resume can recalculate endTime
    setRemaining((prev) => {
      // Recalculate from endTime for accuracy
      const now = Date.now();
      return Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
    });
  }, [clearTick]);

  const resume = useCallback(() => {
    setIsPaused(false);
    setRemaining((prev) => {
      endTimeRef.current = Date.now() + prev * 1000;
      return prev;
    });
    startTick();
  }, [startTick]);

  const reset = useCallback(
    (newTotal?: number) => {
      clearTick();
      const t = newTotal ?? totalSeconds;
      setRemaining(t);
      setIsPaused(true);
      endTimeRef.current = 0;
    },
    [clearTick, totalSeconds],
  );

  const isExpired = remaining <= 0;

  const formatted = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTick();
  }, [clearTick]);

  return { remaining, formatted, isPaused, isExpired, pause, resume, reset };
}
