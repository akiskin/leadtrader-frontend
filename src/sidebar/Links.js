import { Link } from "react-router-dom";

const SidebarLinks = () => (
  <div className="pl-4 pr-4">
    <SingleLink to="/" text="Home" />
    <SingleLink to="/login" text="Login" />
    <SingleLink to="/dashboard" text="Dashboard" />
  </div>
);

const SingleLink = (props) => (
  <div className="h-12 w-full pt-1 pb-1">
    <Link to={props.to}>
      <div className="h-full rounded hover:bg-purple-400 flex items-center">
        <span className="ml-6 text-base uppercase text-gray-300 font-bold tracking-wide">
          {props.text}
        </span>
      </div>
    </Link>
  </div>
);

export const ForgotPasswordLink = () => (
  <div className="pl-4 pr-4">
    <SingleLink to="/" text="Forgot Password?" />
  </div>
);

export default SidebarLinks;
