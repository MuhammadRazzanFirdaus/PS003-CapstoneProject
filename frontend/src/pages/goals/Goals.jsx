import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGoals } from "../../hooks/useGoals";
import GoalStatCards from "../../components/goals/GoalStatCards";
import GoalFilterTabs from "../../components/goals/GoalFilterTabs";
import GoalGrid from "../../components/goals/GoalGrid";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Goals() {
  const { goals, loading } = useGoals();
  const [activeTab, setActiveTab] = useState("All Goals");

  return (
    <div className="p-6 flex flex-col gap-6">
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center justify-between p-4"
      >
        <h1 className="text-2xl font-bold">My Goals</h1>
        <Link
          to="/goals/create"
          className="flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
        >
          + Add Saving
        </Link>
      </motion.div>

      <GoalStatCards goals={goals} loading={loading} fadeUp={fadeUp} />
      <GoalFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        fadeUp={fadeUp}
      />
      <GoalGrid goals={goals} loading={loading} activeTab={activeTab} />
    </div>
  );
}
