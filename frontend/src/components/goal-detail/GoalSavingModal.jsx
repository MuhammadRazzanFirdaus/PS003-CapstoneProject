import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

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

  useEffect(() => {
    if (isOpen) {
      setType("income");
      setNote("");
      setNominal("");
    }
  }, [isOpen]);

  const handleNominalChange = (e) => {
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
      errorMessage = nominal > limit ? `Nominal yang dimasukkan melebihi batas (Saldo atau Sisa Target). Batas Anda: Rp${formatRupiah(limit)}` : "";
    } else {
      errorMessage = `Nominal yang dimasukkan melebihi dana yang sudah terkumpul. Batas penarikan: Rp${formatRupiah(collected)}`;
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
            className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Goal Savings</h3>

            <div className="flex flex-col gap-4">
              <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => handleTypeChange("income")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    type === "income"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <FiPlus size={16} /> Income
                </button>
                <button
                  onClick={() => handleTypeChange("expense")}
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
                <label className="text-sm font-medium text-gray-700">Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Fill in the note"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all text-sm placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    Nominal
                  </label>
                  {!isError && (
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                      Limit: Rp{formatRupiah(activeLimit)}
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
                disabled={!nominal || isError}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-black transition-colors disabled:opacity-50"
              >
                Save Funds
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
