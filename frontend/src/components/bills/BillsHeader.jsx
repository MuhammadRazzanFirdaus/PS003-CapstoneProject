import { FiPlus } from "react-icons/fi";

export default function BillsHeader({ onAdd }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-0">
      <div>
        <h1 className="text-2xl font-bold text-[#1B1D21]">Bills & Subscriptions</h1>
      </div>
      <div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#1A2035] text-white rounded-lg hover:bg-[#111524] transition-colors shadow-sm text-sm font-medium"
        >
          <FiPlus className="w-4 h-4" />
          Add Bill
        </button>
      </div>
    </div>
  );
}
