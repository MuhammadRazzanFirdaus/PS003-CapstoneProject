import { 
  FiTarget, FiBriefcase, FiCoffee, FiShoppingBag, FiBook,
  FiHome, FiHeart, FiFilm, FiTruck, FiFileText, FiDollarSign, 
  FiActivity 
} from "react-icons/fi";

const getIconStyles = (category, isIncome) => {
  const cat = category?.toLowerCase() || "";
  
  if (cat.includes("sekolah") || cat.includes("book") || cat.includes("study") || cat.includes("education")) {
    return {
      icon: <FiBook className="w-5 h-5 text-indigo-500" />,
      bg: "bg-indigo-50"
    };
  } else if (cat.includes("makan") || cat.includes("food") || cat.includes("beverage") || cat.includes("drink")) {
    return {
      icon: <FiCoffee className="w-5 h-5 text-orange-500" />,
      bg: "bg-orange-50"
    };
  } else if (cat.includes("gaji") || cat.includes("salary") || cat.includes("income")) {
    return {
      icon: <FiBriefcase className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-50"
    };
  } else if (cat.includes("belanja") || cat.includes("shopping") || cat.includes("grocery")) {
    return {
      icon: <FiShoppingBag className="w-5 h-5 text-pink-500" />,
      bg: "bg-pink-50"
    };
  } else if (cat.includes("goal") || cat.includes("target") || cat.includes("tabungan")) {
    return {
      icon: <FiTarget className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50"
    };
  } else if (cat.includes("transport") || cat.includes("travel") || cat.includes("tiket")) {
    return {
      icon: <FiTruck className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-50"
    };
  } else if (cat.includes("kesehatan") || cat.includes("health") || cat.includes("medical") || cat.includes("obat")) {
    return {
      icon: <FiHeart className="w-5 h-5 text-rose-500" />,
      bg: "bg-rose-50"
    };
  } else if (cat.includes("rumah") || cat.includes("home") || cat.includes("kost") || cat.includes("sewa")) {
    return {
      icon: <FiHome className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50"
    };
  } else if (cat.includes("hiburan") || cat.includes("entertainment") || cat.includes("movie") || cat.includes("game")) {
    return {
      icon: <FiFilm className="w-5 h-5 text-cyan-500" />,
      bg: "bg-cyan-50"
    };
  } else if (cat.includes("tagihan") || cat.includes("bill") || cat.includes("listrik") || cat.includes("air")) {
    return {
      icon: <FiFileText className="w-5 h-5 text-slate-600" />,
      bg: "bg-slate-100"
    };
  }
  
  // Default fallback
  const DefaultIcon = isIncome ? FiDollarSign : FiActivity;
  return {
    icon: <DefaultIcon className={`w-5 h-5 ${isIncome ? "text-emerald-500" : "text-red-500"}`} />,
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