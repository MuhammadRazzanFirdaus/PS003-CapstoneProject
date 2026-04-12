import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BillItem from "./BillItem";

export default function BillsList({ bills, loading, activeTab, search, sortOrder, onDelete, onPay, onEdit }) {
  const filteredBills = useMemo(() => {
    const filtered = bills.filter((bill) => {
      const matchesSearch = bill.name.toLowerCase().includes((search || "").toLowerCase());
      const statusLower = bill.status?.toLowerCase();
      const matchesTab =
        activeTab === "All Bills"
          ? true
          : activeTab === "Unpaid"
          ? statusLower === "unpaid" || statusLower === "upcoming"
          : statusLower === "paid";
      return matchesSearch && matchesTab;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "Amount: Low to High") return Number(a.amount) - Number(b.amount);
      if (sortOrder === "Amount: High to Low") return Number(b.amount) - Number(a.amount);
      if (sortOrder === "Name A-Z") return a.name.localeCompare(b.name);
      return new Date(a.due_date) - new Date(b.due_date);
    });
  }, [bills, activeTab, search, sortOrder]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[3fr_2fr_2fr_2fr_1.5fr] items-center py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="px-6 text-left">
          <p className="text-xs font-semibold text-gray-400">Bill Name</p>
        </div>
        <div className="px-6 text-left">
          <p className="text-xs font-semibold text-gray-400">Due Date</p>
        </div>
        <div className="px-6 text-left">
          <p className="text-xs font-semibold text-gray-400">Status</p>
        </div>
        <div className="px-6 text-left">
          <p className="text-xs font-semibold text-gray-400">Amount</p>
        </div>
        <div className="px-6 text-left">
          <p className="text-xs font-semibold text-gray-400">Actions</p>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col min-h-[200px] relative">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-0"
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="grid grid-cols-[3fr_2fr_2fr_2fr_1.5fr] items-center py-4 border-b border-gray-100 animate-pulse">
                  <div className="flex items-center gap-4 px-6">
                    <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex flex-col gap-2">
                      <div className="h-3.5 w-28 bg-gray-200 rounded" />
                      <div className="h-2.5 w-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="px-6"><div className="h-3 w-16 bg-gray-200 rounded" /></div>
                  <div className="px-6"><div className="h-5 w-16 bg-gray-200 rounded-full" /></div>
                  <div className="px-6"><div className="h-3 w-20 bg-gray-200 rounded" /></div>
                  <div className="px-6"><div className="h-7 w-12 bg-gray-200 rounded-md" /></div>
                </div>
              ))}
            </motion.div>
          ) : filteredBills.length > 0 ? (
            filteredBills.map((bill) => (
              <motion.div
                key={bill.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <BillItem bill={bill} onDelete={onDelete} onPay={onPay} onEdit={onEdit} />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full pt-16 pb-10 text-gray-400 text-sm"
            >
              Tidak ada tagihan ditemukan.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 text-sm text-gray-500">
        <p>Showing {filteredBills.length > 0 ? 1 : 0} to {Math.min(5, filteredBills.length)} of {filteredBills.length} bills</p>
        <div className="flex items-center gap-1 mt-4 sm:mt-0">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1A1C29] text-white">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400" disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
}
