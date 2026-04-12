import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getNotifications, markNotificationAsRead } from "../api/fingo";
import { getAuthUserId } from "../utils/auth";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    setIsFetching(true);
    try {
      const userId = getAuthUserId();
      const params = userId ? { user_id: userId } : {};
      const res = await getNotifications(params);
      const data = res.data?.data || res.data || [];
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
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
    if (user) {
      fetchNotifications();
    } else if (!authLoading) {
      setNotifications([]);
      setIsFetching(false);
    }
  }, [user, authLoading, fetchNotifications]);

  const loading = authLoading || (user && isFetching && notifications.length === 0) || (user && notifications.length === 0 && isFetching);
  
  const value = {
    notifications,
    loading: authLoading || isFetching,
    error,
    unreadCount,
    markAsRead,
    refetch: fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};
