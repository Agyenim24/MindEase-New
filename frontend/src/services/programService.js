import { supabase } from './supabase';

/**
 * Helper to retrieve active user key
 */
function getActiveUserKey(userId) {
  let idKey = userId;
  if (!idKey) {
    try {
      const saved = localStorage.getItem('mindease_app_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.profile?.email && parsed.profile.email.includes('@')) {
          idKey = parsed.profile.email.trim().toLowerCase();
        }
      }
    } catch (e) {}
  }
  return (idKey || 'guest').replace(/[^a-zA-Z0-9_@.-]/g, '_');
}

/**
 * Get Storage Key for user enrollments cache
 */
function getEnrollmentsKey(userId) {
  return `mindease_enrollments_${getActiveUserKey(userId)}`;
}

/**
 * Get Storage Key for activity progress cache
 */
function getProgressKey(userId) {
  return `mindease_activity_progress_${getActiveUserKey(userId)}`;
}

/**
 * Helper to retrieve current authenticated user ID safely
 */
export async function getAuthenticatedUserId() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (e) {
    console.warn('Supabase auth check notice:', e);
    return null;
  }
}

/**
 * Fetch all program enrollments for the authenticated user
 */
export async function fetchUserEnrollments(userEmailOrId = null) {
  let activeUserId = userEmailOrId;
  if (!activeUserId) {
    try {
      const saved = localStorage.getItem('mindease_app_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.profile?.email && parsed.profile.email.includes('@')) {
          activeUserId = parsed.profile.email.trim().toLowerCase();
        }
      }
    } catch (e) {}
  }

  const storageKey = getEnrollmentsKey(activeUserId);

  let localEnrollments = [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) localEnrollments = parsed;
    }
  } catch (e) {}

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://127.0.0.1:5000/api';

  // 1. Fetch live programs from backend Flask API
  try {
    const token = localStorage.getItem('mindease_auth_token');
    if (token) {
      const response = await fetch(`${API_BASE_URL}/programs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.programs && Array.isArray(data.programs)) {
          const apiEnrollments = data.programs
            .filter((p) => p.enrolled || p.user_enrollment)
            .map((p) => ({
              program_id: p.id,
              enrolled_at: p.enrolledAt || p.enrolled_at || new Date().toISOString(),
              status: p.status || 'active',
              progress: p.progress || 0,
              progress_percentage: p.progress || 0,
              current_activity: p.currentActivity || 1
            }));

          const map = new Map();
          localEnrollments.forEach((e) => { if (e.program_id) map.set(String(e.program_id), e); });
          apiEnrollments.forEach((e) => { if (e.program_id) map.set(String(e.program_id), e); });

          const merged = Array.from(map.values());
          try {
            localStorage.setItem(storageKey, JSON.stringify(merged));
          } catch (e) {}
          return merged;
        }
      }
    }
  } catch (err) {
    console.warn('Backend programs fetch notice:', err);
  }

  return localEnrollments;
}

/**
 * Fetch completed activity IDs for a specific program
 */
export async function fetchProgramActivityProgress(programId, userId = null) {
  let activeUserId = userId;
  if (!activeUserId) {
    activeUserId = await getAuthenticatedUserId();
  }

  const storageKey = getProgressKey(activeUserId);

  if (activeUserId) {
    try {
      const { data, error } = await supabase
        .from('program_activity_progress')
        .select('*')
        .eq('user_id', activeUserId)
        .eq('program_id', String(programId));

      if (!error && Array.isArray(data)) {
        return data.map((item) => String(item.activity_id));
      }
    } catch (err) {
      console.warn('Supabase fetch program_activity_progress notice:', err);
    }
  }

  // Fallback to local storage cache
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const allProgress = JSON.parse(raw);
      return (allProgress[String(programId)] || []);
    }
  } catch (e) {
    console.warn('Local activity progress cache parse error:', e);
  }

  return [];
}

/**
 * Enroll the authenticated user in a program.
 * Prevents duplicate enrollments.
 */
export async function enrollInProgram(programId, userId = null) {
  let activeUserId = userId;
  if (!activeUserId) {
    activeUserId = await getAuthenticatedUserId();
  }

  const progIdStr = String(programId);

  // Check existing enrollments
  const existing = await fetchUserEnrollments(activeUserId);
  const alreadyEnrolled = existing.find((e) => String(e.program_id) === progIdStr);

  if (alreadyEnrolled) {
    return {
      success: false,
      alreadyEnrolled: true,
      enrollment: alreadyEnrolled,
      message: "You're already enrolled in this program."
    };
  }

  const newEnrollment = {
    user_id: activeUserId || 'guest',
    program_id: progIdStr,
    status: 'active',
    current_activity: 1,
    progress_percentage: 0,
    enrolled_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (activeUserId) {
    try {
      const { data, error } = await supabase
        .from('program_enrollments')
        .insert([{
          user_id: activeUserId,
          program_id: progIdStr,
          status: 'active',
          current_activity: 1,
          progress_percentage: 0
        }])
        .select()
        .single();

      if (!error && data) {
        const updatedList = [data, ...existing.filter((e) => String(e.program_id) !== progIdStr)];
        localStorage.setItem(getEnrollmentsKey(activeUserId), JSON.stringify(updatedList));
        return { success: true, enrollment: data };
      }
    } catch (err) {
      console.warn('Supabase enrollInProgram insert notice:', err);
    }
  }

  // Fallback update in local storage cache
  const updatedList = [newEnrollment, ...existing.filter((e) => String(e.program_id) !== progIdStr)];
  localStorage.setItem(getEnrollmentsKey(activeUserId), JSON.stringify(updatedList));
  return { success: true, enrollment: newEnrollment };
}

/**
 * Mark a program activity as completed for the authenticated user.
 * Updates current_activity, progress_percentage, and completion status.
 */
export async function completeActivityProgress(programId, activityId, totalActivities = 7, userId = null) {
  let activeUserId = userId;
  if (!activeUserId) {
    activeUserId = await getAuthenticatedUserId();
  }

  const progIdStr = String(programId);
  const actIdStr = String(activityId);

  // 1. Record completed activity
  if (activeUserId) {
    try {
      await supabase
        .from('program_activity_progress')
        .upsert([{
          user_id: activeUserId,
          program_id: progIdStr,
          activity_id: actIdStr,
          completed: true,
          completed_at: new Date().toISOString()
        }], { onConflict: 'user_id,activity_id' });
    } catch (err) {
      console.warn('Supabase completeActivityProgress upsert notice:', err);
    }
  }

  // Update local progress cache
  const progressStorageKey = getProgressKey(activeUserId);
  let localProgressMap = {};
  try {
    const raw = localStorage.getItem(progressStorageKey);
    if (raw) localProgressMap = JSON.parse(raw);
  } catch (e) {}

  const currentProgList = localProgressMap[progIdStr] || [];
  if (!currentProgList.includes(actIdStr)) {
    currentProgList.push(actIdStr);
  }
  localProgressMap[progIdStr] = currentProgList;
  localStorage.setItem(progressStorageKey, JSON.stringify(localProgressMap));

  // 2. Fetch all completed activities for this program
  const completedActivityIds = await fetchProgramActivityProgress(progIdStr, activeUserId);
  if (!completedActivityIds.includes(actIdStr)) {
    completedActivityIds.push(actIdStr);
  }

  const completedCount = completedActivityIds.length;
  const progressPct = Math.min(100, Math.round((completedCount / Math.max(1, totalActivities)) * 100));
  const isCompleted = completedCount >= totalActivities;
  const newStatus = isCompleted ? 'completed' : 'active';
  const nextActivityNum = Math.min(totalActivities, completedCount + 1);

  // 3. Update program_enrollments
  let updatedEnrollment = null;
  if (activeUserId) {
    try {
      const updatePayload = {
        progress_percentage: progressPct,
        current_activity: nextActivityNum,
        status: newStatus,
        updated_at: new Date().toISOString()
      };
      if (isCompleted) {
        updatePayload.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('program_enrollments')
        .update(updatePayload)
        .eq('user_id', activeUserId)
        .eq('program_id', progIdStr)
        .select()
        .single();

      if (!error && data) {
        updatedEnrollment = data;
      }
    } catch (err) {
      console.warn('Supabase program_enrollments update notice:', err);
    }
  }

  // Sync enrollments cache
  const existingEnrollments = await fetchUserEnrollments(activeUserId);
  const listToSave = existingEnrollments.map((e) => {
    if (String(e.program_id) === progIdStr) {
      return {
        ...e,
        progress_percentage: progressPct,
        current_activity: nextActivityNum,
        status: newStatus,
        completed_at: isCompleted ? new Date().toISOString() : e.completed_at,
        updated_at: new Date().toISOString()
      };
    }
    return e;
  });
  localStorage.setItem(getEnrollmentsKey(activeUserId), JSON.stringify(listToSave));

  return {
    success: true,
    isCompleted,
    progressPercentage: progressPct,
    currentActivity: nextActivityNum,
    enrollment: updatedEnrollment
  };
}
