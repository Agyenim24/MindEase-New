import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';
import { useTheme } from '../context/ThemeContext';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

const achievements = [
  { title: 'Serenity Seeker', badge: '10 Meditations', icon: 'self_improvement', bg: 'bg-primary-container text-on-primary-container' },
  { title: 'Consistency King', badge: '7 Day Streak', icon: 'bolt', bg: 'bg-secondary-container text-on-secondary-container' },
  { title: 'Deep Rest', badge: '5 Sleep Stories', icon: 'nightlight', bg: 'bg-tertiary-fixed text-on-tertiary-fixed' },
];

const moodBars = [
  { day: 'Mon', height: '40%', active: false },
  { day: 'Tue', height: '65%', active: false },
  { day: 'Wed', height: '85%', active: false },
  { day: 'Thu', height: '55%', active: false },
  { day: 'Fri', height: '90%', active: false },
  { day: 'Sat', height: '75%', active: false },
  { day: 'Sun', height: '95%', active: true },
];

function Profile() {
  const { toggleMobileMenu } = useLayout();
  const { darkMode, setDarkMode } = useTheme();
  const avatarInputRef = useRef(null);
  const docInputRef = useRef(null);

  // Get logged in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [avatarUrl, setAvatarUrl] = useState(() => {
    return localStorage.getItem('mindease_user_avatar') || DEFAULT_AVATAR;
  });

  const [userName, setUserName] = useState(() => storedUser.full_name || localStorage.getItem('mindease_user_name') || 'User');
  const [userEmail] = useState(storedUser.email || '');
  const [userBio, setUserBio] = useState('Maintaining a 12-day mindfulness streak. "One day at a time, finding peace in the present."');
  const [userLocation] = useState('Seattle, WA');
  const [dailyReminders, setDailyReminders] = useState(true);

  const [documents, setDocuments] = useState([
    { id: 'doc-1', name: 'Mindfulness_Journal_July.pdf', size: '1.2 MB', date: 'July 15, 2026' },
    { id: 'doc-2', name: 'Therapy_Session_Notes.docx', size: '450 KB', date: 'June 28, 2026' },
  ]);

  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        setAvatarUrl(result);
        localStorage.setItem('mindease_user_avatar', result);
        showToast('Profile photo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDocumentSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newDocs = files.map((file) => ({
      id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }));
    setDocuments((prev) => [...newDocs, ...prev]);
    showToast(`Uploaded ${files.length} document${files.length > 1 ? 's' : ''}!`);
    e.target.value = '';
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast('Document removed.');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('mindease_user_avatar');
    window.location.href = '/login';
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background relative">
      {/* Hidden File Inputs */}
      <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarSelect} className="hidden" />
      <input ref={docInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt" onChange={handleDocumentSelect} className="hidden" />

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

        <div className="flex items-center gap-3">
          <button
            onClick={handleSignOut}
            className="bg-surface-container-high text-error px-4 py-2 rounded-full font-label-md text-label-md hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-2 text-xs font-bold"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-secondary">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Scrollable Page Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-fixed/30 to-transparent -z-10" />

        <main className="p-margin-mobile md:p-margin-desktop max-w-[1000px] mx-auto space-y-10 py-10">

          {/* ── Profile Header Section ────────────────────────── */}
          <header className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()} title="Click to upload profile photo">
              <img
                src={avatarUrl}
                alt={userName}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  avatarInputRef.current?.click();
                }}
                className="absolute bottom-2 right-2 bg-primary text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>

            <div className="text-center md:text-left space-y-2 w-full">
              <h2 className="font-headline-lg text-[30px] font-bold text-on-surface">{userName}</h2>
              {userEmail && (
                <p className="text-xs text-on-surface-variant font-medium">{userEmail}</p>
              )}
              <p className="font-body-md text-on-surface-variant max-w-full text-sm">{userBio}</p>
              <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
                  Pro Member
                </span>
                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-xs font-bold rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span> {userLocation}
                </span>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-semibold hover:bg-primary/20 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">upload</span>
                  Upload Photo
                </button>
              </div>
            </div>
          </header>

          {/* ── Bento Grid Content ────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Achievements & Mood Trends (2 cols) */}
            <section className="md:col-span-2 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/50 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-headline-md text-xl font-bold text-on-surface">Wellness Achievements</h3>
                <button className="text-primary font-label-md text-xs font-semibold hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {achievements.map((item) => (
                  <div
                    key={item.title}
                    className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center text-center space-y-2 border border-outline-variant/20 hover:border-primary/30 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg}`}>
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <p className="font-label-md text-on-surface font-bold text-xs">{item.title}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">{item.badge}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-6 border-t border-outline-variant/20">
                <p className="font-label-md text-on-surface font-bold text-sm mb-4">Mood Trends (Last 7 Days)</p>
                <div className="h-32 w-full flex items-end justify-between gap-2 px-2">
                  {moodBars.map((bar) => (
                    <div
                      key={bar.day}
                      className={`w-full rounded-t-lg transition-all hover:bg-primary ${bar.active ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-primary/20'}`}
                      style={{ height: bar.height }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 px-1 text-[10px]">
                  {moodBars.map((bar) => (
                    <span key={bar.day} className={bar.active ? 'text-primary font-bold' : 'text-outline'}>
                      {bar.day}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Preferences & Security (1 col) */}
            <section className="space-y-6">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-sm space-y-4">
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-lg">notifications</span>
                      <span>Daily Reminders</span>
                    </div>
                    <button
                      onClick={() => setDailyReminders(!dailyReminders)}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${dailyReminders ? 'bg-primary' : 'bg-outline-variant'}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition-transform mt-0.5 ml-0.5 ${dailyReminders ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-lg">dark_mode</span>
                      <span>Dark Mode</span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-outline-variant'}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition-transform mt-0.5 ml-0.5 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-highest/40 p-6 rounded-[2rem] border border-outline-variant/30 space-y-3">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">lock</span>
                  <h4 className="font-bold text-xs">Privacy &amp; Security</h4>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Your clinical data is end-to-end encrypted and HIPAA compliant.</p>
                <Link
                  to="/settings"
                  className="w-full block py-2 px-4 border border-outline/50 rounded-xl text-xs font-bold text-center hover:bg-surface-container-high transition-colors text-on-surface"
                >
                  Manage Data &amp; Security
                </Link>
              </div>
            </section>
          </div>

          {/* ── My Uploaded Files & Documents Section ────────── */}
          <section className="bg-white rounded-[2rem] p-6 md:p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">folder_open</span>
                  <span>My Uploaded Documents &amp; Records</span>
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Upload therapy notes, journals, or health records securely.</p>
              </div>
              <button
                onClick={() => docInputRef.current?.click()}
                className="bg-primary text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-base">cloud_upload</span>
                <span>Upload File</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">description</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-xs truncate max-w-[180px]">{doc.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="p-1.5 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-error/10"
                    title="Remove file"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Quick Crisis Support CTA Section ────────────── */}
          <section className="mt-10 text-center p-8 bg-surface-container rounded-[2rem] border border-primary/10 space-y-4">
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Need to talk to someone right now?</h3>
            <p className="text-xs text-on-surface-variant max-w-full mx-auto leading-relaxed">
              Our crisis team is available 24/7. Don't hesitate to reach out if you're feeling overwhelmed.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                to="/emergency"
                className="bg-error text-white font-bold py-3 px-8 rounded-full text-xs shadow-lg shadow-error/20 hover:scale-105 active:scale-95 transition-all"
              >
                Get Immediate Help
              </Link>
              <Link
                to="/chat"
                className="bg-white border border-primary text-primary font-bold py-3 px-8 rounded-full text-xs hover:bg-primary-container/10 transition-all"
              >
                Chat with Assistant
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Profile;