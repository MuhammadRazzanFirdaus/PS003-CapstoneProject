import { useState, useEffect } from "react";
import { getGoals } from "../api/fingo";
import { getAuthUserId } from "../utils/auth";

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = getAuthUserId();
    const params = userId ? { user_id: userId } : {};

    getGoals(params)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setGoals(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { goals, loading, error, setGoals };
}