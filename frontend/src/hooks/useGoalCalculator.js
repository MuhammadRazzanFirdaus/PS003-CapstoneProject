export function useGoalCalculator(form, setForm) {
  const calcDays = () => {
    if (!form.target_date) return 0;
    return Math.max(
      1,
      Math.ceil((new Date(form.target_date) - new Date()) / (1000 * 60 * 60 * 24))
    );
  };

  const getRecAndAlert = () => {
    const target = Number(form.target_amount) || 0;
    const initial = Number(form.initial_amount) || 0;
    const savingAmount = Number(form.saving_amount) || 0;
    const remaining = target - initial;

    if (!form.target_date || remaining <= 0) return { rec: null, alert: null };

    const days = calcDays();
    const weeks = Math.max(1, Math.ceil(days / 7));
    const months = Math.max(1, Math.ceil(days / 30));

    if (savingAmount > 0 && form.saving_period) {
      let totalSaved = 0;
      if (form.saving_period === "daily") totalSaved = savingAmount * days;
      if (form.saving_period === "weekly") totalSaved = savingAmount * weeks;
      if (form.saving_period === "monthly") totalSaved = savingAmount * months;

      if (totalSaved < remaining) {
        const shortfall = remaining - totalSaved;
        return {
          rec: null,
          alert: `Dengan menabung Rp${savingAmount.toLocaleString("id-ID")}/${form.saving_period} kamu masih kurang Rp${shortfall.toLocaleString("id-ID")} untuk mencapai target.`,
        };
      }

      return { rec: null, alert: null };
    }

    return {
      rec: {
        daily: Math.ceil(remaining / days),
        weekly: days >= 7 ? Math.ceil(remaining / weeks) : null,
        monthly: days >= 30 ? Math.ceil(remaining / months) : null,
      },
      alert: null,
    };
  };

  const { rec, alert } = getRecAndAlert();

  const handleSelect = (value, period) => {
    if (setForm) {
      setForm((p) => ({ ...p, saving_amount: value, saving_period: period }));
    }
  };

  return { calcDays, rec, alert, handleSelect };
}
