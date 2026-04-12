import { useState, useRef, useEffect } from "react";
import { FiSearch, FiTrendingUp } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function BillsFilters({ activeTab, setActiveTab, search, setSearch, sortOrder, setSortOrder }) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);
  const sortOptions = ["Due Date", "Amount: Low to High", "Amount: High to Low", "Name A-Z"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const tabs = ["All Bills", "Unpaid", "Paid"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-0">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>


        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search bills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:border-gray-400 outline-none hover:border-gray-300 transition-colors shadow-sm"
          />
        </div>
      </div>

      <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0 flex justify-end relative" ref={sortRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="bg-white border border-gray-200 rounded-xl pl-3 pr-4 py-2 text-sm outline-none cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between select-none shadow-sm gap-2"
        >
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-gray-400 w-4 h-4 shrink-0" />
            <span className="text-gray-600 whitespace-nowrap">Sort by: {sortOrder}</span>
          </div>
          <MdKeyboardArrowDown
            size={18}
            className={`text-gray-400 ml-1 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isSortOpen && (
          <div className="absolute z-20 right-0 w-max min-w-full mt-1.5 top-full bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] py-1.5 overflow-hidden">
            {sortOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => { setSortOrder(opt); setIsSortOpen(false); }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  sortOrder === opt
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
