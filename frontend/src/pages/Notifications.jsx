import { useState, useMemo } from "react";
import NotificationHeader from "../components/notifications/NotificationHeader";
import NotificationFilters from "../components/notifications/NotificationFilters";
import NotificationList from "../components/notifications/NotificationList";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

const ALL_NOTIFICATIONS = [
  {
    id: 1,
    type: "success",
    title: "Dana berhasil ditambahkan ke Lv Imagination",
    badge: "Success",
    message: "Kamu baru saja menambahkan Rp 500.000 ke saving goal Lv Imagination. Total dana terkumpul sekarang Rp 5.000.000.",
    timestamp: new Date("2026-04-12T15:58:00"),
    time: "2 min ago",
  },
  {
    id: 2,
    type: "warning",
    title: "Target bulanan hampir terlewat",
    badge: "Reminder",
    message: "Goal MacBook Pro masih membutuhkan Rp 2.300.000 lagi. Tambahkan dana minggu ini agar target bulan ini tetap tercapai.",
    timestamp: new Date("2026-04-12T15:00:00"),
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "info",
    title: "Pengingat menabung hari ini",
    badge: "Info",
    message: "Saatnya sisihkan dana untuk goals kamu. Jadwalkan setoran hari ini supaya progres tetap konsisten.",
    timestamp: new Date("2026-04-12T09:30:00"),
    time: "Today, 09:30",
  },
  {
    id: 4,
    type: "completed",
    title: "Goal Nintendo Switch berhasil tercapai",
    badge: "Completed",
    message: "Selamat! Dana untuk Nintendo Switch sudah lengkap. Kamu bisa lanjut ke proses pembelian kapan saja.",
    timestamp: new Date("2026-04-11T10:00:00"),
    time: "Yesterday",
  },
  {
    id: 5,
    type: "memo",
    title: "Catatan tabungan baru ditambahkan",
    badge: "Info",
    message: 'Memo "Bonus freelance" berhasil disimpan pada saving goal iPad Air dengan nominal Rp 750.000.',
    timestamp: new Date("2026-03-04T08:00:00"),
    time: "Mar 04, 2026",
  },
];

export default function Notifications() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [badgeFilter, setBadgeFilter] = useState("All");

  const filteredNotifications = useMemo(() => {
    let result = [...ALL_NOTIFICATIONS];

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
  }, [search, sortOrder, badgeFilter]);

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

      <NotificationList notifications={filteredNotifications} fadeUp={fadeUp} />
    </div>
  );
}