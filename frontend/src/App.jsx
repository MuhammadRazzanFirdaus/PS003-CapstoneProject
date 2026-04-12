import { useMemo } from "react";
import { motion } from "framer-motion";
import StreakCard from "./components/dashboard/StreakCard";
import SummaryCard from "./components/dashboard/SummaryCard";
import GoalPreview from "./components/dashboard/GoalPreview";
import TransactionPreview from "./components/dashboard/TransactionPreview";
import WelcomeBanner from "./components/dashboard/WelcomeBanner";
import { useTransactions } from "./hooks/useTransactions";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function App() {
  const { transactions } = useTransactions();

  const { totalSaved, incomeThisMonth, expenseThisMonth } = useMemo(() => {
    const now = new Date();
    let total = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      const amount = Number(tx.amount) || 0;
      const isIncome = tx.type === "income";
      
      if (isIncome) {
        total += amount;
      } else {
        total -= amount;
      }

      const txDate = new Date(tx.date || tx.created_at);
      const isThisMonth =
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear();

      if (isThisMonth) {
        if (isIncome) income += amount;
        else expense += amount;
      }
    });

    return { totalSaved: total, incomeThisMonth: income, expenseThisMonth: expense };
  }, [transactions]);

  const formatIDR = (num) => `Rp${num.toLocaleString("id-ID")}`;

  return (
    <div className="flex flex-col gap-4 p-6">
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-4"
      >
        <WelcomeBanner name="Zanny"/>
      </motion.div>

      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-4 flex justify-between gap-4"
      >
        <div className="flex max-w-408 w-full gap-4 border-[#E5E7EB] rounded-xl px-2 py-5 bg-white shadow-sm hover:shadow transition-shadow">
          <SummaryCard label="Total Saved" value={formatIDR(totalSaved)} />
          <SummaryCard label="Income" value={formatIDR(incomeThisMonth)} badge="↑" badgeColor="green" />
          <SummaryCard label="Expense" value={formatIDR(expenseThisMonth)} badge="↓" badgeColor="red" />
        </div>

        <div className="px-2 border-[#E5E7EB] rounded-xl flex items-center justify-center w-full max-w-35 bg-white shadow-sm hover:shadow transition-shadow">
          <StreakCard streak={12} />
        </div>
      </motion.div>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
        <GoalPreview />
      </motion.div>

      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
        <TransactionPreview />
      </motion.div>
    </div>
  );
}