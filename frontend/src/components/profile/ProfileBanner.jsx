import { motion } from "framer-motion";
import { FiUser, FiCalendar, FiCheckCircle } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
};

export default function ProfileBanner({ user, stats }) {
  return (
    <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="bg-white rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col w-full">
      <div className="h-28 w-full bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 relative">
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-indigo-600 px-2 py-0.5 rounded flex items-center gap-1 text-[10px] font-bold">
           <FiCheckCircle size={10} /> Verified
        </div>
      </div>

      <div className="px-6 flex flex-col pb-6">
         <div className="w-[84px] h-[84px] rounded-2xl bg-white p-1 -mt-10 mx-0 z-10 shadow-sm border border-gray-50">
            <div className="w-full h-full rounded-xl bg-gray-100 border border-gray-200/50 flex items-center justify-center text-gray-500 overflow-hidden relative">
               {user?.image ? (
                 <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
               ) : (
                 <FiUser size={32} />
               )}
            </div>
         </div>

         <div className="mt-3 flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
               <h1 className="text-xl font-bold text-gray-900">{user?.name || "Loading..."}</h1>
               <span className="bg-indigo-50 border border-indigo-100 text-indigo-500 px-2 py-0.5 rounded text-[10px] font-bold">Member</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{user?.email || "user@email.com"}</p>
         </div>

         <div className="w-full h-px bg-gray-100 my-5"></div>

         <div className="flex flex-col gap-3">
             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Account Info</p>
             <div className="flex flex-col gap-1 bg-white shadow-sm p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-500 flex items-center gap-1.5"><FiCalendar size={12} className="text-indigo-400" /> Joined</p>
                <p className="text-xs font-semibold text-gray-800">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString("id-ID", { month: "short", year: "numeric" }) : "-"}
                </p>
             </div>
         </div>

         <div className="mt-5 flex flex-col gap-3">
             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Financial Summary</p>
             <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                <span className="text-xs text-gray-600 font-medium">Total Transactions</span>
                <span className="text-sm font-bold text-gray-900">{stats?.count || 0}</span>
             </div>
             <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                <span className="text-xs text-gray-600 font-medium">Recorded Expenses</span>
                <span className="text-sm font-bold text-gray-900">{stats?.categoryData?.length || 0} Categories</span>
             </div>
         </div>

      </div>
    </motion.div>
  );
}
