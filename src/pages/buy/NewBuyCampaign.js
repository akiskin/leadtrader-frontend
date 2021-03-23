import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "store/products/actions";
import { createBuyCampaign } from "store/buycampaigns/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { DECISION_POINTS } from "common/consts/buyRules";

const NewBuyCampaign = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { list: products } = useSelector((store) => store.products);
  const { isCreating } = useSelector((store) => store.buycampaigns);

  const [name, setName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [maxPrice, setMaxPrice] = useState(1);
  const [budget, setBudget] = useState(0);
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [rules, setRules] = useState([]);

  const [validationFailed, setValidationFailed] = useState(false);
  const [showingNewRule, setShowingNewRule] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    } else {
      if (
        "state" in location &&
        location.state &&
        "fromCampaign" in location.state
      ) {
        const prev = location.state.fromCampaign;
        setSelectedProductId(prev.product_id ?? "");
        setMaxPrice(prev.max_price ?? 1);
        setBudget(prev.budget ?? 0);
        setStart(prev.start ?? "");
        setFinish(prev.finish ?? "");
        setRules(prev.buy_rules ?? []);
      }
    }
  }, [dispatch, products.length, location]);

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
          rules,
          history
        )
      );
    } else {
      setValidationFailed(true);
    }
  };

  const addBuyRule = (name, operator, value) => {
    setRules([...rules, [name, operator, value]]);
    setShowingNewRule(false);
  };

  const cancelAddingBuyRule = () => {
    setShowingNewRule(false);
  };

  const deleteBuyRule = (index) => {
    const localRules = [...rules];
    localRules.splice(index, 1);
    setRules(localRules);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col border border-gray-100 rounded bg-white py-5 px-10 space-y-5 w-3/4">
        <div className="text-2xl">Create new Buy Campaign</div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col space-y-4 w-1/2 mr-2">
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
          <div className="flex flex-col space-y-4 w-1/2 ml-2">
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
                Product determines market (country, currency) and basic
                filtering
              </div>
            </div>

            <div>
              <div className="pb-1 uppercase text-gray-500">
                Additional Lead Selection Rules
              </div>
              <BuyRules rules={rules} delete={deleteBuyRule} />
              {showingNewRule ? (
                <NewBuyRule save={addBuyRule} cancel={cancelAddingBuyRule} />
              ) : (
                <button
                  onClick={(e) => setShowingNewRule(true)}
                  className={
                    "border rounded px-1 py-1 my-2 border-purple-200 hover:bg-purple-200"
                  }
                >
                  Add rule
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center h-10 items-center">
          {isCreating ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <>
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
              {validationFailed ? (
                <div>Fill Name, Max price, and Budget</div>
              ) : null}
            </>
          )}
        </div>

        <div className="text-gray-500">
          <Link to="/buy">← Back</Link>
        </div>
      </div>
    </div>
  );
};

const BuyRules = (props) => {
  return (
    <div className="divide-y">
      {props.rules.map((rule, i) => (
        <div key={i} className="p-2 flex flex-row justify-between">
          <div>
            <span>{DECISION_POINTS[rule[0]].presentation}</span>{" "}
            <span>{rule[1]}</span> <span>{rule[2]}</span>
          </div>
          <div
            className="text-red-900 cursor-pointer"
            onClick={(e) => props.delete(i)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </div>
      ))}
    </div>
  );
};

const NewBuyRule = (props) => {
  const [dp, setDp] = useState("");
  const [op, setOp] = useState("");
  const [value, setValue] = useState(0);

  const onDpChange = (e) => {
    const selectedDp = e.target.value;

    setDp(selectedDp);
    setOp(DECISION_POINTS[selectedDp].operators[0]);
    setValue(0);
  };

  const onSave = (e) => {
    if (dp && op) {
      props.save(dp, op, value);
    }
  };

  return (
    <div className="border border-gray-100 rounded p-2 flex flex-row justify-between">
      <div className="space-x-2">
        <select
          value={dp}
          onChange={onDpChange}
          className="appearance-none hover:shadow-inner border overflow-hidden overflow-ellipsis w-2/3"
        >
          <option value="">--select--</option>
          {Object.keys(DECISION_POINTS).map((key) => (
            <option
              key={key}
              value={key}
              className=" w-full overflow-ellipsis overflow-hidden"
            >
              {DECISION_POINTS[key].presentation}
            </option>
          ))}
        </select>
        <select
          value={op}
          onChange={(e) => setOp(e.target.value)}
          className="appearance-none hover:shadow-inner border"
        >
          {dp
            ? DECISION_POINTS[dp].operators.map((operator, i) => (
                <option key={i} value={operator}>
                  {operator}
                </option>
              ))
            : null}
        </select>
        <input
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-14 hover:shadow-inner border"
        ></input>
      </div>
      <div className="text-green-700 cursor-pointer" onClick={onSave}>
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div className="text-red-900 cursor-pointer pl-1" onClick={props.cancel}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    </div>
  );
};

export default NewBuyCampaign;
