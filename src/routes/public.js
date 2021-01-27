import { ForgotPasswordLink } from "../sidebar/Links";

import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
  {
    path: "/login",
    main: Login,
    sidebar: ForgotPasswordLink,
    public: true,
  },
  {
    path: "/register",
    main: Register,
    sidebar: ForgotPasswordLink,
    public: true,
  },
];

export default routes;
