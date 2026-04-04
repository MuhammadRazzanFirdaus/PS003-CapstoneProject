import { useState, useEffect } from "react";
import { getGoals } from "../api/goals";

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGoals()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setGoals(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { goals, loading, error, setGoals };
}