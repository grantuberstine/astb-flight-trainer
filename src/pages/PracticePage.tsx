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
          <Target className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold text-slate-800">Practice Missions</h1>
        </div>
        <div className="flex gap-2">
          <Link
            to="/timed-test"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <Clock className="h-4 w-4" />
            Timed Test
          </Link>
          <Link
            to="/full-test"
            className="flex items-center gap-1.5 rounded-xl bg-pink-400 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
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
              className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-colors"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={`rounded-md bg-${section.color}/20 p-2`}>
                  <Icon className={`h-6 w-6 text-${section.color}`} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {section.id}
                  </span>
                  <h3 className="font-bold text-slate-800">{section.name}</h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-slate-500">
                {section.description}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/practice/${section.id}/lesson`}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  Study
                </Link>
                <Link
                  to={`/practice/${section.id}`}
                  className="flex-1 rounded-xl bg-pink-400 px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
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
