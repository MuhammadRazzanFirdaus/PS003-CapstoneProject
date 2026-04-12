const formatIDR = (num) => `Rp ${Number(num).toLocaleString("id-ID")}`;

export default function TopTransactionCard({ type, transaction }) {
  const isIncome = type === "income";
  const title = isIncome ? "Top Income" : "Top Expense";
  const badgeColor = isIncome ? "bg-indigo-50 text-indigo-600" : "bg-purple-50 text-purple-600";

  return (
    <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800">{title}</span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor}`}>Highest</span>
      </div>
      
      {transaction ? (
        <div className="flex flex-col gap-1 mt-2">
          <p className="text-xs text-gray-500 font-medium tracking-wide">Recorded transaction</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatIDR(transaction.amount)}</h3>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-4 border-t border-gray-50">
            <span className="font-semibold">{transaction.name}</span>
            <span>{transaction.category}</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center gap-1 mt-2">
          <p className="text-xs text-gray-500 font-medium">No recorded transactions for this period.</p>
        </div>
      )}
    </div>
  );
}
