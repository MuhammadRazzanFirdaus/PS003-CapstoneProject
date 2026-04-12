import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

export default function NavItem({ icon, label, path, badge }) {
  const { isOpen } = useSidebar();

  return (
    <NavLink
      to={path}
      end={path === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors group relative ${
          isActive
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-700 text-gray-300"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors shrink-0 relative ${
              isActive
                ? "bg-indigo-500"
                : "bg-gray-800 group-hover:bg-gray-600"
            }`}
          >
            {icon}
            {badge > 0 && !isOpen && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900 shadow-sm" />
            )}
          </span>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between flex-1 min-w-0"
              >
                <span className="text-sm whitespace-nowrap font-medium truncate">
                  {label}
                </span>
                {badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}