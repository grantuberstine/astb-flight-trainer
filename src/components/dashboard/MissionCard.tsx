import { CheckCircle, Circle, Trophy, Zap } from 'lucide-react';
import type { Mission, MissionProgress } from '../../types/gamification';

interface MissionCardProps {
  mission: Mission;
  progress: MissionProgress | undefined;
  onStart: () => void;
}

export function MissionCard({ mission, progress, onStart }: MissionCardProps) {
  const isCompleted = progress?.completedAt != null;
  const isActive = progress != null && !isCompleted;
  const completedCount = progress?.objectiveProgress.filter(Boolean).length ?? 0;
  const totalObjectives = mission.objectives.length;
  const progressPercent = totalObjectives > 0 ? Math.round((completedCount / totalObjectives) * 100) : 0;

  const borderColor = isCompleted
    ? 'border-l-emerald-400'
    : isActive
      ? 'border-l-pink-400'
      : 'border-l-slate-200';

  return (
    <div className={`rounded-2xl bg-white border-l-4 ${borderColor} p-5 shadow-sm border border-slate-100`}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{mission.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{mission.description}</p>
        </div>
        <div className="ml-3 flex items-center gap-1 text-sm font-semibold text-pink-500">
          <Zap className="h-4 w-4" />
          {mission.xpReward} XP
        </div>
      </div>

      {/* Objectives checklist */}
      <ul className="mb-4 space-y-2">
        {mission.objectives.map((obj, idx) => {
          const done = progress?.objectiveProgress[idx] ?? false;
          return (
            <li key={idx} className="flex items-center gap-2 text-sm">
              {done ? (
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-slate-500" />
              )}
              <span className={done ? 'text-emerald-500 line-through' : 'text-slate-600'}>
                {obj.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Progress bar (active only) */}
      {isActive && (
        <div className="mb-4">
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-pink-400 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">{progressPercent}% complete</p>
        </div>
      )}

      {/* Action / status */}
      {isCompleted ? (
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-500">
          <Trophy className="h-4 w-4" />
          Completed {new Date(progress.completedAt!).toLocaleDateString()}
        </div>
      ) : isActive ? (
        <div className="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-500">
          In Progress - {progressPercent}%
        </div>
      ) : (
        <button
          onClick={onStart}
          className="rounded-xl bg-pink-400 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pink-500"
        >
          Start Mission
        </button>
      )}
    </div>
  );
}
