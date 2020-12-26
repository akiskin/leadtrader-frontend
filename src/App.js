import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Modal from "react-modal";

import Links from "./sidebar/Links";
import routes from "./routes/index";
import { useDispatch, useSelector } from "react-redux";
import { checkIfLoggedIn } from "common/requests/auth";
import { ACTIONS } from "store/auth/actions";

//TODO implement storage of auth data - see https://github.com/upstatement/react-router-guards

Modal.setAppElement("#root");

const App = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function check() {
      const [loggedIn, user] = await checkIfLoggedIn();

      if (loggedIn) {
        dispatch({ type: ACTIONS.LOGIN_SUCCESS, user: user });
      }
      setChecked(true);
    }
    check();
  }, [dispatch]);

  if (checked) {
    return (
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
  } else {
    return null;
  }
};

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
