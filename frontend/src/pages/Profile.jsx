import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLayout } from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { ARTICLES } from '../data/articlesData';

function Profile() {
  const { toggleMobileMenu } = useLayout();
  const { darkMode, setDarkMode } = useTheme();
  const {
    profile,
    updateProfile,
    resetAllData,
    toggleBookmarkResource,
    dailyStreak = 0,
    dailyCheckins = [],
  } = useData();

  const avatarInputRef = useRef(null);
  const navigate = useNavigate();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(profile?.name || '');
  const [editEmail, setEditEmail] = useState(profile?.email || '');
  const [editBio, setEditBio] = useState(profile?.bio || '');

  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      email: editEmail,
      bio: editBio
    });
    setEditModalOpen(false);
    showToast('Profile updated successfully!');
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        updateProfile({ avatar: result });
        showToast('Profile photo updated!');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const savedResourcesList = ARTICLES.filter((r) => (profile?.savedResourceIds || []).includes(r.id));

  // Dynamic Badges list with real-time streak achievement checking
  const achievementsList = [
    {
      id: '7-day-streak',
      name: '7-Day Streak',
      description: 'Keep your streak for 7 consecutive days',
      icon: 'local_fire_department',
      isUnlocked: dailyStreak >= 7,
      progress: `${Math.min(dailyStreak, 7)}/7 days`,
      percent: Math.min(100, Math.round((dailyStreak / 7) * 100)),
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'mindfulness-starter',
      name: 'Mindfulness Starter',
      description: 'Log your first daily mood check-in',
      icon: 'spa',
      isUnlocked: dailyCheckins.length >= 1,
      progress: dailyCheckins.length >= 1 ? 'Unlocked' : '0/1 check-in',
      percent: dailyCheckins.length >= 1 ? 100 : 0,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: '14-day-streak',
      name: '14-Day Streak',
      description: 'Keep your streak for 14 consecutive days',
      icon: 'whatshot',
      isUnlocked: dailyStreak >= 14,
      progress: `${Math.min(dailyStreak, 14)}/14 days`,
      percent: Math.min(100, Math.round((dailyStreak / 14) * 100)),
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
    },
    {
      id: 'community-helper',
      name: 'Community Helper',
      description: 'Complete 3 wellness activities',
      icon: 'volunteer_activism',
      isUnlocked: (profile?.totalSessions || 0) >= 3 || dailyCheckins.length >= 3,
      progress: (profile?.totalSessions || 0) >= 3 || dailyCheckins.length >= 3 ? 'Unlocked' : 'In Progress',
      percent: Math.min(100, Math.round((Math.max(profile?.totalSessions || 0, dailyCheckins.length) / 3) * 100)),
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background relative">
      <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarSelect} className="hidden" />

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
            onClick={() => {
              setEditName(profile.name);
              setEditEmail(profile.email);
              setEditBio(profile.bio);
              setEditModalOpen(true);
            }}
            className="bg-primary text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full font-label-md hover:opacity-90 transition flex items-center gap-1.5 text-xs font-bold shadow"
            title="Edit Profile"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span className="hidden sm:inline">Edit Profile</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-secondary">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Scrollable Page Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-fixed/30 to-transparent -z-10" />

        <main className="p-margin-mobile md:p-margin-desktop max-w-[1000px] mx-auto space-y-10 py-10">

          {/* Profile Header Section */}
          <header className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group cursor-pointer shrink-0" onClick={() => avatarInputRef.current?.click()} title="Click to change photo">
              <img
                src={profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'User'}`}
                alt={profile?.name || 'User'}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover bg-surface-container-high"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'User'}`;
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  avatarInputRef.current?.click();
                }}
                className="absolute bottom-2 right-2 bg-primary text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </button>
            </div>

            <div className="text-center md:text-left space-y-2 w-full min-w-0">
              <h2 className="font-headline-lg text-[30px] font-bold text-on-surface truncate">{profile?.name || 'Guest User'}</h2>
              {profile?.bio && <p className="font-body-md text-on-surface-variant max-w-full text-sm">{profile.bio}</p>}
              {profile?.email && profile.email.includes('@') && (
                <p className="text-xs text-outline font-mono truncate">{profile.email}</p>
              )}

              <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                <span className="px-3.5 py-1.5 flex items-center gap-1.5 bg-amber-500/10 text-amber-600 text-xs font-bold rounded-full border border-amber-500/20">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                  {dailyStreak} Day Streak
                </span>
                <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full flex items-center gap-1 border border-emerald-500/20">
                  <span className="material-symbols-outlined text-sm">task_alt</span>
                  {dailyCheckins.length} Daily Check-ins
                </span>
              </div>
            </div>
          </header>

          {/* Achievements Section */}
          <section className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] border border-outline-variant/20 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-md text-xl font-bold text-on-surface">Earned Badges & Achievements</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Keep a daily check-in streak to unlock achievements</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full border border-amber-500/20">
                {achievementsList.filter(a => a.isUnlocked).length} / {achievementsList.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievementsList.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl flex flex-col items-center text-center space-y-2 border transition-all ${
                    b.isUnlocked
                      ? 'bg-surface-container-low border-amber-500/30 shadow-sm'
                      : 'bg-surface-container-lowest border-outline-variant/10 opacity-70'
                  }`}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${b.isUnlocked ? b.color : 'bg-surface-container-high text-outline'}`}>
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
                    </div>
                    {b.isUnlocked && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-label-md text-on-surface font-bold text-xs">{b.name}</p>
                    <p className="text-[10px] text-on-surface-variant line-clamp-1">{b.description}</p>
                  </div>
                  <div className="w-full space-y-1 pt-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-outline">
                      <span className={b.isUnlocked ? 'text-amber-600 font-extrabold' : ''}>{b.isUnlocked ? 'Achieved! 🔥' : b.progress}</span>
                      <span>{b.percent}%</span>
                    </div>
                    <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${b.isUnlocked ? 'bg-amber-500' : 'bg-primary/50'}`}
                        style={{ width: `${b.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Saved Resources & Assessment History Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Saved Resources */}
            <section className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm space-y-4">
              <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bookmark</span>
                <span>Saved Resources ({savedResourcesList.length})</span>
              </h3>

              {savedResourcesList.length > 0 ? (
                <div className="space-y-3">
                  {savedResourcesList.map((r) => (
                    <div key={r.id} className="p-3 bg-surface-container-low rounded-xl flex items-center gap-3 text-xs group">
                      {r.bgUrl && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                          <img src={r.bgUrl} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{r.title}</p>
                        <span className="text-[10px] text-primary font-semibold">{r.category} • {r.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Link to="/resources" className="text-primary font-semibold hover:underline">View</Link>
                        <button
                          onClick={() => toggleBookmarkResource(r.id)}
                          className="ml-1 text-on-surface-variant hover:text-error transition-colors"
                          title="Remove bookmark"
                        >
                          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark_remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-outline">bookmark_border</span>
                  <p className="text-xs text-on-surface-variant">No saved resources yet. Bookmark articles from the Resource library!</p>
                  <Link to="/resources" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">open_in_new</span> Browse Resources
                  </Link>
                </div>
              )}
            </section>

            {/* Assessment History */}
            <section className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm space-y-4">
              <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span>
                <span>Assessment History</span>
              </h3>

              {(profile?.assessmentHistory || []).length > 0 ? (
                <div className="space-y-3">
                  {(profile?.assessmentHistory || []).map((asm) => (
                    <div key={asm.id} className="p-3 bg-surface-container-low rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-on-surface">{asm.level} (Score: {asm.score})</span>
                        <span className="text-[10px] text-outline">{asm.date}</span>
                      </div>
                      <p className="text-on-surface-variant text-[11px]">Rec: {asm.recommendation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-on-surface-variant">No past assessments found. Take a quiz anytime!</p>
              )}
            </section>

          </div>

          {/* Quick Settings & Theme Control */}
          <section className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm space-y-4">
            <h3 className="font-headline-md text-base font-bold text-on-surface">Quick Preferences</h3>
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-primary">dark_mode</span>
                <span>Dark Appearance</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-outline-variant'}`}
              >
                <span className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform mt-0.5 ml-0.5 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </section>

          {/* Sign Out */}
          <section className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm space-y-4">
            <h3 className="font-headline-md text-base font-bold text-on-surface">Account</h3>
            <p className="text-xs text-on-surface-variant">Manage your account settings and wellness profile.</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/assessment?retake=true')}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20 hover:bg-primary/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Retake Assessment</span>
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  navigate('/');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-error/10 text-error font-bold text-xs border border-error/20 hover:bg-error hover:text-white transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </section>

        </main>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md font-bold text-on-surface text-lg">Edit Profile Details</h3>
              <button onClick={() => setEditModalOpen(false)} className="p-1 text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Bio / Affirmation</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold border hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:opacity-90 shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
