import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Template from "../Template";
import Goals from "../pages/goals/Goals";
import Transactions from "../pages/Transactions";
import Bills from "../pages/Bills";
import Notifications from "../pages/Notifications";
import GoalDetail from "../pages/goals/GoalDetail";
import GoalSavingsList from "../pages/goals/GoalSavingsList";
import GoalCreate from "../pages/goals/GoalCreate";
import GoalEdit from "../pages/goals/GoalEdit";
import { isAuthenticated } from "../utils/auth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";

function ProtectedLayout() {
  return isAuthenticated() ? <Template /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/goals",
        element: <Goals />,
      },
      {
        path: "/goals/create",
        element: <GoalCreate />,
      },
      {
        path: "/goals/:id",
        element: <GoalDetail />,
      },
      {
        path: "/goals/:id/savings",
        element: <GoalSavingsList />,
      },
      {
        path: "/goals/:id/edit",
        element: <GoalEdit />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/bills",
        element: <Bills />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
