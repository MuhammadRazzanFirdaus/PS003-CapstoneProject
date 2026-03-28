import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Template from "../Template";
import Goals from "../pages/Goals";
import Transactions from "../pages/Transactions";
import Bills from "../pages/Bills";
import Notifications from "../pages/Notifications";

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
