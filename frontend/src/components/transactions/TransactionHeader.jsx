import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TransactionHeader({ fadeUp, onAddTransaction }) {
  return (
    <motion.div
      custom={0}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="flex items-center justify-between"
    >
      <h1 className="text-2xl font-bold">Transactions</h1>
      <button 
        onClick={onAddTransaction}
        className="flex items-center gap-2 bg-[#1A1C29] text-white text-sm px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <FiPlus className="w-4 h-4" />
        Add Transaction
      </button>
    </motion.div>
  );
}
