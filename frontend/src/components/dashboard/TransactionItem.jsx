export default function TransactionItem({ icon, name, date, amount }) {
  const isIncome = amount > 0;

  return (
    <div className="flex items-center justify-between p-3 border-[#E5E7EB] rounded-xl bg-white">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <p className={`text-sm font-semibold ${isIncome ? "text-green-500" : "text-gray-800"}`}>
        {isIncome ? "+" : "-"}Rp{Math.abs(amount).toLocaleString("id-ID")}
      </p>
    </div>
  );
}