import { useState } from "react";
import { FiZap, FiWifi, FiHome } from "react-icons/fi";
import BillDetailModal from "./BillDetailModal";

const getIconStyles = (category) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("utilities") || cat.includes("listrik")) {
    return { icon: <FiZap className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50" };
  } else if (cat.includes("subscription") || cat.includes("internet")) {
    return { icon: <FiWifi className="w-5 h-5 text-purple-500" />, bg: "bg-purple-50" };
  } else if (cat.includes("housing") || cat.includes("rent") || cat.includes("sewa")) {
    return { icon: <FiHome className="w-5 h-5 text-rose-500" />, bg: "bg-rose-50" };
  }
  return { icon: <FiZap className="w-5 h-5 text-gray-500" />, bg: "bg-gray-50" };
};

const getStatusBadge = (status) => {
  const s = status?.toLowerCase() || "";
  if (s === "unpaid") return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-500 uppercase tracking-wider">Unpaid</span>;
  if (s === "upcoming") return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-500 uppercase tracking-wider">Upcoming</span>;
  if (s === "paid") return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-500 uppercase tracking-wider">Paid</span>;
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500 uppercase tracking-wider">{status}</span>;
};

const formatDueDate = (dateStr) => {
  if (!dateStr) return "-";
  const due = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  if (due.getTime() === today.getTime()) return "Today";
  return due.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
};

export default function BillItem({ bill, onDelete, onPay, onEdit }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { icon, bg } = getIconStyles(bill.category);
  const isPaid = bill.status?.toLowerCase() === "paid" || Number(bill.is_paid) === 1;
  const dueDateLabel = formatDueDate(bill.due_date);
  const isToday = dueDateLabel === "Today";

  return (
    <>
      <div
        onClick={() => setIsDetailOpen(true)}
        className="grid grid-cols-[3fr_2fr_2fr_2fr_1.5fr] items-center py-4 border-b border-gray-100 last:border-none hover:bg-gray-50/70 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-4 px-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
            {icon}
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 leading-none mb-1">{bill.name}</p>
            <p className="text-[11px] font-medium text-gray-400 capitalize">{bill.category}</p>
          </div>
        </div>

        <div className="px-6 text-left">
          <p className={`text-xs font-semibold ${isToday ? "text-rose-500" : "text-gray-900"}`}>
            {dueDateLabel}
          </p>
        </div>

        <div className="px-6 text-left">
          {getStatusBadge(bill.status)}
        </div>

        <div className="px-6 text-left">
          <p className="text-[13px] font-bold text-gray-900">
            Rp {Number(bill.amount).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex items-center justify-start gap-4 px-6" onClick={(e) => e.stopPropagation()}>
          <button
            disabled={isPaid}
            onClick={() => onPay && onPay(bill)}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              isPaid
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#1A2035] text-white hover:bg-[#111524] shadow-sm"
            }`}
          >
            Pay
          </button>
        </div>
      </div>

      <BillDetailModal
        bill={bill}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onDelete={onDelete}
        onPay={onPay}
        onEdit={onEdit}
      />
    </>
  );
}
