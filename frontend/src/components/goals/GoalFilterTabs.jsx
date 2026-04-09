import { motion } from "framer-motion";

const tabs = ["All Goals", "In Progress", "Completed"];

export default function GoalFilterTabs({ activeTab, onTabChange, fadeUp }) {
  return (
    <motion.div
      custom={2}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="flex gap-2 p-4"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            activeTab === tab
              ? "bg-gray-900 text-white"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </motion.div>
  );
}
