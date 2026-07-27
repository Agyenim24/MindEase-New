import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useLayout } from '../components/Layout';
import { useData } from '../context/DataContext';

const categories = ['All Programs', 'Anxiety', 'Sleep', 'Stress', 'CBT'];

function Programs() {
  const { toggleMobileMenu } = useLayout();
  const { programs, toggleEnrollProgram, toggleModuleCompletion, profile } = useData();

  const [activeCategory, setActiveCategory] = useState('All Programs');
  const [selectedProgram, setSelectedProgram] = useState(null);

  const activePrograms = programs.filter((p) => p.enrolled);

  const filteredPrograms = programs.filter((p) => {
    if (activeCategory === 'All Programs') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={toggleMobileMenu} className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Wellness Programs</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 mr-8">
            <Link to="/resources" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Resources</Link>
            <Link to="/programs" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Programs</Link>
            <Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Community</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:scale-105 transition">
              <img className="w-full h-full object-cover" src={profile.avatar} alt={profile.name} />
            </Link>
          </div>
        </div>
      </header>

      {/* Page Scrollable Area */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
        <div className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-xl flex-grow">

          {/* My Active Programs Section */}
          <section>
            <div className="flex justify-between items-end mb-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">My Active Programs</h2>
                <p className="text-on-surface-variant font-body-md">Continue your journey where you left off.</p>
              </div>
              <span className="text-sm font-semibold text-primary">
                {activePrograms.length} Enrolled
              </span>
            </div>

            {activePrograms.length > 0 ? (
              <div className="space-y-6">
                {activePrograms.map((prog) => (
                  <div key={prog.id} className="bg-surface-container-lowest rounded-[32px] p-8 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3 relative group">
                      <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={prog.image} alt={prog.title} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-bold">
                          {prog.category}
                        </span>
                        <span className="text-on-surface-variant text-[12px] font-medium">• Instructor: {prog.instructor}</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{prog.title}</h3>
                      <p className="text-on-surface-variant w-full text-sm">{prog.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-[13px] font-bold">
                          <span>Overall Progress</span>
                          <span className="text-primary">{prog.progress}%</span>
                        </div>
                        <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${prog.progress}%` }}></div>
                        </div>
                      </div>

                      {/* Interactive Module List Toggle */}
                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedProgram(selectedProgram === prog.id ? null : prog.id)}
                          className="text-xs font-bold text-primary flex items-center gap-1 hover:underline mb-2"
                        >
                          <span>{selectedProgram === prog.id ? 'Hide Modules' : 'View & Complete Modules'}</span>
                          <span className="material-symbols-outlined text-sm">{selectedProgram === prog.id ? 'expand_less' : 'expand_more'}</span>
                        </button>

                        {selectedProgram === prog.id && (
                          <div className="mt-3 p-4 bg-surface-container-low rounded-2xl divide-y divide-outline-variant/10 space-y-2">
                            {prog.modules.map((m) => (
                              <div key={m.id} className="pt-2 first:pt-0 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => toggleModuleCompletion(prog.id, m.id)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                                      m.completed ? 'bg-primary border-primary text-white' : 'border-outline-variant hover:border-primary'
                                    }`}
                                  >
                                    {m.completed && <span className="material-symbols-outlined text-xs">check</span>}
                                  </button>
                                  <span className={`text-sm font-medium ${m.completed ? 'line-through text-outline' : 'text-on-surface'}`}>
                                    {m.title}
                                  </span>
                                </div>
                                <span className="text-xs text-outline">{m.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => toggleEnrollProgram(prog.id)}
                          className="px-6 py-2.5 border border-error/30 text-error rounded-full text-xs font-bold hover:bg-error/10 transition"
                        >
                          Leave Program
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/20">
                <p className="text-on-surface-variant text-sm mb-4">You are not enrolled in any programs yet. Explore below!</p>
              </div>
            )}
          </section>

          {/* Browse All Programs */}
          <section className="space-y-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Explore All Programs</h2>
            
            {/* Category Chips */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Programs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filteredPrograms.map((prog) => (
                <div key={prog.id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="h-48 relative overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={prog.image} alt={prog.title} />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-primary flex items-center gap-1">
                        {prog.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span> {prog.duration}
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span> {prog.level}
                        </span>
                      </div>
                      <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors font-bold">{prog.title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{prog.description}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => toggleEnrollProgram(prog.id)}
                      className={`w-full py-3 rounded-2xl font-bold transition-all ${
                        prog.enrolled
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                          : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      {prog.enrolled ? 'Enrolled ✓' : 'Enroll in Program'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendation Section */}
          <section className="bg-gradient-to-r from-primary-container/30 to-secondary-container/20 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-outline-variant/20">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Personalized Assessment</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Not sure where to start?
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Take our 2-minute clinical assessment to get custom program recommendations matched to your needs.
              </p>
            </div>

            <Link
              to="/assessment"
              className="px-8 py-3.5 bg-primary text-white rounded-full font-bold whitespace-nowrap hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <span>Take Assessment</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </section>

        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Programs;
