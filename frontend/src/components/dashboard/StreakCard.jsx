import { AiOutlineFire } from "react-icons/ai";
import { motion } from "framer-motion";

const getStreakStyles = (count) => {
  if (count >= 50) return {
    iconBg: "bg-purple-100",
    text: "text-purple-600",
    iconColor: "text-purple-500",
  };
  if (count >= 10) return {
    iconBg: "bg-blue-100",
    text: "text-blue-600",
    iconColor: "text-blue-500",
  };
  if (count >= 1) return {
    iconBg: "bg-orange-100",
    text: "text-orange-600",
    iconColor: "text-orange-500",
  };
  return {
    iconBg: "bg-gray-100",
    text: "text-gray-500",
    iconColor: "text-gray-400",
  };
};

export default function StreakCard({ streak = 0 }) {
  const styles = getStreakStyles(streak);

  return (
    <div className="flex flex-col items-center p-4">
      <motion.div
        animate={streak > 0 ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`${styles.iconBg} ${styles.iconColor} p-4 rounded-full mb-2`}
      >
        <AiOutlineFire size={28} />
      </motion.div>

      <div className="flex flex-col items-center">
        <motion.p 
          key={streak}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`font-bold text-xl ${styles.text}`}
        >
          {streak}
        </motion.p>
        <p className="text-xs font-semibold text-gray-400">Streak Day</p>
      </div>
    </div>
  );
}
