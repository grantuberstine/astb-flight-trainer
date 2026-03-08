import { Link } from 'react-router';
import {
  Clock,
  Target,
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
} from 'lucide-react';
import { ASTB_SECTIONS, TIMED_TEST_CONFIG } from '../lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return `${m} min`;
}

export function TimedTestPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Clock className="h-8 w-8 text-gold-400" />
        <div>
          <h1 className="text-3xl font-bold">Timed Tests</h1>
          <p className="text-sm text-navy-300">
            Practice under real ASTB time constraints
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ASTB_SECTIONS.map((section) => {
          const Icon = iconMap[section.icon] ?? Target;
          const config = TIMED_TEST_CONFIG[section.id];

          return (
            <Link
              key={section.id}
              to={`/timed-test/${section.id}`}
              className="group rounded-lg border border-navy-700 bg-navy-800 p-6 transition-colors hover:border-gold-500/30"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={`rounded-md bg-${section.color}/20 p-2`}>
                  <Icon className={`h-6 w-6 text-${section.color}`} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy-300">
                    {section.id}
                  </span>
                  <h3 className="font-bold text-white">{section.name}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-navy-300">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gold-400" />
                  <span>{formatTime(config.timeLimitSec)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3.5 w-3.5 text-gold-400" />
                  <span>{config.questionCount} questions</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
