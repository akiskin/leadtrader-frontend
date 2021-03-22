import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "common/components/LoadingSpinner";
import { getBuyCampaigns } from "store/buycampaigns/actions";
import { readableStatus } from "common/consts/buyCampaigns";
import { getProducts } from "store/products/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const BuyCampaigns = () => {
  const [showActiveOny, setShowActiveOnly] = useState(false);

  const enabledFilterClasses =
    "underline text-blue-500 font-bold cursor-pointer";
  const disabledFilterClasses =
    "underline text-gray-400 font-light cursor-pointer";

  return (
    <>
      <div className="flex flex-row">
        <div className="flex-1 mt-5 ml-6 mr-3">
          <div className="rounded bg-white px-3 py-1">
            <div className="flex flex-row items-center my-1 h-12">
              <Link to="/buy/new">
                <button className="bg-purple-500 text-white border rounded px-2 py-2">
                  Start Buying
                </button>
              </Link>
              <span className="ml-3">
                Create new Buy Campaign and set your rules
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-5 ml-3 mr-6"></div>
      </div>

      <div className="rounded bg-white py-1 mx-6 mt-6">
        <div className="mt-5 mx-6 font-semibold text-2xl">Buy Campaigns</div>
        <div className="mx-6 text-gray-400">
          Showing{" "}
          <span
            className={
              showActiveOny ? disabledFilterClasses : enabledFilterClasses
            }
            onClick={() => setShowActiveOnly(!showActiveOny)}
          >
            all
          </span>{" "}
          <span
            className={
              !showActiveOny ? disabledFilterClasses : enabledFilterClasses
            }
            onClick={() => setShowActiveOnly(!showActiveOny)}
          >
            active
          </span>{" "}
          campaigns. Click on a campaign to see details.
        </div>
        <div className="my-5">
          <BuyCampaignList activeOnly={showActiveOny} />
        </div>
      </div>
    </>
  );
};

const BuyCampaignList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, list } = useSelector((store) => store.buycampaigns);

  useEffect(() => {
    dispatch(getBuyCampaigns());
    dispatch(getProducts());
  }, [dispatch]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <table className="w-full border-collapse">
      <thead>
        <tr className="uppercase border-b-2 border-gray-100 text-gray-400">
          <th className="pl-6 font-normal text-left">Created</th>
          <th className="font-normal text-left">Name</th>
          <th className="font-normal text-left">Status</th>
          <th className="font-normal text-left">Period</th>
          <th className="font-normal text-left">Product</th>
          <th className="font-normal text-left">Budget</th>
          <th className="font-normal text-left">Budget Left</th>
          <th className="font-normal text-left"># Bought</th>
          <th className="font-normal text-left pr-2"></th>
        </tr>
      </thead>
      <tbody>
        {list
          .filter((campaign) => !props.activeOnly || campaign.status === 10)
          .map((campaign) => (
            <tr
              className="border-0 border-t border-gray-100 hover:bg-gray-100"
              key={campaign.id}
            >
              <td
                className="pl-6 py-3 cursor-pointer"
                onClick={() => history.push(`/buy/${campaign.id}`)}
              >
                {format(campaign.date, "d MMM yy")}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => history.push(`/buy/${campaign.id}`)}
              >
                {campaign.name}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => history.push(`/buy/${campaign.id}`)}
              >
                {readableStatus(campaign.status)}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => history.push(`/buy/${campaign.id}`)}
              >
                {campaign.start} - {campaign.finish}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => history.push(`/buy/${campaign.id}`)}
              >
                {campaign.product ? campaign.product.name : null}
              </td>
              <td>$ {campaign.budget}</td>
              <td>$ {campaign.budget - (campaign.budget_spent ?? 0)}</td>
              <td>{campaign.leads_bought}</td>
              <td className="pr-2">
                <Link
                  to={{
                    pathname: "/buy/new",
                    state: { fromCampaign: campaign },
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCopy}
                    size="sm"
                    className="text-gray-600"
                    title="Copy as new campaign"
                  />
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BuyCampaigns;
