import { MdOutlineWallet, MdCalendarToday } from "react-icons/md";

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
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors text-gray-500"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
              type="number"
              value={form.target_amount}
              onChange={onChange}
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
              type="number"
              value={form.saving_amount}
              onChange={onChange}
              placeholder="0"
              className="flex-1 text-sm outline-none"
            />
            <select
              name="saving_period"
              value={form.saving_period}
              onChange={onChange}
              className="text-sm outline-none text-gray-500 bg-transparent"
            >
              <option value="">Period</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
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
              type="number"
              value={form.initial_amount}
              onChange={onChange}
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
              className="flex-1 text-sm outline-none text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
