import { Link } from "react-router-dom";

const SellCampaigns = () => (<>
  <div className="flex flex-row">
    <div className="flex-1 mt-5 ml-6 mr-3">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="flex flex-row items-center my-1 h-12">
          <Link to="/sell/new"><button className="bg-purple-500 text-white border rounded px-2 py-2">Start Selling</button></Link>
          <span className="ml-3">Create new Sell Campaign and upload your leads</span>
        </div>
      </div>
    </div>
    <div className="flex-1 mt-5 ml-3 mr-6">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="flex flex-row items-center my-1 h-12">
          <span className="ml-1">Links: <Link to="/catalogs/products"><span className="underline text-purple-500">Available Products</span></Link></span>
        </div>
      </div>
    </div>
  </div>

  <div className="flex flex-row">
    <div className="flex-1 mt-5 mx-6">Table</div>
  </div>
</>
);

export default SellCampaigns;
