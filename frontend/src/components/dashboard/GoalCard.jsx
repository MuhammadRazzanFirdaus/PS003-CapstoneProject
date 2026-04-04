import { Link } from "react-router-dom";

const getBarColor = (progress) => {
  if (progress >= 100) return "bg-green-500";
  if (progress >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

export default function GoalCard({
  id,
  name,
  category,
  target_amount,
  initial_amount,
  status,
}) {
  
  const collected = Number(initial_amount) || 0;
  const target = Number(target_amount) || 0;
  const remaining = target - collected;
  const progress =
    target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0;

  return (
    <Link to={`/goals/${id}`}>
      <div className="border border-[#E5E7EB] rounded-xl p-4 bg-white flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
          <div>
            <p className="text-[16px] font-bold">{name}</p>
            <p className="text-sm text-gray-400">{category}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">
              Rp{collected.toLocaleString("id-ID")}
            </span>
            {status === "completed" ? (
              <span className="text-green-500 font-medium">Completed</span>
            ) : (
              <span className="text-gray-400">
                Left: Rp{remaining.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getBarColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{progress}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
