import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Template from "../Template";
import Goals from "../pages/goal-page/Goals";
import Transactions from "../pages/Transactions";
import Bills from "../pages/Bills";
import Notifications from "../pages/Notifications";
import GoalDetail from "../pages/goal-page/GoalDetail";
import GoalCreate from "../pages/goal-page/GoalCreate";
import GoalEdit from "../pages/goal-page/GoalEdit";
import { isAuthenticated } from "../utils/auth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function ProtectedLayout() {
  return isAuthenticated() ? <Template /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
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
    ],
  },
]);
