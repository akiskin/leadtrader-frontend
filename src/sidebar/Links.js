import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faMoneyBillAlt,
  faIdCard,
  //faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPowerOff,
  faCloudDownloadAlt,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "common/requests/auth";
import { ACTIONS } from "store/auth/actions";

const SidebarLinks = (props) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  if (loggedIn) {
    return (
      <div
        className={
          props.minimized ? "pl-1 pr-1 space-y-2" : "pl-4 pr-4 space-y-2"
        }
      >
        <SingleLink
          to="/"
          text="Dashboard"
          icon={faChartBar}
          iconOnly={props.minimized}
        />
        <SingleLink
          to="/sell"
          text="Sell Campaigns"
          icon={faCloudUploadAlt}
          iconOnly={props.minimized}
        />
        <SingleLink
          to="/buy"
          text="Buy Campaigns"
          icon={faCloudDownloadAlt}
          iconOnly={props.minimized}
        />
        <SingleLink
          to="/finances"
          text="Finances"
          icon={faMoneyBillAlt}
          iconOnly={props.minimized}
        />
        <Logout iconOnly={props.minimized} />
      </div>
    );
  } else {
    //<SingleLink to="/register" text="Register" icon={faPlusSquare} />
    return (
      <div
        className={
          props.minimized ? "pl-1 pr-1 space-y-2" : "pl-4 pr-4 space-y-2"
        }
      >
        <SingleLink
          to="/login"
          text="Login"
          icon={faIdCard}
          iconOnly={props.minimized}
        />
      </div>
    );
  }
};

const SingleLink = (props) => (
  <div className="h-12 w-full">
    <Link to={props.to}>
      <div className="h-full rounded hover:bg-purple-400 flex flex-row items-center">
        {"icon" in props ? (
          <div
            className={
              props.iconOnly
                ? "opacity-50 text-gray-100"
                : "opacity-50 ml-3 text-gray-100"
            }
            title={props.text}
          >
            <FontAwesomeIcon icon={props.icon} size="2x" fixedWidth />
          </div>
        ) : null}
        {props.iconOnly ? null : (
          <span className="ml-4 text-base uppercase text-gray-300 font-bold tracking-wide">
            {props.text}
          </span>
        )}
      </div>
    </Link>
  </div>
);

export const Logout = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = async () => {
    await logout();

    history.push("/");
    dispatch({ type: ACTIONS.LOGOUT_SUCCESS });
  };

  return (
    <div className="h-12 w-full">
      <div
        onClick={handleClick}
        className="h-full rounded hover:bg-purple-400 flex flex-row items-center cursor-pointer"
      >
        <div
          className={
            props.iconOnly
              ? "opacity-50 text-gray-100"
              : "opacity-50 ml-3 text-gray-100"
          }
          title="Logout"
        >
          <FontAwesomeIcon icon={faPowerOff} size="2x" fixedWidth />
        </div>
        {props.iconOnly ? null : (
          <span className="ml-4 text-base uppercase text-gray-300 font-bold tracking-wide">
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default SidebarLinks;
