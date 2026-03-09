interface ProgressDotsProps {
  total: number;
  answers: Array<{ correct: boolean }>;
}

export function ProgressDots({ total, answers }: ProgressDotsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const answer = answers[i];
        let classes = 'h-3 w-3 rounded-full transition-colors';
        if (!answer) {
          classes += ' border-2 border-slate-200 bg-transparent';
        } else if (answer.correct) {
          classes += ' bg-emerald-400';
        } else {
          classes += ' bg-red-400';
        }
        return <div key={i} className={classes} />;
      })}
    </div>
  );
}
