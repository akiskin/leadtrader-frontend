import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faMoneyBillAlt, faIdCard, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faPowerOff, faCloudDownloadAlt, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons"

const SidebarLinks = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  if (loggedIn) {
    return (
      <div className="pl-4 pr-4 space-y-2">
        <SingleLink to="/" text="Dashboard" icon={faChartBar} />
        <SingleLink to="/sell" text="Sell Campaigns" icon={faCloudUploadAlt} />
        <SingleLink to="/" text="Buy Camapigns" icon={faCloudDownloadAlt} />
        <SingleLink to="/" text="Finances" icon={faMoneyBillAlt} />
        <SingleLink to="/" text="My Account" icon={faIdCard} />
        <SingleLink to="/logout" text="Logout" icon={faPowerOff} />
      </div>
    );
  } else {
    return (
      <div className="pl-4 pr-4 space-y-2">
        <SingleLink to="/login" text="Login" icon={faIdCard} />
        <SingleLink to="/register" text="Register" icon={faPlusSquare} />
      </div>
    );
  }
};

const SingleLink = (props) => (
  <div className="h-12 w-full">
    <Link to={props.to}>
      <div className="h-full rounded hover:bg-purple-400 flex flex-row items-center">
        {'icon' in props ? <div className="opacity-50 ml-3 text-gray-100">
          <FontAwesomeIcon icon={props.icon} size="2x" fixedWidth />
        </div> : null}
        <span className="ml-4 text-base uppercase text-gray-300 font-bold tracking-wide">
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
