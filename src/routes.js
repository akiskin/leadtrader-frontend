import { lazy } from "react";

import { ForgotPasswordLink } from "./sidebar/Links";

import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    exact: true,
    main: lazy(() => import("./pages/Dashboard")),
    sidebar: () => (
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Additional links and info
      </div>
    ),
  },
  {
    path: "/sell",
    exact: true,
    main: lazy(() => import("./pages/SellCampaigns"))
  },
  {
    path: "/login",
    main: Login,
    sidebar: ForgotPasswordLink,
    public: true,
  },
];

export default routes;
