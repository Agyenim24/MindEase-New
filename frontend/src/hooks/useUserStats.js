import { useState, useEffect, useCallback } from 'react';
import { apiGetDashboard, apiRecordActivity } from '../services/api';
import { useData } from '../context/DataContext';

export function useUserStats() {
  const { isLoggedIn, refreshLiveData } = useData();
  const [stats, setStats] = useState({
    activity_streak: 0,
    exercises_completed: 0,
    programs_completed: 0,
    mood_entries: 0,
    last_activity_date: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await apiGetDashboard();
      if (res && res.activity_stats) {
        setStats(res.activity_stats);
      } else if (res) {
        setStats({
          activity_streak: res.streak || 0,
          exercises_completed: res.exercises_completed || res.total_sessions || 0,
          programs_completed: res.programs_completed || res.completed_programs_count || 0,
          mood_entries: res.mood_entries || (res.mood_logs ? res.mood_logs.length : 0),
          last_activity_date: res.last_activity_date || null,
        });
      }
    } catch (err) {
      console.error('Failed to fetch user activity stats:', err);
      setError('Unable to load your live activity stats. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateActivityStats = async (type = 'exercise') => {
    try {
      const res = await apiRecordActivity(type);
      if (res && res.activity_stats) {
        setStats(res.activity_stats);
      }
      if (refreshLiveData) {
        refreshLiveData();
      }
    } catch (err) {
      console.error('Failed to record activity:', err);
    }
  };

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats,
    updateActivityStats,
  };
}

export default useUserStats;
