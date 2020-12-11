import { ForgotPasswordLink } from "../sidebar/Links";

import Login from "../pages/Login";

const routes = [
  {
    path: "/login",
    main: Login,
    sidebar: ForgotPasswordLink,
    public: true,
  },
];

export default routes;
