import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Programs() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop shrink-0">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-primary p-2">
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
            <span className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" data-alt="A close-up portrait of a serene woman with closed eyes and a soft smile, set against a blurred background of a tranquil, sun-drenched botanical garden. The lighting is ethereal and high-key, emphasizing a light-mode aesthetic with soft highlights and a peaceful, clinical but warm atmosphere. The image is crisp, modern, and professional, reflecting a high-end SaaS profile aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOyFxZRyLPOzv7JOnhXbvm4XHM7OXMP7dPkU0SyIT635aHySENY1gd4odPJo-nreYAZsKdZV-rr_it0dLFQ0qF8AQFEAoQMXiP4QWWeLbOyeG5-0aNFSH0WW177X5dYK_D67BG7cd3h9wj5WKinG45QFQlG_sC5F8GcDNBDXLqQDbP_BO0kPifU4BcsWAvbeB43QItvGZO-2fvDGBbpRSI6UmVRlYLdv8s6oXnhl5zSjEUtce6VugYE5K2DHq5eVlPhnvH5JRJ3hkQ" alt="User Profile" />
            </span>
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
                <h2 className="font-headline-lg text-headline-lg text-on-surface">My Active Programs</h2>
                <p className="text-on-surface-variant font-body-md">Continue your journey where you left off.</p>
              </div>
              <button className="text-primary font-bold hover:underline font-label-md">View All</button>
            </div>
            {/* Progress Card (Bento Style) */}
            <div className="bg-surface-container-lowest rounded-[32px] p-8 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 relative group">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A peaceful landscape image featuring a calm lake reflecting a soft pink and purple sunrise over distant mountains. The scene is incredibly tranquil, minimal, and airy, designed for a wellness app's light mode theme. High-resolution digital photography with soft focus on the water ripples, creating a sense of immediate emotional relief and serenity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFSYROwIpmZSngeYNtZIZfeKlecHW1w1FlUEgiXmxeE_-YZtGgVBw03qcwEn_v4ZQm1fpGEQE0aP7fthqd7EoVAVMx1LJzqWlrlqDQcFNsv0DmOMlgKgzrdletzV0DWY1s1KNYvc5VByk7InY5eQHjfl-nwXnDcXe8HffUUQ9G0oShSNg1zfq5zIN-DnuLXqM7RsaMu-1HK4UGmbNOmWlK59PyLfKqrpkPhHx2Ck0MZvBdA-sTn3gDAU5PHNi2j3zplZ-u5HBckhCU" alt="Active Program" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm">In Progress</span>
                  <span className="text-on-surface-variant text-[12px] font-medium">• Day 4 of 7</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">7-Day Stress Relief Mastery</h3>
                <p className="text-on-surface-variant w-full">Techniques grounded in cognitive behavioral therapy to help you identify stressors and apply immediate grounding exercises.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[13px] font-bold">
                    <span>Progress</span>
                    <span>57%</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '57%' }}></div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-on-primary-fixed-variant transition-all active:scale-95 shadow-md shadow-primary/20">Resume Lesson</button>
                  <button className="px-6 py-3 border border-outline text-on-surface rounded-full font-bold hover:bg-surface-container-high transition-all">Details</button>
                </div>
              </div>
            </div>
          </section>

          {/* Browse Programs Categories */}
          <section className="space-y-md">
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2 bg-primary text-white rounded-full font-bold transition-all shadow-md">All Programs</button>
              <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full font-medium transition-all">Anxiety</button>
              <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full font-medium transition-all">Sleep</button>
              <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full font-medium transition-all">Focus</button>
              <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full font-medium transition-all">Habit Building</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Program Card 1 */}
              <div className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Minimalist artistic representation of deep sleep, featuring a soft, glowing moon and a cloud-like texture in shades of deep indigo and soft periwinkle. The image uses soft gradients and grainy textures to evoke a sense of quiet and rest. High-end modern digital art style, clean and uncluttered, matching a professional health SaaS aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6bX3CdeGKTWYh0yzEz1r9LRpGYyAuRsUNBVoBBBnwBj4gijMPJ3oUpLUK58stPrPhoLvKFbsYBqB47BPZLqFIKsshAiDGuu5Jv2zhfkaUO94NdzOBP6vdRCWsJJl9s82C9_KpufPW87AqF5j8dUSmNc0S4-aFpxqxE-smsAVXqJNLulzZoQdLB_SB1cfBzCYWXsfmq2v5tQOID9nM-cG0t_kzHL1FL5uWXbEtV5lzB0CjpGf3-OKTjhxsAZSiRBluJPUHvHGbTc-2" alt="Sleep Habit" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    POPULAR
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> 14 Days
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span> Beginner
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Better Sleep Habit</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Establish a winding-down routine that signals your nervous system to prepare for restorative rest.</p>
                  <button className="w-full py-3 bg-primary/10 text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">Start Program</button>
                </div>
              </div>

              {/* Program Card 2 */}
              <div className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Abstract digital illustration of focus and clarity, featuring clean geometric shapes floating in a bright, white-walled gallery space. The color palette is composed of mint greens and soft primary blues. The lighting is diffused and bright, creating an atmosphere of mental sharpness and professional calm. Modern minimalist aesthetic for a tech-wellness platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNDcxfHstJ0exhTXOpuvNGAmf5dCqR3z065pZu2Llc_rQR97EHPDoScVRXfrn492FxW4o3UmvBjIRD4zUKx_8fITM4TZwxawFtLNGoNSGUGusuDDg8Y2r4DZ5Mb3Mzfx7jo4wsB_fUz14b8CkhQGr4iYuL7RV0kA_9KvLc9Ri00s9SmfRuuzx6EqL8PMmCOMXRd58McmfFDPV_lxGFxl-G5yISmbf0dLucD6K7GezxdTqEsviLq_qfF3H-ad74ox5yOQMC3WUmNXaG" alt="Mindfulness" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-secondary flex items-center gap-1">
                    NEW
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> 5 Days
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span> Intermediate
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Mindfulness for Beginners</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Learn the fundamentals of presence and non-judgmental awareness through guided 10-minute sessions.</p>
                  <button className="w-full py-3 bg-primary/10 text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">Start Program</button>
                </div>
              </div>

              {/* Program Card 3 */}
              <div className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A macro photograph of a dewdrop on a vibrant green leaf, symbolizing freshness and resilience. The lighting is early morning sun, warm and directional, creating beautiful bokeh in the background. The aesthetic is clean, natural, and therapeutic, using the design's mint green and primary blue accents to ground the image in the brand's professional wellness identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8FOAdRlv9qjKxM_kUx57BFAlj3Uz3MpoQCOcRCI7lY_JRWq8BVuTA2SPWFcUZ8Jpjab4PsP0L5WF57qr1dQt3vrIhdJi2VCyGfRo2-rMaFHSEb0He_pbOTc4eXUP_DF0zcWSGvjTwi2Srq-H2WvfBFC9qfHq_W-jJbda7wbSpczumzRNxzAUKX7D0IsE53HLErUX71rd7ZGyBLj9CZjBMJz_94TJe8hbaNtBVSZUdP371Xhuskh4KhP37nhhCsilHEGVHht72XUVG" alt="Resilience Builder" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> 21 Days
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span> Advanced
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Resilience Builder</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Deep-dive into mental toughness and emotional regulation strategies for high-stress professional environments.</p>
                  <button className="w-full py-3 bg-primary/10 text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">Start Program</button>
                </div>
              </div>
            </div>
          </section>

          {/* Recommendation Section */}
          <section className="bg-gray-200 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="font-headline-md text-headline-md text-on-surfac">
                Not sure where to start?
              </h2>

              <p className="text-sm mt-4">
                Take our 2-minute assessment to find the program that matches your current emotional needs and goals.
              </p>
            </div>

            <button className="px-8 py-3 bg-black text-white cursor-pointer rounded-full font-semibold whitespace-nowrap hover:bg-gray-700 transition">
              Take Assessment
            </button>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Programs;
