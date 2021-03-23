import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoadingSpinner from "common/components/LoadingSpinner";
import UploadWizard from "./components/UploadWizard";
import {
  getSellCampaignLeads,
  updateSellCampaign,
  getSellCampaignDetails,
} from "common/requests/sellcampaigns";
import {
  readableStatus,
  SELL_CAMPAIGN_STATUS,
} from "common/consts/sellCampaigns";
import { readableStatus as leadStatus } from "common/consts/leads";
import { useDispatch } from "react-redux";
import { ACTIONS } from "store/sellcampaigns/actions";

const SellCampaign = (props) => {
  const { id } = useParams();

  const [sellCampaign, setSellCampaign] = useState({});

  const [dashboardIsLoading, setDashboardIsLoading] = useState(true);

  const [leads, setLeads] = useState([]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const getLeads = async (id) => {
    const [success, data] = await getSellCampaignLeads(id);

    if (success) {
      const mapped = data.map((row) =>
        Object.assign(
          {
            ...row,
            created_at: new Date(row.created_at),
          },
          "transaction" in row
            ? {
                transaction: {
                  ...row.transaction,
                  created_at: new Date(row.transaction.created_at),
                },
              }
            : {}
        )
      );
      setLeads(mapped);
    }
  };

  const getDashboard = async (id) => {
    setDashboardIsLoading(true);
    const [success, data] = await getSellCampaignDetails(id);

    if (success) {
      setSellCampaign(data);
    }
    setDashboardIsLoading(false);
  };

  useEffect(() => {
    getDashboard(id);
    getLeads(id);
  }, [id]);

  return (
    <>
      <div className="flex flex-row" style={{ minHeight: "16rem" }}>
        <div className="flex-1 mt-5 ml-6 mr-3">
          <div className="rounded bg-white px-3 py-1">
            <div className="text-lg font-semibold uppercase tracking-wide">
              Sell Campaign Detail
            </div>
            {dashboardIsLoading ? (
              <LoadingSpinner />
            ) : (
              <CampaignDetails sellCampaign={sellCampaign.general} />
            )}
            <div className="text-gray-500 pt-4">
              <Link to="/sell">← Back</Link> |{" "}
              <Link to={`/sell/${id}/edit`}>Edit</Link>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-5 ml-3 mr-6">
          <div className="rounded bg-white px-3 py-1">
            <div className="flex flex-row justify-between">
              <div>
                <div className="text-lg font-semibold uppercase tracking-wide">
                  Actions
                </div>
                <div className="text-sm text-gray-500">
                  Current status:{" "}
                  <span className="font-bold">
                    {dashboardIsLoading
                      ? null
                      : readableStatus(sellCampaign.general.status)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {dashboardIsLoading ? null : (
                  <ControlButtons
                    campaign={sellCampaign.general}
                    update={() => getDashboard(id)}
                  />
                )}
              </div>
            </div>

            <div className="my-2">
              <hr />
            </div>

            {dashboardIsLoading ? (
              <LoadingSpinner />
            ) : (
              <StatisticsBody data={sellCampaign.stats} />
            )}
          </div>
        </div>
      </div>

      <div className="rounded bg-white py-1 mx-6 mt-6">
        <div className="flex flex-row justify-between mx-3">
          <div>
            <div className="font-semibold text-2xl">Leads</div>
            <div className="text-gray-400">All uploaded leads</div>
          </div>

          <div className="flex flex-col justify-center">
            <button
              className="text-purple-500 border border-purple-500 rounded px-2 py-2 hover:bg-purple-100"
              onClick={() => setUploadModalOpen(true)}
            >
              Upload
            </button>
          </div>
        </div>

        <div className="my-5">
          <table className="w-full border-collapse">
            <thead>
              <tr className="uppercase border-b-2 border-gray-100 text-gray-400">
                <th className="pl-6 font-normal text-left">Upload Date</th>
                <th className="font-normal text-left">ID</th>
                <th className="font-normal text-left">Status</th>
                <th className="font-normal text-left">Sell Date</th>
                <th className="font-normal text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="pl-6">{lead.created_at.toLocaleString()}</td>
                  <td>{lead.id}</td>
                  <td>{leadStatus(lead.status)}</td>
                  <td>
                    {"transaction" in lead
                      ? lead.transaction.created_at.toLocaleString()
                      : null}
                  </td>
                  <td>
                    {"transaction" in lead ? lead.transaction.price : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={uploadModalOpen}
        className="grid place-items-center h-screen outline-none"
        style={{ overlay: { outline: "none" } }}
      >
        <div className="bg-gray-100 rounded">
          <div className="float-right m-1">
            <button onClick={() => setUploadModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} /> Close
            </button>
          </div>
          <UploadWizard
            campaignId={id}
            close={() => setUploadModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

const CampaignDetails = (props) => (
  <>
    <div className="text-sm text-gray-500">
      Created:{" "}
      <span className="font-medium">
        {new Date(props.sellCampaign.created_at).toLocaleString()}
      </span>
      , ID: <span className="font-medium">{props.sellCampaign.id}</span>
    </div>
    <div className="my-2">
      <hr />
    </div>
    <InfoBody campaign={props.sellCampaign} />
  </>
);

const InfoBody = (props) => (
  <>
    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Product</div>
      <div className="font-medium">{props.campaign.product.name}</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Stop Price, $</div>
      <div className="font-medium">{props.campaign.stop_price}</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Expiration, days</div>
      <div className="font-medium">{props.campaign.expiration}</div>
    </div>
  </>
);

const StatisticsBody = (props) => (
  <>
    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-blue-400 mr-2" />
      <div className="w-1/4">Uploaded</div>
      <div>{props.data.uploaded} leads</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-red-500 mr-2" />
      <div className="w-1/4">Rejected</div>
      <div>{props.data.rejected} leads</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-yellow-500 mr-2" />
      <div className="w-1/4">On Sale</div>
      <div>{props.data.selling} leads</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
      <div className="w-1/4">Sold</div>
      <div>
        {props.data.sold.count} leads ⟶{" "}
        <span className="font-semibold">$ {props.data.sold.amount}</span>{" "}
        (commission: $ {props.data.sold.commission})
      </div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-red-500 mr-2" />
      <div className="w-1/4">Retired</div>
      <div>{props.data.retired} leads</div>
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
  </>
);

const ControlButtons = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    setLoading(true);

    const [success, data] = await updateSellCampaign(props.campaign.id, {
      status: newStatus,
    });

    if (success) {
      dispatch({
        type: ACTIONS.SELLCAMPAIGNS_UPDATE_ONE,
        campaign: { ...data, date: new Date(data.created_at) },
      });

      props.update(); //trigger parent update
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const start = (e) => updateStatus(SELL_CAMPAIGN_STATUS.ACTIVE);
  const stop = (e) => updateStatus(SELL_CAMPAIGN_STATUS.PAUSED);

  const currentStatus = props.campaign.status;

  if (currentStatus === SELL_CAMPAIGN_STATUS.ACTIVE) {
    return (
      <button
        className="text-red-500 border border-red-500 rounded px-2 py-2 hover:bg-red-100"
        onClick={stop}
        disabled={loading}
      >
        {loading ? <LoadingSpinner size="" /> : "Stop"}
      </button>
    );
  } else {
    return (
      <button
        className="text-green-500 border border-green-500 rounded px-2 py-2 hover:bg-green-100"
        onClick={start}
        disabled={loading}
      >
        {loading ? <LoadingSpinner /> : "Start"}
      </button>
    );
  }
};

export default SellCampaign;
