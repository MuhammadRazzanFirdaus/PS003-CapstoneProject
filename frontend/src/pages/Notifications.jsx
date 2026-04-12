import { useState, useMemo } from "react";
import NotificationHeader from "../components/notifications/NotificationHeader";
import NotificationFilters from "../components/notifications/NotificationFilters";
import NotificationList from "../components/notifications/NotificationList";
import NotificationDetailModal from "../components/notifications/NotificationDetailModal";
import { useNotifications } from "../hooks/useNotifications";

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

  // Helper to map backend type to UI badge
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
      // Ensure we have a Date object for sorting
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
    // Update local selectedNotif if it's the one we just read
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
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
          ))}
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