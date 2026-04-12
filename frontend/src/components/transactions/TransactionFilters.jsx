import { useState, useRef, useEffect } from "react";
import { FiSearch, FiCalendar, FiFilter, FiTrendingUp } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from "framer-motion";

export default function TransactionFilters({
  fadeUp,
  search,
  setSearch,
  monthFilter,
  setMonthFilter,
  categoryFilter,
  setCategoryFilter,
  sortOrder,
  setSortOrder,
}) {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const monthRef = useRef(null);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthRef.current && !monthRef.current.contains(event.target)) setIsMonthOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(event.target)) setIsCategoryOpen(false);
      if (sortRef.current && !sortRef.current.contains(event.target)) setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthOptions = ["All Time", "This Month"];
  const categoryOptions = ["All Categories", "Salary", "Goal", "Bill", "Transportasi", "Food & Beverage", "Utilities", "Subscription", "Kesehatan", "Lainnya"];
  const sortOptions = ["Newest", "Oldest"];

  const Dropdown = ({
    icon: Icon,
    value,
    options,
    isOpen,
    setIsOpen,
    onSelect,
    dropdownRef,
    labelPrefix = "",
  }) => (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-200 rounded-xl pl-3 pr-4 py-2 text-sm outline-none cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between select-none shadow-sm gap-2"
      >
        <div className="flex items-center gap-2">
          <Icon className="text-gray-400 w-4 h-4 shrink-0" />
          <span className="text-gray-600 whitespace-nowrap">
            {labelPrefix}{value}
          </span>
        </div>
        <MdKeyboardArrowDown
          size={18}
          className={`text-gray-400 transition-transform duration-200 ml-1 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 left-0 w-max min-w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] py-1.5 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                value === opt
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {labelPrefix}{opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4"
    >
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:border-gray-400 outline-none hover:border-gray-300 transition-colors shadow-sm"
          />
        </div>

        <Dropdown
          icon={FiCalendar}
          value={monthFilter}
          options={monthOptions}
          isOpen={isMonthOpen}
          setIsOpen={setIsMonthOpen}
          onSelect={setMonthFilter}
          dropdownRef={monthRef}
        />

        <Dropdown
          icon={FiFilter}
          value={categoryFilter}
          options={categoryOptions}
          isOpen={isCategoryOpen}
          setIsOpen={setIsCategoryOpen}
          onSelect={setCategoryFilter}
          dropdownRef={categoryRef}
        />
      </div>

      <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0 flex justify-end">
        <Dropdown
          icon={FiTrendingUp}
          value={sortOrder}
          options={sortOptions}
          isOpen={isSortOpen}
          setIsOpen={setIsSortOpen}
          onSelect={setSortOrder}
          dropdownRef={sortRef}
          labelPrefix="Sort by: "
        />
      </div>
    </motion.div>
  );
}
