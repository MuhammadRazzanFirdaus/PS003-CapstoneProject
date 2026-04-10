import { useState, useRef, useEffect } from "react";
import { MdOutlineWallet, MdCalendarToday, MdKeyboardArrowDown } from "react-icons/md";

const formatRupiah = (val) => {
  if (!val) return "";
  return new Intl.NumberFormat("id-ID").format(Number(val));
};

const categories = [
  "Liburan",
  "Elektronik",
  "Konser",
  "Kendaraan",
  "Pendidikan",
  "Kesehatan",
  "Fashion",
  "Lainnya",
];

export default function GoalFormFields({ form, onChange }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const categoryRef = useRef(null);
  const periodRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (periodRef.current && !periodRef.current.contains(event.target)) {
        setIsPeriodOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNumericChange = (e, fieldName) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    onChange({ target: { name: fieldName, value: rawValue } });
  };

  const handleSelect = (name, value) => {
    onChange({ target: { name, value } });
    if (name === "category") setIsCategoryOpen(false);
    if (name === "saving_period") setIsPeriodOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Savings Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="e.g. Laptop, Vacation, Concert Ticket"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <div className="relative" ref={categoryRef}>
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-4 text-sm outline-none cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between select-none ${
                !form.category ? "text-gray-500" : "text-gray-900"
              }`}
            >
              <span>{form.category || "Select a category"}</span>
              <MdKeyboardArrowDown
                size={20}
                className={`text-gray-400 transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isCategoryOpen && (
              <div className="absolute z-10 w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] py-1.5 overflow-hidden">
                {categories.map((c) => (
                  <div
                    key={c}
                    onClick={() => handleSelect("category", c)}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      form.category === c
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Target Amount
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-2">
            <MdOutlineWallet size={16} className="text-gray-400 shrink-0" />
            <input
              name="target_amount"
              type="text"
              value={form.target_amount ? formatRupiah(form.target_amount) : ""}
              onChange={(e) => handleNumericChange(e, "target_amount")}
              placeholder="0"
              className="flex-1 text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Saving Amount
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-2">
            <MdOutlineWallet size={16} className="text-gray-400 shrink-0" />
            <input
              name="saving_amount"
              type="text"
              value={form.saving_amount ? formatRupiah(form.saving_amount) : ""}
              onChange={(e) => handleNumericChange(e, "saving_amount")}
              placeholder="0"
              className="flex-1 text-sm outline-none"
            />
            <div className="relative flex items-center" ref={periodRef}>
              <div
                onClick={() => setIsPeriodOpen(!isPeriodOpen)}
                className={`flex items-center gap-1.5 text-sm outline-none bg-transparent cursor-pointer select-none ${
                  !form.saving_period ? "text-gray-500" : "text-gray-900"
                }`}
              >
                <span className="capitalize">{form.saving_period || "Period"}</span>
                <MdKeyboardArrowDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isPeriodOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isPeriodOpen && (
                <div className="absolute z-10 right-0 top-full mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] py-1.5 overflow-hidden origin-top-right">
                  {["daily", "weekly", "monthly"].map((p) => (
                    <div
                      key={p}
                      onClick={() => handleSelect("saving_period", p)}
                      className={`px-4 py-2 text-sm cursor-pointer capitalize transition-colors ${
                        form.saving_period === p
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Initial Amount
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-2">
            <MdOutlineWallet size={16} className="text-gray-400 shrink-0" />
            <input
              name="initial_amount"
              type="text"
              value={form.initial_amount ? formatRupiah(form.initial_amount) : ""}
              onChange={(e) => handleNumericChange(e, "initial_amount")}
              placeholder="0"
              className="flex-1 text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Target Completion Date
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-2">
            <input
              name="target_date"
              type="date"
              value={form.target_date}
              onChange={onChange}
              className={`flex-1 text-sm outline-none bg-transparent ${
                !form.target_date ? "text-gray-500" : "text-gray-900"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
