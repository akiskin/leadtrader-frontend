import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { getDashboard } from "common/requests/dashboard";

const DashboardPage = () => {
  const [data, setData] = useState({});

  const getApiData = async () => {
    const [success, apiData] = await getDashboard();
    if (success) {
      setData(apiData);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return Object.keys(data).length > 0 ? <Dashboard data={data} /> : null;
};

const Dashboard = (props) => (
  <div className="flex flex-row">
    <div className="flex-1 mt-5 ml-6 mr-3">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="text-lg font-semibold uppercase tracking-wide">
          Sell statistics
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="w-5/12"></div>
          <div className="flex flex-row w-7/12 text-gray-500 italic">
            <div className="w-1/2">MTD</div>
            <div className="w-1/2">YTD</div>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="flex flex-col w-5/12">
            <div className="flex flex-row items-center">
              <div className="rounded-full h-4 w-4 bg-blue-400 mr-2" />
              Uploaded
            </div>
          </div>
          <div className="flex flex-row w-7/12">
            <div className="w-1/2">{props.data.uploaded.mtd.count}</div>
            <div className="w-1/2">{props.data.uploaded.ytd.count}</div>
          </div>
        </div>

        <div className="my-2">
          <hr />
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="flex flex-col w-5/12">
            <div className="flex flex-row items-center">
              <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
              Sold
            </div>
            <div className="ml-6 text-gray-500">Total</div>
            <div className="ml-6 text-gray-500">Commission</div>
            <div className="ml-6 text-gray-500">Net</div>
            <div className="ml-6 text-gray-500 italic">avg sell price</div>
          </div>
          <div className="flex flex-row w-7/12">
            <div className="w-1/2">
              <div>{props.data.sold.mtd.count}</div>
              <div>$ {props.data.sold.mtd.amount}</div>
              <div>$ {props.data.sold.mtd.commission}</div>
              <div>
                $ {props.data.sold.mtd.amount - props.data.sold.mtd.commission}
              </div>
              <div>
                ${" "}
                {props.data.sold.mtd.count === 0
                  ? 0
                  : Math.round(
                      (props.data.sold.mtd.amount / props.data.sold.mtd.count) *
                        100
                    ) / 100}
              </div>
            </div>
            <div className="w-1/2">
              <div>{props.data.sold.ytd.count}</div>
              <div>$ {props.data.sold.ytd.amount}</div>
              <div>$ {props.data.sold.ytd.commission}</div>
              <div>
                $ {props.data.sold.ytd.amount - props.data.sold.ytd.commission}
              </div>
              <div>
                ${" "}
                {props.data.sold.ytd.count === 0
                  ? 0
                  : Math.round(
                      (props.data.sold.ytd.amount / props.data.sold.ytd.count) *
                        100
                    ) / 100}
              </div>
            </div>
          </div>
        </div>

        <div className="my-2">
          <hr />
        </div>
        <div className="flex flex-row items-center mt-1">
          <div className="mr-2 opacity-40">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="text-sm text-gray-500">Updated just now</div>
        </div>
      </div>
    </div>

    <div className="flex-1 mt-5 ml-3 mr-6">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="text-lg font-semibold uppercase tracking-wide">
          Buy statistics
        </div>
        <div className="flex flex-row items-center mt-1">
          <div className="w-5/12"></div>
          <div className="flex flex-row w-7/12 text-gray-500 italic">
            <div className="w-1/2">MTD</div>
            <div className="w-1/2">YTD</div>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="flex flex-col w-5/12">
            <div className="flex flex-row items-center">
              <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
              Bought
            </div>
            <div className="ml-6 text-gray-500">Total</div>
            <div className="ml-6 text-gray-500">Commission</div>
            <div className="ml-6 text-gray-500">Net</div>
            <div className="ml-6 text-gray-500 italic">avg buy price</div>
          </div>
          <div className="flex flex-row w-7/12">
            <div className="w-1/2">
              <div>{props.data.bought.mtd.count}</div>
              <div>$ {props.data.bought.mtd.amount}</div>
              <div>$ {props.data.bought.mtd.commission}</div>
              <div>
                ${" "}
                {props.data.bought.mtd.amount +
                  props.data.bought.mtd.commission}
              </div>
              <div>
                ${" "}
                {props.data.bought.mtd.count === 0
                  ? 0
                  : Math.round(
                      (props.data.bought.mtd.amount /
                        props.data.bought.mtd.count) *
                        100
                    ) / 100}
              </div>
            </div>
            <div className="w-1/2">
              <div>{props.data.bought.ytd.count}</div>
              <div>$ {props.data.bought.ytd.amount}</div>
              <div>$ {props.data.bought.ytd.commission}</div>
              <div>
                ${" "}
                {props.data.bought.ytd.amount +
                  props.data.bought.ytd.commission}
              </div>
              <div>
                ${" "}
                {props.data.bought.ytd.count === 0
                  ? 0
                  : Math.round(
                      (props.data.bought.ytd.amount /
                        props.data.bought.ytd.count) *
                        100
                    ) / 100}
              </div>
            </div>
          </div>
        </div>

        <div className="my-2">
          <hr />
        </div>
        <div className="flex flex-row items-center mt-1">
          <div className="mr-2 opacity-40">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="text-sm text-gray-500">Updated just now</div>
        </div>
      </div>
    </div>
  </div>
);

const DashboardStatic = () => (
  <div className="flex flex-row">
    <div className="flex-1 mt-5 ml-6 mr-3">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="text-lg font-semibold uppercase tracking-wide">
          Sell statistics
        </div>
        <div className="text-sm text-gray-500">
          This Week Performance (Monday ⟶ Today)
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-blue-400 mr-2" />
          <div className="w-1/4">Uploaded</div>
          <div>
            50 leads <span className="italic">(min $100)</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-red-500 mr-2" />
          <div className="w-1/4">Retired</div>
          <div>
            5 leads <span className="italic">($10)</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-yellow-500 mr-2" />
          <div className="w-1/4">On Sale</div>
          <div>
            10 leads <span className="italic">(min $20)</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
          <div className="w-1/4">Sold</div>
          <div>
            35 leads ⟶ <span className="font-semibold">$125</span>
          </div>
        </div>

        <div className="my-2">
          <hr />
        </div>
        <div className="flex flex-row items-center mt-1">
          <div className="mr-2 opacity-40">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="text-sm text-gray-500">Updated 15 mis ago</div>
        </div>
      </div>
    </div>

    <div className="flex-1 mt-5 ml-3 mr-6">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="text-lg font-semibold uppercase tracking-wide">
          Buy statistics
        </div>
        <div className="text-sm text-gray-500">
          This Week Performance (Monday ⟶ Today)
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-blue-400 mr-2" />
          <div>2 campaigns running</div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-white mr-2" />
          <div>
            <span className="italic">0 campaigns out of budget</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-yellow-500 mr-2" />
          <div className="w-1/4">Budget Left</div>
          <div>$421, 83%</div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
          <div className="w-1/4">Bought</div>
          <div>
            18 leads ⟶ <span className="font-semibold">$96</span>
          </div>
        </div>

        <div className="my-2">
          <hr />
        </div>
        <div className="flex flex-row items-center mt-1">
          <div className="mr-2 opacity-40">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="text-sm text-gray-500">Updated 15 mis ago</div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;
