export default function SummaryCard({ label, value, badge, badgeColor, highlight }) {
  const badgeColorMap = {
    green: "text-[#10B981] bg-[#D1FAE5] rounded-full w-5 h-5 flex items-center justify-center",
    red: "text-[#EF4444] bg-[#FEE2E2] rounded-full w-5 h-5 flex items-center justify-center",
  };

  return (
    <div className="flex-1 p-4">
      <p className="text-xs text-gray-400 flex items-center gap-1">
        {label}
        {badge && (
          <span className={badgeColorMap[badgeColor] ?? "text-gray-400"}>
            {badge}
          </span>
        )}
      </p>
      <p className={`text-[28px] font-bold mt-1 ${highlight ?? "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
}