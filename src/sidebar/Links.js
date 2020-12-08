import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const SidebarLinks = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  if (loggedIn) {
    return (
      <div className="pl-4 pr-4 space-y-2">
        <div>Welcome</div>
        <SingleLink to="/" text="Home" icon={faClock} />
        <SingleLink to="/dashboard" text="Dashboard" icon={faClock} />
        <SingleLink to="/logout" text="Logout" icon={faClock} />
      </div>
    );
  } else {
    return (
      <div className="pl-4 pr-4 space-y-2">
        <SingleLink to="/login" text="Login" icon={faClock} />
        <SingleLink to="/register" text="Register" icon={faClock} />
      </div>
    );
  }
};

const SingleLink = (props) => (
  <div className="h-12 w-full">
    <Link to={props.to}>
      <div className="h-full rounded hover:bg-purple-400 flex flex-row items-center">
        <div className="opacity-50 ml-3 text-gray-100">
          <FontAwesomeIcon icon={props.icon} size="2x" />
        </div>
        <span className="ml-6 text-base uppercase text-gray-300 font-bold tracking-wide">
          {props.text}
        </span>
      </div>
    </Link>
  </div>
);

export const ForgotPasswordLink = () => (
  <div className="pl-4 pr-4">
    <SingleLink to="/" text="Forgot Password?" icon={faClock} />
  </div>
);

export default SidebarLinks;
