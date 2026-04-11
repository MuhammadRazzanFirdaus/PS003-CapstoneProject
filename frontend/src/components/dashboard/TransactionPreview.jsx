import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import { LuHistory } from "react-icons/lu";
import { useTransactions } from "../../hooks/useTransactions";

function TransactionItemSkeleton({ index }) {
  return (
    <div className="flex items-center justify-between p-3 border-[#E5E7EB] border rounded-xl bg-white animate-pulse">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-3/4 bg-gray-100 rounded" />
          <div className="h-3 w-1/2 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="w-20 h-4 bg-gray-100 rounded" />
    </div>
  );
}

export default function TransactionPreview() {
  const { transactions, loading } = useTransactions();
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

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
        {loading ? (
          <div className="flex flex-col gap-3">
             <TransactionItemSkeleton index={0} />
             <TransactionItemSkeleton index={1} />
             <TransactionItemSkeleton index={2} />
          </div>
        ) : recentTransactions.length > 0 ? (
          recentTransactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center py-8">Belum ada riwayat transaksi.</p>
        )}
      </div>
    </div>
  );
}
