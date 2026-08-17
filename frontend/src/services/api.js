const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://127.0.0.1:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('mindease_auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

export async function apiSignup({ name, email, password }) {
  const cleanEmail = (email || '').trim().toLowerCase();

  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Signup failed');
  }

  if (data.token) {
    localStorage.setItem('mindease_auth_token', data.token);
  }

  if (cleanEmail && data.user && data.user.avatar_url) {
    try {
      localStorage.setItem(`mindease_user_avatar_${cleanEmail}`, data.user.avatar_url);
    } catch (e) {}
  }
  return data;
}

export async function apiLogin({ email, password }) {
  const cleanEmail = (email || '').trim().toLowerCase();

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Invalid email or password');
  }

  if (data.token) {
    localStorage.setItem('mindease_auth_token', data.token);
  }

  if (cleanEmail && data.user) {
    const savedAvatar = localStorage.getItem(`mindease_user_avatar_${cleanEmail}`);
    if (savedAvatar) {
      data.user.avatar_url = savedAvatar;
    } else if (data.user.avatar_url) {
      try {
        localStorage.setItem(`mindease_user_avatar_${cleanEmail}`, data.user.avatar_url);
      } catch (e) {}
    }
  }
  return data;
}

export async function apiDeleteAccount(password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/account`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ password: password || '' })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Incorrect password. Account deletion failed.');
    }
    return data;
  } catch (e) {
    console.warn('Backend account deletion notice:', e);
    throw e;
  }
}

export async function apiResetPassword({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Password reset failed');
  }

  if (data.token) {
    localStorage.setItem('mindease_auth_token', data.token);
  }
  return data;
}

export async function apiGetProfile() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) return null;
  return response.json();
}

export async function apiGetDashboard() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/dashboard`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend dashboard fetch failed:', e);
    return null;
  }
}

export async function apiRecordActivity(type = 'exercise') {
  try {
    const response = await fetch(`${API_BASE_URL}/users/activity`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ type }),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend activity recording failed:', e);
    return null;
  }
}

export async function apiUpdateProfile(profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend profile update failed:', e);
    return null;
  }
}

export async function apiLogMood(emotion, note = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/mood/log`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ emotion, note }),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend mood log failed, fallback to local:', e);
    return null;
  }
}

export async function apiSubmitAssessment(answers, result) {
  try {
    const response = await fetch(`${API_BASE_URL}/assessment/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers, result }),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend assessment submit failed:', e);
    return null;
  }
}

export async function apiGetResources() {
  try {
    const response = await fetch(`${API_BASE_URL}/resources`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend resources fetch failed:', e);
    return null;
  }
}

export async function apiToggleEnrollProgram(programId) {
  try {
    const response = await fetch(`${API_BASE_URL}/programs/${programId}/enroll`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend toggle enroll failed:', e);
    return null;
  }
}

export async function apiToggleModuleComplete(programId, moduleId, moodBefore = null, moodAfter = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/programs/${programId}/modules/${moduleId}/complete`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ mood_before: moodBefore, mood_after: moodAfter }),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend toggle module complete failed:', e);
    return null;
  }
}

export async function apiSendChatMessage(message, sessionId = null, language = 'en', tone = 'Empathetic', assessment = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, session_id: sessionId, language, tone, assessment }),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    console.warn('Backend chat failed:', e);
    return null;
  }
}

export async function apiGetChatSessions() {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/sessions`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend fetch chat sessions failed:', e);
    return null;
  }
}

export async function apiCreateChatSession(title = 'New Chat') {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/sessions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title }),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend create chat session failed:', e);
    return null;
  }
}

export async function apiGetSessionMessages(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}/messages`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend fetch session messages failed:', e);
    return null;
  }
}

export async function apiRenameChatSession(sessionId, title) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title }),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend rename session failed:', e);
    return null;
  }
}

export async function apiDeleteChatSession(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend delete session failed:', e);
    return null;
  }
}

export async function apiGetChatHistory(sessionId = null, limit = 100) {
  try {
    const activeSessionId = sessionId || localStorage.getItem('mindease_chat_session_id') || 'default';
    const response = await fetch(`${API_BASE_URL}/chat/history/${activeSessionId}?limit=${limit}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend fetch chat history failed:', e);
    return null;
  }
}

export async function apiClearChatHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/clear`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend clear chat failed:', e);
    return null;
  }
}

export async function apiGetCommunityPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend fetch community posts failed:', e);
    return null;
  }
}

export async function apiCreateCommunityPost({ title, content, category, tag, is_anonymous, author, author_display }) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title,
        content,
        category: category || tag || 'General',
        tag: category || tag || 'General',
        is_anonymous: Boolean(is_anonymous),
        author: author || author_display || '',
        author_display: author_display || author || ''
      }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create discussion');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend create community post failed, using local fallback:', e);
    return null;
  }
}

export async function apiUpdateCommunityPost(postId, { title, content, category, tag, is_anonymous }) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${postId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title,
        content,
        category: category || tag || 'General',
        tag: category || tag || 'General',
        is_anonymous: Boolean(is_anonymous)
      }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update discussion');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend update community post failed:', e);
    return null;
  }
}

export async function apiDeleteCommunityPost(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${postId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete discussion');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend delete community post failed:', e);
    return null;
  }
}

export async function apiTogglePostReaction(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${postId}/like`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn('Backend toggle reaction failed:', e);
    return null;
  }
}

export async function apiAddPostComment(postId, content, is_anonymous = false) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${postId}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content, is_anonymous: Boolean(is_anonymous) }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to post comment');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend add comment failed:', e);
    return null;
  }
}

export async function apiDeletePostComment(commentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/comments/${commentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete comment');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend delete comment failed:', e);
    return null;
  }
}

export async function apiReportContent({ postId, commentId, reason }) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/reports`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ post_id: postId, comment_id: commentId, reason }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit report');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend report content failed:', e);
    throw e;
  }
}

export async function apiGetEmergencyContacts() {
  try {
    const response = await fetch(`${API_BASE_URL}/emergency/contacts`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch emergency contacts');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend get emergency contacts failed:', e);
    return null;
  }
}

export async function apiAddEmergencyContact({ name, phone, relation }) {
  try {
    const response = await fetch(`${API_BASE_URL}/emergency/contacts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, phone, relation }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to add emergency contact');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend add emergency contact failed:', e);
    return null;
  }
}

export async function apiDeleteEmergencyContact(contactId) {
  try {
    const response = await fetch(`${API_BASE_URL}/emergency/contacts/${contactId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete emergency contact');
    }
    return await response.json();
  } catch (e) {
    console.warn('Backend delete emergency contact failed:', e);
    return null;
  }
}


