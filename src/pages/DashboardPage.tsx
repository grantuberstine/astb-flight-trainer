import { LayoutDashboard, Compass, Crosshair, CalendarDays, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { useGamificationStore } from '../stores/gamification-store';
import { useProgressStore } from '../stores/progress-store';
import { useAdaptiveStore } from '../stores/adaptive-store';
import { ASTB_SECTIONS } from '../lib/constants';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RankProgress } from '../components/dashboard/RankProgress';
import { SectionScoreCard } from '../components/dashboard/SectionScoreCard';
import { StreakTracker } from '../components/dashboard/StreakTracker';
import { BadgeGrid } from '../components/dashboard/BadgeGrid';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ReviewBanner } from '../components/adaptive/ReviewBanner';

export function DashboardPage() {
  const xp = useGamificationStore((s) => s.xp);
  const rank = useGamificationStore((s) => s.rank);
  const currentStreak = useGamificationStore((s) => s.currentStreak);
  const sectionScores = useProgressStore((s) => s.sectionScores);
  const questionHistory = useProgressStore((s) => s.questionHistory);
  const adaptiveMode = useAdaptiveStore((s) => s.adaptiveMode);
  const setAdaptiveMode = useAdaptiveStore((s) => s.setAdaptiveMode);
  const diagnosticResults = useAdaptiveStore((s) => s.diagnosticResults);
  const lastDiagnosticAt = useAdaptiveStore((s) => s.lastDiagnosticAt);

  const totalAnswered = questionHistory.length;
  const lastDiagnostic = diagnosticResults.length > 0
    ? diagnosticResults[diagnosticResults.length - 1]
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-gold-400" />
        <h1 className="text-3xl font-bold">Mission Control</h1>
      </div>

      {/* Review banner */}
      <ReviewBanner />

      {/* Adaptive mode toggle */}
      <div className="flex items-center justify-between rounded-xl border border-navy-700 bg-navy-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-gold-400" />
          <div>
            <p className="text-sm font-medium text-white">Adaptive Mode</p>
            <p className="text-xs text-navy-400">
              Prioritizes your weak areas and review cards
            </p>
          </div>
        </div>
        <button
          onClick={() => setAdaptiveMode(!adaptiveMode)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            adaptiveMode ? 'bg-gold-500' : 'bg-navy-600'
          }`}
          aria-label={adaptiveMode ? 'Disable adaptive mode' : 'Enable adaptive mode'}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
              adaptiveMode ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Diagnostic summary */}
      {lastDiagnostic && lastDiagnosticAt && (
        <div className="flex items-center justify-between rounded-xl border border-navy-700 bg-cockpit-gray px-4 py-3">
          <div className="flex items-center gap-3">
            <Crosshair className="h-5 w-5 text-gold-400" />
            <div>
              <p className="text-sm font-medium text-white">
                Last Diagnostic: {Math.round(lastDiagnostic.overallAccuracy * 100)}% accuracy
              </p>
              <p className="text-xs text-navy-400">
                {new Date(lastDiagnosticAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Link
            to="/diagnostic"
            className="text-sm font-medium text-gold-400 hover:text-gold-300"
          >
            View
          </Link>
        </div>
      )}

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

      {/* Quick links */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">Training Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/diagnostic"
            className="flex items-center gap-3 rounded-xl border border-navy-700 bg-cockpit-gray p-4 transition-colors hover:border-gold-400/50"
          >
            <Crosshair className="h-8 w-8 shrink-0 text-gold-400" />
            <div>
              <p className="font-semibold text-white">Diagnostic Assessment</p>
              <p className="text-xs text-navy-300">
                Identify your strengths and weaknesses across all sections
              </p>
            </div>
          </Link>
          <Link
            to="/study-plan"
            className="flex items-center gap-3 rounded-xl border border-navy-700 bg-cockpit-gray p-4 transition-colors hover:border-gold-400/50"
          >
            <CalendarDays className="h-8 w-8 shrink-0 text-gold-400" />
            <div>
              <p className="font-semibold text-white">Study Plan</p>
              <p className="text-xs text-navy-300">
                Generate a weekly plan based on your test date and performance
              </p>
            </div>
          </Link>
          <Link
            to="/pbm-trainer"
            className="flex items-center gap-3 rounded-xl border border-navy-700 bg-cockpit-gray p-4 transition-colors hover:border-gold-400/50"
          >
            <Compass className="h-8 w-8 shrink-0 text-gold-400" />
            <div>
              <p className="font-semibold text-white">PBM Trainer</p>
              <p className="text-xs text-navy-300">
                Practice directional reasoning and divided attention
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      <RecentActivity history={questionHistory} />
    </div>
  );
}
