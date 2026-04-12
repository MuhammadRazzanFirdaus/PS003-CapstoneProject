import { useState, useEffect, useCallback } from "react";
import { getTransactions } from "../api/fingo";
import { getAuthUserId } from "../utils/auth";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(() => {
    setLoading(true);
    const userId = getAuthUserId();
    const params = userId ? { user_id: userId } : {};

    getTransactions(params)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setTransactions(data);
      })
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
}
