import api from "./axios";

// Goals
export const getGoals = () => api.get("/goals");
export const getGoalById = (id) => api.get(`/goals/${id}`);
export const createGoal = (data) => api.post("/goals", data);
export const updateGoal = (id, data) => api.put(`/goals/${id}`, data);
export const deleteGoal = (id) => api.delete(`/goals/${id}`);

// Savings
export const createSaving = (goalId, data) => api.post(`/goals/${goalId}/savings`, data);
export const getSavingsByGoal = (goalId) => api.get(`/goals/${goalId}/savings`);
export const getSaving = (savingId) => api.get(`/savings/${savingId}`);
export const updateSaving = (savingId, data) => api.put(`/savings/${savingId}`, data);
export const deleteSaving = (savingId) => api.delete(`/savings/${savingId}`);