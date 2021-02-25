import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
  {
    path: "/login",
    main: Login,
    public: true,
  },
  {
    path: "/register",
    main: Register,
    public: true,
  },
];

export default routes;
