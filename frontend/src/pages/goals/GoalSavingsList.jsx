import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { useGoalDetail } from "../../hooks/useGoalDetail";
import GoalSavingItem from "../../components/goal-detail/GoalSavingItem";
import SavingSkeleton from "../../components/goal-detail/SavingSkeleton";
import { deleteSaving } from "../../api/fingo";
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function GoalSavingsList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goal, savings, loading, savingsLoading, error, refetch } = useGoalDetail(id);

  const handleDeleteSaving = async (savingId) => {
    try {
      await deleteSaving(savingId);
      await refetch();
      toast.success("Catatan dana berhasil dihapus!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus tabungan.");
    }
  };

  if (loading) {
    return (
      <div className="py-10 px-30 flex flex-col gap-4">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
        <div className="h-40 w-full bg-gray-200 animate-pulse rounded-xl mt-4" />
      </div>
    );
  }

  if (error || !goal) {
    return (
      <div className="p-6">
        <p className="text-red-400 text-sm">Gagal memuat data goal.</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-30 flex flex-col gap-6">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <button
          onClick={() => navigate(`/goals/${id}`)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <MdArrowBackIos size={14} /> Back to Goal
        </button>
      </motion.div>

      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-2xl font-bold text-gray-900">{goal.name}</h1>
        <p className="text-gray-500 text-sm mt-1">All history of your goal savings</p>
      </motion.div>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="flex flex-col gap-2 mt-4">
        {savingsLoading && (
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <SavingSkeleton key={i} index={i} />
            ))}
          </div>
        )}

        <AnimatePresence>
          {!savingsLoading && savings.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400 py-4 text-center bg-white rounded-xl"
            >
              Belum ada riwayat tabungan.
            </motion.p>
          )}
          {!savingsLoading &&
            savings.map((saving, i) => (
              <GoalSavingItem 
                key={saving.id} 
                saving={saving} 
                index={i} 
                onDelete={handleDeleteSaving} 
              />
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
