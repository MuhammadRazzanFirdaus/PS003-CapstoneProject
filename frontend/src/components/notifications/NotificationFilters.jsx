import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiCheck } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";

const SORT_OPTIONS = ["Newest", "Oldest"];
const BADGE_OPTIONS = ["All", "Success", "Reminder", "Info", "Completed"];

export default function NotificationFilters({
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  badgeFilter,
  setBadgeFilter,
  fadeUp,
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const sortRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
      if (badgeRef.current && !badgeRef.current.contains(e.target)) setBadgeOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="flex items-center justify-between gap-4 flex-wrap"
    >
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <FiSearch className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notifications..."
          className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={badgeRef}>
          <button
            onClick={() => { setBadgeOpen((v) => !v); setSortOpen(false); }}
            className="flex items-center gap-2 bg-white border border-gray-200 py-2.5 px-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-sm text-gray-600 font-medium"
          >
            <span>{badgeFilter === "All" ? "Filter: All" : badgeFilter}</span>
            <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${badgeOpen ? "rotate-180" : ""}`} />
          </button>

          {badgeOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden"
            >
              {BADGE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setBadgeFilter(opt); setBadgeOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {opt}
                  {badgeFilter === opt && <FiCheck className="w-3.5 h-3.5 text-blue-500" />}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div className="relative" ref={sortRef}>
          <button
            onClick={() => { setSortOpen((v) => !v); setBadgeOpen(false); }}
            className="flex items-center gap-2 bg-white border border-gray-200 py-2.5 px-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-sm text-gray-600 font-medium"
          >
            <BiSortAlt2 className="w-4 h-4 text-gray-500" />
            <span>Sort: {sortOrder}</span>
            <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>

          {sortOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden"
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSortOrder(opt); setSortOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {opt}
                  {sortOrder === opt && <FiCheck className="w-3.5 h-3.5 text-blue-500" />}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
