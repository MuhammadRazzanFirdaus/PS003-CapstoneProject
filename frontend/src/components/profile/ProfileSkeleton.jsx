import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const shimmer = "animate-pulse";

export default function ProfileSkeleton() {
  return (
    <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 mx-auto min-h-screen items-start">

      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="w-full lg:w-[320px] xl:w-[340px] shrink-0 bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <div className={`h-28 bg-gray-200 ${shimmer}`}></div>
        <div className="px-6 flex flex-col pb-6 relative">
          <div className={`w-[84px] h-[84px] bg-gray-300 rounded-2xl -mt-10 border-4 border-white mb-4 shadow-sm z-10 ${shimmer}`}></div>
          <div className={`h-6 w-2/3 bg-gray-200 rounded mb-2 ${shimmer}`}></div>
          <div className={`h-4 w-1/2 bg-gray-200 rounded mb-6 ${shimmer}`}></div>

          <div className="w-full h-px bg-gray-100 mb-5"></div>
          <div className={`h-3 w-1/3 bg-gray-200 rounded mb-3 ${shimmer}`}></div>
          <div className={`h-14 bg-gray-100 rounded-xl mb-5 w-full ${shimmer}`}></div>

          <div className={`h-3 w-1/3 bg-gray-200 rounded mb-3 border-t border-gray-50 pt-5 mt-2 ${shimmer}`}></div>
          <div className="flex justify-between py-2">
            <div className={`h-3 w-1/2 bg-gray-100 rounded ${shimmer}`}></div>
            <div className={`h-3 w-6 bg-gray-200 rounded ${shimmer}`}></div>
          </div>
          <div className="flex justify-between py-2">
            <div className={`h-3 w-1/2 bg-gray-100 rounded ${shimmer}`}></div>
            <div className={`h-3 w-6 bg-gray-200 rounded ${shimmer}`}></div>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 w-full flex flex-col gap-6">
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between gap-4 bg-white p-4 py-5 rounded-[20px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
        >
          <div className={`h-6 w-1/4 bg-gray-200 rounded hidden md:block ml-4 ${shimmer}`}></div>
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <div className={`h-9 w-24 bg-gray-100 rounded-lg ${shimmer}`}></div>
            <div className={`h-9 w-20 bg-gray-100 rounded-lg ${shimmer}`}></div>
          </div>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-24 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-5 flex flex-col gap-2 ${shimmer}`}>
              <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/3 bg-gray-100 rounded"></div>
            </div>
          ))}
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          <div className={`h-[340px] bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 ${shimmer}`}>
            <div className="h-4 w-1/4 bg-gray-200 rounded mb-6"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full aspect-square bg-gray-100 rounded-full max-w-[200px]"></div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={"det-" + i} className="h-12 bg-gray-100 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className={`h-[220px] bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 flex flex-col justify-between ${shimmer}`}>
                <div className="flex justify-between items-start">
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </div>
                <div>
                  <div className="h-8 w-1/2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className={`bg-white rounded-[20px] p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mt-2 ${shimmer}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-16 bg-gray-100 rounded"></div>
          </div>
          <div className="flex flex-col gap-5">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-5 last:border-0 last:pb-0 px-2 lg:px-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="hidden md:flex flex-col gap-2 flex-1 items-center sm:items-start pl-8">
                  <div className="h-3 w-24 bg-gray-100 rounded"></div>
                  <div className="h-2 w-16 bg-gray-100 rounded"></div>
                </div>
                <div className="hidden sm:flex flex-1 justify-center">
                  <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
                </div>
                <div className="flex flex-1 justify-end">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
