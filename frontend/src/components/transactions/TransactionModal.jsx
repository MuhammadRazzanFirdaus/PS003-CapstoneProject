import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);

export default function TransactionModal({ isOpen, onClose, onSave, limit = 0, initialData = null }) {
  const [type, setType] = useState("expense");
  const [name, setName] = useState("");
  const [nominal, setNominal] = useState("");
  const [category, setCategory] = useState("Salary");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [description, setDescription] = useState("");
  const categoryRef = useRef(null);

  const CATEGORIES = ["Salary", "Goal", "Bill", "Transportasi", "Food & Beverage", "Isi Sendiri..."];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setIsCategoryOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type || "expense");
        setName(initialData.name || "");
        setNominal(String(Math.abs(initialData.amount)) || "");
        setDescription(initialData.description || "");
        const cat = initialData.category || "";
        const PRESET = ["Salary", "Goal", "Bill", "Transportasi", "Food & Beverage"];
        if (PRESET.includes(cat)) { setCategory(cat); setIsCustomCategory(false); }
        else { setCategory("Isi Sendiri..."); setIsCustomCategory(true); setCustomCategory(cat); }
      } else {
        setType("expense"); setName(""); setNominal(""); setDescription("");
        setCategory("Salary"); setCustomCategory(""); setIsCustomCategory(false); setIsCategoryOpen(false);
      }
    }
  }, [isOpen, initialData]);

  const handleCategorySelect = (cat) => {
    if (cat === "Isi Sendiri...") { setIsCustomCategory(true); setCustomCategory(""); }
    else { setIsCustomCategory(false); setCategory(cat); }
    setIsCategoryOpen(false);
  };

  const handleNominalChange = (e) => setNominal(e.target.value.replace(/\D/g, ""));

  const displayNominal = nominal ? formatRupiah(Number(nominal)) : "";
  const amountVal = Number(nominal);
  const isError = type === "expense" && amountVal > limit;
  const activeCategory = isCustomCategory ? customCategory : category;
  const isValid = !!amountVal && !!name && !!activeCategory && !isError;

  const handleSubmit = () => {
    if (!isValid) return;
    onSave({ name, amount: amountVal, type, category: activeCategory, description });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl"
          >

            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {initialData ? "Edit Transaction" : "Add Transaction"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {initialData ? "Update detail transaksi" : "Catat pemasukan atau pengeluaran baru"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>


            <div className="px-6 py-5 flex flex-col gap-4">

              <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setType("income")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    type === "income" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FiPlus size={15} /> Income
                </button>
                <button
                  onClick={() => setType("expense")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    type === "expense" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FiMinus size={15} /> Expense
                </button>
              </div>


              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name / Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Beli domain proyek..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all text-sm placeholder:text-gray-400"
                />
              </div>


              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nominal</label>
                    {type === "expense" && !isError && (
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">
                        Limit: Rp{formatRupiah(limit)}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-sm">Rp</div>
                    <input
                      type="text"
                      value={displayNominal}
                      onChange={handleNominalChange}
                      placeholder="0"
                      className={`w-full pl-9 pr-3.5 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all text-sm text-gray-900 ${
                        isError
                          ? "border-red-400 focus:border-red-400 bg-red-50"
                          : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20"
                      }`}
                    />
                  </div>
                  {isError && <p className="text-[10px] text-red-500">Melebihi limit Rp{formatRupiah(limit)}</p>}
                </div>

                <div className="flex flex-col gap-1.5" ref={categoryRef}>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</label>
                  <div className="relative">
                    <div
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between select-none text-gray-900"
                    >
                      <span className={!activeCategory ? "text-gray-400" : "truncate"}>
                        {isCustomCategory ? "Isi Sendiri..." : category}
                      </span>
                      <MdKeyboardArrowDown
                        size={18}
                        className={`text-gray-400 shrink-0 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isCategoryOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
                          transition={{ duration: 0.15 }}
                          style={{ transformOrigin: "top" }}
                          className="absolute z-30 w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg py-1 overflow-hidden"
                        >
                          {CATEGORIES.map((cat) => (
                            <div
                              key={cat}
                              onClick={() => handleCategorySelect(cat)}
                              className={`px-3.5 py-2 text-sm cursor-pointer transition-colors ${
                                (!isCustomCategory && category === cat) || (isCustomCategory && cat === "Isi Sendiri...")
                                  ? "bg-blue-50 text-blue-600 font-semibold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {cat}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence initial={false}>
                    {isCustomCategory && (
                      <motion.div
                        key="custom"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <input
                          type="text"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          placeholder="Contoh: Kesehatan..."
                          autoFocus
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-all text-sm placeholder:text-gray-400 mt-1.5"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>


              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Description <span className="normal-case font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all text-sm placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>


            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#1A2035] rounded-xl hover:bg-[#111524] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {initialData ? "Update" : "Save"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
