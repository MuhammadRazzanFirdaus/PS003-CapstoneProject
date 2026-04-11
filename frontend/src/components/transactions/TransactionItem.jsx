import { useState } from "react";
import { FiTarget, FiMail, FiBriefcase } from "react-icons/fi";
import TransactionDetailModal from "./TransactionDetailModal";

const getIconStyles = (category, isIncome) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("sekolah") || cat.includes("book") || cat.includes("study")) {
    return {
      icon: <FiBriefcase className="w-5 h-5 text-gray-700" />,
      bg: "bg-gray-100"
    };
  } else if (cat.includes("makan") || cat.includes("food") || cat.includes("beverage")) {
    return {
      icon: <FiTarget className="w-5 h-5 text-orange-500" />,
      bg: "bg-orange-50"
    };
  } else if (cat.includes("gaji") || cat.includes("salary")) {
    return {
      icon: <FiMail className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-50"
    };
  } else if (cat.includes("goal")) {
    return {
      icon: <FiTarget className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50"
    };
  } else if (cat.includes("transport")) {
    return {
      icon: <FiBriefcase className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-50"
    };
  }
  return {
    icon: <FiTarget className={`w-5 h-5 ${isIncome ? "text-emerald-500" : "text-red-500"}`} />,
    bg: isIncome ? "bg-emerald-50" : "bg-red-50"
  };
};

export default function TransactionItem({ transaction, onDelete, onEdit }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isIncome = transaction.type === "income";

  const d = new Date(transaction.created_at || Date.now());
  const dateStr = d.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  const timeStr = d.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  const { icon, bg } = getIconStyles(transaction.category, isIncome);

  return (
    <>
      <div
        onClick={() => setIsDetailOpen(true)}
        className="grid grid-cols-[2fr_1fr_1fr_1.5fr] items-center py-4 border-b border-gray-100 last:border-none hover:bg-gray-50/70 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-4 px-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{transaction.name || transaction.title}</p>
            <p className="text-xs text-gray-400 capitalize">{transaction.category}</p>
          </div>
        </div>

        <div className="px-4 text-center sm:text-left min-w-0">
          <p className="text-sm text-gray-600 line-clamp-1">{dateStr}</p>
          <p className="text-xs text-gray-400">{timeStr}</p>
        </div>

        <div className="px-4 flex justify-start sm:justify-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isIncome
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {isIncome ? "Income" : "Expense"}
          </span>
        </div>

        <div className="flex items-center justify-end gap-6 px-4">
          <span
            className={`text-sm font-bold ${
              isIncome ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {isIncome ? "+" : "-"}Rp {Math.abs(Number(transaction.amount)).toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      <TransactionDetailModal
        isOpen={isDetailOpen}
        transaction={transaction}
        onClose={() => setIsDetailOpen(false)}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
}

