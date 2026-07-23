import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';

const categories = ['All Resources', 'Anxiety', 'Stress', 'Sleep', 'CBT', 'Mindfulness'];

const featuredWisdom = {
  main: {
    category: 'MINDSET',
    title: 'Mastering the Art of Emotional Regulation',
    desc: 'Learn practical cognitive behavioral techniques to navigate complex emotions with grace and resilience.',
    readTime: '12 min read',
    bgUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  side: [
    {
      category: 'CBT Basics',
      title: 'Reframing Negative Thought Patterns',
      readTime: '8 min read',
    },
    {
      category: 'Sleep Science',
      title: 'The Circadian Rhythm Reset Guide',
      readTime: '15 min read',
    },
  ],
};

const videoSessions = [
  {
    title: 'Morning Grounding Practice',
    guide: 'Guided by Dr. Aris Thorne',
    duration: '15:00',
    thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Deep Sleep Soundscapes',
    guide: 'Ambient Therapy Series',
    duration: '22:45',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Coping with Social Anxiety',
    guide: 'Expert Series with Sarah Jenkins',
    duration: '08:12',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
];

const dailyReads = [
  {
    tag: 'Habits',
    title: 'Micro-habits for a clearer mind',
    meta: '3 min read • Updated today',
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=300&q=80',
  },
  {
    tag: 'Stress',
    title: 'The 4-7-8 Technique Explained',
    meta: '5 min read • Popular this week',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
  },
  {
    tag: 'Reflection',
    title: 'Journaling prompts for anxious evenings',
    meta: '4 min read • Recommended',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=80',
  },
];

const trendingTopics = ['#BurnoutRecovery', '#MindfulEating', '#SocialAnxiety', '#BoxBreathing'];

function Resources() {
  const { toggleMobileMenu } = useLayout();
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState('');

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

        {/* Top Navbar Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/resources" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md">
            Resources
          </Link>
          <Link to="/programs" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
            Programs
          </Link>
          <Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/chat" className="bg-primary text-on-primary px-5 py-2 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95 text-sm">
            Chat Assistant
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <main className="px-margin-mobile md:px-margin-desktop py-8 max-w-[1440px] mx-auto space-y-12">

          {/* ── Search & Header ───────────────────────────────── */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="font-headline-xl text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] tracking-tight font-bold text-on-surface mb-2">
                  Resource Library
                </h2>
                <p className="text-on-surface-variant max-w-full text-body-lg">
                  Curated mental health content to support your journey towards emotional clarity and well-being.
                </p>
              </div>
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-surface-container border-none focus:ring-2 focus:ring-primary/20 text-body-md transition-shadow"
                  placeholder="Search articles, guides, or videos..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-label-md whitespace-nowrap transition-colors ${activeCategory === cat
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* ── Featured Wisdom (Bento Grid) ──────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Featured Wisdom</h3>
              <button className="text-primary font-label-md hover:underline text-sm font-semibold">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large Featured Card (2 cols) */}
              <div className="md:col-span-2 group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${featuredWisdom.main.bgUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold mb-4">
                    {featuredWisdom.main.category}
                  </span>
                  <h4 className="font-headline-lg text-2xl md:text-3xl font-bold mb-2">{featuredWisdom.main.title}</h4>
                  <p className="text-white/80 line-clamp-2 mb-4 text-sm">{featuredWisdom.main.desc}</p>
                  <div className="flex items-center gap-2 text-xs opacity-90">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>{featuredWisdom.main.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Side Cards (1 col) */}
              <div className="flex flex-col gap-6">
                {featuredWisdom.side.map((card) => (
                  <div
                    key={card.title}
                    className="group h-[178px] rounded-3xl bg-white border border-outline-variant/30 p-6 flex flex-col justify-between cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div>
                      <span className="text-secondary font-label-sm uppercase tracking-wider text-xs font-bold">{card.category}</span>
                      <h5 className="font-headline-md text-base font-bold mt-1.5 group-hover:text-primary transition-colors text-on-surface">
                        {card.title}
                      </h5>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-on-surface-variant font-medium">{card.readTime}</span>
                      <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform text-lg">arrow_forward</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Video Guided Sessions Carousel ────────────────── */}
          <section className="bg-surface-container-low -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop py-12">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Video Guided Sessions</h3>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-colors text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-colors text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
                {videoSessions.map((vid) => (
                  <div key={vid.title} className="min-w-[280px] md:min-w-[340px] flex-shrink-0 group cursor-pointer">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 shadow-sm">
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] rounded font-mono">{vid.duration}</div>
                    </div>
                    <h6 className="font-label-md text-on-surface font-bold mb-0.5">{vid.title}</h6>
                    <p className="text-xs text-on-surface-variant">{vid.guide}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Daily Reads & Sidebar Grid ────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Daily Reads List */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Daily Reads</h3>
              <div className="space-y-4">
                {dailyReads.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-outline-variant/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <p className="text-primary font-bold text-xs">{item.tag}</p>
                      <h4 className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs text-on-surface-variant">{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending & CTA Cards */}
            <div className="space-y-6">
              {/* AI Chat CTA Card */}
              <div className="p-8 rounded-3xl bg-primary text-on-primary relative overflow-hidden shadow-lg">
                <div className="relative z-10 space-y-3">
                  <h4 className="font-headline-md text-xl font-bold">Feeling overwhelmed?</h4>
                  <p className="text-xs opacity-90 leading-relaxed">Our AI companion is here to help you navigate your current emotions in real-time.</p>
                  <Link
                    to="/chat"
                    className="inline-block bg-white text-primary px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:bg-surface-bright transition-colors"
                  >
                    Start Chatting
                  </Link>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10 text-white select-none">forum</span>
              </div>

              {/* Trending Topics Box */}
              <div className="p-6 rounded-3xl border border-outline-variant/30 bg-white shadow-sm space-y-3">
                <h4 className="font-bold text-on-surface text-sm">Trending Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-surface-container-high rounded-lg text-xs font-medium text-on-surface cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Resources;
