import { FiTarget, FiMail, FiBriefcase } from "react-icons/fi";

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

export default function TransactionItem({ transaction }) {
  if (!transaction) return null;
  const isIncome = transaction.type === "income";

  const d = new Date(transaction.created_at || Date.now());
  const dateStr = d.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  const timeStr = d.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  const { icon, bg } = getIconStyles(transaction.category, isIncome);

  return (
    <div className="flex items-center justify-between p-3 border-[#E5E7EB] border rounded-xl bg-white hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 line-clamp-1">{transaction.name || transaction.title}</p>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-medium capitalize">{transaction.category}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">{dateStr} {timeStr}</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className={`text-sm font-bold ${isIncome ? "text-emerald-500" : "text-red-500"}`}>
          {isIncome ? "+" : "-"}Rp {Math.abs(Number(transaction.amount)).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}