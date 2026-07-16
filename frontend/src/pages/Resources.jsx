import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Resources() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Clinical Resources</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 mr-8">
            <Link to="/resources" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Resources</Link>
            <Link to="/programs" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Programs</Link>
            <Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Community</Link>
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
        {/* Search & Filter Section */}
        <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/20 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                type="text" 
                placeholder="Search articles, exercises, or topics (e.g. 'panic attack')" 
                className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto overflow-x-auto hide-scrollbar pb-2 md:pb-0">
              <button className="whitespace-nowrap px-6 py-3 bg-primary text-on-primary rounded-xl font-label-md font-bold shadow-sm">All</button>
              <button className="whitespace-nowrap px-6 py-3 bg-surface border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high rounded-xl font-label-md font-medium transition-colors">Articles</button>
              <button className="whitespace-nowrap px-6 py-3 bg-surface border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high rounded-xl font-label-md font-medium transition-colors">Audio</button>
              <button className="whitespace-nowrap px-6 py-3 bg-surface border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high rounded-xl font-label-md font-medium transition-colors">Worksheets</button>
            </div>
          </div>
        </section>

        {/* Featured / Emergency Toolkit */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="bg-error-container text-on-error-container rounded-3xl p-8 flex flex-col justify-between border border-error/20">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-error">emergency</span>
                <span className="font-label-md text-label-md font-bold text-error uppercase tracking-wider">Crisis Toolkit</span>
              </div>
              <h2 className="font-headline-md text-headline-md mb-2 font-bold">Panic Attack Protocol</h2>
              <p className="font-body-md text-body-md opacity-90 mb-6">Immediate, step-by-step grounding techniques to help regulate your nervous system during a severe anxiety spike.</p>
            </div>
            <button className="w-max bg-error text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-red-700 transition-colors">Start Protocol</button>
          </div>
          
          <div className="bg-primary-container text-on-primary-container rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[200px]">auto_stories</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">star</span>
                <span className="font-label-md text-label-md font-bold text-primary uppercase tracking-wider">Featured Read</span>
              </div>
              <h2 className="font-headline-md text-headline-md mb-2 font-bold">Understanding Cognitive Distortions</h2>
              <p className="font-body-md text-body-md opacity-90 mb-6">Learn to identify the 10 most common ways our minds filter reality negatively, and how to gently correct them.</p>
            </div>
            <button className="w-max bg-primary text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-on-primary-fixed-variant transition-colors relative z-10">Read Article</button>
          </div>
        </section>

        {/* Library Grid */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Latest Additions</h3>
            <button className="text-primary font-bold hover:underline font-label-md flex items-center gap-1">
              Browse Topics <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Resource Card 1 */}
            <Link to="#" className="group bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center group-hover:bg-primary-container group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">headphones</span>
              </div>
              <div>
                <span className="text-[12px] font-bold text-outline uppercase tracking-wider mb-1 block">Audio Exercise • 5 Min</span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Box Breathing Guide</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">A simple audio guide to the 4-4-4-4 breathing technique used to rapidly lower heart rate.</p>
              </div>
            </Link>

            {/* Resource Card 2 */}
            <Link to="#" className="group bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center group-hover:bg-secondary-container group-hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">edit_document</span>
              </div>
              <div>
                <span className="text-[12px] font-bold text-outline uppercase tracking-wider mb-1 block">Interactive Worksheet</span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors">Thought Record</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">A digital CBT worksheet to log, analyze, and reframe automatic negative thoughts.</p>
              </div>
            </Link>

            {/* Resource Card 3 */}
            <Link to="#" className="group bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center group-hover:bg-tertiary-container group-hover:text-tertiary transition-colors">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div>
                <span className="text-[12px] font-bold text-outline uppercase tracking-wider mb-1 block">Article • 4 Min Read</span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 group-hover:text-tertiary transition-colors">The Science of Sleep</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Understand the phases of sleep and why REM is crucial for emotional processing.</p>
              </div>
            </Link>
            
            {/* Resource Card 4 */}
            <Link to="#" className="group bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center group-hover:bg-primary-container group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">headphones</span>
              </div>
              <div>
                <span className="text-[12px] font-bold text-outline uppercase tracking-wider mb-1 block">Audio Exercise • 15 Min</span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Progressive Muscle Relaxation</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Systematically tense and release muscle groups to alleviate physical manifestations of stress.</p>
              </div>
            </Link>
            
            {/* Resource Card 5 */}
            <Link to="#" className="group bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center group-hover:bg-secondary-container group-hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div>
                <span className="text-[12px] font-bold text-outline uppercase tracking-wider mb-1 block">Article • 7 Min Read</span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors">Boundaries 101</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">How to communicate effectively and protect your energy in professional and personal settings.</p>
              </div>
            </Link>
            
            {/* Resource Card 6 */}
            <Link to="#" className="group bg-surface rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center group-hover:bg-tertiary-container group-hover:text-tertiary transition-colors">
                <span className="material-symbols-outlined">edit_document</span>
              </div>
              <div>
                <span className="text-[12px] font-bold text-outline uppercase tracking-wider mb-1 block">Template</span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 group-hover:text-tertiary transition-colors">Safety Plan Builder</h4>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Create a personalized action plan for when you're feeling overwhelmed or in crisis.</p>
              </div>
            </Link>
          </div>
        </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Resources;
