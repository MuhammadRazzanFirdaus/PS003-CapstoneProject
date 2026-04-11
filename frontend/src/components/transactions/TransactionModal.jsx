import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

// Utility for formatting Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

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

  const CATEGORIES = ["Salary", "Goal", "Transportasi", "Food & Beverage", "Isi Sendiri..."];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pre-fill data if initialData is provided (Edit Mode)
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type || "expense");
        setName(initialData.name || "");
        setNominal(String(Math.abs(initialData.amount)) || "");
        setDescription(initialData.description || "");

        const cat = initialData.category || "";
        const PRESET_CATEGORIES = ["Salary", "Goal", "Transportasi", "Food & Beverage"];
        if (PRESET_CATEGORIES.includes(cat)) {
          setCategory(cat);
          setIsCustomCategory(false);
        } else {
          setCategory("Isi Sendiri...");
          setIsCustomCategory(true);
          setCustomCategory(cat);
        }
      } else {
        // Reset to default for Add Mode
        setType("expense");
        setName("");
        setNominal("");
        setCategory("Salary");
        setCustomCategory("");
        setIsCustomCategory(false);
        setIsCategoryOpen(false);
        setDescription("");
      }
    }
  }, [isOpen, initialData]);


  const handleCategorySelect = (cat) => {
    if (cat === "Isi Sendiri...") {
      setIsCustomCategory(true);
      setCustomCategory("");
    } else {
      setIsCustomCategory(false);
      setCategory(cat);
    }
    setIsCategoryOpen(false);
  };

  const handleNominalChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setNominal(val);
  };

  const displayNominal = nominal ? formatRupiah(Number(nominal)) : "";
  const amountVal = Number(nominal);
  const isError = type === "expense" && amountVal > limit;
  
  const activeCategory = isCustomCategory ? customCategory : category;
  
  let errorMessage = "";
  if (isError) {
    errorMessage = `The nominal amount you entered is too large compared to your balance. Your limit Rp${formatRupiah(limit)}`;
  }

  const handleSubmit = () => {
    if (!amountVal || !name || !activeCategory || isError) return;

    onSave({
      name,
      amount: amountVal,
      type,
      category: activeCategory,
      description
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
              {initialData ? "Edit Transaction" : "Add Transaction"}
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setType("income")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    type === "income"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <FiPlus size={16} /> Income
                </button>
                <button
                  onClick={() => setType("expense")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    type === "expense"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <FiMinus size={16} /> Expense
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Name / Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Beli domain proyek dpk."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all text-sm placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Nominal</label>
                  {type === "expense" && !isError && (
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                      Limit: Rp{formatRupiah(limit)}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    Rp
                  </div>
                  <input
                    type="text"
                    value={displayNominal}
                    onChange={handleNominalChange}
                    placeholder="0"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all text-sm text-gray-900 ${
                      isError
                        ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20 bg-red-50"
                        : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20"
                    }`}
                  />
                </div>
                {isError && (
                  <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
                )}
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5" ref={categoryRef}>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <div className="relative">
                  <div
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-4 text-sm outline-none cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between select-none ${
                      !activeCategory ? "text-gray-400" : "text-gray-900"
                    }`}
                  >
                    <span>{isCustomCategory ? (customCategory || "Ketik kategori...") : category}</span>
                    <MdKeyboardArrowDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-200 ${
                        isCategoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                        style={{ transformOrigin: "top" }}
                        className="absolute z-20 w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] py-1.5 overflow-hidden"
                      >
                        {CATEGORIES.map((cat) => (
                          <div
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                              (!isCustomCategory && category === cat) || (isCustomCategory && cat === "Isi Sendiri...")
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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
                      key="custom-input-wrapper"
                      initial={{ opacity: 0, scaleY: 0.85, originY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.85 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      style={{ transformOrigin: "top" }}
                    >
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Contoh: Kesehatan, Hiburan..."
                        autoFocus
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all text-sm placeholder:text-gray-400"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


              
              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes..."
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-all text-sm placeholder:text-gray-400 resize-none"
                />
              </div>

            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!nominal || !name || !activeCategory || isError}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-black transition-colors disabled:opacity-50"
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
