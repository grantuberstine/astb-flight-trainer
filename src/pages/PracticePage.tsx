import { Link } from 'react-router';
import {
  Target,
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
  Clock,
  Trophy,
} from 'lucide-react';
import { ASTB_SECTIONS } from '../lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
};

export function PracticePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-gold-400" />
          <h1 className="text-3xl font-bold">Practice Missions</h1>
        </div>
        <div className="flex gap-2">
          <Link
            to="/timed-test"
            className="flex items-center gap-1.5 rounded-lg border border-navy-500 px-3 py-2 text-sm font-medium text-navy-200 transition-colors hover:bg-navy-700"
          >
            <Clock className="h-4 w-4" />
            Timed Test
          </Link>
          <Link
            to="/full-test"
            className="flex items-center gap-1.5 rounded-lg bg-gold-500 px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          >
            <Trophy className="h-4 w-4" />
            Full Practice Test
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ASTB_SECTIONS.map((section) => {
          const Icon = iconMap[section.icon] ?? Target;
          return (
            <div
              key={section.id}
              className="rounded-lg bg-navy-800 p-6 transition-colors"
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
              <p className="mb-4 text-sm text-navy-300">
                {section.description}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/practice/${section.id}/lesson`}
                  className="flex-1 rounded-lg border border-navy-500 px-3 py-2 text-center text-sm font-medium text-navy-200 transition-colors hover:bg-navy-700"
                >
                  Study
                </Link>
                <Link
                  to={`/practice/${section.id}`}
                  className="flex-1 rounded-lg bg-gold-500 px-3 py-2 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
                >
                  Practice
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
