import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Links from "./sidebar/Links";
import routes from "./routes/index";
import { useSelector } from "react-redux";

//TODO implement storage of auth data - see https://github.com/upstatement/react-router-guards

const App = () => (
  <Router>
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-64 flex-shrink-0 h-screen justify-between bg-gradient-to-b from-purple-500 to-purple-400">
        <div className="pt-4">
          <Links />
        </div>

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

      <div className="flex-1 bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, index) =>
              "public" in route && route.public ? (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ) : (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              )
            )}
          </Switch>
        </Suspense>
      </div>
    </div>
  </Router>
);

const PrivateRoute = ({ children, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
