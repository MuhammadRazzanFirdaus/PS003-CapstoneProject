import { motion } from "framer-motion";

export default function NotificationSkeleton({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex gap-5 px-6 py-6 border-b border-gray-50 last:border-0 relative"
    >
      {/* Icon Skeleton */}
      <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse shrink-0 mt-0.5" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-2.5 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full">
            {/* Title Skeleton */}
            <div className="h-4 w-1/3 bg-gray-100 animate-pulse rounded-md" />
            {/* Badge Skeleton */}
            <div className="h-4 w-16 bg-gray-50 animate-pulse rounded-full" />
          </div>
          {/* Time Skeleton */}
          <div className="h-3 w-12 bg-gray-50 animate-pulse rounded-md shrink-0 mt-1" />
        </div>
        
        {/* Message Skeleton (Two lines) */}
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-full bg-gray-50 animate-pulse rounded-md" />
          <div className="h-3 w-2/3 bg-gray-50 animate-pulse rounded-md" />
        </div>
      </div>
    </motion.div>
  );
}
