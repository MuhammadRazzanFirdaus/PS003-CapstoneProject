import { motion } from "framer-motion";
import { MdOutlineWarningAmber } from "react-icons/md";



function StatusBadge({ status, isNotAchieved, isCompleted }) {
  if (isCompleted) {
    return <span className="text-2xl font-bold text-green-600">Completed</span>;
  }
  if (status === "not_achieved" || (isNotAchieved && status !== "completed")) {
    return (
      <span className="text-2xl font-bold text-yellow-500">Not Achieved</span>
    );
  }

  const map = {
    in_progress: { label: "In Progress", className: "text-teal-600" },
    completed: { label: "Completed", className: "text-green-600" },
    not_achieved: { label: "Not Achieved", className: "text-yellow-500" },
  };
  const s = map[status] ?? { label: status, className: "text-gray-500" };
  return <span className={`text-2xl font-bold ${s.className}`}>{s.label}</span>;
}

export default function GoalDetailStats({ goal, savings = [], fadeUp }) {
  const initial = Number(goal.initial_amount) || 0;
  const target = Number(goal.target_amount) || 0;
  const totalSavings = savings.reduce((acc, s) => {
    const amount = Number(s.amount) || 0;
    return s.type === "expense" ? acc - amount : acc + amount;
  }, 0);
  const collected = initial + totalSavings;
  const remaining = Math.max(0, target - collected);
  const isCompleted = goal.status === "completed";
  const isNotAchieved = goal.status === "not_achieved";

  return (
    <div className="flex flex-col gap-3">
      {isNotAchieved && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3"
        >
          <MdOutlineWarningAmber
            size={18}
            className="text-yellow-500 shrink-0"
          />
          <p className="text-sm text-yellow-600">
            the goal will not be achieved on time because the amount of money
            collected is insufficient
          </p>
        </motion.div>
      )}

      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white rounded-xl px-6 py-10 flex divide-x"
      >
        <div className="flex-1 pr-6">
          <p className="text-xs text-gray-400 mb-1">Collected</p>
          <p className="text-2xl font-bold">
            Rp{collected.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex-1 px-6">
          <p className="text-xs text-gray-400 mb-1">Remaining</p>
          <p className="text-2xl font-bold">
            Rp{remaining.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex-1 pl-6">
          <p className="text-xs text-gray-400 mb-1">Status</p>
          <StatusBadge status={goal.status} isNotAchieved={isNotAchieved} isCompleted={isCompleted} />
        </div>
      </motion.div>
    </div>
  );
}
