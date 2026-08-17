import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useLayout } from '../components/Layout';
import { useData, isMockPost } from '../context/DataContext';
import { supabase } from '../services/supabase';

const tags = ['All', 'Stress', 'School', 'Work', 'Relationships', 'Motivation', 'Mental Wellness', 'General', 'Other'];
const MAX_POST_CHARS = 500;
const MAX_COMMENT_CHARS = 300;

export function formatRelativeTime(createdAt, now = new Date()) {
  if (!createdAt) return 'Just now';
  const createdDate = new Date(createdAt);
  if (isNaN(createdDate.getTime())) return 'Just now';

  const diffMs = now.getTime() - createdDate.getTime();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Under 60 seconds
  if (diffSec < 60) {
    return 'Just now';
  }

  // Under 60 minutes
  if (diffMin < 60) {
    return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
  }

  // Under 24 hours
  if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }

  // Check if calendar yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    createdDate.getDate() === yesterday.getDate() &&
    createdDate.getMonth() === yesterday.getMonth() &&
    createdDate.getFullYear() === yesterday.getFullYear();

  if (isYesterday || (diffHours < 48 && diffDays === 1)) {
    return 'Yesterday';
  }

  // Older posts: "Aug 12 at 7:30 PM"
  const month = createdDate.toLocaleDateString(undefined, { month: 'short' });
  const day = createdDate.getDate();
  const timeStr = createdDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });

  if (createdDate.getFullYear() === now.getFullYear()) {
    return `${month} ${day} at ${timeStr}`;
  }

  return `${month} ${day}, ${createdDate.getFullYear()} at ${timeStr}`;
}

