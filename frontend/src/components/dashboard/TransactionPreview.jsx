import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import { LuHistory } from "react-icons/lu";

const transactions = [
  {
    icon: "🍽️",
    name: "Starbucks Coffee",
    date: "Today, 14:30",
    amount: -350000,
  },
  {
    icon: "💼",
    name: "Monthly Salary",
    date: "Yesterday, 09:00",
    amount: 8500000,
  },
  { icon: "🚗", name: "Uber Ride", date: "12 Oct 2023, 16:45", amount: -45000 },
];

export default function TransactionPreview() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <LuHistory /> Recent History
        </h2>
        <Link
          to="/transactions"
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          View All →
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {transactions.map((tx) => (
          <TransactionItem key={tx.name} {...tx} />
        ))}
      </div>
    </div>
  );
}
