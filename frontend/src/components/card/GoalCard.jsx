const colorMap = {
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
};

export default function GoalCard({ name, amount, progress, color }) {
  return (
    <div className="border-[#E5E7EB] rounded-xl p-4 bg-white flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
        <div>
          <p className="text-[16px] font-bold">{name}</p>
          <p className="text-sm text-gray-400">{amount}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${colorMap[color] ?? "bg-blue-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">{progress}%</span>
      </div>
    </div>
  );
}