import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { updateGoal, getGoalById } from "../../api/fingo";
import { getAuthUserId } from "../../utils/auth";
import GoalFormFields from "../../components/goal-create/GoalFormFields";
import GoalRecommendation from "../../components/goal-create/GoalRecommendation";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function GoalEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    category: "",
    target_amount: "",
    saving_amount: "",
    saving_period: "",
    initial_amount: "",
    target_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await getGoalById(id);
        const data = response.data.data;
        setForm({
          name: data.name || "",
          category: data.category || "",
          target_amount: data.target_amount || "",
          saving_amount: data.saving_amount || "",
          saving_period: data.saving_period || "",
          initial_amount: data.initial_amount || "",
          target_date: data.target_date ? data.target_date.split('T')[0] : "",
        });
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data goal.");
      } finally {
        setFetching(false);
      }
    };
    fetchGoal();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calcDays = () => {
    if (!form.target_date) return 0;
    return Math.max(
      1,
      Math.ceil(
        (new Date(form.target_date) - new Date()) / (1000 * 60 * 60 * 24),
      ),
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
    setForm((p) => ({ ...p, saving_amount: value, saving_period: period }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.target_amount || !form.target_date) {
      setError("Nama, target amount, dan target date wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const target = Number(form.target_amount) || 0;
      const initial = Number(form.initial_amount) || 0;
      const savingAmount = Number(form.saving_amount) || 0;
      const remaining = target - initial;

      const authUserId = getAuthUserId();
      if (!authUserId) {
        setError("Silakan login ulang sebelum membuat goal.");
        return;
      }

      const days = calcDays();
      const weeks = Math.max(1, Math.ceil(days / 7));
      const months = Math.max(1, Math.ceil(days / 30));

      let totalSaved = 0;
      if (form.saving_period === "daily") totalSaved = savingAmount * days;
      if (form.saving_period === "weekly") totalSaved = savingAmount * weeks;
      if (form.saving_period === "monthly") totalSaved = savingAmount * months;

      const status =
        savingAmount > 0 && totalSaved < remaining
          ? "not_achieved"
          : "in_progress";

      const payload = { ...form, status, user_id: authUserId };

      await updateGoal(id, payload);
      navigate(`/goals/${id}`);
    } catch (err) {
      console.log("error response:", err.response?.data);
      const messages = err.response?.data?.errors;
      if (messages) {
        const first = Object.values(messages)[0];
        setError(Array.isArray(first) ? first[0] : first);
      } else {
        setError(
          err.response?.data?.message ?? "Gagal menyimpan goal. Coba lagi.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-10 text-center text-gray-500">Loading goal details...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <MdArrowBackIos size={14} /> Back
        </button>
      </motion.div>

      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white rounded-2xl p-6 flex flex-col gap-6"
      >
        <h2 className="text-lg font-bold">Edit Goal</h2>
        <GoalFormFields form={form} onChange={handleChange} />
      </motion.div>

      {(rec || alert) && (
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl p-6"
        >
          <GoalRecommendation rec={rec} alert={alert} onSelect={handleSelect} />
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}

      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex justify-end gap-3"
      >
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : "Update Goal"}
        </button>
      </motion.div>
    </div>
  );
}
