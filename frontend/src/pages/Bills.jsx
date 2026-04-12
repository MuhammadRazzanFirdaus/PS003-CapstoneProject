import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import BillsHeader from "../components/bills/BillsHeader";
import BillsFilters from "../components/bills/BillsFilters";
import BillsList from "../components/bills/BillsList";
import BillModal from "../components/bills/BillModal";
import { useBills } from "../hooks/useBills";
import { createBill, updateBill, deleteBill, updateBillStatus } from "../api/fingo";
import { getAuthUserId } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Bills() {
  const { bills, loading, refetch } = useBills();
  const { refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("All Bills");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Due Date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  const handleOpenAdd = () => {
    setEditingBill(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBill(null);
  };

  const handleSave = async (data) => {
    try {
      const formData = new FormData();
      const userId = getAuthUserId();
      if (userId) formData.append("user_id", userId);
      formData.append("name", data.name);
      formData.append("amount", data.amount);
      formData.append("due_date", data.due_date);
      formData.append("category", data.category);
      formData.append("is_paid", 0);

      if (editingBill) {
        await updateBill(editingBill.id, formData);
        toast.success("Tagihan berhasil diperbarui!");
      } else {
        await createBill(formData);
        toast.success("Tagihan berhasil ditambahkan!");
      }

      await refetch();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal menyimpan tagihan.");
    }
  };

  const handleEdit = (bill) => {
    setEditingBill(bill);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBill(id);
      await refetch();
      toast.success("Tagihan berhasil dihapus.");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus tagihan.");
    }
  };

  const handlePay = async (bill) => {
    try {
      await updateBillStatus(bill.id, true);
      await refetch();
      await refreshUser();
      toast.success(`"${bill.name}" ditandai sebagai Paid!`);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui status tagihan.");
    }
  };

  return (
    <div className="p-6 sm:p-10 flex flex-col gap-6 relative w-full">
      <BillModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editingBill}
      />

      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <BillsHeader onAdd={handleOpenAdd} />
      </motion.div>

      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
        <BillsFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </motion.div>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
        <BillsList
          bills={bills}
          loading={loading}
          activeTab={activeTab}
          search={search}
          sortOrder={sortOrder}
          onDelete={handleDelete}
          onPay={handlePay}
          onEdit={handleEdit}
        />
      </motion.div>
    </div>
  );
}