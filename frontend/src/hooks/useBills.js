import { useState, useEffect, useCallback } from "react";
import { getBills } from "../api/fingo";
import { getAuthUserId } from "../utils/auth";

export function useBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBills = useCallback(() => {
    setLoading(true);
    const userId = getAuthUserId();
    const params = userId ? { user_id: userId } : {};

    getBills(params)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setBills(data);
      })
      .catch((err) => {
        console.error("Failed to fetch bills:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return { bills, loading, error, refetch: fetchBills };
}
