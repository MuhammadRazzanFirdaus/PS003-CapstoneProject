import { AiOutlineFire } from "react-icons/ai";

export default function StreakCard({streak}) {
  return (
    <div className="flex flex-col items-center p-4 text-[#01865A]">
      <div className="bg-[#D1FAE5] p-4 rounded-full">
        <AiOutlineFire className="" size={28} />
      </div>

      <div className="flex flex-col items-center">
        <p className="font-bold text-xl">{streak}</p>
        <p className="text-xs font-semibold">Streak Day</p>
      </div>
    </div>
  );
}
