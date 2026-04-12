import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiCalendar } from "react-icons/fi";
import { TbPigMoney } from "react-icons/tb";
import { FiAlertTriangle, FiBell, FiCheckCircle, FiFileText } from "react-icons/fi";

const getIconStyles = (badgeText, type) => {
  if (badgeText === "Success" || badgeText === "Completed") {
    if (badgeText === "Success") {
      return { icon: <TbPigMoney size={24} />, bg: "bg-blue-50", text: "text-blue-500" };
    }
    return { icon: <FiCheckCircle size={24} />, bg: "bg-emerald-50", text: "text-emerald-500" };
  }
  if (badgeText === "Reminder") {
    return { icon: <FiAlertTriangle size={24} />, bg: "bg-orange-50", text: "text-orange-500" };
  }
  if (badgeText === "Info") {
    if (type === "memo") {
      return { icon: <FiFileText size={24} />, bg: "bg-blue-50", text: "text-blue-500" };
    }
    return { icon: <FiBell size={24} />, bg: "bg-blue-50", text: "text-blue-500" };
  }
  return { icon: <FiBell size={24} />, bg: "bg-gray-100", text: "text-gray-500" };
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

export default function NotificationDetailModal({ isOpen, onClose, notif, onMarkAsRead }) {
  if (!notif) return null;

  const { icon, bg, text } = getIconStyles(notif.badge, notif.type);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header matches Transaction/Bill modal pattern */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Notification Detail
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Informasi lengkap mengenai notifikasi Anda
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg} ${text} shadow-sm border border-white/50`}>
                  {icon}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                      notif.badge === 'Success' || notif.badge === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      notif.badge === 'Reminder' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {notif.badge}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                      <FiCalendar size={12} />
                      {formatTimeAgo(notif.created_at)}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 leading-tight">
                    {notif.title}
                  </h4>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                  {notif.message}
                </p>
              </div>
            </div>

            {/* Footer matches Transaction/Bill modal pattern */}
            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              {!notif.is_read && (
                <button
                  onClick={() => {
                    onMarkAsRead(notif.id);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#1A2035] rounded-xl hover:bg-[#111524] transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <FiCheck size={18} />
                  Mark as Read
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

