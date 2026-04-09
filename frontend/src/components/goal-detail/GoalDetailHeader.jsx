import { MdArrowBackIos } from "react-icons/md";
import { motion } from "framer-motion";

export default function GoalDetailHeader({ onBack, onAddFunds, fadeUp }) {
  return (
    <motion.div
      custom={0}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="flex items-center justify-between"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
      >
        <MdArrowBackIos size={14} /> Back
      </button>
      <button onClick={onAddFunds} className="flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer">
        + Add Funds
      </button>
    </motion.div>
  );
}
