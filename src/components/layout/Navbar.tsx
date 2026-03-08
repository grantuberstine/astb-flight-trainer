import { NavLink } from 'react-router';
import { Plane, LayoutDashboard, Target, TrendingUp, Settings } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/practice', label: 'Practice', icon: Target },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Navbar() {
  return (
    <nav className="bg-navy-800 border-b border-navy-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-gold-400" />
          <span className="hidden text-lg font-bold text-white sm:inline">
            ASTB Flight Trainer
          </span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-b-2 border-gold-400 text-gold-400'
                    : 'text-navy-300 hover:text-white'
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
