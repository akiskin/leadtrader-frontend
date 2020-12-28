import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "common/components/LoadingSpinner";
import { getBuyCampaigns } from "store/buycampaigns/actions";

const BuyCampaigns = () => (
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
      <div className="flex-1 mt-5 ml-3 mr-6">
        <div className="rounded bg-white px-3 py-1">
          <div className="flex flex-row items-center my-1 h-12">
            <span className="ml-1">
              Links:{" "}
              <Link to="/catalogs/products">
                <span className="underline text-purple-500">
                  Available Products
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="rounded bg-white py-1 mx-6 mt-6">
      <div className="mt-5 mx-6 font-semibold text-2xl">All Buy Campaigns</div>
      <div className="mx-6 text-gray-400">
        Click on a campaign to see details
      </div>
      <div className="my-5">
        <BuyCampaignList />
      </div>
    </div>
  </>
);

const BuyCampaignList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, list } = useSelector((store) => store.buycampaigns);

  useEffect(() => {
    dispatch(getBuyCampaigns());
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
        </tr>
      </thead>
      <tbody>
        {list.map((campaign) => (
          <tr
            className="border-0 border-t border-gray-100 cursor-pointer hover:bg-gray-100"
            key={campaign.id}
            onClick={() => history.push(`/buy/${campaign.id}`)}
          >
            <td className="pl-6 py-3">{format(campaign.date, "d MMM yy")}</td>
            <td>{campaign.name}</td>
            <td>{campaign.status}</td>
            <td>
              {campaign.start} - {campaign.finish}
            </td>
            <td>{campaign.product.name}</td>
            <td>{campaign.budget}</td>
            <td>{campaign.budget_left}</td>
            <td>{campaign.leads_bought}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuyCampaigns;
