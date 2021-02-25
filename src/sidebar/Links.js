import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faMoneyBillAlt,
  faIdCard,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPowerOff,
  faCloudDownloadAlt,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "common/requests/auth";
import { ACTIONS } from "store/auth/actions";

const SidebarLinks = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  if (loggedIn) {
    return (
      <div className="pl-4 pr-4 space-y-2">
        <SingleLink to="/" text="Dashboard" icon={faChartBar} />
        <SingleLink to="/sell" text="Sell Campaigns" icon={faCloudUploadAlt} />
        <SingleLink to="/buy" text="Buy Campaigns" icon={faCloudDownloadAlt} />
        <SingleLink to="/" text="Finances" icon={faMoneyBillAlt} />
        <SingleLink to="/" text="My Account" icon={faIdCard} />
        <Logout />
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
        {"icon" in props ? (
          <div className="opacity-50 ml-3 text-gray-100">
            <FontAwesomeIcon icon={props.icon} size="2x" fixedWidth />
          </div>
        ) : null}
        <span className="ml-4 text-base uppercase text-gray-300 font-bold tracking-wide">
          {props.text}
        </span>
      </div>
    </Link>
  </div>
);

export const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    await logout();
    //TODO check if successfull
    dispatch({ type: ACTIONS.LOGOUT_SUCCESS });
  };

  return (
    <div className="h-12 w-full">
      <div
        onClick={handleClick}
        className="h-full rounded hover:bg-purple-400 flex flex-row items-center cursor-pointer"
      >
        <div className="opacity-50 ml-3 text-gray-100">
          <FontAwesomeIcon icon={faPowerOff} size="2x" fixedWidth />
        </div>
        <span className="ml-4 text-base uppercase text-gray-300 font-bold tracking-wide">
          Logout
        </span>
      </div>
    </div>
  );
};

export default SidebarLinks;
