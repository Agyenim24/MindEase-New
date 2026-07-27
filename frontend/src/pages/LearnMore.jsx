import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useData } from '../context/DataContext';

function LearnMore() {
  const { testimonials, faqs, landingStats } = useData();
  const [openFaq, setOpenFaq] = useState(0);

  const features = [
    { icon: 'auto_awesome', title: 'AI Companion', desc: 'Empathetic, 24/7 conversational support that understands your context and provides immediate relief.', color: 'bg-primary/10 text-primary' },
    { icon: 'show_chart', title: 'Mood Tracking', desc: 'Visualize emotional trends over time to identify triggers and celebrate your progress toward stability.', color: 'bg-secondary-container/20 text-secondary' },
    { icon: 'psychology', title: 'CBT Exercises', desc: 'Evidence-based techniques for managing stress, anxiety, and negative thought patterns on your own terms.', color: 'bg-tertiary-container/20 text-tertiary' },
    { icon: 'emergency', title: 'Crisis Support', desc: 'Immediate access to localized crisis resources and helplines when you need human intervention fast.', color: 'bg-error/10 text-error' },
  ];

  const howItWorks = [
    { step: '01', icon: 'psychology_alt', title: 'Take the Assessment', desc: 'A 2-minute quiz identifies your emotional needs, stress triggers, and wellness goals.' },
    { step: '02', icon: 'auto_awesome', title: 'Meet Your AI Companion', desc: 'Your calibrated AI companion is ready to listen 24/7, trained on evidence-based CBT frameworks.' },
    { step: '03', icon: 'apps', title: 'Follow Your Care Plan', desc: 'Access a personalized library of programs, breathing exercises, and daily reflections.' },
    { step: '04', icon: 'monitoring', title: 'Track Your Progress', desc: 'Mood graphs, streak counters, and milestone celebrations help you see real growth.' },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col scroll-smooth">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl fill-icon">spa</span>
          <span className="font-headline-md text-headline-md font-bold text-primary">MindEase</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Features</a>
          <a href="#how-it-works" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">How It Works</a>
          <a href="#faq" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block text-on-surface-variant hover:text-primary font-body-md">
            Login
          </Link>
          <Link to="/signup" className="bg-primary text-white px-6 py-2.5 rounded-full font-body-md hover:opacity-90 transition shadow">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="pt-20 flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold uppercase tracking-wider">
              A New Standard for Wellness
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
              The Science of <span className="text-primary">Serenity</span>
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              MindEase combines clinical rigor with cutting-edge technology to provide an accessible bridge between therapeutic science and your daily life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link
                to="/signup"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>Begin Your Journey</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            {/* Dynamic Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto">
              {landingStats.map((s) => (
                <div key={s.label} className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-outline-variant/20 shadow-sm">
                  <p className="font-bold text-xl text-primary">{s.value}</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-16 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 space-y-2">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Your Toolkit</span>
              <h2 className="text-3xl font-bold text-on-surface">Everything you need, in one place</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-xl">{f.icon}</span>
                  </div>
                  <h3 className="font-bold text-on-surface text-lg">{f.title}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-on-surface">Your journey in 4 steps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step) => (
                <div key={step.step} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto shadow">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-on-surface text-base">{step.title}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Testimonials */}
        <section className="py-16 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-on-surface text-center">Member Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm space-y-3">
                  <p className="text-xs text-on-surface-variant italic leading-relaxed">"{t.comment}"</p>
                  <div className="flex items-center gap-3 pt-2">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border" />
                    <div>
                      <h4 className="font-bold text-on-surface text-xs">{t.name}</h4>
                      <p className="text-[10px] text-outline">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic FAQs */}
        <section id="faq" className="py-16 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-on-surface text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={faq.id} open={openFaq === i} className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5">
                  <summary className="font-bold text-on-surface text-sm cursor-pointer list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined text-outline group-open:rotate-180 transition">expand_more</span>
                  </summary>
                  <p className="text-xs text-on-surface-variant mt-3 leading-relaxed border-t border-outline-variant/10 pt-2">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LearnMore;
