import { Outlet } from 'react-router';
import { Navbar } from './Navbar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-navy-900 text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
