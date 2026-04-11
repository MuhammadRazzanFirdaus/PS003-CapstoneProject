import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import TransactionHeader from "../components/transactions/TransactionHeader";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

import { MOCK_TRANSACTIONS } from "../utils/mockData";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("All Time");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortOrder, setSortOrder] = useState("Newest");

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((trx) => {
      const matchesSearch = trx.title.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = categoryFilter === "All Categories" || trx.category === categoryFilter;

      let matchesMonth = true;
      if (monthFilter === "This Month") {
        const trxDate = new Date(trx.timestamp);
        const now = new Date();
        matchesMonth = 
          trxDate.getMonth() === now.getMonth() && 
          trxDate.getFullYear() === now.getFullYear();
      }

      return matchesSearch && matchesCategory && matchesMonth;
    }).sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      if (sortOrder === "Newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

  }, [search, monthFilter, categoryFilter, sortOrder]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <TransactionHeader fadeUp={fadeUp} />
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
      />
    </div>
  );
}