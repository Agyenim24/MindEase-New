import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─── Data ─────────────────────────────────────────────────────── */

const features = [
  {
    icon: 'auto_awesome',
    title: 'AI Companion',
    desc: 'Empathetic, 24/7 conversational support that understands your context and provides immediate relief.',
    color: 'bg-primary-container/10 text-primary',
  },
  {
    icon: 'show_chart',
    title: 'Mood Tracking',
    desc: 'Visualize emotional trends over time to identify triggers and celebrate your progress toward stability.',
    color: 'bg-secondary-container/20 text-secondary',
  },
  {
    icon: 'psychology',
    title: 'CBT Exercises',
    desc: 'Evidence-based techniques for managing stress, anxiety, and negative thought patterns on your own terms.',
    color: 'bg-tertiary-container/20 text-tertiary',
  },
  {
    icon: 'emergency',
    title: 'Crisis Support',
    desc: 'Immediate access to localized crisis resources and helplines when you need human intervention fast.',
    color: 'bg-error-container/20 text-error',
  },
];

const howItWorks = [
  {
    step: '01',
    icon: 'psychology_alt',
    title: 'Take the Assessment',
    desc: 'A 2-minute quiz identifies your emotional needs, stress triggers, and wellness goals so we can personalize your entire experience from the first session.',
  },
  {
    step: '02',
    icon: 'auto_awesome',
    title: 'Meet Your AI Companion',
    desc: 'Your calibrated AI companion is ready to listen 24/7. Trained on clinical CBT and mindfulness frameworks by psychologists from leading research institutions.',
  },
  {
    step: '03',
    icon: 'apps',
    title: 'Follow Your Care Plan',
    desc: 'Access a personalized library of programs, breathing exercises, and daily reflections — all adapted to your pace and progress over time.',
  },
  {
    step: '04',
    icon: 'monitoring',
    title: 'Track Your Progress',
    desc: 'Mood graphs, streak counters, and milestone celebrations help you see real growth and stay motivated on your wellness journey.',
  },
];

const privacyPillars = [
  {
    icon: 'enhanced_encryption',
    title: 'End-to-End Encryption',
    desc: 'Every conversation is encrypted from your device to our secure, firewalled servers using AES-256.',
  },
  {
    icon: 'person_off',
    title: 'Total Anonymity',
    desc: 'Use MindEase without disclosing your legal identity. Your peace of mind is protected by design.',
  },
  {
    icon: 'verified_user',
    title: 'HIPAA Compliant',
    desc: 'We adhere to the highest clinical data standards and federal privacy regulations in healthcare.',
  },
];

const stats = [
  { value: '20K+', label: 'Active Users', icon: 'group' },
  { value: '4.9★', label: 'Average Rating', icon: 'star' },
  { value: '98%', label: 'Privacy Uptime', icon: 'shield' },
  { value: '24/7', label: 'AI Availability', icon: 'schedule' },
];

const testimonials = [
  {
    quote: '"The AI companion helped me through a panic attack at 3 AM when I felt I had nowhere else to turn. It\'s truly a lifeline."',
    name: 'David R.',
    role: 'Software Engineer',
    avatar: 'bg-primary-container/30',
    initials: 'DR',
  },
  {
    quote: '"I\'ve tried many apps, but MindEase\'s CBT exercises feel the most scientific and helpful. The mood tracking is also eye-opening."',
    name: 'Sarah J.',
    role: 'Educator',
    avatar: 'bg-secondary-container/30',
    initials: 'SJ',
  },
  {
    quote: '"The privacy features are what sold me. Knowing my conversations are encrypted makes me feel safe to be truly vulnerable."',
    name: 'Alex M.',
    role: 'Healthcare Worker',
    avatar: 'bg-tertiary-container/30',
    initials: 'AM',
  },
];

