import React from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';

function Privacy() {
  const { toggleMobileMenu } = useLayout();

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background">
      {/* Top Header */}
      <header className="h-20 w-full flex justify-between items-center px-margin-mobile md:px-margin-desktop bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={toggleMobileMenu} className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
            <span className="font-headline-md text-headline-md font-bold text-primary">MindEase</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/resources" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
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
          <Link
            to="/chat"
            className="bg-primary text-on-primary px-5 py-2 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95 text-sm font-bold"
          >
            Chat Assistant
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
        <main className="px-margin-mobile md:px-margin-desktop py-10 max-w-[1000px] mx-auto space-y-8">
          
          {/* Header Banner */}
          <div className="space-y-3 border-b border-outline-variant/30 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-base">shield</span>
              Privacy Policy
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
              MindEase Privacy Policy
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              Effective Date: August 2026 • Last Updated: August 2026
            </p>
          </div>

          {/* Important Health Disclaimer Box */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-2 text-on-surface">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <span>Important Health & Mental-Wellness Disclaimer</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              MindEase is a mental-wellness and self-care support platform designed for emotional tracking, self-guided exercises, and supportive AI conversations. <strong>MindEase is not a medical diagnosis system or a substitute for a qualified healthcare professional.</strong> AI responses are informational and supportive only. If you are experiencing a mental health crisis or emergency situation, please use our <Link to="/emergency" className="text-error font-bold hover:underline">Emergency Support</Link> tools or contact emergency services immediately.
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">inventory_2</span>
              1. Information We Collect
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We collect information that you directly provide when using MindEase features to deliver a personalized experience:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-on-surface-variant pl-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">Account Credentials:</strong> Full name or display name, email address, and encrypted password hash used for authentication.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">AI Chat Conversations & History:</strong> Conversation messages exchanged with our AI Chatbot companion, saved per session for ongoing support.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">Mood Check-ins & Daily Streaks:</strong> Daily mood selections, notes, entry timestamps, and consecutive check-in day streak statistics.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">Programs & Learning Progress:</strong> Program enrollments, completed activities, and module progress percentages.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">Community Discussions & Interactions:</strong> Posts, comments, likes/reactions, and content reports submitted on the Community page.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 2: Location Privacy */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              2. Location Data & Nearby Facilities
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              When you use our nearby healthcare facility search on the Emergency Support page:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant list-disc pl-5 leading-relaxed">
              <li>Location access requires your explicit browser permission.</li>
              <li>Location data is requested strictly on-demand when calculating distances to nearby hospitals and clinics.</li>
              <li>You can deny location permission at any time without blocking access to non-location features.</li>
              <li><strong>MindEase does not continuously track your location or store background location history.</strong></li>
            </ul>
          </section>

          {/* Section 3: Community Privacy & Anonymous Posting */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">forum</span>
              3. Community Discussions & Anonymous Posting
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our Community forum provides peer support options:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant list-disc pl-5 leading-relaxed">
              <li>Public discussions and comments are visible to other authenticated community users.</li>
              <li>You can choose to post anonymously by enabling the "Post Anonymously" option.</li>
              <li>Anonymous posts display <strong>"Anonymous"</strong> as the author name to all other community members.</li>
              <li>To protect your safety and maintain platform integrity, MindEase internally links posts to your account for security, moderation, ownership validation, editing, and deletion.</li>
              <li>We never expose your private email or real name on anonymous posts.</li>
            </ul>
          </section>

          {/* Section 4: Data Storage, Supabase & AI Third Parties */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">dns</span>
              4. Database Infrastructure & Third-Party Services
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              MindEase utilizes trusted cloud infrastructure and AI processing services:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant list-disc pl-5 leading-relaxed">
              <li><strong>Database & Authentication:</strong> User accounts, posts, and check-ins are securely synchronized using Supabase PostgreSQL and our Flask backend database.</li>
              <li><strong>AI Companion Pipeline:</strong> AI chat queries are processed through OpenRouter and LLM APIs to generate supportive response suggestions.</li>
              <li><strong>Browser Storage:</strong> We use browser <code className="bg-surface-container px-1.5 py-0.5 rounded text-xs">localStorage</code> to cache your active session, theme preferences, and offline data.</li>
            </ul>
          </section>

          {/* Section 5: Permanent Account Deletion */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">delete_forever</span>
              5. Permanent Account & Data Deletion
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              You retain full control over your personal data:
            </p>
            <div className="bg-surface-container-low p-4 rounded-2xl text-xs sm:text-sm text-on-surface space-y-2">
              <p className="font-bold text-on-surface">How to delete your account:</p>
              <p className="text-on-surface-variant">
                You can permanently delete your MindEase account at any time by navigating to <Link to="/settings" className="text-primary font-bold hover:underline">Settings → Privacy & Data → Delete Account</Link>.
              </p>
              <p className="text-on-surface-variant text-xs">
                Account deletion requires password confirmation. Upon confirmation, your user profile, mood logs, AI chat history, program enrollments, emergency contacts, and community posts are permanently removed from our databases.
              </p>
            </div>
          </section>

          {/* Section 6: Contact Information */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">mail</span>
              6. Contact & Privacy Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              If you have any questions or privacy inquiries regarding this Privacy Policy, please contact our support team at <a href="mailto:support@mindease.care" className="text-primary font-bold hover:underline">support@mindease.care</a> or submit a inquiry through our <Link to="/help" className="text-primary font-bold hover:underline">Help & Support Center</Link>.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Privacy;
