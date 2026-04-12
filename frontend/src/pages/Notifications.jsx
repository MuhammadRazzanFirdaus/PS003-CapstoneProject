import { useState, useMemo } from "react";
import NotificationHeader from "../components/notifications/NotificationHeader";
import NotificationFilters from "../components/notifications/NotificationFilters";
import NotificationList from "../components/notifications/NotificationList";
import NotificationDetailModal from "../components/notifications/NotificationDetailModal";
import { useNotifications } from "../hooks/useNotifications";

import NotificationSkeleton from "../components/notifications/NotificationSkeleton";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Notifications() {
  const { notifications, loading, error, markAsRead } = useNotifications();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [badgeFilter, setBadgeFilter] = useState("All");
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBadge = (type) => {
    switch (type) {
      case 'reminder': return 'Reminder';
      case 'success':
      case 'completed': return 'Success';
      case 'insight':
      case 'info': return 'Info';
      default: return 'Info';
    }
  };

  const filteredNotifications = useMemo(() => {
    let result = notifications.map(n => ({
      ...n,
      badge: getBadge(n.type),
      timestamp: new Date(n.created_at)
    }));

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q)
      );
    }

    if (badgeFilter !== "All") {
      result = result.filter((n) => n.badge === badgeFilter);
    }

    result.sort((a, b) =>
      sortOrder === "Newest"
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp
    );

    return result;
  }, [notifications, search, sortOrder, badgeFilter]);

  const handleNotificationClick = (notif) => {
    setSelectedNotif(notif);
    setIsModalOpen(true);
  };

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    if (selectedNotif?.id === id) {
      setSelectedNotif(prev => ({ ...prev, is_read: true }));
    }
  };

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Failed to load notifications. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 flex flex-col gap-8 mx-auto">
      <NotificationHeader fadeUp={fadeUp} />

      <NotificationFilters
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        badgeFilter={badgeFilter}
        setBadgeFilter={setBadgeFilter}
        fadeUp={fadeUp}
      />

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden w-full">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white/50">
             <div className="h-5 w-32 bg-gray-100 animate-pulse rounded-md" />
             <div className="h-4 w-16 bg-gray-50 animate-pulse rounded-md" />
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <NotificationSkeleton key={i} index={i} />
            ))}
          </div>
        </div>
      ) : (
        <NotificationList 
          notifications={filteredNotifications} 
          fadeUp={fadeUp} 
          onNotificationClick={handleNotificationClick}
        />
      )}

      <NotificationDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notif={selectedNotif}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}