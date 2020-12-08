import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  let location = useLocation();

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: "LOGIN" });
      history.replace(from);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div
        className={
          "flex flex-col border border-gray-100 rounded bg-white py-5 px-10 space-y-5" +
          (isLoading ? " animate-pulse  " : " ")
        }
      >
        <div className="text-2xl">Please, identify yourself</div>
        <div className="flex flex-col">
          <input
            type="text"
            className="border rounded-t h-8 pl-2 border-purple-200"
            placeholder="E-mail"
          ></input>
          <input
            type="text"
            className="border border-t-0 rounded-b h-8 pl-2 border-purple-200"
            placeholder="Password"
          ></input>
        </div>

        <div className="flex justify-center">
          <button
            onClick={login}
            className={
              "w-20 border rounded border-purple-500 px-2 py-1 ring-2" +
              (isLoading ? " cursor-not-allowed" : "")
            }
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
