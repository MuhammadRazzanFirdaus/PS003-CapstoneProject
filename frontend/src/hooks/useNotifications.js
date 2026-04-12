import { useState, useEffect, useCallback, useMemo } from "react";
import { getNotifications, markNotificationAsRead } from "../api/fingo";
import { getAuthUserId } from "../utils/auth";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    const userId = getAuthUserId();
    const params = userId ? { user_id: userId } : {};

    getNotifications(params)
      .then((res) => {
        const data = res.data?.data || res.data || [];
        setNotifications(data);
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      // Update local state for immediate feedback
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.is_read).length;
  }, [notifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { 
    notifications, 
    loading, 
    error, 
    unreadCount,
    markAsRead,
    refetch: fetchNotifications 
  };
}
