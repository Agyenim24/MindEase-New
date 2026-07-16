import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      {/* Top App Bar (Minimal for Profile) */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Settings &amp; Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-surface-container-high text-error px-4 py-2 rounded-full font-label-md text-label-md hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-lg flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar Settings Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-bold flex items-center gap-3 transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            Account Info
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-3 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            Notifications
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-3 transition-colors">
            <span className="material-symbols-outlined">lock</span>
            Privacy &amp; Security
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-3 transition-colors">
            <span className="material-symbols-outlined">palette</span>
            Appearance
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-3 transition-colors">
            <span className="material-symbols-outlined">credit_card</span>
            Subscription
          </button>
        </div>

        {/* Main Profile Content Area */}
        <div className="flex-1 space-y-8">
          {/* Profile Header Card */}
          <div className="bg-surface rounded-3xl p-8 border border-outline-variant/20 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high relative">
                <img className="w-full h-full object-cover" data-alt="A close-up portrait of a serene woman with closed eyes and a soft smile, set against a blurred background of a tranquil, sun-drenched botanical garden. The lighting is ethereal and high-key, emphasizing a light-mode aesthetic with soft highlights and a peaceful, clinical but warm atmosphere. The image is crisp, modern, and professional, reflecting a high-end SaaS profile aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOyFxZRyLPOzv7JOnhXbvm4XHM7OXMP7dPkU0SyIT635aHySENY1gd4odPJo-nreYAZsKdZV-rr_it0dLFQ0qF8AQFEAoQMXiP4QWWeLbOyeG5-0aNFSH0WW177X5dYK_D67BG7cd3h9wj5WKinG45QFQlG_sC5F8GcDNBDXLqQDbP_BO0kPifU4BcsWAvbeB43QItvGZO-2fvDGBbpRSI6UmVRlYLdv8s6oXnhl5zSjEUtce6VugYE5K2DHq5eVlPhnvH5JRJ3hkQ" alt="User Profile" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                </div>
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Sarah Jenkins</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">sarah.jenkins@example.com</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-container/30 text-tertiary rounded-full font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                MindEase Premium
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">First Name</label>
                <input type="text" defaultValue="Sarah" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Last Name</label>
                <input type="text" defaultValue="Jenkins" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface">Email Address</label>
                <input type="email" defaultValue="sarah.jenkins@example.com" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-3 font-body-md text-on-surface-variant cursor-not-allowed" disabled />
                <p className="text-[12px] text-on-surface-variant mt-1">To change your email, please contact support.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/20">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-6">Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface font-bold">Daily Check-in Reminder</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">Receive a notification to log your mood.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface font-bold">Data Sharing for Research</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">Anonymously share usage data to improve mental health research.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-end gap-4">
              <button className="px-6 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors">Discard</button>
              <button className="px-6 py-2 bg-primary text-on-primary rounded-full font-label-md text-label-md font-bold shadow-md hover:bg-on-primary-fixed-variant transition-colors">Save Changes</button>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="mt-12 pt-8 border-t border-error/20">
            <h3 className="font-headline-sm text-headline-sm font-bold text-error mb-2">Danger Zone</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-6 py-2 border border-error text-error rounded-xl font-label-md text-label-md font-bold hover:bg-error hover:text-white transition-colors">Delete Account</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
