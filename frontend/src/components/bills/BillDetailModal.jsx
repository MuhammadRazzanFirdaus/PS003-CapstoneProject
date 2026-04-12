import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiX, FiEdit2, FiCalendar, FiTag, FiAlertCircle, FiZap, FiWifi, FiHome, FiCheckCircle } from "react-icons/fi";

const getHeaderStyle = (status) => {
  const s = status?.toLowerCase();
  if (s === "unpaid") return { bg: "bg-rose-50", iconBg: "bg-rose-100", iconColor: "text-rose-500", amountColor: "text-rose-500" };
  if (s === "upcoming") return { bg: "bg-amber-50", iconBg: "bg-amber-100", iconColor: "text-amber-500", amountColor: "text-amber-600" };
  return { bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-500", amountColor: "text-emerald-600" };
};

const getCategoryIcon = (category) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("utilities") || cat.includes("listrik")) return <FiZap size={22} />;
  if (cat.includes("subscription") || cat.includes("internet")) return <FiWifi size={22} />;
  if (cat.includes("housing") || cat.includes("rent") || cat.includes("sewa")) return <FiHome size={22} />;
  return <FiAlertCircle size={22} />;
};

const formatDueDate = (dateStr) => {
  if (!dateStr) return "-";
  const due = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  if (due.getTime() === today.getTime()) return "Today";
  return due.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
};

export default function BillDetailModal({ bill, isOpen, onClose, onDelete, onPay, onEdit }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  if (!bill) return null;

  const style = getHeaderStyle(bill.status);
  const isPaid = bill.status?.toLowerCase() === "paid" || Number(bill.is_paid) === 1;
  const dueDateLabel = formatDueDate(bill.due_date);

  const handlePay = async () => {
    setIsPaying(true);
    await onPay?.(bill);
    setIsPaying(false);
    onClose();
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await onDelete?.(bill.id);
    setIsDeleting(false);
    setIsDeleteOpen(false);
    onClose();
  };

  return (
    <>
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

              <div className={`px-6 pt-6 pb-5 ${style.bg}`}>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white/60 transition-colors"
                >
                  <FiX size={18} />
                </button>

                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${style.iconBg} ${style.iconColor}`}>
                  {getCategoryIcon(bill.category)}
                </div>

                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 capitalize">{bill.category}</p>
                <p className={`text-2xl font-bold ${style.amountColor}`}>
                  Rp {Number(bill.amount).toLocaleString("id-ID")}
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{bill.name}</p>
              </div>


              <div className="px-6 py-5 flex flex-col gap-4">
                <DetailRow
                  icon={<FiCalendar size={15} className="text-gray-400" />}
                  label="Due Date"
                  value={
                    <span className={dueDateLabel === "Today" ? "text-rose-500 font-semibold" : ""}>
                      {dueDateLabel}
                    </span>
                  }
                />
                <DetailRow
                  icon={<FiTag size={15} className="text-gray-400" />}
                  label="Status"
                  value={
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      bill.status?.toLowerCase() === "unpaid" ? "bg-rose-100 text-rose-500" :
                      bill.status?.toLowerCase() === "upcoming" ? "bg-amber-100 text-amber-500" :
                      "bg-emerald-100 text-emerald-500"
                    }`}>
                      {bill.status}
                    </span>
                  }
                />
              </div>


              <div className="px-6 pb-6 flex flex-col gap-2">
                {!isPaid && (
                  <button
                    onClick={handlePay}
                    disabled={isPaying}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#1A1C29] rounded-xl hover:bg-black transition-colors shadow-sm disabled:opacity-60"
                  >
                    <FiCheckCircle size={15} />
                    {isPaying ? "Processing..." : "Mark as Paid"}
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => { onEdit?.(bill); onClose(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <FiEdit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => setIsDeleteOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Tagihan</h3>
              <p className="text-sm text-gray-500 mb-6">
                Yakin ingin menghapus <span className="font-semibold text-gray-700">"{bill.name}"</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Menghapus..." : "Hapus"}
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
