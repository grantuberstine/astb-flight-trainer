import { Crosshair } from 'lucide-react';
import { MISSIONS } from '../data/missions';
import { useGamificationStore } from '../stores/gamification-store';
import { MissionCard } from '../components/dashboard/MissionCard';

export function MissionsPage() {
  const missionProgress = useGamificationStore((s) => s.missionProgress);
  const startMission = useGamificationStore((s) => s.startMission);

  const activeMissions = MISSIONS.filter((m) => {
    const prog = missionProgress.find((p) => p.missionId === m.id);
    return prog != null && prog.completedAt === null;
  });

  const completedMissions = MISSIONS.filter((m) => {
    const prog = missionProgress.find((p) => p.missionId === m.id);
    return prog != null && prog.completedAt !== null;
  });

  const availableMissions = MISSIONS.filter((m) => {
    return !missionProgress.some((p) => p.missionId === m.id);
  });

  const getProgress = (missionId: string) =>
    missionProgress.find((p) => p.missionId === missionId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Crosshair className="h-8 w-8 text-gold-400" />
        <div>
          <h1 className="text-3xl font-bold">Missions</h1>
          <p className="text-sm text-navy-300">
            Structured study paths to master each ASTB section
          </p>
        </div>
      </div>

      {/* Active Missions */}
      {activeMissions.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gold-400">
            Active Missions ({activeMissions.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {activeMissions.map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                progress={getProgress(m.id)}
                onStart={() => startMission(m.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Available Missions */}
      {availableMissions.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            Available Missions ({availableMissions.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {availableMissions.map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                progress={getProgress(m.id)}
                onStart={() => startMission(m.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed Missions */}
      {completedMissions.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-green-400">
            Completed Missions ({completedMissions.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {completedMissions.map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                progress={getProgress(m.id)}
                onStart={() => startMission(m.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
