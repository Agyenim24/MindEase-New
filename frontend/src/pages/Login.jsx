import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col md:flex-row">
      {/* Left Column: Serene Brand Panel (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-primary/10 via-surface-container-high to-secondary-container/20 p-16 flex-col justify-between relative overflow-hidden border-r border-outline-variant/20">
        {/* Soft blur decorations */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl"></div>

        {/* Top brand signature */}
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <span className="font-headline-md text-headline-md font-bold text-primary">MindEase</span>
        </Link>

        {/* Middle emotional quote / visual */}
        <div className="my-auto relative z-10 max-w-lg space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm">spa</span>
              <span>Your Personal Oasis</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
              Take a deep breath. You are back.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Reconnect with your goals, chat with your AI companion, and continue building your mental resilience.
            </p>
          </div>

          {/* Review/Testimonial Card */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 rounded-3xl p-6 shadow-xl card-shadow">
            <p className="italic text-on-surface-variant font-body-md text-body-md mb-4">
              "MindEase has become my daily sanctuary. The AI companion helps me process my work stress in minutes, and the grounding exercises are incredibly effective."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed">
                <img 
                  alt="Sarah Jenkins" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOyFxZRyLPOzv7JOnhXbvm4XHM7OXMP7dPkU0SyIT635aHySENY1gd4odPJo-nreYAZsKdZV-rr_it0dLFQ0qF8AQFEAoQMXiP4QWWeLbOyeG5-0aNFSH0WW177X5dYK_D67BG7cd3h9wj5WKinG45QFQlG_sC5F8GcDNBDXLqQDbP_BO0kPifU4BcsWAvbeB43QItvGZO-2fvDGBbpRSI6UmVRlYLdv8s6oXnhl5zSjEUtce6VugYE5K2DHq5eVlPhnvH5JRJ3hkQ" 
                />
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface">Sarah J.</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">MindEase User since 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[12px] text-on-surface-variant/60 relative z-10 flex gap-4">
          <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>

      {/* Right Column: Interaction Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:p-16 lg:p-24 relative overflow-hidden bg-surface-container-lowest">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden flex justify-between items-center absolute top-6 left-6 right-6">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">MindEase</Link>
          <Link to="/signup" className="text-primary font-label-md text-label-md hover:underline">Sign Up</Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
          {/* Form Header */}
          <div className="space-y-2">
            <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface">Sign In</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-outline-variant/60 rounded-full py-3 bg-surface hover:bg-surface-container-low transition-colors active:scale-95 duration-100 font-label-md text-label-md text-on-surface">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-outline-variant/60 rounded-full py-3 bg-surface hover:bg-surface-container-low transition-colors active:scale-95 duration-100 font-label-md text-label-md text-on-surface">
              <svg className="w-5 h-5 text-on-surface" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.52-.64.73-1.2 1.87-1.05 2.97 1.12.09 2.24-.58 2.98-1.43z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <span className="relative px-4 bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm">
              or sign in with email
            </span>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block font-label-md text-label-md text-on-surface font-medium">Email Address</label>
              <input 
                required
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-outline-variant/60 rounded-2xl px-4 py-3.5 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block font-label-md text-label-md text-on-surface font-medium">Password</label>
                <Link to="#" className="font-label-sm text-label-sm text-primary hover:underline font-semibold">Forgot password?</Link>
              </div>
              <input 
                required
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-outline-variant/60 rounded-2xl px-4 py-3.5 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input 
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-outline-variant/60 text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <label htmlFor="remember" className="font-label-md text-label-md text-on-surface-variant select-none cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-98 transition-all shadow-lg shadow-primary/10 mt-6"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Redirect (For desktop/wider views) */}
          <p className="text-center font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
