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
    ? 'border-l-green-500'
    : isActive
      ? 'border-l-gold-500'
      : 'border-l-navy-600';

  return (
    <div className={`rounded-lg bg-navy-800 border-l-4 ${borderColor} p-5`}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{mission.name}</h3>
          <p className="mt-1 text-sm text-navy-300">{mission.description}</p>
        </div>
        <div className="ml-3 flex items-center gap-1 text-sm font-semibold text-gold-400">
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
                <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-navy-500" />
              )}
              <span className={done ? 'text-green-300 line-through' : 'text-navy-200'}>
                {obj.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Progress bar (active only) */}
      {isActive && (
        <div className="mb-4">
          <div className="h-2 rounded-full bg-navy-700">
            <div
              className="h-2 rounded-full bg-gold-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-navy-400">{progressPercent}% complete</p>
        </div>
      )}

      {/* Action / status */}
      {isCompleted ? (
        <div className="flex items-center gap-2 text-sm font-medium text-green-400">
          <Trophy className="h-4 w-4" />
          Completed {new Date(progress.completedAt!).toLocaleDateString()}
        </div>
      ) : isActive ? (
        <div className="inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1 text-sm font-medium text-gold-400">
          In Progress - {progressPercent}%
        </div>
      ) : (
        <button
          onClick={onStart}
          className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
        >
          Start Mission
        </button>
      )}
    </div>
  );
}
