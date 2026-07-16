import React from 'react';
import Footer from '../components/Footer';

function Dashboard() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Header / Top Bar */}
      <header className="sticky top-0 z-40 bg-background/80 glass-nav h-20 flex items-center justify-between px-margin-mobile md:px-margin-desktop border-b border-outline-variant/10 shrink-0">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Welcome back, Sarah</h2>
            <p className="font-label-md text-label-md text-on-surface-variant">Feeling calm today?</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img alt="Sarah Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMsJX5eOyLvBZcY2elDf4K3j15qL1kMbx4AyIOtwWZkr1F7WWWp2v5pzxXd-pgl9sq2VfA01TKRsPFiB0dXhGRFIbK7PSvnrfPdbB1D8iahAyuIj45GTmlfS3SJn4jI1FMYHhgmVzdsmeSyMmzdSmMibSsrFcld00Vco6aUFs_-xBlBFoRZ5ZZiyZNtDDQlfN-OT0Soo-AEcdGNxCPkSaAvLWhprFCgSXsR5zKzNkc8mkWB5SC2G-0aKQyHyqvx0jCWAtHM5Em2SXw" />
          </div>
        </div>
      </header>

      {/* Page Scrollable Area */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
        <div className="max-w-[1200px] w-full mx-auto p-margin-mobile md:p-lg space-y-md flex-grow">
          {/* Bento Grid Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Weekly Mood Trend Chart */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-[2rem] p-md border border-outline-variant/10 card-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Weekly Mood Summary</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">You've felt 15% more balanced this week.</p>
                </div>
                <select className="bg-surface-container-low border-none rounded-lg font-label-md text-label-md text-primary focus:ring-primary outline-none px-3 py-2">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              {/* Simulated Chart */}
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-primary-container/20 rounded-full h-32 relative group">
                    <div className="absolute bottom-0 w-full bg-primary-container rounded-full h-24 group-hover:h-28 transition-all"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">Mon</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-primary-container/20 rounded-full h-32 relative group">
                    <div className="absolute bottom-0 w-full bg-primary-container rounded-full h-16 group-hover:h-20 transition-all"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">Tue</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-primary-container/20 rounded-full h-32 relative group">
                    <div className="absolute bottom-0 w-full bg-primary-container rounded-full h-28 group-hover:h-30 transition-all"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">Wed</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-primary-container/20 rounded-full h-32 relative group">
                    <div className="absolute bottom-0 w-full bg-primary-container rounded-full h-20 group-hover:h-24 transition-all"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">Thu</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-primary-container/20 rounded-full h-32 relative group">
                    <div className="absolute bottom-0 w-full bg-primary-container rounded-full h-32 group-hover:h-full transition-all"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline font-bold text-primary">Fri</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-primary-container/20 rounded-full h-32 relative group">
                    <div className="absolute bottom-0 w-full bg-outline-variant/30 rounded-full h-0"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">Sat</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-primary-container/20 rounded-full h-32 relative group">
                    <div className="absolute bottom-0 w-full bg-outline-variant/30 rounded-full h-0"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">Sun</span>
                </div>
              </div>
            </div>
            {/* Wellness Stats */}
            <div className="md:col-span-4 flex flex-col gap-gutter">
              <div className="flex-1 bg-secondary-container/20 rounded-[2rem] p-md border border-secondary/10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px]">local_fire_department</span>
                </div>
                <h4 className="font-headline-md text-headline-md font-bold text-on-secondary-container">12 Days</h4>
                <p className="font-label-md text-label-md text-on-secondary-fixed-variant">Active Streak</p>
              </div>
              <div className="flex-1 bg-tertiary-container/10 rounded-[2rem] p-md border border-tertiary/10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-tertiary-container text-on-tertiary-container rounded-2xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px]">task_alt</span>
                </div>
                <h4 className="font-headline-md text-headline-md font-bold text-tertiary">42</h4>
                <p className="font-label-md text-label-md text-on-tertiary-fixed-variant">Sessions Completed</p>
              </div>
            </div>
          </div>
          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <button className="group bg-primary text-on-primary rounded-[2rem] p-md flex flex-col h-full text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20">
              <div className="w-12 h-12 bg-on-primary/10 rounded-xl flex items-center justify-center mb-12">
                <span className="material-symbols-outlined text-on-primary">chat_bubble</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-semibold mb-2">Start Chat</h3>
              <p className="font-body-md text-body-md text-on-primary/80 mb-6">Connect with a support specialist or our AI companion.</p>
              <div className="mt-auto flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-bold">
                Let's Talk <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </button>
            <button className="group bg-surface-container-highest rounded-[2rem] p-md flex flex-col h-full text-left border border-outline-variant/10 transition-all hover:border-primary/30 active:scale-[0.98]">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-12">
                <span className="material-symbols-outlined">air</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">Breathing Exercise</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">A 2-minute guided session to center your focus.</p>
              <div className="mt-auto flex items-center gap-2 font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                Start Session <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">play_arrow</span>
              </div>
            </button>
            <button className="group bg-surface-container-lowest rounded-[2rem] p-md flex flex-col h-full text-left border border-outline-variant/10 transition-all hover:border-primary/30 active:scale-[0.98] card-shadow">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-12">
                <span className="material-symbols-outlined">library_books</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">Clinical Resources</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Explore our curated library of mental health articles.</p>
              <div className="mt-auto flex items-center gap-2 font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
                View Library <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">open_in_new</span>
              </div>
            </button>
          </div>
          {/* Daily Tip & Quote Section */}
          <div className="bg-surface-variant/40 rounded-[2.5rem] p-lg border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-lg items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                  Daily Wellness Tip
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">The 4-7-8 Technique</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Inhale through your nose for 4 seconds, hold your breath for 7 seconds, and exhale forcefully through your mouth for 8 seconds. This simple rhythmic practice can act as a natural tranquilizer for the nervous system.
                </p>
                <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                  Try Now
                </button>
              </div>
              <div className="rounded-3xl overflow-hidden aspect-video shadow-2xl relative">
                <img className="w-full h-full object-cover" data-alt="A serene landscape photo showing a calm lake at dawn with misty mountains in the background, reflecting a soft blue and lavender sky. The lighting is high-key and ethereal, evoking a sense of profound tranquility and professional mindfulness. The composition is minimal and balanced, perfectly aligning with a modern wellness application aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALa-ydEYnZs0JrF1Sp9-UPPWttLG_MVhoe_xuOeedhiODktRg_-CffinPyZyaaCFE_0m9F0xVbgoMfzJRpYKsInZMhJ4W6mLkOW8xS3p4_E5DPCmKfoGJ0_u5WkNJGVybCMmZx71ZP4UmbwoAR7FhPJakRZ9M__X1K06RT08F7ZPUIREB-hmD2rHnJlJtLTnM5W46XOStnSjbAn30BrHkdTRIQjvpk7jhxgdaUoC3nEG24TpyuMvMI0D_mclD5h7gYHTLBFzM7-UvT" alt="Serene landscape" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white italic font-body-md text-body-md max-w-xs">
                  "Peace begins with a smile." — Mother Teresa
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* FAB (Mobile only for Quick Chat) */}
      <button className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center z-50">
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
      </button>
    </div>
  );
}

export default Dashboard;
