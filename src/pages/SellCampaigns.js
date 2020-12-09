import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SellCampaigns = () => (
  <>
    <div className="flex flex-row">
      <div className="flex-1 mt-5 ml-6 mr-3">
        <div className="rounded border border-gray-100 bg-white px-3 py-1">
          <div className="flex flex-row items-center my-1 h-12">
            <Link to="/sell/new">
              <button className="bg-purple-500 text-white border rounded px-2 py-2">
                Start Selling
              </button>
            </Link>
            <span className="ml-3">
              Create new Sell Campaign and upload your leads
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-5 ml-3 mr-6">
        <div className="rounded border border-gray-100 bg-white px-3 py-1">
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

    <div className="border rounded border-gray-100 bg-white py-1 mx-6 mt-6">
      <div className="mt-5 mx-6 font-semibold text-2xl">All Sell Campaigns</div>
      <div className="mx-6 text-gray-400">
        Click on a campaign to see details
      </div>
      <div className="my-5">
        <SellCampaignList />
      </div>
    </div>
  </>
);

const SellCampaignList = (props) => {
  const [isLoading, setLoading] = useState(true);

  return isLoading ? (
    <div className="text-center">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
    </div>
  ) : (
    <table>dff</table>
  );
};

export default SellCampaigns;
