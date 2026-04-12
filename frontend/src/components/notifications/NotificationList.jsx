import { motion, AnimatePresence } from "framer-motion";
import { FiBell } from "react-icons/fi";
import NotificationItem from "./NotificationItem";

export default function NotificationList({ notifications, fadeUp, onNotificationClick }) {
  return (
    <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden w-full">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white/50">
         <h2 className="text-[15px] font-bold text-gray-900">All notifications</h2>
         <span className="text-xs text-gray-400 font-medium">{notifications.length} items</span>
      </div>

      <div className="flex flex-col min-h-[100px] relative">
        <AnimatePresence mode="popLayout">
          {notifications.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-10 flex flex-col items-center justify-center text-center w-full"
            >
              <FiBell size={40} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">You're all caught up!</p>
              <p className="text-sm text-gray-400 mt-1">No new notifications right now.</p>
            </motion.div>
          ) : (
            notifications.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <NotificationItem notif={notif} onClick={onNotificationClick} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
