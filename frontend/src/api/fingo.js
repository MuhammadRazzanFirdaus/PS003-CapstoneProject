import api from "./axios";

// Auth
export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);
export const logout = () => api.post("/logout");

// Goals
export const getGoals = (params) => api.get("/goals", { params });
export const getGoalById = (id) => api.get(`/goals/${id}`);
export const createGoal = (data) => api.post("/goals", data);
export const updateGoal = (id, data) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    return api.post(`/goals/${id}`, data);
  }
  return api.put(`/goals/${id}`, data);
};
export const deleteGoal = (id) => api.delete(`/goals/${id}`);

export const getCurrentUser = () => api.get("/user");

// Savings
export const createSaving = (goalId, data) =>
  api.post(`/goals/${goalId}/savings`, data);
export const getSavingsByGoal = (goalId) => api.get(`/goals/${goalId}/savings`);
export const getSaving = (savingId) => api.get(`/savings/${savingId}`);
export const updateSaving = (savingId, data) =>
  api.put(`/savings/${savingId}`, data);
export const deleteSaving = (savingId) => api.delete(`/savings/${savingId}`);

// Transactions
export const getTransactions = (params) => api.get("/transactions", { params });
export const createTransaction = (data) => api.post("/transactions", data);
export const updateTransaction = (id, data) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    return api.post(`/transactions/${id}`, data);
  }
  return api.put(`/transactions/${id}`, data);
};
export const deleteTransaction = (transactionId) => api.delete(`/transactions/${transactionId}`);

// Bills
export const getBills = (params) => api.get("/bills", { params });
export const createBill = (data) => api.post("/bills", data);
export const updateBill = (id, data) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    return api.post(`/bills/${id}`, data);
  }
  return api.put(`/bills/${id}`, data);
};
export const deleteBill = (id) => api.delete(`/bills/${id}`);
export const updateBillStatus = (id, isPaid) =>
  api.patch(`/bills/${id}/status`, { is_paid: isPaid ? 1 : 0 });// Notifications
export const getNotifications = (params) => api.get("/notifications", { params });
export const markNotificationAsRead = (id) => api.patch(`/notifications/${id}/read`);
