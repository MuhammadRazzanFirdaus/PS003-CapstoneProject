import { motion } from "framer-motion";

const periodLabel = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month",
};

export default function GoalDetailInfo({ goal, fadeUp }) {
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
    <motion.div
      custom={2}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="flex gap-6 items-start"
    >
      <div className="w-60 h-56 rounded-xl bg-gray-200 overflow-hidden shrink-0">
        {goal.image_url ? (
          <img
            src={goal.image_url}
            alt={goal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
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
  );
}
