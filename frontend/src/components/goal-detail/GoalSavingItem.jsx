import { motion } from "framer-motion";

export default function GoalSavingItem({ saving, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="bg-white rounded-xl px-4 py-3 flex items-center justify-between"
    >
      <div>
        <p className="text-sm font-medium">{saving.note ?? "Saving"}</p>
        <p className="text-xs text-gray-400">
          {saving.created_at
            ? new Date(saving.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </p>
      </div>
      <p className={`text-sm font-semibold ${saving.type === "expense" ? "text-red-500" : "text-teal-600"}`}>
        {saving.type === "expense" ? "-" : "+"}Rp{Math.abs(Number(saving.amount)).toLocaleString("id-ID")}
      </p>
    </motion.div>
  );
}
