import { useState, useEffect } from "react";
import { getGoals, getSavingsByGoal } from "../api/goals";

export function useGoalDetail(id) {
  const [goal, setGoal] = useState(null);
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingsLoading, setSavingsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setSavingsLoading(true);

    getGoals()
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        const found = all.find((g) => String(g.id) === String(id));
        setGoal(found ?? null);
        if (!found) setError(new Error("Goal tidak ditemukan"));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    getSavingsByGoal(id)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setSavings(data);
      })
      .catch(() => setSavings([]))
      .finally(() => setSavingsLoading(false));

  }, [id]);

  return { goal, savings, loading, savingsLoading, error, setSavings };
}