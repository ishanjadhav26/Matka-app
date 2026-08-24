import { NavLink } from 'react-router-dom';
import { Home, LineChart, Star, Settings } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/charts', icon: LineChart, label: 'Charts' },
    { path: '/starline', icon: Star, label: 'Starline' },
    { path: '/admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-accent-500' : 'text-zinc-500 hover:text-zinc-300'
              }`
            }
          >
            <item.icon size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
