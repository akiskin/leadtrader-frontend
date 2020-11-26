import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Links, { ForgotPasswordLink } from "./sidebar/Links";

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
    main: () => <h2>Login</h2>,
    sidebar: ForgotPasswordLink,
  },
  {
    path: "/dashboard",
    main: lazy(() => import("./pages/Dashboard")),
  },
];

const App = () => (
  <Router>
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-64 flex-shrink-0 bg-purple-500 h-screen justify-between">
        <Links />
        <Switch>
          {routes.map((route, index) =>
            "sidebar" in route ? (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ) : null
          )}
        </Switch>
      </div>

      <div className="flex-1 bg-gray-500">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </Suspense>
      </div>
    </div>
  </Router>
);

export default App;
