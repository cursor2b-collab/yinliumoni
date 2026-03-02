import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContentContext } from '../context/AppContentContext';

// 仅显示：首页、模拟器、客服（不显示工具、发布页）
const ALLOWED_NAV_IDS = ['home', 'games', 'contact'] as const;
const defaultNavItems = [
  { id: 'home', label: '首页', icon_default: 'https://ik.imagekit.io/avrxcbzni/3s.png', icon_active: 'https://ik.imagekit.io/avrxcbzni/2s.png', route_path: '/' },
  { id: 'games', label: '模拟器', icon_default: 'https://ik.imagekit.io/avrxcbzni/123m%20(8).png', icon_active: 'https://ik.imagekit.io/avrxcbzni/4s.png', route_path: '/games' },
  { id: 'contact', label: '客服', icon_default: 'https://ik.imagekit.io/avrxcbzni/123m%20(6).png', icon_active: 'https://ik.imagekit.io/avrxcbzni/1s.png', route_path: '/contact' },
];

interface BottomNavProps {
  currentPage?: string;
}

export function BottomNav({ currentPage = 'home' }: BottomNavProps) {
  const navigate = useNavigate();
  const { data } = useAppContentContext();
  const raw = data?.bottomNav?.length ? data.bottomNav : defaultNavItems;
  const filtered = raw.filter((r) => ALLOWED_NAV_IDS.includes(r.id as (typeof ALLOWED_NAV_IDS)[number]));
  const ordered = ALLOWED_NAV_IDS.map((id) => filtered.find((r) => r.id === id)).filter(Boolean) as typeof filtered;
  const navItems = ordered.map((r) => ({
    ...r,
    label: r.id === 'games' ? '模拟器' : r.id === 'contact' ? '客服' : r.label,
    route_path: r.id === 'contact' ? '/contact' : r.route_path,
  }));

  const handleNavClick = (_id: string, routePath: string) => {
    if (routePath.startsWith('#')) return;
    navigate(routePath);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-2 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] [background-color:#ffffff]">
      <div className="flex items-center justify-around mx-auto">
        {navItems.map(({ id, icon_default: iconDefault, icon_active: iconActive, label, route_path: routePath }) => (
          <button
            key={id}
            onClick={() => handleNavClick(id, routePath)}
            className="flex flex-col items-center gap-1 px-3 py-1"
          >
            <div className="w-7 h-7 flex items-center justify-center">
              <img
                src={currentPage === id ? iconActive : iconDefault}
                alt={label}
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className={`text-[10px] ${
                currentPage === id ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
