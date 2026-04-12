import { useState } from "react";
import {
  FiZap, FiWifi, FiHome, FiDroplet, FiPhone,
  FiMonitor, FiShield, FiTruck, FiHeart, FiBook,
  FiCreditCard, FiShoppingBag, FiTv, FiFileText
} from "react-icons/fi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import BillDetailModal from "./BillDetailModal";

const getIconStyles = (category) => {
  const cat = category?.toLowerCase() || "";

  if (cat.includes("listrik") || cat.includes("electric") || cat.includes("utilities") || cat.includes("pln")) {
    return { icon: <FiZap className="w-5 h-5 text-yellow-500" />, bg: "bg-yellow-50" };
  }
  if (cat.includes("air") || cat.includes("water") || cat.includes("pdam")) {
    return { icon: <FiDroplet className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50" };
  }
  if (cat.includes("internet") || cat.includes("wifi") || cat.includes("broadband")) {
    return { icon: <FiWifi className="w-5 h-5 text-indigo-500" />, bg: "bg-indigo-50" };
  }
  if (cat.includes("telepon") || cat.includes("phone") || cat.includes("pulsa") || cat.includes("mobile")) {
    return { icon: <FiPhone className="w-5 h-5 text-green-500" />, bg: "bg-green-50" };
  }
  if (cat.includes("sewa") || cat.includes("rent") || cat.includes("housing") || cat.includes("kost") || cat.includes("kontrakan")) {
    return { icon: <FiHome className="w-5 h-5 text-rose-500" />, bg: "bg-rose-50" };
  }
  if (cat.includes("subscription") || cat.includes("langganan") || cat.includes("netflix") || cat.includes("spotify") || cat.includes("streaming")) {
    return { icon: <FiTv className="w-5 h-5 text-purple-500" />, bg: "bg-purple-50" };
  }
  if (cat.includes("asuransi") || cat.includes("insurance") || cat.includes("bpjs")) {
    return { icon: <FiShield className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50" };
  }
  if (cat.includes("transport") || cat.includes("kendaraan") || cat.includes("mobil") || cat.includes("motor") || cat.includes("cicilan")) {
    return { icon: <FiTruck className="w-5 h-5 text-orange-500" />, bg: "bg-orange-50" };
  }
  if (cat.includes("kesehatan") || cat.includes("health") || cat.includes("medical") || cat.includes("dokter") || cat.includes("obat")) {
    return { icon: <FiHeart className="w-5 h-5 text-pink-500" />, bg: "bg-pink-50" };
  }
  if (cat.includes("pendidikan") || cat.includes("education") || cat.includes("sekolah") || cat.includes("kuliah") || cat.includes("kursus")) {
    return { icon: <FiBook className="w-5 h-5 text-cyan-500" />, bg: "bg-cyan-50" };
  }
  if (cat.includes("software") || cat.includes("apps") || cat.includes("digital") || cat.includes("cloud") || cat.includes("hosting")) {
    return { icon: <FiMonitor className="w-5 h-5 text-violet-500" />, bg: "bg-violet-50" };
  }
  if (cat.includes("kartu kredit") || cat.includes("credit card") || cat.includes("pinjaman") || cat.includes("loan")) {
    return { icon: <FiCreditCard className="w-5 h-5 text-red-500" />, bg: "bg-red-50" };
  }
  if (cat.includes("belanja") || cat.includes("groceries") || cat.includes("shopping")) {
    return { icon: <MdOutlineLocalGroceryStore className="w-5 h-5 text-amber-600" />, bg: "bg-amber-50" };
  }

  return { icon: <FiFileText className="w-5 h-5 text-gray-500" />, bg: "bg-gray-100" };
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
