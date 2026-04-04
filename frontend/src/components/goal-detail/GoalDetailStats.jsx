import { motion } from "framer-motion";

function StatusBadge({ status }) {
  const map = {
    in_progress: { label: "In Progress", className: "text-teal-600" },
    completed: { label: "Completed", className: "text-green-600" },
  };
  const s = map[status] ?? { label: status, className: "text-gray-500" };
  return <span className={`text-2xl font-bold ${s.className}`}>{s.label}</span>;
}

export default function GoalDetailStats({ goal, savings = [], fadeUp }) {
  const initial = Number(goal.initial_amount) || 0;
  const target = Number(goal.target_amount) || 0;
  const totalSavings = savings.reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
  const collected = initial + totalSavings;
  const remaining = target - collected;

  return (
    <motion.div
      custom={3} variants={fadeUp} initial="hidden" animate="show"
      className="bg-white rounded-xl px-6 py-10 flex divide-x"
    >
      <div className="flex-1 pr-6">
        <p className="text-xs text-gray-400 mb-1">Collected</p>
        <p className="text-2xl font-bold">Rp{collected.toLocaleString("id-ID")}</p>
      </div>
      <div className="flex-1 px-6">
        <p className="text-xs text-gray-400 mb-1">Remaining</p>
        <p className="text-2xl font-bold">Rp{remaining.toLocaleString("id-ID")}</p>
      </div>
      <div className="flex-1 pl-6">
        <p className="text-xs text-gray-400 mb-1">Status</p>
        <StatusBadge status={goal.status} />
      </div>
    </motion.div>
  );
}