import { FiTarget, FiMail, FiBriefcase } from "react-icons/fi";

const getIcon = (type, isIncome) => {
  switch (type) {
    case "target":
      return <FiTarget className="w-5 h-5 text-red-500" />;
    case "envelope":
      return <FiMail className="w-5 h-5 text-emerald-500" />;
    case "briefcase":
      return <FiBriefcase className="w-5 h-5 text-emerald-500" />;
    default:
      return <FiTarget className={`w-5 h-5 ${isIncome ? "text-emerald-500" : "text-red-500"}`} />;
  }
};

export default function TransactionItem({ title, category, date, time, amount, type, iconType }) {
  const isIncome = type === "Income";

  return (
    <div className="flex items-center justify-between p-3 border-[#E5E7EB] border rounded-xl bg-white hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isIncome ? "bg-emerald-50" : "bg-red-50"
          }`}
        >
          {getIcon(iconType, isIncome)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-medium">{category}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">{date} {time}</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className={`text-sm font-bold ${isIncome ? "text-emerald-500" : "text-red-500"}`}>
          {isIncome ? "+" : "-"}Rp {Math.abs(amount).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}