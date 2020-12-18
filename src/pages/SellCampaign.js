import { useParams } from "react-router-dom";

const SellCampaign = (props) => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default SellCampaign;
