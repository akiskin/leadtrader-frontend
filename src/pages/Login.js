import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  let location = useLocation();

  const dispatch = useDispatch();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = (e) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch({ type: "LOGIN" });
      history.replace(from);
    }, 2000);
  };

  return (
    <div>
      <div className="text-4xl">Login Form</div>
      <form>
        <input type="text"></input>
        <button onClick={login}>Login</button>
      </form>
    </div>
  );
};

export default Login;
