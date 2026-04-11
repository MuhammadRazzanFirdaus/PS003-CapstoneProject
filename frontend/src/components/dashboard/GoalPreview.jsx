import { Link } from "react-router-dom";
import { TbTargetArrow } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import GoalCard from "./GoalCard";
import { useGoals } from "../../hooks/useGoals";

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

export default function GoalPreview() {
  const { goals, loading, error } = useGoals();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TbTargetArrow /> Goals
        </h2>
        <Link to="/goals" className="text-xs text-gray-400 hover:text-gray-600">
          More →
        </Link>
      </div>

      {loading && (
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <GoalCardSkeleton key={i} index={i} />
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-400">Gagal memuat goals.</p>}

      {!loading && !error && goals.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">Belum ada goals yang dibuat.</p>
      )}

      <AnimatePresence>
        {!loading && !error && goals.length > 0 && (
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {goals.slice(0, 3).map((goal, i) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <GoalCard {...goal} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
