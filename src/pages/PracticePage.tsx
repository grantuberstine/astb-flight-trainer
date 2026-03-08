import { Target, Calculator, BookOpen, Wrench, Plane, Compass } from 'lucide-react';
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
      <div className="flex items-center gap-3">
        <Target className="h-8 w-8 text-gold-400" />
        <h1 className="text-3xl font-bold">Practice Missions</h1>
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
              <p className="text-sm text-navy-300">{section.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
