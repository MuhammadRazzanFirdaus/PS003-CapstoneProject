import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import TransactionHeader from "../components/transactions/TransactionHeader";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";
import TransactionModal from "../components/transactions/TransactionModal";
import { useTransactions } from "../hooks/useTransactions";
import { createTransaction, updateTransaction, deleteTransaction } from "../api/fingo";
import { toast } from "react-toastify";
import { getAuthUserId } from "../utils/auth";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Transactions() {
  const { transactions, loading, refetch } = useTransactions();
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("All Time");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((trx) => {
      const matchesSearch = trx.name.toLowerCase().includes(search.toLowerCase());
      
      const PRESET_CATEGORIES = ["Salary", "Goal", "Transportasi", "Food & Beverage"];
      const matchesCategory =
        categoryFilter === "All Categories"
          ? true
          : categoryFilter === "Lainnya"
          ? !PRESET_CATEGORIES.includes(trx.category)
          : trx.category === categoryFilter;

      let matchesMonth = true;
      if (monthFilter === "This Month") {
        const trxDate = new Date(trx.created_at);
        const now = new Date();
        matchesMonth = 
          trxDate.getMonth() === now.getMonth() && 
          trxDate.getFullYear() === now.getFullYear();
      }

      return matchesSearch && matchesCategory && matchesMonth;
    }).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      if (sortOrder === "Newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

  }, [transactions, search, monthFilter, categoryFilter, sortOrder]);

  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      const amount = Number(tx.amount) || 0;
      return tx.type === "income" ? acc + amount : acc - amount;
    }, 0);
  }, [transactions]);

  const displayLimit = useMemo(() => {
    if (editingTransaction && editingTransaction.type === "expense") {
      return totalBalance + (Number(editingTransaction.amount) || 0);
    }
    return totalBalance;
  }, [totalBalance, editingTransaction]);

  const handleEditTransaction = (trx) => {
    setEditingTransaction(trx);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSaveTransaction = async (data) => {
    try {
      const formData = new FormData();
      
      const authUserId = getAuthUserId();
      if (authUserId) {
        formData.append("user_id", authUserId);
      }

      formData.append("name", data.name);
      formData.append("amount", data.amount);
      formData.append("type", data.type);
      formData.append("category", data.category);
      if (data.description) {
        formData.append("description", data.description);
      }

      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, formData);
        toast.success("Transaction updated successfully!");
      } else {
        await createTransaction(formData);
        toast.success("Transaction added successfully!");
      }

      await refetch();
      handleCloseModal();
    } catch (err) {
      console.error(err.response?.data || err);
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(", ");
        toast.error(`Error: ${errorMessages}`);
      } else {
        const action = editingTransaction ? "update" : "add";
        toast.error(err.response?.data?.message || `Failed to ${action} transaction. Validasi form gagal.`);
      }
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      await refetch();
      toast.success("Transaction deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete transaction.");
    }
  };

  return (
    <div className="p-6 sm:p-10 flex flex-col gap-6 relative w-full">
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveTransaction} 
        limit={displayLimit}
        initialData={editingTransaction}
      />
      
      <TransactionHeader fadeUp={fadeUp} onAddTransaction={() => setIsModalOpen(true)} />
      
      <TransactionFilters 
        fadeUp={fadeUp} 
        search={search}
        setSearch={setSearch}
        monthFilter={monthFilter}
        setMonthFilter={setMonthFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <TransactionList 
        fadeUp={fadeUp} 
        transactions={filteredTransactions}
        loading={loading}
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />

    </div>
  );
}