import { LayoutDashboard } from 'lucide-react';
import { useGamificationStore } from '../stores/gamification-store';
import { useProgressStore } from '../stores/progress-store';
import { ASTB_SECTIONS } from '../lib/constants';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RankProgress } from '../components/dashboard/RankProgress';
import { SectionScoreCard } from '../components/dashboard/SectionScoreCard';
import { StreakTracker } from '../components/dashboard/StreakTracker';
import { BadgeGrid } from '../components/dashboard/BadgeGrid';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export function DashboardPage() {
  const xp = useGamificationStore((s) => s.xp);
  const rank = useGamificationStore((s) => s.rank);
  const currentStreak = useGamificationStore((s) => s.currentStreak);
  const sectionScores = useProgressStore((s) => s.sectionScores);
  const questionHistory = useProgressStore((s) => s.questionHistory);

  const totalAnswered = questionHistory.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-gold-400" />
        <h1 className="text-3xl font-bold">Mission Control</h1>
      </div>

      {/* Stats overview */}
      <DashboardStats
        xp={xp}
        rank={rank}
        streak={currentStreak}
        questionsAnswered={totalAnswered}
      />

      {/* Rank progress */}
      <RankProgress />

      {/* Section scores */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">Section Scores</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ASTB_SECTIONS.map((section) => (
            <SectionScoreCard
              key={section.id}
              section={section}
              score={sectionScores[section.id]}
            />
          ))}
        </div>
      </div>

      {/* Streak */}
      <StreakTracker />

      {/* Badges */}
      <BadgeGrid />

      {/* Recent activity */}
      <RecentActivity history={questionHistory} />
    </div>
  );
}
