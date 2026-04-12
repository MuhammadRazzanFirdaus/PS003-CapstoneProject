import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { getCurrentUser } from "../api/fingo";
import { useTransactions } from "../hooks/useTransactions";
import ProfileBanner from "../components/profile/ProfileBanner";
import TopTransactionCard from "../components/profile/TopTransactionCard";
import CategoryBreakdownChart from "../components/profile/CategoryBreakdownChart";
import StatCard from "../components/profile/StatCard";
import CustomSelect from "../components/profile/CustomSelect";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import TransactionItem from "../components/transactions/TransactionItem";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
};

const fadeUpClean = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }, 
    transitionEnd: { transform: "none" } 
  }),
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const YEARS = [2024, 2025, 2026];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const { transactions, loading: txLoading } = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setUserLoading(true);
    getCurrentUser()
      .then((res) => setUser(res.data?.data || null))
      .catch(console.error)
      .finally(() => setUserLoading(false));
  }, []);

  const isLoading = userLoading || txLoading;

  const stats = useMemo(() => {
    const filtered = transactions.filter((tx) => {
      const date = new Date(tx.date || tx.created_at);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    });

    const incomeTxs = filtered.filter(tx => tx.type === "income");
    const expenseTxs = filtered.filter(tx => tx.type === "expense");

    const totalIncome = incomeTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);
    const totalExpense = expenseTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);
    const balance = totalIncome - totalExpense;

    const largestIncome = incomeTxs.length ? incomeTxs.reduce((prev, curr) => Number(curr.amount) > Number(prev.amount) ? curr : prev) : null;
    const largestExpense = expenseTxs.length ? expenseTxs.reduce((prev, curr) => Number(curr.amount) > Number(prev.amount) ? curr : prev) : null;

    const categoryMap = expenseTxs.reduce((acc, curr) => {
      const cat = curr.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + Number(curr.amount);
      return acc;
    }, {});

    const categoryData = Object.keys(categoryMap)
      .map(key => ({ name: key, value: categoryMap[key] }))
      .sort((a, b) => b.value - a.value);

    return { 
      totalIncome, 
      totalExpense, 
      balance,
      largestIncome, 
      largestExpense, 
      count: filtered.length, 
      categoryData, 
      totalExpenseCategory: totalExpense
    };
  }, [transactions, selectedMonth, selectedYear]);

  const recentTransactions = useMemo(() => {
     return [...transactions]
       .sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at))
       .slice(0, 4);
  }, [transactions]);

  if (isLoading) return <ProfileSkeleton />;

  const monthOptions = MONTHS.map((m, i) => ({ label: m, value: i }));
  const yearOptions = YEARS.map(y => ({ label: `${y}`, value: y }));

  return (
    <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 mx-auto min-h-screen items-start">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="w-full lg:w-[320px] xl:w-[340px] shrink-0 sticky top-8">
         <ProfileBanner user={user} stats={stats} />
      </motion.div>

      <div className="flex-1 w-full flex flex-col gap-6">
         
         <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-[20px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h2 className="text-lg font-bold text-gray-900 px-2 lg:px-4 hidden md:block">Financial Insights</h2>
            <div className="flex items-center gap-3">
              <CustomSelect 
                 value={selectedMonth} 
                 onChange={setSelectedMonth} 
                 options={monthOptions} 
              />
              <CustomSelect 
                 value={selectedYear} 
                 onChange={setSelectedYear} 
                 options={yearOptions} 
              />
            </div>
         </motion.div>

         <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Earned" value={stats.totalIncome} />
            <StatCard title="Total Spent" value={stats.totalExpense} />
            <StatCard title="Net Balance" value={stats.balance} />
            <StatCard title="Transactions" value={stats.count} isCurrency={false} />
         </motion.div>

         <motion.div custom={3} variants={fadeUpClean} initial="hidden" animate="show" className="flex flex-col gap-4">
            <CategoryBreakdownChart categoryData={stats.categoryData} totalExpense={stats.totalExpense} count={stats.count} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <TopTransactionCard type="income" transaction={stats.largestIncome} />
               <TopTransactionCard type="expense" transaction={stats.largestExpense} />
            </div>
         </motion.div>
         
         <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mt-2 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-gray-800">Latest History</h3>
               <Link to="/transactions" className="text-xs text-indigo-600 font-bold hover:underline">View All</Link>
            </div>
            {recentTransactions.length > 0 ? (
               <div className="flex flex-col -mx-4">
                 {recentTransactions.map(tx => (
                   <TransactionItem key={tx._id || tx.id} transaction={tx} />
                 ))}
               </div>
            ) : (
               <p className="text-sm text-gray-400 italic mt-2">No transactions recorded yet. Data will appear here once you make an entry.</p>
            )}
         </motion.div>

      </div>
    </div>
  );
}
