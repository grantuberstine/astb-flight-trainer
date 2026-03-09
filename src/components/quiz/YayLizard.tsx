import { useEffect, useState } from 'react';

interface YayLizardProps {
  show: boolean;
}

export function YayLizard({ show }: YayLizardProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        setTimeout(() => setVisible(false), 300);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        animating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Confetti-like background shimmer */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Celebration card */}
      <div
        className={`relative flex flex-col items-center gap-3 rounded-3xl bg-white px-10 py-8 shadow-2xl transition-transform duration-500 ${
          animating ? 'scale-100' : 'scale-75'
        }`}
        style={{
          animation: animating ? 'lizardBounce 0.6s ease-out' : undefined,
        }}
      >
        <img
          src="/yay-lizard.png"
          alt="Excited lizard celebrating"
          className="h-40 w-auto rounded-2xl"
          style={{
            animation: animating ? 'lizardWiggle 0.5s ease-in-out 0.3s both' : undefined,
          }}
        />
        <p className="text-center text-xl font-extrabold text-emerald-600">
          Correct! YAY Lizard!
        </p>
        <div className="flex gap-1">
          {['bg-pink-300', 'bg-sky-300', 'bg-violet-300', 'bg-emerald-300', 'bg-amber-300'].map(
            (color, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${color}`}
                style={{
                  animation: animating
                    ? `confettiDot 0.8s ease-out ${0.2 + i * 0.1}s both`
                    : undefined,
                }}
              />
            ),
          )}
        </div>
      </div>

      <style>{`
        @keyframes lizardBounce {
          0% { transform: scale(0.3) translateY(60px); opacity: 0; }
          50% { transform: scale(1.08) translateY(-10px); opacity: 1; }
          70% { transform: scale(0.96) translateY(2px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes lizardWiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
          75% { transform: rotate(-3deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes confettiDot {
          0% { transform: scale(0) translateY(10px); opacity: 0; }
          60% { transform: scale(1.5) translateY(-5px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
