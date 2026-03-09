import { Star } from 'lucide-react';

interface XPNotificationProps {
  amount: number;
  visible: boolean;
}

export function XPNotification({ amount, visible }: XPNotificationProps) {
  return (
    <div
      className={`pointer-events-none fixed right-4 top-4 z-50 flex items-center gap-2 rounded-lg bg-pink-400 px-4 py-2.5 font-bold text-white shadow-lg transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-4 opacity-0'
      }`}
    >
      <Star className="h-5 w-5" />
      +{amount} XP
    </div>
  );
}
