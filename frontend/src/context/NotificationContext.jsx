import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};

export function NotificationProvider({ children }) {
  const navigate = useNavigate();
  const { programs, communityPosts, profile, isLoggedIn, hasCompletedAssessment } = useData();

  // User-scoped storage key
  const userKey = profile?.email ? `mindease_notifications_${profile.email}` : 'mindease_notifications_guest';

  // Track which notification IDs have been read for this user
  const [readIds, setReadIds] = useState(() => {
    try {
      const saved = localStorage.getItem(userKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Floating Toast Banner state for newly detected items
  const [activeToast, setActiveToast] = useState(null);

  // Desktop notification permission state
  const [desktopPermission, setDesktopPermission] = useState(() => {
    return typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'denied';
  });

  // Track seen IDs to detect new incoming items for toast/desktop alerts
  const knownPostIdsRef = useRef(new Set());
  const knownProgramIdsRef = useRef(new Set());
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(userKey);
      setReadIds(saved ? JSON.parse(saved) : []);
    } catch {
      setReadIds([]);
    }
  }, [userKey]);

  useEffect(() => {
    try {
      localStorage.setItem(userKey, JSON.stringify(readIds));
    } catch { }
  }, [readIds, userKey]);

  // Request browser desktop notification permission
  const requestDesktopNotifications = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      setDesktopPermission(permission);
      return permission;
    }
    return 'denied';
  };

  // Helper to play a subtle, ambient web audio notification chime
  const playNotificationChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5 note

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch (e) { }
  };

  // Helper to trigger desktop notification
  const triggerDesktopNotification = (title, options) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, options);
      } catch (e) {
        console.warn('Could not show desktop notification:', e);
      }
    }
  };

  // Detect new discussion posts & programs for live toast alerts
  useEffect(() => {
    if (!isLoggedIn) return;

    const currentPostIds = new Set((communityPosts || []).map((p) => String(p.id)));
    const currentProgramIds = new Set((programs || []).map((p) => String(p.id)));

    if (isInitialLoadRef.current) {
      knownPostIdsRef.current = currentPostIds;
      knownProgramIdsRef.current = currentProgramIds;
      isInitialLoadRef.current = false;
      return;
    }

    // Check for new community posts
    for (const post of communityPosts || []) {
      const strId = String(post.id);
      if (!knownPostIdsRef.current.has(strId)) {
        knownPostIdsRef.current.add(strId);

        const isMyPost = post.is_owner || (profile?.email && post.owner_email === profile.email);
        const toastItem = {
          id: `toast-post-${strId}`,
          title: isMyPost ? 'Discussion Published!' : `New Discussion: ${post.tag || 'Community'}`,
          body: post.title || (post.content ? post.content.slice(0, 50) + '...' : 'New community topic'),
          author: isMyPost ? 'You' : (post.author || 'Anonymous Peer'),
          path: '/community',
          icon: 'forum',
          color: 'text-rose-600',
          bg: 'bg-rose-500/10'
        };

        setActiveToast(toastItem);
        playNotificationChime();
        triggerDesktopNotification(
          isMyPost ? 'MindEase: Discussion Published' : `MindEase Community: ${toastItem.title}`,
          {
            body: `${toastItem.body} — by ${toastItem.author}`,
            icon: '/mindEaseLogo.png'
          }
        );
        break;
      }
    }

    // Check for new programs
    for (const prog of programs || []) {
      const strId = String(prog.id);
      if (!knownProgramIdsRef.current.has(strId)) {
        knownProgramIdsRef.current.add(strId);

        const toastItem = {
          id: `toast-prog-${strId}`,
          title: `New Program Available`,
          body: prog.title,
          author: 'MindEase Wellness',
          path: '/programs',
          icon: 'auto_stories',
          color: 'text-violet-600',
          bg: 'bg-violet-500/10'
        };

        setActiveToast(toastItem);
        playNotificationChime();
        triggerDesktopNotification(`MindEase: ${toastItem.title}`, {
          body: toastItem.body,
          icon: '/mindEaseLogo.png'
        });
        break;
      }
    }
  }, [communityPosts, programs, isLoggedIn, profile?.email]);

  // Auto-hide toast notification after 6 seconds
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  // ── Generate dynamic user-specific notifications list ───────────────────────────
  const notifications = useMemo(() => {
    if (!isLoggedIn) return [];

    const list = [];

    // 1. Welcome notification
    list.push({
      id: `welcome-${profile?.email || 'user'}`,
      type: 'system',
      icon: 'waving_hand',
      color: 'text-primary',
      bg: 'bg-primary/10',
      title: 'Welcome to MindEase 👋',
      body: 'Your account is active! Explore daily community discussions and wellness programs.',
      cta: hasCompletedAssessment ? 'Go to Dashboard' : 'Take Assessment',
      path: hasCompletedAssessment ? '/dashboard' : '/assessment',
      time: 'Just now',
    });

    // 2. New & Available Wellness Programs
    (programs || []).forEach((p) => {
      list.push({
        id: `program-item-${p.id}`,
        type: 'program',
        icon: p.enrolled ? 'play_circle' : 'auto_stories',
        color: 'text-violet-600',
        bg: 'bg-violet-500/10',
        title: p.enrolled ? 'Active Program' : 'New Program Available',
        body: `"${p.title}" — ${p.description ? p.description.slice(0, 60) + '...' : 'Start your guided wellness path.'}`,
        cta: p.enrolled ? 'Continue Program' : 'Explore Program',
        path: '/programs',
        time: p.enrolled ? 'Enrolled' : 'Available',
      });

      // Scheduled activity reminders for enrolled program modules
      if (p.enrolled && p.modules) {
        p.modules.forEach((m) => {
          if (m.reminder && !m.completed) {
            list.push({
              id: `reminder-mod-${m.id}`,
              type: 'program',
              icon: 'notifications_active',
              color: 'text-amber-600',
              bg: 'bg-amber-500/10',
              title: 'Scheduled Module Reminder',
              body: `Time for your module: "${m.title}" in ${p.title}`,
              cta: 'Continue Program',
              path: '/programs',
              time: m.reminder || 'Scheduled',
            });
          }
        });
      }
    });

    // 3. Community Discussions Notifications (show top 10 most recent posts)
    (communityPosts || []).slice(0, 10).forEach((post) => {
      const isOwner = post.is_owner || (profile?.email && post.owner_email === profile.email);
      list.push({
        id: `post-item-${post.id}`,
        type: 'community',
        icon: 'forum',
        color: 'text-rose-600',
        bg: 'bg-rose-500/10',
        title: isOwner ? 'Your Discussion Post' : `Discussion: ${post.tag || 'Community'}`,
        body: post.title ? `"${post.title}" — ${post.content ? post.content.slice(0, 45) + '...' : ''}` : `"${post.content ? post.content.slice(0, 55) + '...' : 'New topic'}"`,
        author: isOwner ? 'You' : (post.author || 'Anonymous Peer'),
        tag: post.tag || 'General',
        cta: 'View Discussion',
        path: '/community',
        time: post.time || 'Recent',
      });
    });

    // Sort: Unread first, then by type
    list.sort((a, b) => (readIds.includes(a.id) ? 1 : -1) - (readIds.includes(b.id) ? 1 : -1));
    return list;
  }, [programs, communityPosts, profile, isLoggedIn, hasCompletedAssessment, readIds]);


  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  const markRead = (id) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const markAllRead = () => {
    setReadIds(notifications.map((n) => n.id));
  };

  const dismissNotification = (id) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        readIds,
        markRead,
        markAllRead,
        dismissNotification,
        desktopPermission,
        requestDesktopNotifications
      }}
    >
      {children}

      {/* Floating In-App Toast Banner */}
      {activeToast && (
        <div className="fixed top-5 right-5 z-[100] max-w-sm w-full bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-4 shadow-2xl animate-bounce-in flex items-start gap-3 border-l-4 border-l-primary">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeToast.bg}`}>
            <span className={`material-symbols-outlined text-xl ${activeToast.color}`}>
              {activeToast.icon}
            </span>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                {activeToast.title}
              </span>
              <button
                onClick={() => setActiveToast(null)}
                className="p-1 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <p className="text-xs font-bold text-on-surface truncate">{activeToast.body}</p>
            <p className="text-[10px] text-outline">By {activeToast.author}</p>
            <button
              onClick={() => {
                navigate(activeToast.path);
                setActiveToast(null);
              }}
              className="text-xs font-bold text-primary hover:underline pt-1 inline-block"
            >
              View Now &rarr;
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
