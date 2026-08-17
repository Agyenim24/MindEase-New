import React from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';

function Terms() {
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
              <span className="material-symbols-outlined text-base">gavel</span>
              Terms of Service
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
              MindEase Terms of Service
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              Effective Date: August 2026 • Last Updated: August 2026
            </p>
          </div>

          {/* AI Chatbot & Mental Health Disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-2 text-on-surface">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
              <span>AI Chatbot & Medical Disclaimer</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              MindEase provides AI-driven emotional support and wellness tools. <strong>Our AI chatbot generates responses using automated language models and is not a licensed therapist, psychologist, psychiatrist, or medical professional.</strong> AI responses are informational and supportive only and should never replace qualified professional medical advice or emergency treatment. In crisis or emergency situations, please utilize emergency services or visit our <Link to="/emergency" className="text-error font-bold hover:underline">Emergency Support page</Link>.
            </p>
          </div>

          {/* Section 1: Acceptable Use & User Accounts */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_check</span>
              1. Acceptable Use & Account Responsibilities
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              By accessing or using MindEase, you agree to comply with all applicable laws and these Terms:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant list-disc pl-5 leading-relaxed">
              <li>You are responsible for maintaining the confidentiality of your account credentials and password.</li>
              <li>You agree to use MindEase for legitimate personal wellness, self-care, and educational purposes.</li>
              <li>You may not attempt to gain unauthorized access to other user accounts, databases, or API infrastructure.</li>
            </ul>
          </section>

          {/* Section 2: Community Discussion Rules & Anonymous Posting */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">groups</span>
              2. Community Discussion Rules & Anonymous Posting
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              MindEase provides a peer support Community forum. When contributing discussions, comments, or reactions:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-on-surface-variant pl-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">Prohibited Content:</strong> Harassment, hate speech, bullying, explicit or illegal material, spam, and commercial solicitation are strictly prohibited.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">Anonymous Posting Rights:</strong> You may choose to post anonymously. Anonymous posts display "Anonymous" to other users while maintaining internal association with your account for security, editing, moderation, and deletion.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="text-on-surface">Moderation & Content Reporting:</strong> MindEase reserves the right to remove content that violates community standards or process user flags/reports.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: AI-Generated Content Limitations */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">psychology</span>
              3. AI-Generated Content Limitations
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our AI Chatbot provides supportive, reflective dialogue:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant list-disc pl-5 leading-relaxed">
              <li>AI responses are generated dynamically using artificial intelligence models.</li>
              <li>MindEase does not guarantee that every AI response is 100% accurate, complete, or clinically applicable.</li>
              <li>AI responses should not be relied upon for medical diagnosis, legal decisions, or emergency actions.</li>
            </ul>
          </section>

          {/* Section 4: User Content & Intellectual Property */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">copyright</span>
              4. User Content & Intellectual Property
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              You retain ownership of the text and content you submit to MindEase. MindEase retains all rights, title, and interest in the MindEase application, software, logos, trademarks, and educational course materials.
            </p>
          </section>

          {/* Section 5: Account Termination & Permanent Deletion */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">no_accounts</span>
              5. Account Termination & Deletion
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              You may terminate your account at any time via <Link to="/settings" className="text-primary font-bold hover:underline">Settings → Delete Account</Link> using password verification. MindEase reserves the right to suspend or terminate accounts that repeatedly violate Community Guidelines or compromise platform security.
            </p>
          </section>

          {/* Section 6: Service Availability & Limitation of Liability */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">gavel</span>
              6. Service Availability & Limitation of Liability
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              MindEase is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. To the maximum extent permitted by law, MindEase shall not be liable for indirect, incidental, or consequential damages resulting from your use of the application or reliance on AI-generated wellness content.
            </p>
          </section>

          {/* Section 7: Changes to Terms & Contact */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 sm:p-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">contact_support</span>
              7. Changes to Terms & Contact Information
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              We may update these Terms from time to time. Continued use of MindEase constitutes acceptance of updated Terms. For questions regarding these Terms, contact <a href="mailto:support@mindease.care" className="text-primary font-bold hover:underline">support@mindease.care</a> or visit our <Link to="/help" className="text-primary font-bold hover:underline">Help & Support Center</Link>.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Terms;
