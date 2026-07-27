import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';
import { useData } from '../context/DataContext';

const categories = ['All Resources', 'Anxiety', 'Stress', 'Sleep', 'CBT', 'Mindfulness'];

function Resources() {
  const { toggleMobileMenu } = useLayout();
  const { resources, videoSessions, toggleBookmarkResource, profile } = useData();
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter resources dynamically based on category & search query
  const filteredResources = resources.filter((res) => {
    const matchesCategory = activeCategory === 'All Resources' || res.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredResources[0] || resources[0];
  const sideArticles = filteredResources.slice(1, 3);
  const remainingArticles = filteredResources.slice(3);

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

          {/* Search & Header */}
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
                  className={`px-6 py-2 rounded-full font-label-md whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Featured Wisdom (Dynamic Bento Grid) */}
          {featured && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Featured Wisdom</h3>
                <span className="text-xs text-on-surface-variant font-medium">
                  Showing {filteredResources.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Featured Card */}
                <div className="md:col-span-2 group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${featured.bgUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmarkResource(featured.id);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-black/60 transition"
                  >
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: profile.savedResourceIds.includes(featured.id) ? "'FILL' 1" : "'FILL' 0" }}>
                      bookmark
                    </span>
                  </button>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold mb-4">
                      {featured.category}
                    </span>
                    <h4 className="font-headline-lg text-2xl md:text-3xl font-bold mb-2">{featured.title}</h4>
                    <p className="text-white/80 line-clamp-2 mb-4 text-sm">{featured.desc}</p>
                    <div className="flex items-center gap-2 text-xs opacity-90">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Side Articles Cards */}
                <div className="flex flex-col gap-6">
                  {sideArticles.map((card) => (
                    <div
                      key={card.id}
                      className="group h-[178px] rounded-3xl bg-surface-container-lowest border border-outline-variant/30 p-6 flex flex-col justify-between cursor-pointer hover:border-primary/40 hover:shadow-md transition-all relative"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmarkResource(card.id);
                        }}
                        className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition"
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: profile.savedResourceIds.includes(card.id) ? "'FILL' 1" : "'FILL' 0" }}>
                          bookmark
                        </span>
                      </button>
                      <div>
                        <span className="text-primary font-label-sm uppercase tracking-wider text-xs font-bold">{card.category}</span>
                        <h5 className="font-headline-md text-base font-bold mt-1.5 group-hover:text-primary transition-colors text-on-surface line-clamp-2 pr-6">
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
          )}

          {/* Dynamic Video Guided Sessions */}
          <section className="bg-surface-container-low -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop py-12">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Video Guided Sessions</h3>
              </div>

              <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
                {videoSessions.map((vid) => (
                  <div key={vid.id} className="min-w-[280px] md:min-w-[340px] flex-shrink-0 group cursor-pointer">
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

          {/* Daily Reads List */}
          {remainingArticles.length > 0 && (
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">More Articles</h3>
                <div className="space-y-4">
                  {remainingArticles.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.bgUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-grow space-y-1">
                        <p className="text-primary font-bold text-xs">{item.category}</p>
                        <h4 className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-xs text-on-surface-variant">{item.readTime}</p>
                      </div>
                      <button
                        onClick={() => toggleBookmarkResource(item.id)}
                        className="p-2 text-on-surface-variant hover:text-primary transition"
                      >
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: profile.savedResourceIds.includes(item.id) ? "'FILL' 1" : "'FILL' 0" }}>
                          bookmark
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}

export default Resources;
