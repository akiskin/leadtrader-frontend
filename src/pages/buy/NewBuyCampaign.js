import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "store/products/actions";
import { createBuyCampaign } from "store/buycampaigns/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";

const NewBuyCampaign = () => {
  const dispatch = useDispatch();

  const { list: products } = useSelector((store) => store.products);
  const { isCreating } = useSelector((store) => store.buycampaigns);

  const [name, setName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [maxPrice, setMaxPrice] = useState(1);
  const [budget, setBudget] = useState(0);
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");

  const [validationFailed, setValidationFailed] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const history = useHistory();

  if (selectedProductId === "" && products.length > 0) {
    setSelectedProductId(products[0].id);
  }

  const create = () => {
    if (selectedProductId !== "" && maxPrice && budget && name.length > 0) {
      setValidationFailed(false);
      dispatch(
        createBuyCampaign(
          name,
          selectedProductId,
          maxPrice,
          budget,
          start,
          finish,
          history
        )
      );
    } else {
      setValidationFailed(true);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col border border-gray-100 rounded bg-white py-5 px-10 space-y-5 w-1/3">
        <div className="text-2xl">Create new Buy Campaign</div>
        <div className="flex flex-col space-y-4">
          <div>
            <div className="pb-1 uppercase text-gray-500">Name</div>
            <div>
              <input
                type="text"
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              Description for better identification, ie:{" "}
              <span className="italic">Dec - small pers loans</span>
            </div>
          </div>

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
            <div className="pb-1 uppercase text-gray-500">Max Price</div>
            <div>
              <input
                type="number"
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                placeholder="Max Price"
                step="0.01"
                min="0.01"
                max="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              ></input>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              Leads won't be bought for price higher than this
            </div>
          </div>

          <div>
            <div className="pb-1 uppercase text-gray-500">Budget</div>
            <div>
              <input
                type="number"
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                placeholder="Budget"
                step="0.01"
                min="0.01"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              ></input>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              Total budget ($) for this campaign.
            </div>
          </div>

          <div>
            <div className="pb-1 uppercase text-gray-500">Start</div>
            <div>
              <input
                type="date"
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                placeholder="Start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              ></input>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              When buying process commences. Optional.
            </div>
          </div>

          <div>
            <div className="pb-1 uppercase text-gray-500">Finish</div>
            <div>
              <input
                type="date"
                className="border rounded h-8 pl-2 border-purple-200 w-full"
                placeholder="Finish"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
              ></input>
            </div>
            <div className="pt-1 text-sm break-normal text-gray-500">
              When buying process finishes. Optional.
            </div>
          </div>
        </div>

        <div className="flex justify-center h-10 items-center">
          {isCreating ? (
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
              Create campaign
            </button>
          )}
        </div>

        <div className="text-gray-500">
          <Link to="/buy">← Back</Link>
        </div>
      </div>
    </div>
  );
};

export default NewBuyCampaign;
