import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "store/products/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  getSellCampaignDetails,
  updateSellCampaign,
} from "common/requests/sellcampaigns";

const NewSellCampaign = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { list: products } = useSelector((store) => store.products);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [expiration, setExpiration] = useState("");
  const [validationFailed, setValidationFailed] = useState(false);

  const getDashboard = async (id) => {
    const [success, data] = await getSellCampaignDetails(id);

    if (success) {
      const sellCampaign = data.general;

      setSelectedProductId(sellCampaign.product_id ?? "");
      setStopPrice(sellCampaign.stop_price ?? 1);
      setExpiration(sellCampaign.expiration ?? 7);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    } else {
      getDashboard(id);
    }
  }, [dispatch, id, products.length]);

  const history = useHistory();

  if (selectedProductId === "" && products.length > 0) {
    setSelectedProductId(products[0].id);
  }

  const create = async () => {
    if (selectedProductId !== "" && stopPrice && expiration) {
      setValidationFailed(false);

      setIsLoading(true);

      const [success] = await updateSellCampaign(id, {
        product_id: selectedProductId,
        stop_price: stopPrice,
        expiration,
      });

      if (success) {
        history.push(`/sell/${id}`);
      } else {
        setIsLoading(false);
      }
    } else {
      setValidationFailed(true);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col border border-gray-100 rounded bg-white py-5 px-10 space-y-5 w-1/3">
        <div className="text-2xl">Edit Sell Campaign</div>
        <div className="flex flex-col space-y-4">
          <div>
            <div className="pb-1 uppercase text-gray-500">Product</div>
            <div>
              <select
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              Product determines market (country, currency) and basic filtering
            </div>
          </div>

          <div>
            <div className="pb-1 uppercase text-gray-500">Stop Price</div>
            <div>
              <input
                type="number"
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                placeholder="Stop Price"
                step="0.01"
                min="0.01"
                max="100"
                value={stopPrice}
                onChange={(e) => setStopPrice(e.target.value)}
              ></input>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              Leads won't be sold for price lower than this
            </div>
          </div>

          <div>
            <div className="pb-1 uppercase text-gray-500">Expiration</div>
            <div>
              <input
                type="number"
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                placeholder="Expiration"
                step="1"
                min="1"
                max="30"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
              ></input>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              For how many days we will be trying to sell a lead
            </div>
          </div>
        </div>

        <div className="flex justify-center h-10 items-center">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <button
              onClick={create}
              className={
                "w-40 border rounded px-2 py-1 ring-2 " +
                (validationFailed
                  ? "border-red-500 ring-red-200"
                  : "border-purple-500 ring-purple-200")
              }
            >
              Update campaign
            </button>
          )}
        </div>

        <div className="text-gray-500">
          <Link to="/sell">← Back</Link>
        </div>
      </div>
    </div>
  );
};

export default NewSellCampaign;
