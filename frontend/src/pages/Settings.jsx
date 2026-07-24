import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../components/Layout';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const { toggleMobileMenu } = useLayout();
  const { darkMode, setDarkMode } = useTheme();

  // Profile state
  const [fullName, setFullName] = useState('Elena Rodriguez');
  const [email, setEmail] = useState('elena.rod@mindease.care');

  // Notification state
  const [dailyReminders, setDailyReminders] = useState(true);
  const [clinicalUpdates, setClinicalUpdates] = useState(false);

  // Save/discard toast
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = () => {
    showToast('All changes saved successfully!');
  };

  const handleDiscard = () => {
    setFullName('Elena Rodriguez');
    setEmail('elena.rod@mindease.care');
    setDailyReminders(true);
    setClinicalUpdates(false);
    showToast('Changes discarded.');
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
        <section className="p-margin-mobile md:p-margin-desktop max-w-[1000px] mx-auto w-full">

          {/* Page Header */}
          <header className="mb-6 md:mb-12">
            <h1 className="font-headline-xl text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] md:leading-[48px] tracking-tight font-bold text-on-surface mb-2">
              Settings
            </h1>
            <p className="text-on-surface-variant font-body-lg text-sm sm:text-body-lg">
              Manage your MindEase experience and privacy.
            </p>
          </header>

          <div className="space-y-6">

            {/* ── Profile Section ───────────────────────────────── */}
            <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-secondary-container p-1 rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">person</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Profile</h2>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-12 mb-6 text-center md:text-left">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container ring-1 ring-primary/10 bg-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </div>
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1 w-full text-left">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block">Full Name</label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-on-surface font-body-md"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block">Email Address</label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-on-surface font-body-md"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Theme & Notifications (2-column) ─────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appearance Card */}
              <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-fixed p-1 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[24px]">dark_mode</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Appearance</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Dark Mode</p>
                    <p className="text-label-sm text-on-surface-variant">Switch to a darker interface</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
                      darkMode ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 mt-1 ml-1 ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Notifications Card */}
              <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-secondary-container p-1 rounded-xl">
                    <span className="material-symbols-outlined text-secondary text-[24px]">notifications_active</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Notifications</h3>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors border border-outline-variant/20">
                    <span className="font-label-md text-label-md">Daily reminders</span>
                    <input
                      checked={dailyReminders}
                      onChange={(e) => setDailyReminders(e.target.checked)}
                      className="rounded-sm border-primary text-primary focus:ring-primary/20"
                      type="checkbox"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors border border-outline-variant/20">
                    <span className="font-label-md text-label-md">Clinical updates</span>
                    <input
                      checked={clinicalUpdates}
                      onChange={(e) => setClinicalUpdates(e.target.checked)}
                      className="rounded-sm border-primary text-primary focus:ring-primary/20"
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* ── Security & Privacy ───────────────────────────── */}
            <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
              <div className="flex items-center gap-4 mb-6 md:mb-10">
                <div className="bg-tertiary-fixed p-1 rounded-xl">
                  <span className="material-symbols-outlined text-tertiary text-[24px]">security</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Security &amp; Privacy</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                {/* Account Security */}
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Account Security</h4>
                  <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:shadow-sm transition-all group border border-outline-variant/20">
                    <div className="text-left">
                      <p className="font-label-md text-label-md text-on-surface">Change Password</p>
                      <p className="text-label-sm text-on-surface-variant">Last changed 3 months ago</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:shadow-sm transition-all group border border-outline-variant/20">
                    <div className="text-left">
                      <p className="font-label-md text-label-md text-on-surface">Two-Factor Authentication</p>
                      <p className="text-label-sm text-secondary font-medium">Enabled (SMS)</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                </div>
                {/* Data & Privacy */}
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Data &amp; Privacy</h4>
                  <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:shadow-sm transition-all group border border-outline-variant/20">
                    <div className="text-left">
                      <p className="font-label-md text-label-md text-on-surface">Export Your Data</p>
                      <p className="text-label-sm text-on-surface-variant">Download a JSON of your history</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">download</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-surface-container-high/20 border border-error/10 rounded-2xl hover:bg-error-container/10 transition-all group">
                    <div className="text-left">
                      <p className="font-label-md text-label-md text-error">Deactivate Account</p>
                      <p className="text-label-sm text-on-surface-variant">Temporarily disable access</p>
                    </div>
                    <span className="material-symbols-outlined text-error group-hover:translate-x-1 transition-transform">no_accounts</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Footer Buttons ───────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6">
              <button
                onClick={handleDiscard}
                className="w-full sm:w-auto px-8 py-3 text-primary font-label-md text-label-md rounded-full border border-primary/20 hover:bg-primary/5 transition-colors text-center"
              >
                Discard Changes
              </button>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-label-md text-label-md rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all text-center"
              >
                Save All Changes
              </button>
            </div>


          </div>
        </section>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-secondary">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}

export default Settings;
