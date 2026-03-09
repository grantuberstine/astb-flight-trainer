import { NavLink } from 'react-router';
import { Plane, LayoutDashboard, Target, Crosshair, Timer, TrendingUp, Settings } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/practice', label: 'Practice', icon: Target },
  { to: '/missions', label: 'Missions', icon: Crosshair },
  { to: '/challenge', label: 'Challenges', icon: Timer },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 shadow-sm">
            <Plane className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="hidden text-lg font-bold text-slate-800 sm:inline">
            ASTB Flight Trainer
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-pink-50 text-pink-500'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-600'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
