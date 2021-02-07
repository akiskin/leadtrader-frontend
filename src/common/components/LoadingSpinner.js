import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = (props) => (
  <div className="text-center">
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      size={"size" in props ? props.size : "2x"}
    />
  </div>
);

export default LoadingSpinner;
