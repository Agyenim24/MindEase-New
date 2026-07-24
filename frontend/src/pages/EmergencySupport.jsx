import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';

const nearbyClinics = [
  {
    id: 'clinic-1',
    name: 'Grace Wellness & Behavioral Health ER',
    distance: '0.8 miles away',
    address: '124 Healing Way, Suite 100',
    phone: '(555) 234-5678',
    openStatus: 'Open 24/7',
    lat: 37.7749,
    lng: -122.4194,
    mapsUrl: 'https://maps.google.com/?q=Grace+Wellness+Crisis+Center',
  },
  {
    id: 'clinic-2',
    name: 'St. Mary Psychiatric Immediate Care',
    distance: '1.4 miles away',
    address: '450 Mercy Blvd, Floor 2',
    phone: '(555) 876-5432',
    openStatus: 'Open 24/7',
    lat: 37.7833,
    lng: -122.4167,
    mapsUrl: 'https://maps.google.com/?q=St+Mary+Psychiatric+Immediate+Care',
  },
  {
    id: 'clinic-3',
    name: 'Hope Community Mental Health & ER',
    distance: '2.1 miles away',
    address: '890 Hope Ave, Building B',
    phone: '(555) 345-6789',
    openStatus: 'Open 24/7',
    lat: 37.765,
    lng: -122.43,
    mapsUrl: 'https://maps.google.com/?q=Hope+Community+Mental+Health',
  },
];

const internationalResources = [
  {
    country: 'United Kingdom',
    lines: [
      { name: 'NHS (Emergency)', number: '999' },
      { name: 'Samaritans', number: '116 123' },
    ],
  },
  {
    country: 'Australia',
    lines: [
      { name: 'Emergency', number: '000' },
      { name: 'Lifeline', number: '13 11 14' },
    ],
  },
  {
    country: 'Canada',
    lines: [
      { name: 'Emergency', number: '911' },
      { name: 'Talk Suicide', number: '1.833.456.4566' },
    ],
  },
];

