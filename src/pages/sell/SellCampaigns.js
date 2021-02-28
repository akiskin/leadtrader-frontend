import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import { getSellCampaigns } from "store/sellcampaigns/actions";
import LoadingSpinner from "common/components/LoadingSpinner";
import { readableStatus } from "common/consts/sellCampaigns";

const SellCampaigns = () => (
  <>
    <div className="flex flex-row">
      <div className="flex-1 mt-5 ml-6 mr-3">
        <div className="rounded bg-white px-3 py-1">
          <div className="flex flex-row items-center my-1 h-12">
            <Link to="/sell/new">
              <button className="bg-purple-500 text-white border rounded px-2 py-2">
                Start Selling
              </button>
            </Link>
            <span className="ml-3">Create new sell campaign</span>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-5 ml-3 mr-6"></div>
    </div>

    <div className="rounded bg-white py-1 mx-6 mt-6">
      <div className="mt-5 mx-6 font-semibold text-2xl">Sell Campaigns</div>
      <div className="mx-6 text-gray-400">
        Showing{" "}
        <span className="underline text-blue-500 cursor-pointer">all</span>{" "}
        campaigns. Click on a campaign to see details.
      </div>
      <div className="my-5">
        <SellCampaignList />
      </div>
    </div>
  </>
);

const SellCampaignList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, list } = useSelector((store) => store.sellcampaigns);

  useEffect(() => {
    dispatch(getSellCampaigns());
  }, [dispatch]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <table className="w-full border-collapse">
      <thead>
        <tr className="uppercase border-b-2 border-gray-100 text-gray-400">
          <th className="pl-6 font-normal text-left">Date</th>
          <th className="font-normal text-left">Status</th>
          <th className="font-normal text-left">Product</th>
          <th className="font-normal text-left">Total Leads</th>
          <th className="font-normal text-left"># Sold</th>
          <th className="font-normal text-left"># Rejected</th>
          <th className="font-normal text-left">$ Earned</th>
        </tr>
      </thead>
      <tbody>
        {list.map((campaign) => (
          <tr
            className="border-t border-gray-100 cursor-pointer hover:bg-gray-100"
            key={campaign.id}
            onClick={() => history.push(`/sell/${campaign.id}`)}
          >
            <td className="pl-6 py-3">{format(campaign.date, "d MMM yy")}</td>
            <td>{readableStatus(campaign.status)}</td>
            <td>{campaign.product.name}</td>
            <td>{campaign.leads_total}</td>
            <td>{campaign.leads_sold}</td>
            <td>{campaign.leads_rejected}</td>
            <td>{campaign.earned}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SellCampaigns;
