import { FiAlertTriangle, FiBell, FiCheckCircle, FiFileText } from "react-icons/fi";
import { TbPigMoney } from "react-icons/tb";

const getIconAndColors = (type, badgeText) => {
  if (badgeText === "Success" || badgeText === "Completed") {
    if (badgeText === "Success") {
      return { icon: <TbPigMoney size={18} />, bg: "bg-blue-50", text: "text-blue-500", badgeBg: "bg-emerald-100/50", badgeTextCol: "text-emerald-600" };
    }
    return { icon: <FiCheckCircle size={18} />, bg: "bg-emerald-50", text: "text-emerald-500", badgeBg: "bg-emerald-100/50", badgeTextCol: "text-emerald-600" };
  }
  if (badgeText === "Reminder") {
    return { icon: <FiAlertTriangle size={18} />, bg: "bg-orange-50", text: "text-orange-500", badgeBg: "bg-orange-100/50", badgeTextCol: "text-orange-600" };
  }
  if (badgeText === "Info") {
    if (type === "memo") {
       return { icon: <FiFileText size={18} />, bg: "bg-blue-50", text: "text-blue-500", badgeBg: "bg-blue-100/50", badgeTextCol: "text-blue-600" };
    }
    return { icon: <FiBell size={18} />, bg: "bg-blue-50", text: "text-blue-500", badgeBg: "bg-blue-100/50", badgeTextCol: "text-blue-600" };
  }
  return { icon: <FiBell size={18} />, bg: "bg-gray-100", text: "text-gray-500", badgeBg: "bg-gray-200", badgeTextCol: "text-gray-700" };
};

export default function NotificationItem({ notif }) {
  const { icon, bg, text, badgeBg, badgeTextCol } = getIconAndColors(notif.type, notif.badge);
  
  return (
    <div className={`flex gap-5 px-6 py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-default`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${bg} ${text}`}>
         {icon}
      </div>

      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
         <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
               <h3 className="text-[14px] font-bold text-gray-900">{notif.title}</h3>
               <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${badgeBg} ${badgeTextCol}`}>
                  {notif.badge}
               </span>
            </div>
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap mt-0.5">{notif.time}</span>
         </div>
         <p className="text-[13px] text-gray-500 leading-relaxed pr-10">{notif.message}</p>
      </div>
    </div>
  );
}
