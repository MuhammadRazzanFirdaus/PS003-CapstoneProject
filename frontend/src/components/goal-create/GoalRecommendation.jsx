import { RiSunLine } from "react-icons/ri";
import { BsCalendarWeek, BsCalendarMonth } from "react-icons/bs";
import { MdWarningAmber } from "react-icons/md";

export default function GoalRecommendation({ rec, alert, onSelect }) {
  if (alert) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
        <MdWarningAmber size={20} className="text-red-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-600">
            Target tidak tercapai
          </p>
          <p className="text-xs text-red-400 mt-0.5">{alert}</p>
        </div>
      </div>
    );
  }

  if (!rec) return null;

  const items = [
    rec.daily !== null && {
      label: "Daily Saving",
      icon: <RiSunLine className="text-blue-500" />,
      value: rec.daily,
      period: "daily",
      desc: "day",
    },
    rec.weekly !== null && {
      label: "Weekly Saving",
      icon: <BsCalendarWeek className="text-blue-500" />,
      value: rec.weekly,
      period: "weekly",
      desc: "week",
    },
    rec.monthly !== null && {
      label: "Monthly Saving",
      icon: <BsCalendarMonth className="text-blue-500" />,
      value: rec.monthly,
      period: "monthly",
      desc: "month",
    },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold">Savings Recommendation</h2>
        <p className="text-sm text-gray-400 mt-1">
          Suggested amounts based on your target and deadline to help you stay
          on track.
        </p>
      </div>
      <div
        className={`grid gap-4 ${items.length === 1 ? "grid-cols-1" : items.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
      >
        {items.map((item) => (
          <div
            key={item.period}
            onClick={() => onSelect(item.value, item.period)}
            className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:border-blue-300 transition-colors"
          >
            <p className="text-sm font-medium flex items-center gap-2 text-gray-600">
              {item.icon} {item.label}
            </p>
            <p className="text-xl font-bold text-blue-600">
              Rp{item.value.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-gray-400">
              You need to save Rp{item.value.toLocaleString("id-ID")} per{" "}
              {item.desc}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