const faqs = [
  {
    question: 'Is MindEase a replacement for therapy?',
    answer:
      'MindEase is a support tool designed to complement clinical therapy or provide early-intervention support. We are not a crisis service or a replacement for licensed 1-on-1 psychotherapy for severe conditions.',
  },
  {
    question: 'How secure is my data?',
    answer:
      'Your data is end-to-end encrypted and HIPAA compliant. We use the same security standards as major financial institutions and hospitals to ensure your conversations remain private and anonymous.',
  },
  {
    question: 'Who developed the AI?',
    answer:
      'Our AI was developed in partnership with clinical psychologists from Stanford and Yale to ensure it provides evidence-based, empathetic, and safe guidance.',
  },
  {
    question: 'Can I use MindEase for free?',
    answer:
      'Yes! MindEase offers a free 14-day trial with full access to all features, AI companion chats, and CBT exercises. No credit card is required to sign up.',
  },
  {
    question: 'What evidence-based frameworks does MindEase use?',
    answer:
      'Our AI companion and self-help modules draw upon Cognitive Behavioral Therapy (CBT), Mindfulness-Based Stress Reduction (MBSR), and Positive Psychology principles.',
  },
];

/* ─── Reveal-on-scroll hook ─────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────── */
function LearnMore() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col scroll-smooth">

      {/* ── Sticky Navbar ──────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl fill-icon">spa</span>
          <span className="font-headline-md text-headline-md font-bold text-primary">MindEase</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Features</a>
          <a href="#how-it-works" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">How It Works</a>
          <a href="#faq" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block text-on-surface-variant hover:text-primary transition-all font-body-md text-body-md px-4 py-2">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-primary text-white px-6 py-2.5 rounded-full font-body-md text-body-md hover:opacity-90 transition-all active:scale-95 shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="pt-20 flex-grow">

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-24 md:py-36 px-margin-mobile md:px-margin-desktop">
          {/* Background gradient blobs */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-fixed/30 to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl -z-10 animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-container/15 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '-3s' }} />

          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm tracking-wider uppercase">
              A New Standard for Wellness
            </span>
            <h1 className="text-4xl md:text-[52px] font-bold text-on-surface leading-tight tracking-tight">
              The Science of <span className="text-primary">Serenity</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              Mental wellness shouldn't be a luxury. MindEase combines clinical rigor with cutting-edge technology to provide an accessible bridge between therapeutic science and your daily life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link
                to="/signup"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span>Begin Your Journey</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <a
                href="#how-it-works"
                className="border border-primary text-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">play_circle</span>
                <span>How It Works</span>
              </a>
            </div>

            {/* Floating stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="glass-panel rounded-2xl p-4 text-center border border-outline-variant/20 card-shadow">
                  <span className="material-symbols-outlined text-primary text-2xl mb-1 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {s.icon}
                  </span>
                  <p className="font-bold text-xl text-on-surface">{s.value}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Grid ──────────────────────────────────────────── */}
        <section id="features" className="py-20 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
          <div className="max-w-7xl mx-auto">
            <RevealSection className="text-center mb-14 space-y-3">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Your Mental Wellness Toolkit</span>
              <h2 className="text-3xl font-bold text-on-surface">Everything you need, in one place</h2>
              <p className="text-on-surface-variant max-w-full mx-auto">
                Evidence-based tools designed by clinicians to support you every step of the way.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <RevealSection key={f.title} delay={i * 80}>
                  <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 card-shadow hover:scale-[1.02] hover:shadow-lg transition-all duration-300 h-full space-y-4">
                    <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-xl">{f.icon}</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{f.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ───────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-7xl mx-auto">
            <RevealSection className="text-center mb-14 space-y-3">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Simple & Transparent</span>
              <h2 className="text-3xl font-bold text-on-surface">Your journey in 4 steps</h2>
              <p className="text-on-surface-variant max-w-full mx-auto">
                From your first assessment to lasting daily habits — the MindEase path is clear and supportive.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector line (desktop only) */}
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-outline-variant/40 z-0" />

              {howItWorks.map((step, i) => (
                <RevealSection key={step.step} delay={i * 100} className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-primary text-white flex flex-col items-center justify-center shadow-lg shadow-primary/20 relative">
                    <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-white text-[10px] font-black rounded-full flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{step.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
                </RevealSection>
              ))}
            </div>

            <RevealSection className="mt-12 text-center">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <span>Start with the Assessment</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </RevealSection>
          </div>
        </section>

        {/* ── Privacy & Security (Dark band) ─────────────────────────── */}
        <section className="py-20 bg-inverse-surface text-inverse-on-surface px-margin-mobile md:px-margin-desktop">
          <div className="max-w-5xl mx-auto">
            <RevealSection className="text-center mb-14 space-y-3">
              <span className="text-secondary-fixed font-bold text-xs uppercase tracking-widest">High-Trust Architecture</span>
              <h2 className="text-3xl font-bold">Your Privacy is Non-Negotiable</h2>
              <p className="text-inverse-on-surface/70 max-w-full mx-auto">
                We built MindEase with security-first principles so you can open up without fear.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {privacyPillars.map((p, i) => (
                <RevealSection key={p.title} delay={i * 100} className="text-center space-y-4">
                  <div className="text-secondary-fixed flex justify-center">
                    <span className="material-symbols-outlined text-5xl">{p.icon}</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md">{p.title}</h4>
                  <p className="text-inverse-on-surface/70 text-sm leading-relaxed">{p.desc}</p>
                </RevealSection>
              ))}
            </div>

            {/* Trust badges row */}
            <RevealSection className="mt-14 flex flex-wrap justify-center gap-4">
              {['HIPAA Certified', 'AES-256 Encrypted', 'SOC 2 Type II', 'GDPR Ready'].map((badge) => (
                <span key={badge} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-inverse-on-surface/80 text-sm font-bold">
                  <span className="material-symbols-outlined text-secondary-fixed text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  {badge}
                </span>
              ))}
            </RevealSection>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────────── */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-bright">
          <div className="max-w-7xl mx-auto">
            <RevealSection className="text-center mb-14 space-y-3">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Community Stories</span>
              <h2 className="text-3xl font-bold text-on-surface">Real voices, real transformation</h2>
              <p className="text-on-surface-variant">Real stories from individuals finding their way back to calm.</p>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <RevealSection key={t.name} delay={i * 100}>
                  <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 card-shadow h-full flex flex-col space-y-6">
                    <div className="flex gap-1 text-secondary">
                      {[...Array(5)].map((_, si) => (
                        <span key={si} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="text-on-surface-variant italic leading-relaxed flex-grow text-sm">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full ${t.avatar} flex items-center justify-center font-bold text-sm text-on-surface`}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">{t.name}</p>
                        <p className="text-xs text-outline">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section id="faq" className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
          <div className="max-w-[800px] mx-auto">
            <RevealSection className="text-center mb-14 space-y-3">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Common Questions</span>
              <h2 className="text-3xl font-bold text-on-surface">Everything you might want to know</h2>
            </RevealSection>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <RevealSection key={i} delay={i * 60}>
                    <div className={`bg-surface-container-lowest rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? 'border-primary/30 shadow-md shadow-primary/5' : 'border-outline-variant/30'}`}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex justify-between items-center p-6 text-left group"
                      >
                        <span className={`font-bold text-base pr-4 transition-colors ${isOpen ? 'text-primary' : 'text-on-surface'}`}>
                          {faq.question}
                        </span>
                        <span className={`material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: isOpen ? '200px' : '0px' }}
                      >
                        <p className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </RevealSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────── */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop">
          <RevealSection>
            <div className="max-w-4xl mx-auto bg-primary-container rounded-[40px] py-20 px-8 md:px-16 text-on-primary-container relative overflow-hidden shadow-2xl shadow-primary/15">
              {/* Radial glow overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_0%,_transparent_70%)]" />
              {/* Floating orbs */}
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

              <div className="relative z-10 text-center space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-bold tracking-wider">
                  🎉 Free 14-day trial — no credit card needed
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Ready for a calmer tomorrow?
                </h2>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of individuals who have transformed their mental health journey with MindEase. It takes just 2 minutes to get started.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                  <Link
                    to="/signup"
                    className="bg-white text-primary px-10 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Sign Up Free</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <Link
                    to="/assessment"
                    className="bg-transparent border-2 border-white/60 text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">psychology</span>
                    <span>Take Assessment</span>
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default LearnMore;
