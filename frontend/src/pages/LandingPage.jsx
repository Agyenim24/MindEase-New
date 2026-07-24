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
            {/* Hero Artwork */}
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/20">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCjfJPs0HUmTaq5TRpk7pzjKQ2Jml2OUhJfnZK2di54KAAC1c8RhyTc2IBIi6ygcUVtGdNfoMDikZaZTQPymi7TSk2lWtNu9uFfwcb3vkxALRjR80QWANmXCLfdCZf4Kkq4Yg8b5XCPLho2pIbxSwVTvELWsfddJSlI7Ufbn6ycyqDKYvT8Evge_xnXJmpex71-LEaiLN1I4IDHrmLzx8kK1zjnIkwIbvyah7mAgfgXnajzKSc-p5fOwoOxTwB04PfSGpKEdPEuwO1" alt="Peaceful zen garden at dawn" />
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
              <p className="font-body-md text-body-md text-on-surface-variant w-full mx-auto">Three simple steps to start your journey toward a calmer mind.</p>
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
                <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container mb-6 shadow-md">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-3">Receive Insights</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Our AI provides immediate, customized tools and grounding exercises tailored to you.</p>
                <div className="hidden md:block absolute top-10 -right-6 w-12 h-[2px] bg-outline-variant/30"></div>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container mb-6 shadow-md">
                  <span className="material-symbols-outlined text-3xl">wb_sunny</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-3">Track Progress</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Build daily habits over time to see tangible growth in clarity and peace of mind.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
