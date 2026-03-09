import type { ReactNode } from 'react';

interface PBMExerciseCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PBMExerciseCard({ title, description, children }: PBMExerciseCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
      <h3 className="mb-1 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mb-4 text-sm text-slate-500">{description}</p>
      {children}
    </div>
  );
}
