import React, { useState, createContext, useContext } from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useData } from '../context/DataContext';

export const LayoutContext = createContext({
  mobileMenuOpen: false,
  toggleMobileMenu: () => { },
  closeMobileMenu: () => { },
  sidebarCollapsed: false,
  toggleSidebar: () => { },
});

export const useLayout = () => useContext(LayoutContext);

function Layout() {
  const { isLoggedIn, isAuthLoading } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('mindease_sidebar_collapsed') === 'true';
  });

  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-on-background">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-primary text-2xl animate-spin">sync</span>
          </div>
          <p className="text-sm font-semibold text-on-surface-variant tracking-wide">Restoring session...</p>
        </div>
      </div>
    );
  }

  // Strict Auth Guard: If user has not signed up / logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('mindease_sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <LayoutContext.Provider
      value={{
        mobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        sidebarCollapsed,
        toggleSidebar,
      }}
    >
      <div className="flex h-screen w-screen overflow-hidden bg-background relative">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Backdrop & Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Dark Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
              onClick={closeMobileMenu}
            />

            {/* Slide-out Drawer */}
            <div className="relative w-[75vw] max-w-[300px] bg-surface-container-low h-full p-4 flex flex-col justify-between shadow-2xl z-10 animate-slide-in-left overflow-y-auto overflow-x-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-4 pt-2">
                  <div className="flex items-center gap-2">
                    <img src="/mindEaseLogo.png" alt="MindEase Logo" className="w-6 h-6 object-contain shrink-0 logo-blue" />
                    <div>
                      <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">MindEase</h1>
                      <p className="font-label-md text-label-md text-on-surface-variant">Mental Wellbeing</p>
                    </div>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <nav className="space-y-1">
                  {[
                    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
                    { name: 'Programs', path: '/programs', icon: 'apps' },
                    { name: 'Community', path: '/community', icon: 'group' },
                    { name: 'Resources', path: '/resources', icon: 'menu_book' },
                    { name: 'Chat', path: '/chat', icon: 'forum' },
                    { name: 'Profile', path: '/profile', icon: 'person' },
                  ].map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={closeMobileMenu}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `rounded-xl flex items-center gap-3 px-4 py-3 transition-all active:scale-95 ${isActive
                          ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                        }`
                      }
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span className="font-label-md text-label-md">{item.name}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div className="space-y-2 pt-3 border-t border-outline-variant/10">
                <NavLink
                  to="/emergency"
                  onClick={closeMobileMenu}
                  className="w-full rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-error border border-error/20 hover:bg-error/10 font-semibold transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px] fill-icon">emergency</span>
                  <span className="font-label-md text-label-md">Emergency Support</span>
                </NavLink>
                <NavLink
                  to="/settings"
                  onClick={closeMobileMenu}
                  className="w-full rounded-xl flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">settings</span>
                  <span className="font-label-md text-label-md">Settings</span>
                </NavLink>
                <NavLink
                  to="/help"
                  onClick={closeMobileMenu}
                  className="w-full rounded-xl flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">help</span>
                  <span className="font-label-md text-label-md">Help</span>
                </NavLink>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <div
          className={`${sidebarCollapsed ? 'md:ml-20 duration-[200ms]' : 'md:ml-64 duration-[280ms]'
            } flex-1 flex flex-col h-full min-w-0 overflow-hidden transition-[margin-left] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] will-change-[margin-left]`}
        >
          <main className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-20 md:pb-0">
            <Outlet />
          </main>
        </div>
        <MobileNav />
      </div>
    </LayoutContext.Provider>
  );
}

export default Layout;
