import { FiTarget, FiMail, FiBriefcase, FiEdit2, FiMoreVertical } from "react-icons/fi";

const getIcon = (type) => {
  switch (type) {
    case "target":
      return <FiTarget className="w-5 h-5 text-red-500" />;
    case "envelope":
      return <FiMail className="w-5 h-5 text-emerald-500" />;
    case "briefcase":
      return <FiBriefcase className="w-5 h-5 text-emerald-500" />;
    default:
      return <FiTarget className="w-5 h-5 text-gray-500" />;
  }
};

export default function TransactionItem({ transaction }) {
  const isIncome = transaction.type === "Income";

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] items-center py-4 border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center gap-4 px-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isIncome ? "bg-emerald-50" : "bg-red-50"
          }`}
        >
          {getIcon(transaction.iconType)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{transaction.title}</p>
          <p className="text-xs text-gray-400">{transaction.category}</p>
        </div>
      </div>

      <div className="px-4 text-center sm:text-left">
        <p className="text-sm text-gray-600">{transaction.date}</p>
        <p className="text-xs text-gray-400">{transaction.time}</p>
      </div>

      <div className="px-4 flex justify-start sm:justify-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isIncome
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {transaction.type}
        </span>
      </div>

      <div className="flex items-center justify-end gap-6 px-4">
        <span
          className={`text-sm font-bold ${
            isIncome ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}Rp {Math.abs(transaction.amount).toLocaleString("id-ID")}
        </span>
        <div className="flex items-center gap-3 text-gray-400">
          <button className="hover:text-gray-600 transition-colors">
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button className="hover:text-gray-600 transition-colors">
            <FiMoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
