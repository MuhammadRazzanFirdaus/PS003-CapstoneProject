import { motion } from "framer-motion";

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

export default function SavingSkeleton({ index }) {
  const delay = index * 0.06;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-xl px-4 py-3 flex items-center justify-between"
    >
      <div className="flex flex-col gap-2">
        <motion.div
          {...shimmer}
          transition={{ ...shimmer.transition, delay }}
          className="h-4 w-32 bg-gray-200 rounded"
        />
        <motion.div
          {...shimmer}
          transition={{ ...shimmer.transition, delay: delay + 0.1 }}
          className="h-3 w-24 bg-gray-200 rounded"
        />
      </div>
      <motion.div
        {...shimmer}
        transition={{ ...shimmer.transition, delay: delay + 0.15 }}
        className="h-4 w-24 bg-gray-200 rounded"
      />
    </motion.div>
  );
}
