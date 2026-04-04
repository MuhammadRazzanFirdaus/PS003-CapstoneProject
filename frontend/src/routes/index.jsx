import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Template from "../Template";
import Goals from "../pages/goal-page/Goals";
import Transactions from "../pages/Transactions";
import Bills from "../pages/Bills";
import Notifications from "../pages/Notifications";
import GoalDetail from "../pages/goal-page/GoalDetail";
import GoalCreate from "../pages/goal-page/GoalCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
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
