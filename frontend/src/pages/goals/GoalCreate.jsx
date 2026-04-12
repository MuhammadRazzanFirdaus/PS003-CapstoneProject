import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { createGoal } from "../../api/fingo";
import { getAuthUserId } from "../../utils/auth";
import { toast } from "react-toastify";
import GoalImageUpload from "../../components/goal-create/GoalImageUpload";
import GoalFormFields from "../../components/goal-create/GoalFormFields";
import GoalRecommendation from "../../components/goal-create/GoalRecommendation";
import { useGoalCalculator } from "../../hooks/useGoalCalculator";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function GoalCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    target_amount: "",
    saving_amount: "",
    saving_period: "",
    initial_amount: "",
    target_date: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (file, preview) => {
    setImage(file);
    setImagePreview(preview);
  };

  const { calcDays, rec, alert, handleSelect } = useGoalCalculator(form, setForm);

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

      const formData = new FormData();
      Object.entries({ ...form, status, user_id: authUserId }).forEach(
        ([key, val]) => {
          if (val !== "") formData.append(key, val);
        },
      );
      if (image) formData.append("image", image);

      await createGoal(formData);
      toast.success("Goal berhasil ditambahkan!");
      navigate("/goals");
    } catch (err) {
      console.log("error response:", err.response?.data);
      const messages = err.response?.data?.errors;
      if (messages) {
        const first = Object.values(messages)[0];
        const errorMsg = Array.isArray(first) ? first[0] : first;
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg =
          err.response?.data?.message ?? "Gagal menyimpan goal. Coba lagi.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
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
        <h2 className="text-lg font-bold">Goal Information</h2>
        <GoalImageUpload
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
        />
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
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Goal"}
        </button>
      </motion.div>
    </div>
  );
}
