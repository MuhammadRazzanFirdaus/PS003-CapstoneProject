import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiX, FiArrowUpRight, FiArrowDownLeft, FiCalendar, FiTag, FiFileText } from "react-icons/fi";

export default function TransactionDetailModal({ transaction, isOpen, onClose, onDelete, onEdit }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!transaction) return null;

  const isIncome = transaction.type === "income";
  const d = new Date(transaction.created_at || Date.now());
  const dateStr = d.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await onDelete(transaction.id);
    setIsDeleting(false);
    setIsDeleteOpen(false);
    onClose();
  };

  return (
    <>
      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && !isDeleteOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header strip */}
              <div className={`px-6 pt-6 pb-5 ${isIncome ? "bg-emerald-50" : "bg-red-50"}`}>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white/60 transition-colors"
                >
                  <FiX size={18} />
                </button>

                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isIncome ? "bg-emerald-100" : "bg-red-100"}`}>
                  {isIncome
                    ? <FiArrowDownLeft size={22} className="text-emerald-600" />
                    : <FiArrowUpRight size={22} className="text-red-500" />
                  }
                </div>

                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  {isIncome ? "Income" : "Expense"}
                </p>
                <p className={`text-2xl font-bold ${isIncome ? "text-emerald-600" : "text-red-500"}`}>
                  {isIncome ? "+" : "-"}Rp {Math.abs(Number(transaction.amount)).toLocaleString("id-ID")}
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{transaction.name || transaction.title}</p>
              </div>

              {/* Details */}
              <div className="px-6 py-5 flex flex-col gap-4">
                <DetailRow
                  icon={<FiCalendar size={15} className="text-gray-400" />}
                  label="Date"
                  value={dateStr}
                />
                <DetailRow
                  icon={<FiTag size={15} className="text-gray-400" />}
                  label="Category"
                  value={<span className="capitalize">{transaction.category || "-"}</span>}
                />
                {transaction.description && (
                  <DetailRow
                    icon={<FiFileText size={15} className="text-gray-400" />}
                    label="Description"
                    value={transaction.description}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={() => {
                    onEdit(transaction);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-[#1A1C29] rounded-xl hover:bg-black transition-colors shadow-sm shadow-gray-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => setIsDeleteOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 size={15} />
                  Delete
                </button>
              </div>


            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal — same pattern as GoalSavingItem */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden p-6 text-center"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <FiTrash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Transaction</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-700">"{transaction.name || transaction.title}"</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}
