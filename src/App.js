import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Additional links and info</div>,
    main: () => <h2>Home</h2>,
  },
  {
    path: "/dashboard",
    //sidebar: () => <div>dashboard!</div>,
    main: lazy(() => import("./pages/Dashboard")),
  },
];

const App = () => (
  <Router>
    <div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

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

      <div>
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
