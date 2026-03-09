import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { PBMExerciseCard } from './PBMExerciseCard';

const ROUND_DURATION_SEC = 30;
const UPDATE_INTERVAL_MS = 1500;
const ALTITUDE_MIN = 1000;
const ALTITUDE_MAX = 6000;
const ALTITUDE_SAFE_LOW = 2000;
const ALTITUDE_SAFE_HIGH = 5000;
const HEADING_TOLERANCE = 15;
const MISS_THRESHOLD_MS = 3000;

interface RoundResult {
  detections: number;
  falseAlarms: number;
  misses: number;
  score: number;
}

function randomDrift(current: number, min: number, max: number, maxStep: number): number {
  const drift = (Math.random() - 0.45) * maxStep; // slight bias toward going out of range
  return Math.max(min, Math.min(max, current + drift));
}

function isAltitudeOutOfRange(alt: number): boolean {
  return alt < ALTITUDE_SAFE_LOW || alt > ALTITUDE_SAFE_HIGH;
}

function isHeadingOutOfRange(heading: number, target: number): boolean {
  let diff = Math.abs(heading - target);
  if (diff > 180) diff = 360 - diff;
  return diff > HEADING_TOLERANCE;
}

export function DividedAttention() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION_SEC);
  const [altitude, setAltitude] = useState(3500);
  const [heading, setHeading] = useState(180);
  const [targetHeading] = useState(180);
  const [score, setScore] = useState(0);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const altitudeRef = useRef(3500);
  const headingRef = useRef(180);
  const altOutStartRef = useRef<number | null>(null);
  const hdgOutStartRef = useRef<number | null>(null);
  const statsRef = useRef({ detections: 0, falseAlarms: 0, misses: 0, score: 0 });

  const cleanup = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    intervalRef.current = null;
    timerRef.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const startRound = useCallback(() => {
    cleanup();

    // Reset state
    const startAlt = 3500;
    const startHdg = 180;
    altitudeRef.current = startAlt;
    headingRef.current = startHdg;
    altOutStartRef.current = null;
    hdgOutStartRef.current = null;
    statsRef.current = { detections: 0, falseAlarms: 0, misses: 0, score: 0 };

    setAltitude(startAlt);
    setHeading(startHdg);
    setScore(0);
    setTimeLeft(ROUND_DURATION_SEC);
    setRoundResult(null);
    setIsRunning(true);

    const endTime = Date.now() + ROUND_DURATION_SEC * 1000;

    // Value update interval
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      if (now >= endTime) return; // timer handles end

      // Drift altitude
      const newAlt = Math.round(randomDrift(altitudeRef.current, ALTITUDE_MIN, ALTITUDE_MAX, 500));
      altitudeRef.current = newAlt;
      setAltitude(newAlt);

      // Drift heading
      const newHdg = Math.round(randomDrift(headingRef.current, 120, 240, 12));
      headingRef.current = newHdg;
      setHeading(newHdg);

      // Check for missed detections (altitude)
      if (isAltitudeOutOfRange(newAlt)) {
        if (altOutStartRef.current === null) {
          altOutStartRef.current = now;
        } else if (now - altOutStartRef.current >= MISS_THRESHOLD_MS) {
          statsRef.current.misses++;
          statsRef.current.score--;
          setScore(statsRef.current.score);
          altOutStartRef.current = now; // reset so we don't double-count continuously
        }
      } else {
        altOutStartRef.current = null;
      }

      // Check for missed detections (heading)
      if (isHeadingOutOfRange(newHdg, 180)) {
        if (hdgOutStartRef.current === null) {
          hdgOutStartRef.current = now;
        } else if (now - hdgOutStartRef.current >= MISS_THRESHOLD_MS) {
          statsRef.current.misses++;
          statsRef.current.score--;
          setScore(statsRef.current.score);
          hdgOutStartRef.current = now;
        }
      } else {
        hdgOutStartRef.current = null;
      }
    }, UPDATE_INTERVAL_MS);

    // Countdown timer
    timerRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        // endRound will be called from the effect watching timeLeft
        cleanup();
        setIsRunning(false);
        const s = statsRef.current;
        setRoundResult({ detections: s.detections, falseAlarms: s.falseAlarms, misses: s.misses, score: s.score });
      }
    }, 250);
  }, [cleanup]);

  const handleCorrectAltitude = useCallback(() => {
    if (!isRunning) return;
    if (isAltitudeOutOfRange(altitudeRef.current)) {
      statsRef.current.detections++;
      statsRef.current.score++;
      altOutStartRef.current = null; // reset miss timer
    } else {
      statsRef.current.falseAlarms++;
      statsRef.current.score--;
    }
    setScore(statsRef.current.score);
  }, [isRunning]);

  const handleCorrectHeading = useCallback(() => {
    if (!isRunning) return;
    if (isHeadingOutOfRange(headingRef.current, 180)) {
      statsRef.current.detections++;
      statsRef.current.score++;
      hdgOutStartRef.current = null;
    } else {
      statsRef.current.falseAlarms++;
      statsRef.current.score--;
    }
    setScore(statsRef.current.score);
  }, [isRunning]);

  const altOutOfRange = isAltitudeOutOfRange(altitude);
  const hdgOutOfRange = isHeadingOutOfRange(heading, targetHeading);

  return (
    <PBMExerciseCard
      title="Divided Attention"
      description="PBM tests divided attention -- monitoring multiple instruments simultaneously. Watch both panels and respond when values go out of range."
    >
      <div className="space-y-4">
        {/* Status bar */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Score: <span className="font-semibold text-slate-800">{score}</span>
          </span>
          <span className="font-mono text-slate-500">
            {isRunning ? (
              <span className={timeLeft <= 5 ? 'text-red-500' : 'text-slate-800'}>
                {timeLeft}s
              </span>
            ) : (
              `${ROUND_DURATION_SEC}s round`
            )}
          </span>
        </div>

        {/* Dual panels */}
        <div className="grid grid-cols-2 gap-3">
          {/* Altitude panel */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-1 text-xs font-medium text-slate-500">ALTITUDE</p>
            <p className="text-xs text-slate-500 mb-2">Safe: {ALTITUDE_SAFE_LOW}-{ALTITUDE_SAFE_HIGH} ft</p>
            <p className={`text-center font-mono text-2xl font-bold ${
              isRunning && altOutOfRange ? 'text-red-500' : 'text-slate-800'
            }`}>
              {altitude.toLocaleString()} ft
            </p>
            <button
              onClick={handleCorrectAltitude}
              disabled={!isRunning}
              className="mt-3 w-full rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Correct
            </button>
          </div>

          {/* Heading panel */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-1 text-xs font-medium text-slate-500">HEADING</p>
            <p className="text-xs text-slate-500 mb-2">Target: {targetHeading}&deg; (&plusmn;{HEADING_TOLERANCE}&deg;)</p>
            <p className={`text-center font-mono text-2xl font-bold ${
              isRunning && hdgOutOfRange ? 'text-red-500' : 'text-slate-800'
            }`}>
              {heading}&deg;
            </p>
            <button
              onClick={handleCorrectHeading}
              disabled={!isRunning}
              className="mt-3 w-full rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Correct
            </button>
          </div>
        </div>

        {/* Start / Reset */}
        {!isRunning && !roundResult && (
          <button
            onClick={startRound}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-400 px-4 py-2.5 font-semibold text-white hover:bg-pink-500 transition-colors"
          >
            <Play className="h-4 w-4" />
            Start Round
          </button>
        )}

        {/* Round result */}
        {roundResult && (
          <div className="space-y-3">
            <div className="rounded-lg bg-white border border-slate-100 shadow-sm p-4">
              <p className="mb-2 font-semibold text-slate-800">Round Complete</p>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="text-emerald-500 font-bold text-lg">{roundResult.detections}</p>
                  <p className="text-slate-500">Detections</p>
                </div>
                <div>
                  <p className="text-red-500 font-bold text-lg">{roundResult.falseAlarms}</p>
                  <p className="text-slate-500">False Alarms</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold text-lg">{roundResult.misses}</p>
                  <p className="text-slate-500">Misses</p>
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-slate-500">
                Final score: <span className="font-bold text-slate-800">{roundResult.score}</span>
              </p>
            </div>
            <button
              onClick={startRound}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-400 px-4 py-2.5 font-semibold text-white hover:bg-pink-500 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        )}
      </div>
    </PBMExerciseCard>
  );
}
