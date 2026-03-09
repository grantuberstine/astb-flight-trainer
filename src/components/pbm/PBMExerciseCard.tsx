import type { ReactNode } from 'react';

interface PBMExerciseCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PBMExerciseCard({ title, description, children }: PBMExerciseCardProps) {
  return (
    <div className="rounded-xl border border-navy-700 bg-cockpit-gray p-6">
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-4 text-sm text-navy-300">{description}</p>
      {children}
    </div>
  );
}