function EmergencySupport() {
  const { toggleMobileMenu } = useLayout();
  const [selectedClinic, setSelectedClinic] = useState(nearbyClinics[0]);
  const [locating, setLocating] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const handleLocateMe = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setLocating(false),
        () => setLocating(false)
      );
    } else {
      setLocating(false);
    }
  };

  const filteredResources = internationalResources.filter((r) =>
    r.country.toLowerCase().includes(countrySearch.toLowerCase())
  );

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
        <main className="pt-10 pb-16 px-margin-mobile md:px-margin-desktop min-h-0">

          {/* ── Hero Alert Section ──────────────────────────────── */}
          <section className="max-w-[1200px] mx-auto mb-16">
            <div className="text-center space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error-container text-error font-label-sm text-label-sm border border-error/20">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                CRITICAL SUPPORT AVAILABLE
              </div>
              <h1 className="font-headline-xl text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] tracking-tight font-bold text-on-surface">
                You are not alone.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Immediate help is available right now. Please choose the option that best fits your current situation.
              </p>
            </div>

            {/* Primary Emergency Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="tel:911"
                className="group relative overflow-hidden flex flex-col items-center justify-center p-16 rounded-[2rem] bg-error text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ animation: 'pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
              >
                <span className="material-symbols-outlined text-6xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_share</span>
                <span className="font-headline-md text-headline-md font-bold">Call Emergency Services</span>
                <span className="font-body-md mt-2 opacity-90">Dial 911 (US/Canada) or local emergency line</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href="sms:741741?body=HOME"
                className="group relative overflow-hidden flex flex-col items-center justify-center p-16 rounded-[2rem] bg-primary text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="material-symbols-outlined text-6xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                <span className="font-headline-md text-headline-md font-bold">Crisis Text Line</span>
                <span className="font-body-md mt-2 opacity-90">Text HOME to 741741 for instant support</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </section>

          {/* ── Bento Grid: Grounding + Clinic Map ─────────────── */}
          <section className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6 mb-16">
            {/* Grounding Steps (8 cols) */}
            <div className="col-span-12 lg:col-span-8 p-10 rounded-[2rem] bg-surface-container shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">self_improvement</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">What to do right now</h2>
                  <p className="text-on-surface-variant text-label-md">Follow these steps to help ground yourself.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-outline-variant/10">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-on-surface">The 5-4-3-2-1 Technique</h3>
                    <p className="text-on-surface-variant mt-1">Identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-outline-variant/10">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-on-surface">Box Breathing</h3>
                    <p className="text-on-surface-variant mt-1">Inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4. Repeat until your heart rate slows.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-outline-variant/10">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-on-surface">Cold Water Splash</h3>
                    <p className="text-on-surface-variant mt-1">Splash cold water on your face or hold an ice cube. This triggers the "mammalian dive reflex" which naturally calms the nervous system.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearest Clinic Map Card (4 cols) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="flex-1 rounded-[2rem] overflow-hidden bg-surface-container shadow-sm border border-outline-variant/20 flex flex-col">
                <div className="p-6 flex items-center justify-between">
                  <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    Nearest Clinic
                  </h2>
                  <button
                    onClick={handleLocateMe}
                    disabled={locating}
                    className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-sm ${locating ? 'animate-spin' : ''}`}>
                      {locating ? 'sync' : 'my_location'}
                    </span>
                  </button>
                </div>
                <div className="flex-1 min-h-[240px] relative">
                  <iframe
                    title="Nearest Emergency Clinic Map"
                    width="100%"
                    height="100%"
                    className="min-h-[240px] w-full border-0"
                    loading="lazy"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedClinic.lng - 0.03}%2C${selectedClinic.lat - 0.02}%2C${selectedClinic.lng + 0.03}%2C${selectedClinic.lat + 0.02}&layer=mapnik&marker=${selectedClinic.lat}%2C${selectedClinic.lng}`}
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/80 backdrop-blur-md shadow-lg border border-white/50">
                    <p className="font-bold text-on-surface text-sm">{selectedClinic.name}</p>
                    <p className="text-label-sm text-on-surface-variant mb-3">{selectedClinic.distance} • {selectedClinic.openStatus}</p>
                    <a
                      href={selectedClinic.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block py-2 bg-primary text-white rounded-lg font-label-md text-center text-sm hover:opacity-90 transition-all"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Clinic quick select list */}
              <div className="space-y-2">
                {nearbyClinics.map((clinic) => (
                  <button
                    key={clinic.id}
                    onClick={() => setSelectedClinic(clinic)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                      selectedClinic.id === clinic.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-outline-variant/20 bg-surface-container hover:border-primary/30'
                    }`}
                  >
                    <p className="font-bold text-on-surface">{clinic.name}</p>
                    <p className="text-on-surface-variant">{clinic.distance} • {clinic.openStatus}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── International Resources Directory ───────────────── */}
          <section className="max-w-[1200px] mx-auto mb-16">
            <div className="col-span-12 p-5 md:p-10 rounded-[2rem] bg-white shadow-sm border border-outline-variant/20">

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">International Resources</h2>
                  <p className="text-on-surface-variant">Global help centers available at any time.</p>
                </div>
                <div className="relative w-full md:w-72">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                  <input
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 text-body-md"
                    placeholder="Search country..."
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredResources.map((res) => (
                  <div key={res.country} className="p-6 rounded-2xl bg-surface-bright border border-outline-variant/10 hover:border-primary/30 transition-colors">
                    <h4 className="font-bold text-primary mb-2">{res.country}</h4>
                    <div className="space-y-3">
                      {res.lines.map((line) => (
                        <div key={line.name} className="flex justify-between items-center">
                          <span className="text-on-surface-variant">{line.name}</span>
                          <span className="font-mono font-bold text-on-surface">{line.number}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
                <button className="inline-flex items-center gap-2 text-primary font-label-md hover:underline">
                  View full international directory
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse-red {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
}

export default EmergencySupport;
