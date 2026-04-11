import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineWarningAmber } from "react-icons/md";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteGoal } from "../../api/fingo";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const getBarColor = (progress, isNotAchieved, isCompleted) => {
  if (isCompleted || progress >= 100) return "bg-green-500";
  if (isNotAchieved) return "bg-yellow-500";
  if (progress >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

export default function GoalCard({
  id,
  name,
  category,
  target_amount,
  initial_amount,
  status,
  saving_amount,
  saving_period,
  target_date,
  current_savings,
  image_url,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const collected = Number(current_savings) || 0;
  const target = Number(target_amount) || 0;
  const remaining = Math.max(0, target - collected);
  const progress =
    target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0;
  const isCompleted = status === "completed";
  const isNotAchieved = status === "not_achieved";

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/goals/${id}/edit`);
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsDeleting(true);
      await deleteGoal(id);
      setIsDeleteModalOpen(false);
      setIsDeleted(true);
      toast.success("Goal berhasil dihapus!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus goal.");
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(false);
  };

  if (isDeleted) return null;

  return (
    <>
      <Link to={`/goals/${id}`} className="block">
        <div className="group relative border border-[#E5E7EB] rounded-xl p-4 bg-white flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
          
          <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEditClick}
              className="p-1.5 text-gray-400 hover:text-blue-600 bg-white/80 hover:bg-white rounded-md shadow-sm backdrop-blur-sm transition-all border border-gray-100"
            >
              <FiEdit2 size={14} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-1.5 text-gray-400 hover:text-red-600 bg-white/80 hover:bg-white rounded-md shadow-sm backdrop-blur-sm transition-all border border-gray-100"
            >
              <FiTrash2 size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {image_url ? (
              <img
                src={image_url}
                alt={name}
                className="w-10 h-10 rounded-lg object-cover shrink-0 shadow-sm border border-gray-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold pr-16 truncate">{name}</p>
              <p className="text-sm text-gray-400 truncate">{category}</p>
            </div>
          </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">
              Rp{collected.toLocaleString("id-ID")}
            </span>
            {isCompleted ? (
              <span className="text-green-500 font-medium">Completed</span>
            ) : isNotAchieved ? (
              <span className="text-yellow-500 font-medium flex items-center gap-1">
                <MdOutlineWarningAmber size={12} />
                Left: Rp{remaining.toLocaleString("id-ID")}
              </span>
            ) : (
              <span className="text-gray-400">
                Left: Rp{remaining.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getBarColor(progress, isNotAchieved, isCompleted)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{progress}%</span>
          </div>
        </div>
      </div>
    </Link>

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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Goal</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-800">{name}</span>? This action cannot be undone.
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
