import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoadingSpinner from "common/components/LoadingSpinner";
import UploadWizard from "./components/UploadWizard";
import { getSellCampaignLeads } from "common/requests/sellcampaigns";
import { readableStatus } from "common/consts/leads";

const SellCampaign = (props) => {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);

  const [leads, setLeads] = useState([]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
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
        setLoading(false);
      }
    };
    getLeads(id);
  }, [id]);

  return (
    <>
      <div className="flex flex-row" style={{ minHeight: "16rem" }}>
        <div className="flex-1 mt-5 ml-6 mr-3">
          <div className="rounded bg-white px-3 py-1">
            <div className="text-lg font-semibold uppercase tracking-wide">
              Sell Campaign Info
            </div>
            <div className="text-sm text-gray-500">
              Created: XXXXXX, ID: {id}
            </div>
            <div className="my-2">
              <hr />
            </div>
            {isLoading ? <LoadingSpinner /> : <InfoBody />}
            <div className="text-gray-500 pt-4">
              <Link to="/sell">← Back</Link>
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
                  Current status: <span className="font-bold">Active</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <button className="text-red-500 border border-red-500 rounded px-2 py-2 hover:bg-red-100">
                  Stop
                </button>
              </div>
            </div>

            <div className="my-2">
              <hr />
            </div>
            {isLoading ? <LoadingSpinner /> : <StatisticsBody />}
          </div>
        </div>
      </div>

      <div className="rounded bg-white py-1 mx-6 mt-6">
        <div className="flex flex-row justify-between mx-3">
          <div>
            <div className="font-semibold text-2xl">Leads</div>
            <div className="text-gray-400">All leads uploaded so far</div>
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
                  <td>{readableStatus(lead.status)}</td>
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

const InfoBody = (props) => (
  <>
    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Product</div>
      <div>XXX</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Stop Price, $</div>
      <div>XXX</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Expiration, days</div>
      <div>XXX</div>
    </div>
  </>
);

const StatisticsBody = (props) => (
  <>
    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-blue-400 mr-2" />
      <div className="w-1/4">Uploaded</div>
      <div>
        50 leads <span className="italic">(min $100)</span>
      </div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-red-500 mr-2" />
      <div className="w-1/4">Rejected</div>
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

    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-red-500 mr-2" />
      <div className="w-1/4">Retired</div>
      <div>
        5 leads <span className="italic">($10)</span>
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
  </>
);

export default SellCampaign;
