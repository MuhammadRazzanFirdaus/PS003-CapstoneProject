import { motion } from "framer-motion";

export default function NotificationHeader({ fadeUp }) {
  return (
    <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
      <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Notifications</h1>
    </motion.div>
  );
}
