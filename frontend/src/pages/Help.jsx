import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';

const helpCategories = [
  {
    icon: 'smart_toy',
    title: 'Chatbot Help',
    desc: 'Master interactions with your AI companion for better emotional support.',
    links: ['How AI listens', 'Conversation tips'],
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: 'manage_accounts',
    title: 'Account Issues',
    desc: 'Manage your profile, subscription, and data privacy settings securely.',
    links: ['Password recovery', 'Data privacy policy'],
    color: 'text-secondary',
    bg: 'bg-secondary-container/30',
  },
  {
    icon: 'self_improvement',
    title: 'Wellness Exercises',
    desc: 'Troubleshooting guide for meditation tracks and breathing tools.',
    links: ['Offline access', 'Audio quality settings'],
    color: 'text-tertiary',
    bg: 'bg-tertiary-fixed/30',
  },
];

const videoTutorials = [
  { title: 'Your First Day on MindEase', subtitle: 'Orientation & Setup', duration: '2:15' },
  { title: 'Talking to Your AI Guide', subtitle: 'Communication Tips', duration: '3:40' },
  { title: 'Setting Up Daily Habits', subtitle: 'Reminders & Tracking', duration: '4:10' },
  { title: 'Advanced Data Insights', subtitle: 'Understanding Trends', duration: '2:55' },
];

const faqItems = [
  {
    question: 'Is my conversation with the AI private?',
    answer: 'Yes. All conversations are end-to-end encrypted and HIPAA-compliant. We do not sell your personal data to third parties, and your clinical reflections remain entirely under your control.',
  },
  {
    question: 'How do I cancel my MindEase subscription?',
    answer: 'You can cancel at any time via Account Settings > Subscription. Your premium features will remain active until the end of your current billing period.',
  },
  {
    question: 'Can I use MindEase alongside a human therapist?',
    answer: "Absolutely. Many of our users use MindEase as a 'bridge' between sessions to track moods and practice breathing techniques. We even have a feature to export high-level summaries for your provider.",
  },
  {
    question: "Why isn't the audio playing for meditations?",
    answer: "Please check if your device is in 'Silent Mode' or 'Do Not Disturb'. If the issue persists, try clearing the app cache or ensure you have a stable internet connection for streaming.",
  },
];

