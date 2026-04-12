import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout({ children, title, subtitle }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-white flex font-sans">
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col pt-8 px-6 sm:px-12 lg:px-16 xl:px-24 relative z-10">
        <div className="flex items-center font-bold text-2xl mb-auto">
          <span className="text-[#3b82f6]">Fin</span>
          <span className="text-[#111827]">Go</span>
        </div>

        <div className="w-full max-w-[400px] mx-auto my-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[340px] mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="flex bg-[#F8FAFC] p-1 rounded-xl border border-gray-100">
            <Link
              to="/login"
              className={`flex-1 text-center py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                isLogin
                  ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`flex-1 text-center py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </Link>
          </div>

          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
        
        <div className="mt-auto pb-8"></div>
      </div>

      <div className="hidden lg:flex w-full lg:w-[55%] xl:w-[60%] p-4 lg:p-6">
        <div className="w-full h-full bg-[#1A2E5E] rounded-4xl overflow-hidden relative shadow-2xl flex flex-col justify-center p-12 xl:p-24 text-white">
          
          <div className="absolute inset-0 bg-linear-to-br from-[#1A2E5E] via-[#122A6D] to-[#0A1A47] opacity-90"></div>
          
          <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"></div>
          <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>

          <div className="relative z-10 max-w-2xl">
            <motion.div
              key={isLogin ? "loginHero" : "registerHero"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-4xl xl:text-[3.25rem] font-bold leading-[1.15] tracking-tight mb-8 text-white">
                {isLogin ? (
                  <>
                    Lanjutkan langkahmu<br />
                    meraih kebebasan<br />
                    finansial yang<br />
                    selalu diimpikan.
                  </>
                ) : (
                  <>
                    Bergabunglah dan<br />
                    wujudkan semua<br />
                    target masa depanmu<br />
                    sekarang juga.
                  </>
                )}
              </h1>
              <p className="text-blue-100/70 text-lg xl:text-xl max-w-lg leading-relaxed font-light">
                {isLogin
                  ? "Pantau terus progres tabungan, kelola arus kas harian, dan wujudkan setiap target keuanganmu dengan lebih cerdas, tertata, dan tanpa kerumitan. Selamat datang kembali di FinGo!"
                  : "Dengan FinGo, setiap sen yang Anda simpan akan dilacak dengan rapi. Capai tujuan keuangan Anda dengan insight dan pengingat yang cerdas namun tidak berlebihan."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
