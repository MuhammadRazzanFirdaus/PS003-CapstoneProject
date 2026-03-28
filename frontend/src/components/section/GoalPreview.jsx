import { Link } from "react-router-dom";
import GoalCard from "../card/GoalCard";
import { TbTargetArrow } from "react-icons/tb";

const goals = [
  { name: "JPG Elixir", amount: "Rp1.584.000", progress: 15, color: "red" },
  { name: "Lv Imagination", amount: "Rp6.200.000", progress: 94, color: "green" },
  { name: "MYSLF", amount: "Rp1.530.120", progress: 50, color: "yellow" },
];

export default function GoalPreview() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TbTargetArrow /> Goals
        </h2>
        <Link to="/goals" className="text-xs text-gray-400 hover:text-gray-600">
          More →
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {goals.map((goal) => (
          <GoalCard key={goal.name} {...goal} />
        ))}
      </div>
    </div>
  );
}