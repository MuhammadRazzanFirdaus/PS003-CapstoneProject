import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const periodLabel = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month",
};

export default function GoalDetailInfo({ goal, fadeUp }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const target = Number(goal.target_amount) || 0;
  const savingAmount = Number(goal.saving_amount) || 0;
  const period = periodLabel[goal.saving_period] ?? "Day";

  const daysLeft = goal.target_date
    ? Math.max(
        0,
        Math.ceil(
          (new Date(goal.target_date) - new Date()) / (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  return (
    <>
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex gap-6 items-start"
      >
        <div className="w-40 h-40 rounded-2xl bg-gray-200 overflow-hidden shrink-0 shadow-sm border border-gray-100 relative group cursor-pointer" onClick={() => goal.image_url && setIsImageModalOpen(true)}>
          {goal.image_url ? (
            <>
              <img
                src={goal.image_url}
                alt={goal.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <p className="text-2xl font-bold">Rp{target.toLocaleString("id-ID")}</p>
          <p className="text-sm text-gray-400">
            Rp{savingAmount.toLocaleString("id-ID")}/{period}
          </p>
          {goal.target_date && (
            <p className="text-sm font-medium">
              Estimation |{" "}
              <span className="text-gray-500">{daysLeft} More Days</span>
            </p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isImageModalOpen && goal.image_url && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={goal.image_url}
              alt={goal.name}
              className="relative max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain pointer-events-none"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
