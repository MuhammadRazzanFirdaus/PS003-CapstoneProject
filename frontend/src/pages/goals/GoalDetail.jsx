import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGoalDetail } from "../../hooks/useGoalDetail";
import GoalDetailHeader from "../../components/goal-detail/GoalDetailHeader";
import GoalDetailInfo from "../../components/goal-detail/GoalDetailInfo";
import GoalDetailStats from "../../components/goal-detail/GoalDetailStats";
import GoalSavingItem from "../../components/goal-detail/GoalSavingItem";
import GoalSavingModal from "../../components/goal-detail/GoalSavingModal";
import SavingSkeleton from "../../components/goal-detail/SavingSkeleton";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { deleteSaving } from "../../api/fingo";
import { useTransactions } from "../../hooks/useTransactions";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function GoalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goal, savings, loading, savingsLoading, error, refetch } =
    useGoalDetail(id);
  const { transactions } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveFunds = async (data) => {
    try {
      setIsSubmitting(true);
      await axiosInstance.post(`/goals/${id}/savings`, data);
      await refetch();
      setIsModalOpen(false);
      toast.success("Catatan dana berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan dana tabungan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSaving = async (savingId) => {
    try {
      await deleteSaving(savingId);
      await refetch();
      toast.success("List dihapus!");
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
        <div className="flex gap-4">
          <div className="w-60 h-56 bg-gray-200 animate-pulse rounded-xl" />
          <div className="flex flex-col gap-3 flex-1">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
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

  const totalSavings =
    savings?.reduce((acc, s) => {
      const amount = Number(s.amount) || 0;
      return s.type === "expense" ? acc - amount : acc + amount;
    }, 0) || 0;
  const collected = (Number(goal?.initial_amount) || 0) + totalSavings;

  const userBalance =
    transactions?.reduce((acc, tx) => {
      const amount = Number(tx.amount) || 0;
      return tx.type === "income" ? acc + amount : acc - amount;
    }, 0) || 0;

  const remainingGoalTarget = Math.max(0, (Number(goal?.target_amount) || 0) - collected);
  const limit = Math.min(userBalance, remainingGoalTarget);

  return (
    <div className="py-10 px-30 flex flex-col gap-6">
      <GoalSavingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFunds}
        limit={limit}
        collected={collected}
      />

      <GoalDetailHeader
        onBack={() => navigate("/goals")}
        onAddFunds={() => setIsModalOpen(true)}
        fadeUp={fadeUp}
      />

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-2xl font-bold"
      >
        {goal.name}
      </motion.h1>

      <GoalDetailInfo goal={goal} fadeUp={fadeUp} />
      <GoalDetailStats goal={goal} savings={savings} fadeUp={fadeUp} />

      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Goal Savings</h2>
          <button
            onClick={() => navigate(`/goals/${id}/savings`)}
            className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {savingsLoading && (
            <>
              {[0, 1, 2].map((i) => (
                <SavingSkeleton key={i} index={i} />
              ))}
            </>
          )}

          <AnimatePresence>
            {!savingsLoading && savings.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-400"
              >
                Belum ada tabungan.
              </motion.p>
            )}
            {!savingsLoading &&
              savings
                .slice(0, 3)
                .map((saving, i) => (
                  <GoalSavingItem
                    key={saving.id}
                    saving={saving}
                    index={i}
                    onDelete={handleDeleteSaving}
                  />
                ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
