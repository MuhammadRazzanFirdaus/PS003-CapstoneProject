import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import { LuHistory } from "react-icons/lu";
import { MOCK_TRANSACTIONS } from "../../utils/mockData";

export default function TransactionPreview() {
  const recentTransactions = [...MOCK_TRANSACTIONS]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3); // Get latest 3 transactions

  return (
    <div className="p-4 pt-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <LuHistory className="text-gray-700" /> Recent History
        </h2>
        <Link
          to="/transactions"
          className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          View All →
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {recentTransactions.map((tx) => (
          <TransactionItem key={tx.id} {...tx} />
        ))}
      </div>
    </div>
  );
}
