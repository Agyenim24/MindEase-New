import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const features = [
  {
    icon: 'psychology',
    title: '24/7 AI Companion',
    description: 'Empathetic, always-available conversational support trained on clinical evidence and mindfulness techniques to help you process feelings whenever you need.',
  },
  {
    icon: 'monitoring',
    title: 'Mood & Progress Analytics',
    description: 'Track your daily emotional trajectory with visual insights, identifying triggers and celebrating your personal mental growth over time.',
  },
  {
    icon: 'self_improvement',
    title: 'CBT & Mindfulness Exercises',
    description: 'Access 15+ interactive, guided exercises for desk decompression, anxiety relief, breathing regulation, and structured CBT reflections.',
  },
  {
    icon: 'health_and_safety',
    title: 'Emergency Crisis Support',
    description: 'Immediate access to local crisis helplines and safety protocols with one tap, prioritizing user safety above all else.',
  },
];

const faqs = [
  {
    question: 'Is MindEase a replacement for traditional therapy?',
    answer: 'No, MindEase is designed to complement professional care and provide everyday wellness support, mood tracking, and stress management techniques. In crisis situations, we always recommend reaching out to licensed professionals.',
  },
  {
    question: 'How is my private data and conversation history protected?',
    answer: 'We utilize HIPAA-compliant architecture with end-to-end encryption for all stored chats and personal reflections. Your data is strictly private and never sold or shared.',
  },
  {
    question: 'Can I use MindEase for free?',
    answer: 'Yes! MindEase offers a free 14-day trial with full access to all features, AI companion chats, and CBT exercises. No credit card is required to sign up.',
  },
  {
    question: 'What evidence-based frameworks does MindEase use?',
    answer: 'Our AI companion and self-help modules draw upon Cognitive Behavioral Therapy (CBT), Mindfulness-Based Stress Reduction (MBSR), and Positive Psychology principles.',
  },
];

function LearnMore() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl fill-icon">spa</span>
            MindEase
          </Link>
          <div className="hidden md:flex gap-8">
            <Link to="/resources" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Resources</Link>
            <Link to="/programs" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Programs</Link>
            <Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Community</Link>
            <Link to="/learn-more" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Learn More</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:block text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Login</Link>
          <Link to="/signup" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">Get Started</Link>
        </div>
      </nav>

      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-surface-container-low to-background">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm">science</span>
              <span>The Science of Serenity</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-tight">
              Evidence-Based Mental Health Support, Designed Around You
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              MindEase combines clinically-inspired AI, reflective journaling, and guided CBT practices to give you a sanctuary of emotional resilience.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="bg-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                Start Free Trial
              </Link>
              <Link to="/chat" className="border border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary-fixed transition-all active:scale-95">
                Try AI Assistant
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-on-surface">Comprehensive Wellness Pillars</h2>
            <p className="text-on-surface-variant">Everything you need to nurture your peace of mind in one gentle, integrated experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat) => (
              <div key={feat.title} className="glass-card rounded-3xl p-6 border border-outline-variant/30 space-y-4 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl fill-icon">{feat.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-on-surface">{feat.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security & HIPAA Trust Section */}
        <section className="py-20 bg-surface-container-low border-y border-outline-variant/20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Privacy First</span>
              </div>
              <h2 className="text-3xl font-bold text-on-surface">Your Data is Encrypted & HIPAA-Compliant</h2>
              <p className="text-on-surface-variant leading-relaxed">
                We treat your mental health data with the extreme care it deserves. Every session and reflection is encrypted end-to-end and stored securely under strict privacy guidelines.
              </p>
              <ul className="space-y-3 text-sm text-on-surface font-medium">
                {['AES-256 Bit Data Encryption', 'Zero-Knowledge Conversation Storage', 'HIPAA & GDPR Standards', '100% Anonymous Registration Option'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg fill-icon">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-outline-variant/30 space-y-6 text-center shadow-lg">
              <span className="material-symbols-outlined text-6xl text-primary fill-icon">verified_user</span>
              <h3 className="text-2xl font-bold text-on-surface">High-Trust Architecture</h3>
              <p className="text-sm text-on-surface-variant">Built from the ground up for total confidentiality and emotional peace of mind.</p>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-full mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-on-surface">Loved by Thousands</h2>
            <p className="text-on-surface-variant">See how MindEase has impacted daily lives around the world.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: 'MindEase gives me an immediate space to process my stress before it turns into full panic. The desk decompression exercise is a daily ritual for me now.', author: 'Alex M.', role: 'User since 2024' },
              { quote: 'Having a 24/7 companion that responds with empathetic, CBT-guided advice has transformed my evening wind-down routine.', author: 'Priya K.', role: 'User since 2025' },
              { quote: 'The mood analytics helped me notice patterns in my weekly stress levels I never realized before. Highly recommended.', author: 'David L.', role: 'User since 2024' },
            ].map((t) => (
              <div key={t.author} className="glass-card rounded-3xl p-6 border border-outline-variant/30 flex flex-col justify-between space-y-4">
                <p className="text-sm italic text-on-surface-variant leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-on-surface text-sm">{t.author}</p>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <section className="py-20 bg-surface-container-low border-t border-outline-variant/20">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-on-surface">Frequently Asked Questions</h2>
              <p className="text-on-surface-variant">Everything you need to know about MindEase.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={faq.question} className="glass-card rounded-2xl border border-outline-variant/30 overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex justify-between items-center font-semibold text-on-surface hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined text-primary">{openFaq === idx ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-3 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 max-w-full mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Ready for a Calmer Tomorrow?</h2>
          <p className="text-on-surface-variant max-w-fullmx-auto">Start your 14-day free trial today and take the first step towards lasting mental well-being.</p>
          <div className="pt-2">
            <Link to="/signup" className="inline-block bg-primary text-white px-9 py-4 rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LearnMore;
