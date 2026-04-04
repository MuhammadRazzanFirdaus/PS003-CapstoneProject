import { motion } from "framer-motion";
import { TbTargetArrow } from "react-icons/tb";
import {
  MdCheckCircleOutline,
  MdOutlineTimer,
  MdOutlineSavings,
} from "react-icons/md";

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

function StatSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-5 flex flex-col gap-3"
    >
      <motion.div {...shimmer} className="h-3 w-24 bg-gray-200 rounded" />
      <motion.div
        {...shimmer}
        transition={{ ...shimmer.transition, delay: 0.15 }}
        className="h-8 w-16 bg-gray-200 rounded"
      />
    </motion.div>
  );
}

export default function GoalStatCards({ goals, loading, fadeUp }) {
  const totalGoals = goals.length;
  const completed = goals.filter((g) => g.status === "completed").length;
  const inProgress = goals.filter((g) => g.status === "in_progress").length;
  const savedForGoals = goals.reduce(
    (acc, g) => acc + (Number(g.initial_amount) || 0),
    0,
  );

  const stats = [
    {
      label: "Total Goals",
      icon: <TbTargetArrow size={16} />,
      value: totalGoals,
    },
    {
      label: "Completed",
      icon: <MdCheckCircleOutline size={16} />,
      value: completed,
    },
    {
      label: "In Progress",
      icon: <MdOutlineTimer size={16} />,
      value: inProgress,
    },
    {
      label: "Saved for Goals",
      icon: <MdOutlineSavings size={16} />,
      value: `Rp${savedForGoals.toLocaleString("id-ID")}`,
      large: true,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        {[1, 2, 3, 4].map((i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="grid grid-cols-4 gap-4 p-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-5 flex flex-col gap-2"
        >
          <p className="text-xs text-gray-400 flex items-center gap-1">
            {stat.icon} {stat.label}
          </p>
          <p className={`font-bold ${stat.large ? "text-xl" : "text-3xl"}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