function Help() {
  const { toggleMobileMenu } = useLayout();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [ticketType, setTicketType] = useState('Technical Support');
  const [ticketUrgency, setTicketUrgency] = useState('General Inquiry');
  const [ticketDesc, setTicketDesc] = useState('');
  const [attachLogs, setAttachLogs] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!ticketDesc.trim()) return;
    setTicketSubmitted(true);
    setTicketDesc('');
    setTimeout(() => setTicketSubmitted(false), 4000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background">
      {/* Top Header */}
      <header className="h-20 w-full flex justify-between items-center px-margin-mobile md:px-margin-desktop bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={toggleMobileMenu} className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            <span className="font-headline-md text-headline-md font-bold text-primary">MindEase</span>
          </div>
        </div>
        <Link to="/chat" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Chat</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <main className="pt-10 pb-16 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">

          {/* ── Hero Section with Search ────────────────────────── */}
          <header className="text-center mb-16">
            <h1 className="font-headline-xl text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] tracking-tight font-bold text-on-surface mb-2">
              How can we support you today?
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              Access professional resources, technical help, and wellness guidance in one calm space.
            </p>
            <div className="max-w-[720px] mx-auto relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="w-full pl-14 pr-6 py-5 rounded-full bg-white border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md shadow-sm"
                placeholder="Search for help (e.g., 'Reset password' or 'How to meditate')"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* ── Category Cards Grid ────────────────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {helpCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-outline-variant/30 hover:border-primary/40 transition-all group cursor-pointer shadow-sm"
              >
                <div className={`w-12 h-12 ${cat.bg} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined ${cat.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{cat.title}</h3>
                <p className="text-on-surface-variant mb-6">{cat.desc}</p>
                <ul className="space-y-3 text-label-md font-semibold">
                  {cat.links.map((link) => (
                    <li key={link} className={`flex items-center gap-2 ${cat.color} hover:translate-x-1 transition-transform cursor-pointer`}>
                      {link}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Video Tutorials Section ─────────────────────────── */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-headline-lg text-[24px] sm:text-[30px] leading-[32px] sm:leading-[38px] font-semibold text-on-surface">Getting Started</h2>
                <p className="text-on-surface-variant text-sm sm:text-base">Master MindEase in under 5 minutes with our visual guides.</p>
              </div>
              <button className="text-primary font-label-md text-xs sm:text-sm flex items-center gap-1 hover:underline shrink-0">
                View All
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoTutorials.map((vid) => (
                <div key={vid.title} className="group cursor-pointer">
                  <div className="aspect-video bg-surface-variant rounded-xl overflow-hidden relative mb-2">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary-container/40 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary/40 text-4xl">movie</span>
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
                      <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md">{vid.duration}</span>
                  </div>
                  <h4 className="font-label-md text-on-surface">{vid.title}</h4>
                  <p className="text-label-sm text-on-surface-variant">{vid.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Two Column: Contact Form + FAQ ──────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Support Request Form */}
            <div className="space-y-10">
              <div className="bg-surface-container-low p-6 sm:p-8 md:p-10 rounded-3xl">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Support Request</h2>
                <p className="text-on-surface-variant mb-8 text-sm sm:text-base">Need technical assistance or found a bug? Our clinical and tech teams are here to help.</p>

                {ticketSubmitted && (
                  <div className="p-4 rounded-2xl bg-secondary-container text-on-secondary-container text-sm font-semibold flex items-center gap-2 mb-6 animate-fade-in">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Thank you! Your request has been submitted successfully.</span>
                  </div>
                )}

                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                    <div className="space-y-1">
                      <label className="font-label-sm text-on-surface-variant ml-2">Request Type</label>
                      <select
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:ring-primary/20 focus:border-primary text-sm"
                      >
                        <option>Technical Support</option>
                        <option>Report a Bug</option>
                        <option>Billing Question</option>
                        <option>Wellness Feedback</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-sm text-on-surface-variant ml-2">Urgency</label>
                      <select
                        value={ticketUrgency}
                        onChange={(e) => setTicketUrgency(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:ring-primary/20 focus:border-primary text-sm"
                      >
                        <option>General Inquiry</option>
                        <option>Important</option>
                        <option>Critical / Blocking</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-sm text-on-surface-variant ml-2">Description</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:ring-primary/20 focus:border-primary text-sm"
                      placeholder="Briefly describe the issue or your question..."
                      rows={4}
                      value={ticketDesc}
                      onChange={(e) => setTicketDesc(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-label-md text-on-surface-variant cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={attachLogs}
                        onChange={(e) => setAttachLogs(e.target.checked)}
                        className="rounded text-primary focus:ring-primary border-outline-variant"
                      />
                      <span>Attach system logs (Recommended)</span>
                    </label>
                    <button
                      type="submit"
                      className="bg-primary text-white px-8 py-3 rounded-full font-label-md hover:shadow-lg transition-all active:scale-95"
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              </div>

              {/* Emergency Contact Card */}
              <div className="bg-error-container/20 p-6 rounded-2xl border border-error/10 flex items-center gap-6">
                <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white">emergency</span>
                </div>
                <div>
                  <h4 className="font-label-md text-on-error-container font-bold">In Immediate Crisis?</h4>
                  <p className="text-body-md text-on-error-container/80">If you are in danger or need immediate professional help, please use our 24/7 priority line.</p>
                  <Link to="/emergency" className="mt-2 text-error font-bold flex items-center gap-1 hover:underline text-sm">
                    Get Urgent Help Now
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: FAQ Section */}
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-10">Common Questions</h2>
              <div className="space-y-3">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-b border-outline-variant/30 pb-3">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center py-4 text-left group"
                    >
                      <span className="font-body-lg text-on-surface group-hover:text-primary transition-colors pr-4">{faq.question}</span>
                      <span className={`material-symbols-outlined text-outline transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {openFaqIndex === index && (
                      <div className="pt-1 pb-4 text-on-surface-variant text-body-md animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Still Have Questions Card */}
              <div className="mt-10 p-10 bg-surface-container rounded-2xl border border-primary/10">
                <h3 className="font-label-md text-primary mb-1">Still have questions?</h3>
                <p className="text-on-surface-variant mb-6">Our average response time for technical support is 4 hours.</p>
                <div className="flex gap-4">
                  <Link
                    to="/chat"
                    className="bg-primary/10 text-primary px-6 py-2 rounded-full font-label-md border border-primary/20 hover:bg-primary hover:text-white transition-all"
                  >
                    Chat with Support
                  </Link>
                  <button className="text-on-surface-variant px-6 py-2 rounded-full font-label-md hover:bg-surface-variant transition-all">
                    Email Us
                  </button>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Help;
