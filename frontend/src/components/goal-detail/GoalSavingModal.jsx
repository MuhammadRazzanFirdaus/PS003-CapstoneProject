import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

// Utility for formatting Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function GoalSavingModal({ isOpen, onClose, onSave, limit, collected }) {
  const [type, setType] = useState("income");
  const [note, setNote] = useState("");
  const [nominal, setNominal] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setType("income");
      setNote("");
      setNominal("");
    }
  }, [isOpen]);

  const handleNominalChange = (e) => {
    // Only allow digits
    const val = e.target.value.replace(/\D/g, "");
    setNominal(val);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setNominal("");
  };

  const displayNominal = nominal ? formatRupiah(Number(nominal)) : "";

  const amountVal = Number(nominal);
  const activeLimit = type === "income" ? limit : collected;
  const isError = amountVal > activeLimit;

  let errorMessage = "";
  if (isError) {
    if (type === "income") {
      errorMessage = `The nominal amount you entered is too large compared to your balance. Your limit Rp${formatRupiah(limit)}`;
    } else {
      errorMessage = `The nominal amount you entered is too large compared to your collected funds. Your limit Rp${formatRupiah(collected)}`;
    }
  }

  const handleSubmit = () => {
    if (!amountVal || isError) return;

    onSave({
      amount: amountVal,
      note,
      type,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          transition={{ duration: 0.2 }}
          className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Goal Savings</h2>
          </div>

          <div className="p-6 flex flex-col gap-6">
            <div className="inline-flex items-center p-1 bg-white border border-gray-200 rounded-full w-[240px]">
              <button
                onClick={() => handleTypeChange("income")}
                className={`flex-1 flex items-center justify-center cursor-pointer gap-2 py-2 text-sm font-medium rounded-full transition-colors ${
                  type === "income"
                    ? "bg-[#0f172a] text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <FiPlus size={16} /> Income
              </button>
              <button
                onClick={() => handleTypeChange("expense")}
                className={`flex-1 flex items-center justify-center cursor-pointer gap-2 py-2 text-sm font-medium rounded-full transition-colors ${
                  type === "expense"
                    ? "bg-[#0f172a] text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <FiMinus size={16} /> Expense
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">Note</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Fill in the note"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all text-sm placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">
                Nominal
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <MdOutlineAccountBalanceWallet size={20} />
                </div>
                <input
                  type="text"
                  value={displayNominal}
                  onChange={handleNominalChange}
                  placeholder="0"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none transition-all text-gray-900 ${
                    isError
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20"
                  }`}
                />
              </div>

              {isError ? (
                <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
              ) : (
                <p className="text-xs text-gray-500 font-medium">
                  {type === "income" ? "savings top-up limit" : "expense limit"}{" "}
                  <span className="font-bold text-gray-600">
                    Rp{formatRupiah(activeLimit)}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="px-6 py-5 bg-white flex items-center justify-end gap-3 mt-auto">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!nominal || isError}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#0f172a] rounded-lg hover:bg-[#1e293b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
