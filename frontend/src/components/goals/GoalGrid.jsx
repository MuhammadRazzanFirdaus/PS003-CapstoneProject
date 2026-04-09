import { motion, AnimatePresence } from "framer-motion";
import GoalCard from "../dashboard/GoalCard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

const shimmer = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.8,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

function GoalCardSkeleton({ index }) {
  const delay = index * 0.08;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="border border-gray-100 rounded-xl p-4 bg-white flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <motion.div
          {...shimmer}
          transition={{ ...shimmer.transition, delay }}
          className="w-10 h-10 rounded-lg bg-gray-200 shrink-0"
        />
        <div className="flex flex-col gap-2 flex-1">
          <motion.div
            {...shimmer}
            transition={{ ...shimmer.transition, delay: delay + 0.1 }}
            className="h-4 w-32 bg-gray-200 rounded"
          />
          <motion.div
            {...shimmer}
            transition={{ ...shimmer.transition, delay: delay + 0.2 }}
            className="h-3 w-24 bg-gray-200 rounded"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <motion.div
            {...shimmer}
            transition={{ ...shimmer.transition, delay: delay + 0.15 }}
            className="h-3 w-20 bg-gray-200 rounded"
          />
          <motion.div
            {...shimmer}
            transition={{ ...shimmer.transition, delay: delay + 0.25 }}
            className="h-3 w-20 bg-gray-200 rounded"
          />
        </div>
        <motion.div
          {...shimmer}
          transition={{ ...shimmer.transition, delay: delay + 0.3 }}
          className="h-1.5 w-full bg-gray-200 rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function GoalGrid({ goals, loading, activeTab }) {
  const filtered = goals.filter((g) => {
    const collected = (Number(g.initial_amount) || 0) + (Number(g.savings_sum_amount) || 0);
    const target = Number(g.target_amount) || 0;
    const isCompleted = g.status === "completed" || collected >= target;

    if (activeTab === "In Progress") return !isCompleted;
    if (activeTab === "Completed") return isCompleted;
    return true;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {[0, 1, 2].map((i) => (
          <GoalCardSkeleton key={i} index={i} />
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-3  gap-4 p-4"
      >
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 col-span-3">Tidak ada goals.</p>
        )}
        {filtered.map((goal, i) => (
          <motion.div
            key={goal.id}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <GoalCard {...goal} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
