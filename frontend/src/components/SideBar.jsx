import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Programs', path: '/programs', icon: 'apps' },
    { name: 'Community', path: '/community', icon: 'group' },
    { name: 'Resources', path: '/resources', icon: 'menu_book' },
    { name: 'Chat', path: '/chat', icon: 'forum' },
    { name: 'Profile', path: '/profile', icon: 'person' },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-surface-container-low border-r border-outline-variant/20 z-50 p-4 space-y-2">
      <div className="px-4 py-6 mb-4">
        <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">MindEase</h1>
        <p className="font-label-md text-label-md text-on-surface-variant mt-1">Mental Wellbeing</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => 
              `rounded-xl flex items-center gap-3 px-4 py-3 transition-all active:scale-[0.98] ${
                isActive 
                  ? 'bg-primary-container text-on-primary-container' 
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-4 border-t border-outline-variant/10">
        <button className="w-full text-error border border-error/20 hover:bg-error/5 rounded-xl px-4 py-3 flex items-center justify-center gap-3 transition-all mb-4">
          <span className="material-symbols-outlined text-[20px]">emergency</span>
          <span className="font-label-md text-label-md">Emergency Support</span>
        </button>
        <button className="w-full text-on-surface-variant hover:bg-surface-container-high rounded-xl flex items-center gap-3 px-4 py-3 transition-all">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </button>
        <button className="w-full text-on-surface-variant hover:bg-surface-container-high rounded-xl flex items-center gap-3 px-4 py-3 transition-all">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-md text-label-md">Help</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
