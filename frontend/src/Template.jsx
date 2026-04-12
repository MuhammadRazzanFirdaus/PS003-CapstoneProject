import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import SideBar from "./components/sidebar/SideBar";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { AuthProvider } from "./context/AuthContext";

function Layout() {
  const { isOpen } = useSidebar();

  return (
    <>
      <SideBar />
      <motion.main
        animate={{ marginLeft: isOpen ? "240px" : "64px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Outlet />
      </motion.main>
    </>
  );
}

export default function Template() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Layout />
      </SidebarProvider>
    </AuthProvider>
  );
}