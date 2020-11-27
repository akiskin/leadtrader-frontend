import { lazy } from "react";

import { ForgotPasswordLink } from "./sidebar/Links";

import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h2>Home</h2>,
    sidebar: () => (
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Additional links and info
      </div>
    ),
  },
  {
    path: "/login",
    main: Login,
    sidebar: ForgotPasswordLink,
    public: true,
  },
  {
    path: "/dashboard",
    main: lazy(() => import("./pages/Dashboard")),
  },
];

export default routes;
