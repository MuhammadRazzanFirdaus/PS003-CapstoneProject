import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

export default function GoalSavingItem({ saving, index, onDelete }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      setIsDeleting(true);
      await onDelete(saving.id);
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(false);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="bg-white rounded-xl px-4 py-3 flex items-center justify-between group relative"
    >
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium truncate">{saving.note ?? "Saving"}</p>
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
      <div className="relative flex items-center justify-end h-8">
        <p 
          className={`text-sm font-semibold transition-transform duration-300 ease-out transform group-hover:-translate-x-8 ${saving.type === "expense" ? "text-red-500" : "text-teal-600"}`}
        >
          {saving.type === "expense" ? "-" : "+"}Rp{Math.abs(Number(saving.amount)).toLocaleString("id-ID")}
        </p>
        
        {onDelete && (
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="absolute right-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        )}
      </div>
    </motion.div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Saving Record</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this {saving.type === "expense" ? "expense" : "income"} record? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
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
