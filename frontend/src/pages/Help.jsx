import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';
import { useData } from '../context/DataContext';

function Help() {
  const { toggleMobileMenu } = useLayout();
  const { faqs, supportTickets, submitSupportTicket } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Technical Support');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    const tkt = submitSupportTicket({
      subject: ticketSubject,
      category: ticketCategory,
      message: ticketMessage
    });

    setSubmittedTicket(tkt);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setSubmittedTicket(null), 5000);
  };

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
        <Link to="/chat" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Chat</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <main className="pt-8 pb-16 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto space-y-12">

          {/* Search Header */}
          <header className="text-center">
            <h1 className="font-headline-xl text-[32px] md:text-[40px] font-bold text-on-surface mb-2">
              Help Center &amp; FAQs
            </h1>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-8 text-sm">
              Find instant answers to common questions or reach out to our team.
            </p>

            <div className="max-w-[640px] mx-auto relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="w-full pl-12 pr-6 py-4 rounded-full bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                placeholder="Search FAQs (e.g. 'privacy', 'streak', 'free')..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* Support Ticket Submission & FAQ Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Support Ticket Form */}
            <div className="space-y-6">
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
                <div>
                  <h2 className="font-headline-md text-xl font-bold text-on-surface">Submit Support Ticket</h2>
                  <p className="text-xs text-on-surface-variant">Our team responds within 24 hours.</p>
                </div>

                {submittedTicket && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 text-xs font-semibold flex items-center gap-2 border border-emerald-500/20">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Ticket #{submittedTicket.id} created! We will get back to you shortly.</span>
                  </div>
                )}

                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1">Category</label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs font-semibold"
                    >
                      <option>Technical Support</option>
                      <option>Account &amp; Billing</option>
                      <option>Feature Request</option>
                      <option>Clinical Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="Summary of your question or issue..."
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Provide details about what you need assistance with..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-bold text-xs rounded-full shadow hover:opacity-90 transition"
                  >
                    Submit Ticket
                  </button>
                </form>
              </div>

              {/* Submitted Tickets Tracker */}
              {supportTickets.length > 0 && (
                <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm space-y-4">
                  <h3 className="font-bold text-on-surface text-sm">Your Tracked Tickets</h3>
                  <div className="space-y-2">
                    {supportTickets.map((tkt) => (
                      <div key={tkt.id} className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-on-surface">{tkt.subject}</p>
                          <span className="text-[10px] text-outline">{tkt.id} • {tkt.createdAt}</span>
                        </div>
                        <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 rounded-full font-bold text-[10px]">
                          {tkt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-6">
              <h2 className="font-headline-md text-xl font-bold text-on-surface">Frequently Asked Questions</h2>
              
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left font-bold text-on-surface text-sm flex items-center justify-between hover:text-primary transition"
                    >
                      <span>{faq.question}</span>
                      <span className={`material-symbols-outlined text-outline transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>

                    {openFaqIndex === index && (
                      <div className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}

export default Help;
