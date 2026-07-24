import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-[32px] font-bold text-primary tracking-tight flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl fill-icon">spa</span>
          <span>MindEase</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              `relative pb-1 text-base font-medium transition ${
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`
            }
          >
            Resources
          </NavLink>

          <NavLink
            to="/programs"
            className={({ isActive }) =>
              `relative pb-1 text-base font-medium transition ${
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`
            }
          >
            Programs
          </NavLink>

          <NavLink
            to="/community"
            className={({ isActive }) =>
              `relative pb-1 text-base font-medium transition ${
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`
            }
          >
            Community
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/login"
            className="text-sm sm:text-base text-on-surface-variant hover:text-primary font-medium"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-primary hover:opacity-90 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition duration-300 shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;