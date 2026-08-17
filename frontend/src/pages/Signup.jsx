import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { apiSignup } from '../services/api';

function Signup() {
  const navigate = useNavigate();
  const { isLoggedIn, hasCompletedAssessment, updateProfile, signIn, initNewUserSession } = useData();

  useEffect(() => {
    if (isLoggedIn) {
      if (!hasCompletedAssessment) {
        navigate('/assessment', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isLoggedIn, hasCompletedAssessment, navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Password criteria checks
  const criteria = {
    length: password.length >= 8,
    letters: /[a-zA-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  const getStrengthInfo = () => {
    if (!password) return { label: 'Empty', color: 'bg-outline-variant', text: 'text-outline' };
    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
    if (score === 3) return { label: 'Good', color: 'bg-sky-500', text: 'text-sky-500' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
  };

  const strength = getStrengthInfo();
  const isStrong = score === 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) return;

    if (!isStrong) {
      setErrorMsg('Please choose a strong password that meets all 4 requirements below.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await apiSignup({
        name: name || 'New User',
        email,
        password
      });

      initNewUserSession(res.user);
      navigate('/assessment');
    } catch (err) {
      console.error('Signup error:', err);
      setErrorMsg(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-on-background">
      {/* Left Image Panel */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80"
          alt="Peaceful sunset landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        <Link to="/" className="absolute top-8 left-8 z-10 flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-lg fill-icon">spa</span>
          </div>
          <span className="text-[22px] font-bold text-white tracking-tight drop-shadow-lg">MindEase</span>
        </Link>

        <div className="absolute bottom-10 left-8 right-8 z-10 space-y-2">
          <h2 className="text-3xl xl:text-[38px] leading-[1.15] font-bold text-white tracking-tight drop-shadow-lg">
            Begin your path to a<br />
            <span className="text-primary-fixed">calmer mind.</span>
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-full drop-shadow">
            Join thousands building better mental health every day with MindEase.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-surface-container-lowest px-6 py-12 sm:px-10 md:px-16 relative overflow-hidden">
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <Link to="/" className="lg:hidden font-bold text-xl text-primary tracking-tight">MindEase</Link>
          <Link to="/" className="hidden lg:flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors group">
            <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            <span>Back to Home</span>
          </Link>
          <Link to="/login" className="text-primary text-sm font-semibold hover:underline">
            Log In
          </Link>
        </div>

        <div className="w-full max-w-[420px] space-y-6 animate-slide-up">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">Create your account</h1>
            <p className="text-on-surface-variant text-sm">Free access to core mental wellness tools.</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 text-rose-600 rounded-xl text-xs font-semibold border border-rose-500/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-semibold text-on-surface">
                Full Name
              </label>
              <input
                required
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold text-on-surface">
                Email Address
              </label>
              <input
                required
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-on-surface">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="e.g. Strong@2026!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Password Strength Progress Bar */}
              {password.length > 0 && (
                <div className="space-y-2 pt-1 animate-fade-in">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-medium">Password Strength:</span>
                    <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                  </div>

                  {/* 4-segment Progress Indicator */}
                  <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full rounded-full transition-all duration-300 ${step <= score ? strength.color : 'bg-outline-variant/30'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Criteria Checklist */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                    <div className={`flex items-center gap-1 ${criteria.length ? 'text-emerald-600 font-semibold' : 'text-on-surface-variant/70'}`}>
                      <span className="material-symbols-outlined text-xs">
                        {criteria.length ? 'check_circle' : 'cancel'}
                      </span>
                      <span>Min. 8 characters</span>
                    </div>

                    <div className={`flex items-center gap-1 ${criteria.letters ? 'text-emerald-600 font-semibold' : 'text-on-surface-variant/70'}`}>
                      <span className="material-symbols-outlined text-xs">
                        {criteria.letters ? 'check_circle' : 'cancel'}
                      </span>
                      <span>Letters (a-z, A-Z)</span>
                    </div>

                    <div className={`flex items-center gap-1 ${criteria.numbers ? 'text-emerald-600 font-semibold' : 'text-on-surface-variant/70'}`}>
                      <span className="material-symbols-outlined text-xs">
                        {criteria.numbers ? 'check_circle' : 'cancel'}
                      </span>
                      <span>Numbers (0-9)</span>
                    </div>

                    <div className={`flex items-center gap-1 ${criteria.symbols ? 'text-emerald-600 font-semibold' : 'text-on-surface-variant/70'}`}>
                      <span className="material-symbols-outlined text-xs">
                        {criteria.symbols ? 'check_circle' : 'cancel'}
                      </span>
                      <span>Symbols (@, #, !, $)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                required
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-outline-variant accent-primary cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
                I agree to the{' '}
                <Link
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </Link>{' '}
                &amp;{' '}
                <Link
                  to="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreeTerms || (password.length > 0 && !isStrong)}
              className="w-full bg-primary text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-primary/90 active:scale-98 transition-all shadow-lg shadow-primary/20 mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Creating Account...' : 'Create Free Account'}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>

          <p className="text-center text-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
