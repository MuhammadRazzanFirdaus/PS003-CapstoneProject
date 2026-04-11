import { motion, AnimatePresence } from "framer-motion";
import TransactionItem from "./TransactionItem";

const TransactionSkeleton = () => (
  <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] items-center py-4 border-b border-gray-100 last:border-none animate-pulse">
    <div className="flex items-center gap-4 px-4">
      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
      <div className="flex flex-col gap-2 w-full">
        <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
      </div>
    </div>
    <div className="px-4 text-center sm:text-left flex flex-col gap-2">
      <div className="h-4 bg-gray-200 rounded-md w-full"></div>
      <div className="h-3 bg-gray-200 rounded-md w-2/3"></div>
    </div>
    <div className="px-4 flex justify-start sm:justify-center">
      <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
    </div>
    <div className="px-4 flex items-center justify-end gap-3 text-right">
      <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
    </div>
  </div>
);

export default function TransactionList({ fadeUp, transactions, loading, onDelete, onEdit }) {
  return (
    <motion.div
      custom={2}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6"
    >
      <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] items-center py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="text-xs font-semibold text-gray-400 text-center sm:text-left px-8">Transaction</div>
        <div className="text-xs font-semibold text-gray-400 text-center sm:text-left px-4">Date</div>
        <div className="text-xs font-semibold text-gray-400 text-center px-4">Type</div>
        <div className="text-xs font-semibold text-gray-400 text-right sm:text-center px-12">Amount</div>
      </div>

      <div className="flex flex-col min-h-[200px] relative">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loading-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TransactionSkeleton />
              <TransactionSkeleton />
              <TransactionSkeleton />
              <TransactionSkeleton />
            </motion.div>
          ) : transactions.length > 0 ? (
            transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <TransactionItem transaction={transaction} onDelete={onDelete} onEdit={onEdit} />
              </motion.div>
            ))
          ) : (

            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center p-8 text-gray-400 text-sm"
            >
              No transactions found.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 text-sm text-gray-500">
        <p>Showing {transactions.length > 0 ? 1 : 0} to {Math.min(5, transactions.length)} of {transactions.length} transactions</p>
        <div className="flex items-center gap-1 mt-4 sm:mt-0">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1A1C29] text-white">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400" disabled>&gt;</button>
        </div>
      </div>
    </motion.div>
  );
}
