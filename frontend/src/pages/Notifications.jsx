import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Goal hampir tercapai",
      message: "Tabungan kamu sudah 90%",
      time: "2 menit lalu",
      isRead: false,
    },
    {
      id: 2,
      title: "Transaksi baru",
      message: "Kamu menambahkan pengeluaran",
      time: "10 menit lalu",
      isRead: true,
    },
    {
      id: 3,
      title: "Reminder tagihan",
      message: "Tagihan listrik jatuh tempo besok",
      time: "1 jam lalu",
      isRead: false,
    }
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Notifikasi</h2>

      {notifications.length === 0 ? (
        <p>Tidak ada notifikasi</p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => !notif.isRead && markAsRead(notif.id)}
            style={{
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: notif.isRead ? "#f1f1f1" : "#dbeafe"
            }}
          >
            <h4 style={{ margin: 0 }}>{notif.title}</h4>
            <p style={{ margin: "5px 0" }}>{notif.message}</p>
            <small>{notif.time}</small>
          </div>
        ))
      )}
    </div>
  );
}