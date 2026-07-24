import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        <div className="flex items-center gap-10">
          <span className="font-headline-md text-headline-md font-bold text-primary">MindEase</span>
          <div className="hidden md:flex gap-8">
            <Link to="/resources" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Resources</Link>
            <Link to="/programs" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Programs</Link>
            <Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Community</Link>
          </div>
        </div>
<<<<<<< HEAD
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:block text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Login</Link>
          <Link to="/signup" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">Get Started</Link>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-xl pb-xl md:py-32 hero-gradient">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm mb-6">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>AI-Powered Mental Health Support</span>
            </div>
            <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6 max-w-3xl">
              Your Mental Wellness Companion
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
              Manage stress, anxiety, and daily challenges with the help of clinically-informed AI. Gentle guidance designed for your emotional well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/chat" className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                <span>Start Chatting</span>
                <span className="material-symbols-outlined">chat_bubble</span>
              </Link>
              <Link to="/learn-more" className="border border-primary text-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary-fixed transition-all active:scale-95 flex items-center justify-center">
                Learn More
              </Link>
            </div>
            {/* Hero Artwork Placeholder */}
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/20">
              <img className="w-full h-full object-cover" data-alt="A serene and minimalist 3D digital landscape showing a peaceful zen garden at dawn. Soft pastel blues, lavenders, and mint greens dominate the palette, creating a therapeutic atmosphere. Gentle rippling water and abstract glass-like sculptures reflect soft morning light. The composition is clean, airy, and evokes a feeling of profound mental clarity and quietude." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCjfJPs0HUmTaq5TRpk7pzjKQ2Jml2OUhJfnZK2di54KAAC1c8RhyTc2IBIi6ygcUVtGdNfoMDikZaZTQPymi7TSk2lWtNu9uFfwcb3vkxALRjR80QWANmXCLfdCZf4Kkq4Yg8b5XCPLho2pIbxSwVTvELWsfddJSlI7Ufbn6ycyqDKYvT8Evge_xnXJmpex71-LEaiLN1I4IDHrmLzx8kK1zjnIkwIbvyah7mAgfgXnajzKSc-p5fOwoOxTwB04PfSGpKEdPEuwO1" alt="Peaceful zen garden at dawn" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-xl bg-surface-container-low">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="flex items-center gap-4 p-6 bg-surface rounded-2xl border border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface">Secure &amp; Private</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Your data is encrypted and anonymized.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-surface rounded-2xl border border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface">Evidence-Based</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Built on CBT and mindfulness principles.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-surface rounded-2xl border border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface">Available Anytime</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Support is ready 24/7, whenever you need.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-xl md:py-32 bg-background">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">How MindEase Works</h2>
              <p className="font-body-md text-body-md text-on-surface-variant w-full mx-auto ">Three simple steps to start your journey toward a calmer mind.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container mb-6 shadow-md">
                  <span className="material-symbols-outlined text-3xl">edit_note</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-3">Share Your Thoughts</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Type out what's on your mind in our safe, judgement-free chat environment.</p>
                <div className="hidden md:block absolute top-10 -right-6 w-12 h-[2px] bg-outline-variant/30"></div>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6 shadow-md">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-3">AI Understands</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Our empathetic AI analyzes your mood and identifies emotional patterns.</p>
                <div className="hidden md:block absolute top-10 -right-6 w-12 h-[2px] bg-outline-variant/30"></div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant mb-6 shadow-md">
                  <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-3">Receive Support</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Get personalized exercises, reflections, and actionable advice instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-xl md:py-32 bg-surface-container-low">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Comprehensive Tools for Your Mind</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Discover our science-backed features designed to nurture your mental well-being every day.</p>
              </div>
              <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all">
                View all features <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-auto gap-gutter">
              <div className="md:col-span-3 p-8 bg-surface rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">monitor_heart</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Stress Detection</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Automatic analysis of language patterns to detect rising stress levels before they become overwhelming.</p>
              </div>
              <div className="md:col-span-3 p-8 bg-surface rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">spa</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Anxiety Support</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Real-time grounding techniques and anxiety-reduction protocols during periods of high distress.</p>
              </div>
              <div className="md:col-span-2 p-8 bg-surface rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">air</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Breathing</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Guided rhythmic breathing exercises to activate your body's relaxation response.</p>
              </div>
              <div className="md:col-span-2 p-8 bg-surface rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">self_improvement</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Mindfulness</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Short, accessible meditation sessions for focus and mental presence.</p>
              </div>
              <div className="md:col-span-2 p-8 bg-surface rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-primary-fixed-variant flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">history_edu</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">CBT Reflection</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Structured Cognitive Behavioral Therapy tools for reframing negative thought patterns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-xl bg-primary text-on-primary">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="font-headline-xl text-headline-xl mb-1">500k+</p>
              <p className="font-label-md text-label-md opacity-80 uppercase tracking-wider">Users Supported</p>
            </div>
            <div>
              <p className="font-headline-xl text-headline-xl mb-1">12M+</p>
              <p className="font-label-md text-label-md opacity-80 uppercase tracking-wider">Sessions Completed</p>
            </div>
            <div>
              <p className="font-headline-xl text-headline-xl mb-1">4.9/5</p>
              <p className="font-label-md text-label-md opacity-80 uppercase tracking-wider">User Rating</p>
            </div>
            <div>
              <p className="font-headline-xl text-headline-xl mb-1">24/7</p>
              <p className="font-label-md text-label-md opacity-80 uppercase tracking-wider">Active Support</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-xl md:py-32 bg-background">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Frequently Asked Questions</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Have questions? We have answers.</p>
            </div>
            <div className="space-y-4">
              <details className="group bg-surface rounded-2xl border border-outline-variant/20 p-6 open:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-label-md text-label-md text-on-surface">Is MindEase a replacement for therapy?</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-4 font-body-md text-body-md text-on-surface-variant">
                  No, MindEase is designed to complement professional care, not replace it. It provides immediate support and habit tracking, but for clinical conditions, we recommend consulting a licensed therapist.
                </div>
              </details>
              <details className="group bg-surface rounded-2xl border border-outline-variant/20 p-6 open:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-label-md text-label-md text-on-surface">How secure is my personal data?</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-4 font-body-md text-body-md text-on-surface-variant">
                  Your privacy is our priority. All conversations are end-to-end encrypted, and we never sell your data to third parties. We are fully HIPAA and GDPR compliant.
                </div>
              </details>
              <details className="group bg-surface rounded-2xl border border-outline-variant/20 p-6 open:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-label-md text-label-md text-on-surface">What makes the AI "empathetic"?</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-4 font-body-md text-body-md text-on-surface-variant">
                  Our AI models are trained on millions of therapeutic interactions and supervised by psychologists to ensure the tone is supportive, validating, and ethically sound.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-xl mb-xl">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="bg-primary-container text-on-primary-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-6">Ready to find your peace?</h2>
                <p className="font-body-lg text-body-lg mb-10 opacity-90 max-w-2xl mx-auto">Join thousands of others who are managing their stress and building emotional resilience with MindEase.</p>
                <Link to="/signup" className="inline-block bg-surface text-primary px-10 py-5 rounded-full font-label-md text-label-md hover:opacity-95 active:scale-95 transition-all shadow-xl">
                  Start Your Free Trial
                </Link>
              </div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
=======
        
      </section>
    </>
>>>>>>> ec8e21865dde0195edfa95d2084b06ce6a3711af
  );
}

export default LandingPage;