function Community() {
  const { toggleMobileMenu } = useLayout();
  const {
    communityPosts,
    createCommunityPost,
    updateCommunityPost,
    deleteCommunityPost,
    toggleLikePost,
    addCommentToPost,
    deleteCommentFromPost,
    reportContent,
    refreshLiveData,
    profile
  } = useData();

  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Inline post creation state
  const [inlineTitle, setInlineTitle] = useState('');
  const [inlineContent, setInlineContent] = useState('');
  const [inlineTag, setInlineTag] = useState('General');
  const [inlineIsAnonymous, setInlineIsAnonymous] = useState(false);
  const [isPostingInline, setIsPostingInline] = useState(false);
  const [inlineError, setInlineError] = useState(null);
  const [inlineSuccess, setInlineSuccess] = useState(null);

  // Modal post creation state
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalTag, setModalTag] = useState('General');
  const [modalIsAnonymous, setModalIsAnonymous] = useState(false);
  const [isPostingModal, setIsPostingModal] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Edit post state
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTag, setEditTag] = useState('General');
  const [editIsAnonymous, setEditIsAnonymous] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editError, setEditError] = useState(null);

  // Delete confirmation modal state
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  // Delete comment state
  const [deletingCommentInfo, setDeletingCommentInfo] = useState(null); // { postId, commentId }

  // Report modal state
  const [reportingTarget, setReportingTarget] = useState(null); // { postId, commentId, authorName }
  const [reportReason, setReportReason] = useState('Inappropriate Content');
  const [reportText, setReportText] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(null);
  const [reportError, setReportError] = useState(null);

  // Active open menu dropdown ID
  const [openMenuPostId, setOpenMenuPostId] = useState(null);

  // Comment section state per post
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [commentIsAnonymousMap, setCommentIsAnonymousMap] = useState({});
  const [submittingComments, setSubmittingComments] = useState({});
  const [commentErrors, setCommentErrors] = useState({});

  // Dynamic relative timestamp live ticker (recalculates every 30 seconds)
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.community-menu-dropdown-container')) {
        setOpenMenuPostId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (typeof refreshLiveData === 'function') {
      refreshLiveData();
    }
  }, [refreshLiveData]);

  // Supabase Realtime subscription setup
  useEffect(() => {
    if (!supabase) return;
    try {
      const channel = supabase
        .channel('community_realtime_feed')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
          if (typeof refreshLiveData === 'function') refreshLiveData();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => {
          if (typeof refreshLiveData === 'function') refreshLiveData();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions' }, () => {
          if (typeof refreshLiveData === 'function') refreshLiveData();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (e) {
      console.warn('Realtime subscription skipped:', e);
    }
  }, [refreshLiveData]);

  // Filter & sort posts (newest first)
  const realPosts = (communityPosts || []).filter((p) => p && typeof p === 'object' && !isMockPost(p));
  const sortedPosts = [...realPosts].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });

  const filteredPosts = sortedPosts.filter((post) => {
    const postCategory = (post.category || post.tag || 'General').toLowerCase();
    const activeCategory = activeTag.toLowerCase();
    const matchesTag = activeTag === 'All' || activeTag === 'All Topics' || postCategory === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ((post.author || post.author_display) && (post.author || post.author_display).toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  // Handle Inline Post Submission
  const handleInlinePost = async (e) => {
    e.preventDefault();
    if (!inlineContent.trim()) {
      setInlineError('Discussion content cannot be empty.');
      return;
    }
    if (inlineContent.length > MAX_POST_CHARS) {
      setInlineError(`Content cannot exceed ${MAX_POST_CHARS} characters.`);
      return;
    }

    setIsPostingInline(true);
    setInlineError(null);
    setInlineSuccess(null);

    try {
      await createCommunityPost({
        title: inlineTitle.trim() || inlineContent.trim().slice(0, 40) + '...',
        content: inlineContent.trim(),
        category: inlineTag,
        tag: inlineTag,
        is_anonymous: inlineIsAnonymous
      });
      setInlineTitle('');
      setInlineContent('');
      setActiveTag('All');
      setSearchQuery('');
      setInlineSuccess('Discussion published successfully!');
      setTimeout(() => setInlineSuccess(null), 4000);
    } catch (err) {
      setInlineError(err.message || 'Failed to publish discussion. Please try again.');
    } finally {
      setIsPostingInline(false);
    }
  };

  // Handle Modal Post Submission
  const handleModalPost = async (e) => {
    e.preventDefault();
    if (!modalContent.trim()) {
      setModalError('Discussion content cannot be empty.');
      return;
    }
    if (modalContent.length > MAX_POST_CHARS) {
      setModalError(`Content cannot exceed ${MAX_POST_CHARS} characters.`);
      return;
    }

    setIsPostingModal(true);
    setModalError(null);

    try {
      await createCommunityPost({
        title: modalTitle.trim() || modalContent.trim().slice(0, 40) + '...',
        content: modalContent.trim(),
        category: modalTag,
        tag: modalTag,
        is_anonymous: modalIsAnonymous
      });
      setModalTitle('');
      setModalContent('');
      setShowPostModal(false);
      setActiveTag('All');
      setSearchQuery('');
    } catch (err) {
      setModalError(err.message || 'Failed to publish discussion.');
    } finally {
      setIsPostingModal(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (post) => {
    setEditingPost(post);
    setEditTitle(post.title || '');
    setEditContent(post.content || '');
    setEditTag(post.category || post.tag || 'General');
    setEditIsAnonymous(Boolean(post.is_anonymous));
    setEditError(null);
    setOpenMenuPostId(null);
  };

  // Save Edit Post
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) {
      setEditError('Content cannot be empty.');
      return;
    }
    if (editContent.length > MAX_POST_CHARS) {
      setEditError(`Content cannot exceed ${MAX_POST_CHARS} characters.`);
      return;
    }

    setIsSavingEdit(true);
    setEditError(null);

    try {
      await updateCommunityPost(editingPost.id, {
        title: editTitle.trim() || editContent.trim().slice(0, 40) + '...',
        content: editContent.trim(),
        category: editTag,
        tag: editTag,
        is_anonymous: editIsAnonymous
      });
      setEditingPost(null);
    } catch (err) {
      setEditError(err.message || 'Failed to save changes.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Confirm Delete Post
  const handleConfirmDeletePost = async () => {
    if (!deletingPostId) return;
    setIsDeletingPost(true);
    try {
      await deleteCommunityPost(deletingPostId);
      setDeletingPostId(null);
    } catch (err) {
      alert(err.message || 'Failed to delete discussion.');
    } finally {
      setIsDeletingPost(false);
    }
  };

  // Handle Add Comment
  const handleAddComment = async (postId) => {
    const text = commentInputs[postId] || '';
    const isAnon = Boolean(commentIsAnonymousMap[postId]);
    if (!text.trim()) return;
    if (text.length > MAX_COMMENT_CHARS) {
      setCommentErrors((prev) => ({ ...prev, [postId]: `Comment cannot exceed ${MAX_COMMENT_CHARS} characters.` }));
      return;
    }

    setSubmittingComments((prev) => ({ ...prev, [postId]: true }));
    setCommentErrors((prev) => ({ ...prev, [postId]: null }));

    try {
      await addCommentToPost(postId, text, isAnon);
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      setCommentErrors((prev) => ({ ...prev, [postId]: err.message || 'Failed to add comment.' }));
    } finally {
      setSubmittingComments((prev) => ({ ...prev, [postId]: false }));
    }
  };

  // Confirm Delete Comment
  const handleConfirmDeleteComment = async () => {
    if (!deletingCommentInfo) return;
    const { postId, commentId } = deletingCommentInfo;
    try {
      await deleteCommentFromPost(postId, commentId);
      setDeletingCommentInfo(null);
    } catch (err) {
      alert(err.message || 'Failed to delete comment.');
    }
  };

  // Submit Report
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!reportingTarget) return;

    setIsSubmittingReport(true);
    setReportError(null);
    setReportSuccess(null);

    try {
      const fullReason = `${reportReason}: ${reportText.trim()}`.trim();
      await reportContent({
        postId: reportingTarget.postId,
        commentId: reportingTarget.commentId,
        reason: fullReason
      });
      setReportSuccess('Thank you. Your report has been submitted for community safety review.');
      setTimeout(() => {
        setReportingTarget(null);
        setReportSuccess(null);
        setReportText('');
      }, 2000);
    } catch (err) {
      setReportError(err.message || 'Failed to submit report.');
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={toggleMobileMenu} className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Community</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 mr-8">
            <Link to="/resources" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Resources</Link>
            <Link to="/programs" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Programs</Link>
            <Link to="/community" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Community</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:scale-105 transition">
              <img className="w-full h-full object-cover" src={profile?.avatar || ''} alt={profile?.name || 'User'} />
            </Link>
          </div>
        </div>
      </header>

      {/* Page Scrollable Area */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
        <div className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-xl flex-grow">

          {/* Welcome Hero Banner */}
          <section className="bg-primary-container text-on-primary-container rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 shadow-sm">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-3">
                <span className="material-symbols-outlined text-sm">shield</span>
                <span>Safe & Supportive Space</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold mb-3">You are not alone.</h2>
              <p className="font-body-lg text-body-lg mb-6 opacity-90 leading-relaxed">
                Connect in safe, moderated discussions with peers who understand what you are going through. Post under your profile or completely anonymously.
              </p>
              <button
                onClick={() => {
                  setShowPostModal(true);
                  setModalError(null);
                }}
                className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
                <span>Start a Discussion</span>
              </button>
            </div>
          </section>

          {/* Inline Create Discussion Section */}
          <section className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 shadow-sm space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                <span className="material-symbols-outlined text-xl">forum</span>
              </span>
              <div>
                <h3 className="font-bold text-on-surface text-base">Share with the Community</h3>
                <p className="text-xs text-outline">Post publicly or anonymously with full privacy control</p>
              </div>
            </div>

            {inlineError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{inlineError}</span>
              </div>
            )}

            {inlineSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>{inlineSuccess}</span>
              </div>
            )}

            <form onSubmit={handleInlinePost} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Discussion Title..."
                  value={inlineTitle}
                  onChange={(e) => setInlineTitle(e.target.value)}
                  className="md:col-span-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <select
                  value={inlineTag}
                  onChange={(e) => setInlineTag(e.target.value)}
                  className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-xs font-semibold text-on-surface"
                >
                  <option value="General">General</option>
                  <option value="Stress">Stress</option>
                  <option value="School">School</option>
                  <option value="Work">Work</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Mental Wellness">Mental Wellness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="What's on your mind? Share in a respectful, supportive environment..."
                  value={inlineContent}
                  onChange={(e) => setInlineContent(e.target.value)}
                  maxLength={MAX_POST_CHARS}
                  className="w-full p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <div className="absolute bottom-3 right-3 text-[10px] text-outline font-medium">
                  {inlineContent.length}/{MAX_POST_CHARS}
                </div>
              </div>

              {/* Anonymity Radio Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-outline-variant/10">
                <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
                  <span className="text-outline">Post as:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="inlineAnonymity"
                      checked={!inlineIsAnonymous}
                      onChange={() => setInlineIsAnonymous(false)}
                      className="accent-primary"
                    />
                    <span>My profile</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="inlineAnonymity"
                      checked={inlineIsAnonymous}
                      onChange={() => setInlineIsAnonymous(true)}
                      className="accent-primary"
                    />
                    <span>Anonymous</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isPostingInline || !inlineContent.trim()}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2 shadow self-end sm:self-auto"
                >
                  {isPostingInline && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  <span>{isPostingInline ? 'Publishing...' : 'Post Discussion'}</span>
                </button>
              </div>
            </form>
          </section>

          {/* Search & Category Filters */}
          <section className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTag === t
                      ? 'bg-primary text-white shadow'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-surface-container-low text-xs border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Discussions Feed */}
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="bg-surface-container-lowest rounded-3xl p-12 text-center border border-outline-variant/20 space-y-4">
                  <span className="material-symbols-outlined text-5xl text-primary/40">forum</span>
                  <h3 className="font-headline-sm font-bold text-on-surface text-lg">No discussions yet.</h3>
                  <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                    {searchQuery ? `No posts match "${searchQuery}". Try a different search.` : 'Be the first to start a conversation with the community.'}
                  </p>
                  <button
                    onClick={() => {
                      setShowPostModal(true);
                      setModalError(null);
                    }}
                    className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:opacity-90 transition shadow inline-flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Start a Discussion</span>
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const isAnonPost = Boolean(post.is_anonymous);
                  const authorName = isAnonPost ? 'Anonymous' : (post.author_display || post.author || 'Community Member');
                  const authorAvatar = isAnonPost ? null : post.avatar_url || post.avatar;

                  return (
                    <div key={post.id} className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 shadow-sm space-y-4 relative">
                      {/* Header: Author + Tag + Menu */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {authorAvatar ? (
                            <img src={authorAvatar} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-outline-variant/20" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">
                              <span className="material-symbols-outlined text-xl">person</span>
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-on-surface text-sm">{authorName}</h4>
                              {post.is_owner && (
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">You</span>
                              )}
                            </div>
                            <span className="text-xs text-outline">{formatRelativeTime(post.created_at, now)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-secondary-container/30 text-secondary font-bold text-xs rounded-full">
                            {post.category || post.tag || 'General'}
                          </span>

                          {/* Owner / Report Options Menu */}
                          <div className="relative community-menu-dropdown-container">
                            <button
                              onClick={() => setOpenMenuPostId(openMenuPostId === post.id ? null : post.id)}
                              className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition"
                              title="More options"
                            >
                              <span className="material-symbols-outlined text-lg">more_vert</span>
                            </button>

                            {openMenuPostId === post.id && (
                              <div className="absolute right-0 top-8 z-20 w-44 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 py-2 text-xs font-semibold">
                                {post.is_owner ? (
                                  <>
                                    <button
                                      onClick={() => openEditModal(post)}
                                      className="w-full px-4 py-2 text-left hover:bg-surface-container-high flex items-center gap-2 text-on-surface"
                                    >
                                      <span className="material-symbols-outlined text-sm text-primary">edit</span>
                                      <span>Edit Discussion</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setDeletingPostId(post.id);
                                        setOpenMenuPostId(null);
                                      }}
                                      className="w-full px-4 py-2 text-left hover:bg-rose-500/10 flex items-center gap-2 text-rose-600 font-bold"
                                    >
                                      <span className="material-symbols-outlined text-sm">delete</span>
                                      <span>Delete Discussion</span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setReportingTarget({ postId: post.id, commentId: null, authorName });
                                      setOpenMenuPostId(null);
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-surface-container-high flex items-center gap-2 text-on-surface-variant"
                                  >
                                    <span className="material-symbols-outlined text-sm text-amber-600">flag</span>
                                    <span>Report Discussion</span>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content Title & Body */}
                      <div>
                        {post.title && <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">{post.title}</h3>}
                        <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                      </div>

                      {/* Actions: Reaction, Comment, Share */}
                      <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4 text-xs font-semibold text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleLikePost(post.id)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${(post.isLiked || post.is_liked) ? 'bg-rose-500/10 text-rose-600 font-bold' : 'hover:bg-surface-container-high'
                              }`}
                          >
                            <span className="material-symbols-outlined text-base text-rose-500" style={{ fontVariationSettings: (post.isLiked || post.is_liked) ? "'FILL' 1" : "'FILL' 0" }}>
                              favorite
                            </span>
                            <span> {Math.max(post.likeCount || 0, post.likes || 0, Array.isArray(post.liked_by) ? post.liked_by.length : 0)}</span>
                          </button>

                          <button
                            onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:bg-surface-container-high transition"
                          >
                            <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                            <span> {Math.max(post.commentCount || 0, Array.isArray(post.comments) ? post.comments.length : 0)} Comments</span>
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            try {
                              const textToCopy = `MindEase Discussion by ${authorName}:\n"${post.title ? post.title + ' - ' : ''}${post.content}"`;
                              if (navigator.clipboard && navigator.clipboard.writeText) {
                                navigator.clipboard.writeText(textToCopy);
                              }
                            } catch (e) { }
                            alert('Discussion copied to clipboard!');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition"
                          title="Share Discussion"
                        >
                          <span className="material-symbols-outlined text-base">share</span>
                          <span className="hidden sm:inline">Share</span>
                        </button>
                      </div>

                      {/* Comments Thread */}
                      {activeCommentPostId === post.id && (
                        <div className="pt-3 border-t border-outline-variant/10 space-y-3 bg-surface-container-low/50 p-4 rounded-2xl">
                          {(!Array.isArray(post.comments) || post.comments.length === 0) ? (
                            <p className="text-xs text-outline text-center py-2">No comments yet. Start the conversation!</p>
                          ) : (
                            (Array.isArray(post.comments) ? post.comments : []).filter((c) => c && typeof c === 'object').map((c) => {
                              const isAnonComment = Boolean(c.is_anonymous);
                              const cAuthor = isAnonComment ? 'Anonymous' : (c.author_display || c.author || 'Community Member');
                              const cAvatar = isAnonComment ? null : c.avatar_url || c.avatar;

                              return (
                                <div key={c.id} className="flex gap-3 text-xs">
                                  {cAvatar ? (
                                    <img src={cAvatar} alt={cAuthor} className="w-7 h-7 rounded-full object-cover border border-outline-variant/20 shrink-0" />
                                  ) : (
                                    <div className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold shrink-0">
                                      <span className="material-symbols-outlined text-sm">person</span>
                                    </div>
                                  )}
                                  <div className="flex-1 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10 space-y-1">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold text-on-surface">{cAuthor}</span>
                                        {c.is_owner && <span className="px-1.5 py-0.2 bg-primary/10 text-primary text-[9px] font-bold rounded-full">You</span>}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-outline">{formatRelativeTime(c.created_at, now)}</span>
                                        {c.is_owner ? (
                                          <button
                                            onClick={() => setDeletingCommentInfo({ postId: post.id, commentId: c.id })}
                                            className="text-outline hover:text-rose-600 transition"
                                            title="Delete comment"
                                          >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => setReportingTarget({ postId: post.id, commentId: c.id, authorName: cAuthor })}
                                            className="text-outline hover:text-amber-600 transition"
                                            title="Report comment"
                                          >
                                            <span className="material-symbols-outlined text-sm">flag</span>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-on-surface-variant leading-relaxed whitespace-pre-wrap">{c.text || c.content}</p>
                                  </div>
                                </div>
                              );
                            })
                          )}

                          {commentErrors[post.id] && (
                            <p className="text-[11px] text-rose-600 font-semibold">{commentErrors[post.id]}</p>
                          )}

                          {/* Add Comment Input & Anonymity Selection */}
                          <div className="space-y-2 pt-2 border-t border-outline-variant/10">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Write a supportive comment..."
                                value={commentInputs[post.id] || ''}
                                maxLength={MAX_COMMENT_CHARS}
                                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                className="flex-1 px-4 py-2 rounded-full text-xs bg-surface-container-lowest border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                              <button
                                onClick={() => handleAddComment(post.id)}
                                disabled={submittingComments[post.id] || !(commentInputs[post.id] || '').trim()}
                                className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-1"
                              >
                                {submittingComments[post.id] && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                <span>Comment</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-4 text-[11px] font-semibold text-on-surface-variant pl-2">
                              <span className="text-outline">Post comment as:</span>
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`commentAnon_${post.id}`}
                                  checked={!commentIsAnonymousMap[post.id]}
                                  onChange={() => setCommentIsAnonymousMap({ ...commentIsAnonymousMap, [post.id]: false })}
                                  className="accent-primary"
                                />
                                <span>My profile</span>
                              </label>
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`commentAnon_${post.id}`}
                                  checked={Boolean(commentIsAnonymousMap[post.id])}
                                  onChange={() => setCommentIsAnonymousMap({ ...commentIsAnonymousMap, [post.id]: true })}
                                  className="accent-primary"
                                />
                                <span>Anonymous</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>

        </div>
        <Footer />
      </div>

      {/* Create Discussion Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
                <h3 className="font-headline-md font-bold text-on-surface text-lg">Create Community Discussion</h3>
              </div>
              <button onClick={() => setShowPostModal(false)} className="p-1 text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleModalPost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Category</label>
                <select
                  value={modalTag}
                  onChange={(e) => setModalTag(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs font-semibold"
                >
                  <option value="General">General</option>
                  <option value="Stress">Stress</option>
                  <option value="School">School</option>
                  <option value="Work">Work</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Mental Wellness">Mental Wellness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Title (Optional)</label>
                <input
                  type="text"
                  placeholder="Summarize your experience or question..."
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Discussion Content</label>
                <textarea
                  rows={4}
                  placeholder="Share details in a respectful, supportive tone..."
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                  maxLength={MAX_POST_CHARS}
                  required
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <div className="text-right text-[10px] text-outline mt-1">
                  {modalContent.length}/{MAX_POST_CHARS}
                </div>
              </div>

              {/* Anonymity Selector */}
              <div className="space-y-1 pt-1">
                <label className="block text-xs font-bold text-on-surface-variant">Post as:</label>
                <div className="flex items-center gap-6 text-xs font-semibold text-on-surface">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="modalAnonymity"
                      checked={!modalIsAnonymous}
                      onChange={() => setModalIsAnonymous(false)}
                      className="accent-primary"
                    />
                    <span>My profile</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="modalAnonymity"
                      checked={modalIsAnonymous}
                      onChange={() => setModalIsAnonymous(true)}
                      className="accent-primary"
                    />
                    <span>Anonymous</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold border hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPostingModal || !modalContent.trim()}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:opacity-90 shadow disabled:opacity-50 flex items-center gap-2"
                >
                  {isPostingModal && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  <span>{isPostingModal ? 'Publishing...' : 'Post Discussion'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Discussion Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">edit</span>
                <h3 className="font-headline-md font-bold text-on-surface text-lg">Edit Discussion</h3>
              </div>
              <button onClick={() => setEditingPost(null)} className="p-1 text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {editError && (
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Category</label>
                <select
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs font-semibold"
                >
                  <option value="General">General</option>
                  <option value="Stress">Stress</option>
                  <option value="School">School</option>
                  <option value="Work">Work</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Mental Wellness">Mental Wellness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Content</label>
                <textarea
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  maxLength={MAX_POST_CHARS}
                  required
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <div className="text-right text-[10px] text-outline mt-1">
                  {editContent.length}/{MAX_POST_CHARS}
                </div>
              </div>

              {/* Edit Anonymity Choice */}
              <div className="space-y-1 pt-1">
                <label className="block text-xs font-bold text-on-surface-variant">Post as:</label>
                <div className="flex items-center gap-6 text-xs font-semibold text-on-surface">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="editAnonymity"
                      checked={!editIsAnonymous}
                      onChange={() => setEditIsAnonymous(false)}
                      className="accent-primary"
                    />
                    <span>My profile</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="editAnonymity"
                      checked={editIsAnonymous}
                      onChange={() => setEditIsAnonymous(true)}
                      className="accent-primary"
                    />
                    <span>Anonymous</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold border hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit || !editContent.trim()}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:opacity-90 shadow disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingEdit && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  <span>{isSavingEdit ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Post Confirmation Modal */}
      {deletingPostId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <h3 className="font-bold text-on-surface text-lg">Delete Discussion?</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Are you sure you want to delete this discussion?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingPostId(null)}
                className="px-5 py-2.5 rounded-full text-xs font-bold border hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeletePost}
                disabled={isDeletingPost}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-rose-600 text-white hover:opacity-90 shadow disabled:opacity-50 flex items-center gap-2"
              >
                {isDeletingPost && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                <span>{isDeletingPost ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Comment Confirmation Modal */}
      {deletingCommentInfo && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-xl">delete</span>
            </div>
            <h3 className="font-bold text-on-surface text-base">Delete Comment?</h3>
            <p className="text-xs text-on-surface-variant">Are you sure you want to delete your comment?</p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingCommentInfo(null)}
                className="px-4 py-2 rounded-full text-xs font-bold border hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteComment}
                className="px-5 py-2 bg-rose-600 text-white rounded-full text-xs font-bold hover:opacity-90 shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Content Modal */}
      {reportingTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <div className="flex items-center gap-2 text-amber-600">
                <span className="material-symbols-outlined text-xl">flag</span>
                <h3 className="font-bold text-on-surface text-base">Report Content</h3>
              </div>
              <button onClick={() => setReportingTarget(null)} className="p-1 text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-800 text-xs font-semibold text-center space-y-2">
                <span className="material-symbols-outlined text-2xl text-emerald-600">check_circle</span>
                <p>{reportSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                {reportError && (
                  <p className="text-xs text-rose-600 font-semibold">{reportError}</p>
                )}

                <p className="text-xs text-on-surface-variant">
                  Help us maintain a safe community. Why are you reporting this content by <span className="font-bold text-on-surface">{reportingTarget.authorName}</span>?
                </p>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Reason</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs font-semibold"
                  >
                    <option value="Inappropriate Content">Inappropriate Content</option>
                    <option value="Harassment or Bullying">Harassment or Bullying</option>
                    <option value="Crisis or Self-harm Risk">Crisis or Self-harm Risk</option>
                    <option value="Spam or Advertising">Spam or Advertising</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Additional Details (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Provide any context to help our moderation team..."
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportingTarget(null)}
                    className="px-4 py-2 rounded-full text-xs font-bold border hover:bg-surface-container-high"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReport}
                    className="px-5 py-2 bg-amber-600 text-white rounded-full text-xs font-bold hover:opacity-90 shadow flex items-center gap-1.5"
                  >
                    {isSubmittingReport && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    <span>Submit Report</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Community;
