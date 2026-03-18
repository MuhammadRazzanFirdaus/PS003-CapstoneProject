import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBackIos, MdOutlineNotificationsNone, MdLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbTargetArrow } from "react-icons/tb";
import { RiBillLine } from "react-icons/ri";
import { LuWallet } from "react-icons/lu";
import { useSidebar } from "../../context/SidebarContext";
import NavItem from "./NavItem";

const navItems = [
  { icon: <RxDashboard size={18} />, label: "Dashboard", path: "/" },
  { icon: <TbTargetArrow size={18} />, label: "Goals", path: "/goals" },
  { icon: <LuWallet size={18} />, label: "Transactions", path: "/transactions" },
  { icon: <RiBillLine size={18} />, label: "Bills", path: "/bills" },
  { icon: <MdOutlineNotificationsNone size={18} />, label: "Notifications", path: "/notifications" },
];

export default function SideBar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-screen bg-gray-900 text-white z-50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center py-4 px-4 border-b border-gray-700 shrink-0">
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-semibold text-2xl tracking-wide flex-1 whitespace-nowrap"
            >
              <span className="text-indigo-300">Fin</span>Go
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors shrink-0 ml-auto"
        >
          <motion.span
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 text-sm"
          >
            <MdArrowBackIos />
          </motion.span>
        </motion.button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 px-2 py-3 shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold shrink-0">
            U
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-sm font-medium whitespace-nowrap">Username</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">user@email.com</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="my-2">
          <button className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-700 transition-colors group">
            <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 group-hover:bg-gray-600 transition-colors shrink-0">
              <MdLogout size={18} />
            </span>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-gray-200 whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}