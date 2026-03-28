import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

export default function NavItem({ icon, label, path }) {
  const { isOpen } = useSidebar();

  return (
    <NavLink
      to={path}
      end={path === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors group ${
          isActive
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-700 text-gray-300"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors shrink-0 ${
              isActive
                ? "bg-indigo-500"
                : "bg-gray-800 group-hover:bg-gray-600"
            }`}
          >
            {icon}
          </span>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="text-sm whitespace-nowrap font-medium"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}