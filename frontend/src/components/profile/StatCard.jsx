const formatIDR = (num) => `Rp ${Number(num).toLocaleString("id-ID")}`;

export default function StatCard({ title, value, subtitle, isCurrency = true }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-1">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-[17px] font-bold text-gray-900">{isCurrency ? formatIDR(value) : value}</h3>
      </div>
      <p className="text-xs text-gray-500 font-medium">{title}</p>
      {subtitle && <p className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-50">{subtitle}</p>}
    </div>
  );
}
