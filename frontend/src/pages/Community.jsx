import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Community() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Community Support</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 mr-8">
            <Link to="/resources" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Resources</Link>
            <Link to="/programs" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Programs</Link>
            <Link to="/community" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Community</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" data-alt="A close-up portrait of a serene woman with closed eyes and a soft smile, set against a blurred background of a tranquil, sun-drenched botanical garden. The lighting is ethereal and high-key, emphasizing a light-mode aesthetic with soft highlights and a peaceful, clinical but warm atmosphere. The image is crisp, modern, and professional, reflecting a high-end SaaS profile aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOyFxZRyLPOzv7JOnhXbvm4XHM7OXMP7dPkU0SyIT635aHySENY1gd4odPJo-nreYAZsKdZV-rr_it0dLFQ0qF8AQFEAoQMXiP4QWWeLbOyeG5-0aNFSH0WW177X5dYK_D67BG7cd3h9wj5WKinG45QFQlG_sC5F8GcDNBDXLqQDbP_BO0kPifU4BcsWAvbeB43QItvGZO-2fvDGBbpRSI6UmVRlYLdv8s6oXnhl5zSjEUtce6VugYE5K2DHq5eVlPhnvH5JRJ3hkQ" alt="User Profile" />
            </span>
          </div>
        </div>
      </header>

      {/* Page Scrollable Area */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
        <div className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-xl flex-grow">
        {/* Welcome Section */}
        <section className="bg-primary-container text-on-primary-container rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg mb-4">You are not alone.</h2>
            <p className="font-body-lg text-body-lg mb-8 opacity-90">Join safe, professionally moderated groups to share experiences, learn coping strategies, and find solidarity with peers who understand what you're going through.</p>
            <div className="flex gap-4">
              <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md font-bold shadow-sm hover:opacity-95 transition-all">Browse Groups</button>
              <button className="bg-surface/50 text-on-primary-container px-6 py-3 rounded-full font-label-md text-label-md font-bold hover:bg-surface/80 transition-all backdrop-blur-md">Read Guidelines</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-transparent z-10"></div>
            <img className="w-full h-full object-cover" data-alt="An abstract 3D render showing multiple translucent, soft-edged spheres gently interacting and floating together in a serene, bright space. The spheres are colored in soft primary blues, mint greens, and warm lavenders. The lighting is diffused, casting soft shadows, symbolizing connection, community, and gentle support within a modern wellness application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFqT9sE-C7V06c3u3D1B4r8i8R-N345fXFhXoQk2P3VqL8gXQ3HhRjLgHqfR24tXo4RkC_zQfR4Xk5x_C_jQhRj9G2-W8G24v7z8_j2h-QkP2_RkP2r4Xk4Xk_HhRjRkC_zQfR4v7z8w4HhRjC_zQfRj9G2_j2hQkP2W8G24r4Xk4_C_jQhRjRkP2v7z8W8G2-Rj9G2" alt="Community Support" />
          </div>
        </section>

        {/* Forums / Groups Grid */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline-md text-headline-md text-on-surface">Active Support Groups</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">tune</span></button>
              <button className="p-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">search</span></button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            {/* Group Card 1 */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/30 transition-all hover:shadow-md group flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-32 h-32 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-5xl">work_history</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">Workplace Burnout</h4>
                    <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[11px] font-bold tracking-wider">MODERATED</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">Navigating stress, setting boundaries, and recovering from chronic occupational exhaustion.</p>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                    </div>
                    <span className="text-[12px] text-on-surface-variant font-medium">1.2k Members</span>
                  </div>
                  <button className="text-primary font-label-md text-label-md font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">Join Group</button>
                </div>
              </div>
            </div>

            {/* Group Card 2 */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/30 transition-all hover:shadow-md group flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-32 h-32 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                <span className="material-symbols-outlined text-5xl">air</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">Living with Anxiety</h4>
                    <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[11px] font-bold tracking-wider">MODERATED</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">Share coping mechanisms, grounding techniques, and daily victories against anxiety.</p>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                    </div>
                    <span className="text-[12px] text-on-surface-variant font-medium">3.4k Members</span>
                  </div>
                  <button className="text-primary font-label-md text-label-md font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">Join Group</button>
                </div>
              </div>
            </div>

            {/* Group Card 3 */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/30 transition-all hover:shadow-md group flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-32 h-32 rounded-2xl bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
                <span className="material-symbols-outlined text-5xl">family_restroom</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">Parenting &amp; Stress</h4>
                    <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[11px] font-bold tracking-wider">MODERATED</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">Balancing caregiving responsibilities while maintaining your own mental health.</p>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                    </div>
                    <span className="text-[12px] text-on-surface-variant font-medium">850 Members</span>
                  </div>
                  <button className="text-primary font-label-md text-label-md font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">Join Group</button>
                </div>
              </div>
            </div>
            
            {/* Group Card 4 */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/30 transition-all hover:shadow-md group flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-32 h-32 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-5xl">bedtime</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">Sleep Hygiene</h4>
                    <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[11px] font-bold tracking-wider">MODERATED</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">Tips, routines, and support for overcoming insomnia and improving sleep quality.</p>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-surface"></div>
                    </div>
                    <span className="text-[12px] text-on-surface-variant font-medium">2.1k Members</span>
                  </div>
                  <button className="text-primary font-label-md text-label-md font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">Join Group</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Events / Webinars */}
        <section className="space-y-6">
          <h3 className="font-headline-md text-headline-md text-on-surface">Upcoming Live Events</h3>
          <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar snap-x">
            {/* Event 1 */}
            <div className="min-w-[300px] max-w-[320px] bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 snap-start flex-shrink-0 relative">
              <div className="absolute top-4 right-4 w-3 h-3 bg-error rounded-full animate-pulse shadow-[0_0_8px_rgba(186,26,26,0.6)]"></div>
              <div className="text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">Happening Now</div>
              <h4 className="font-headline-sm text-headline-sm font-bold mb-2 text-on-surface">Guided Meditation: Midday Reset</h4>
              <p className="text-body-md text-on-surface-variant mb-6 line-clamp-2">A 15-minute live guided session to center your focus and release morning tension.</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface-variant"></div>
                <div className="text-sm">
                  <p className="font-bold text-on-surface">Dr. Elena Rostova</p>
                  <p className="text-on-surface-variant text-[12px]">Clinical Psychologist</p>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-on-primary-fixed-variant transition-colors">Join Livestream</button>
            </div>

            {/* Event 2 */}
            <div className="min-w-[300px] max-w-[320px] bg-surface rounded-3xl p-6 border border-outline-variant/20 snap-start flex-shrink-0 opacity-80">
              <div className="text-on-surface-variant font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">Tomorrow • 6:00 PM EST</div>
              <h4 className="font-headline-sm text-headline-sm font-bold mb-2 text-on-surface">Q&amp;A: Managing Social Anxiety</h4>
              <p className="text-body-md text-on-surface-variant mb-6 line-clamp-2">Open forum discussing techniques to navigate social situations with greater ease.</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface-variant"></div>
                <div className="text-sm">
                  <p className="font-bold text-on-surface">Mark Johnson, LCSW</p>
                  <p className="text-on-surface-variant text-[12px]">Therapist</p>
                </div>
              </div>
              <button className="w-full bg-surface-container-high text-on-surface-variant py-3 rounded-xl font-bold hover:bg-surface-container-highest transition-colors">Set Reminder</button>
            </div>
            
            {/* Event 3 */}
            <div className="min-w-[300px] max-w-[320px] bg-surface rounded-3xl p-6 border border-outline-variant/20 snap-start flex-shrink-0 opacity-80">
              <div className="text-on-surface-variant font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">Friday • 12:00 PM EST</div>
              <h4 className="font-headline-sm text-headline-sm font-bold mb-2 text-on-surface">Workshop: Sleep Hygiene</h4>
              <p className="text-body-md text-on-surface-variant mb-6 line-clamp-2">Learn the physiological components of sleep and how to optimize your environment.</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface-variant"></div>
                <div className="text-sm">
                  <p className="font-bold text-on-surface">Dr. Sarah Lin</p>
                  <p className="text-on-surface-variant text-[12px]">Somnologist</p>
                </div>
              </div>
              <button className="w-full bg-surface-container-high text-on-surface-variant py-3 rounded-xl font-bold hover:bg-surface-container-highest transition-colors">Set Reminder</button>
            </div>
          </div>
        </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Community;
