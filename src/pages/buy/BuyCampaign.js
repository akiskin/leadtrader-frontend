import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import FileSaver from "file-saver";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTimes, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoadingSpinner from "common/components/LoadingSpinner";
import {
  exportBuyCampaignLeads,
  getBuyCampaignLeads,
} from "common/requests/buycampaigns";

const SellCampaign = (props) => {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);

  const [leads, setLeads] = useState([]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [filterStartDateString, setFilterStartDateString] = useState("");
  const [filterEndDateString, setFilterEndDateString] = useState("");

  useEffect(() => {
    const getLeads = async (id) => {
      const [success, data] = await getBuyCampaignLeads(id);

      if (success) {
        const mapped = data.map((row) =>
          Object.assign(
            {
              ...row,
              created_at: new Date(row.created_at),
            },
            "lead" in row
              ? {
                  lead: {
                    ...row.lead,
                    created_at: new Date(row.lead.created_at),
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

  const filteredLeads = () => {
    return leads.filter((lead) => {
      const startDate = filterStartDateString
        ? new Date(filterStartDateString)
        : undefined;

      const endDate = filterEndDateString
        ? new Date(filterEndDateString)
        : undefined;

      return (
        (startDate ? lead.created_at >= startDate : true) &&
        (endDate ? lead.created_at <= endDate : true)
      );
    });
  };

  return (
    <>
      <div className="flex flex-row" style={{ minHeight: "16rem" }}>
        <div className="flex-1 mt-5 ml-6 mr-3">
          <div className="rounded bg-white px-3 py-1">
            <div className="text-lg font-semibold uppercase tracking-wide">
              Buy Campaign Info
            </div>
            <div className="text-sm text-gray-500">
              Created: XXXXXX, ID: {id}
            </div>
            <div className="my-2">
              <hr />
            </div>
            {isLoading ? <LoadingSpinner /> : <InfoBody />}
            <div className="text-gray-500 pt-4">
              <Link to="/buy">← Back</Link>
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
            <div className="text-gray-400">
              Filter dates to narrow list for downloading: from{" "}
              <input
                type="datetime-local"
                className="border border-gray-200 hover:border-gray-500 rounded"
                value={filterStartDateString}
                onChange={(e) => {
                  setFilterStartDateString(e.target.value);
                }}
              ></input>{" "}
              to{" "}
              <input
                type="datetime-local"
                className="border border-gray-200 hover:border-gray-500 rounded"
                value={filterEndDateString}
                onChange={(e) => {
                  setFilterEndDateString(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <button
              className="text-purple-500 border border-purple-500 rounded px-2 py-2 hover:bg-purple-100"
              onClick={() => setUploadModalOpen(true)}
            >
              Download
            </button>
          </div>
        </div>

        <div className="my-5">
          <table className="w-full border-collapse">
            <thead>
              <tr className="uppercase border-b-2 border-gray-100 text-gray-400">
                <th className="pl-6 font-normal text-left">Buy Date</th>
                <th className="font-normal text-left">ID</th>
                <th className="font-normal text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads().map((lead) => (
                <tr key={lead.id}>
                  <td className="pl-6">{lead.created_at.toLocaleString()}</td>
                  <td>{lead.lead.id}</td>
                  <td>{lead.total_price}</td>
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
        <div className="w-11/12 bg-gray-100 rounded">
          <div className="float-right m-1">
            <button onClick={() => setUploadModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} /> Close
            </button>
          </div>
          <DownloadTool
            campaign={id}
            startDateString={filterStartDateString}
            endDateString={filterEndDateString}
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
      <div className="w-1/4">Max Price, $</div>
      <div>XXX</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Budget, $</div>
      <div>XXX</div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="w-1/4">Buying Rules</div>
      <div>XXX-XXX-XXX</div>
    </div>
  </>
);

const StatisticsBody = (props) => (
  <>
    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
      <div className="w-1/4">Bought</div>
      <div>
        35 leads ⟶ <span className="font-semibold">$125</span>
      </div>
    </div>

    <div className="flex flex-row items-center mt-1">
      <div className="rounded-full h-4 w-4 bg-red-500 mr-2" />
      <div className="w-1/4">Budget Left</div>
      <div>
        30% <span className="italic">($125)</span>
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

const DownloadTool = (props) => {
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const getLeads = async (id, startDateString, endDateString) => {
      const [success, data] = await exportBuyCampaignLeads(
        id,
        startDateString,
        endDateString
      );

      if (success) {
        setLeads(data);
        setLoading(false);
      }
    };
    getLeads(props.campaign, props.startDateString, props.endDateString);
    setLoading(false);
  }, [props.campaign, props.startDateString, props.endDateString]);

  const startDownload = (e) => {
    const csv = leads
      .map((el) =>
        Object.values(el)
          .map((text) =>
            text
              .toString()
              .replace(/\\/g, "\\\\")
              .replace(/\n/g, "\\n")
              .replace(/,/g, "\\,")
          )
          .join(",")
      )
      .join("\n");
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    FileSaver.saveAs(csvData, "data.csv");
  };

  if (loading) {
    return (
      <div className="py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="py-2 px-2">
      <div className="font-bold">Leads Detailed Information</div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="uppercase border-b-2 border-gray-400 text-gray-400">
            <th className="font-normal text-left">Buy Date</th>
            <th className="font-normal text-left">ID</th>
            <th className="font-normal text-left">document_id</th>
            <th className="font-normal text-left">loan_purpose</th>
            <th className="font-normal text-left">loan_amount</th>
            <th className="font-normal text-left">first_name</th>
            <th className="font-normal text-left">last_name</th>
            <th className="font-normal text-left">address</th>
            <th className="font-normal text-left">phone</th>
            <th className="font-normal text-left">email</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="font-normal text-left">
                {new Date(lead.purchase_date).toLocaleString()}
              </td>
              <td>{lead.id}</td>
              <td className="font-normal text-left">{lead.document_id}</td>
              <td className="font-normal text-left">{lead.loan_purpose}</td>
              <td className="font-normal text-left">{lead.loan_amount}</td>
              <td className="font-normal text-left">{lead.first_name}</td>
              <td className="font-normal text-left">{lead.last_name}</td>
              <td className="font-normal text-left">{lead.address}</td>
              <td className="font-normal text-left">{lead.phone}</td>
              <td className="font-normal text-left">{lead.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center h-10 items-center">
        <button
          onClick={startDownload}
          className="w-20 border rounded border-purple-500 px-2 py-1 ring-2"
        >
          <FontAwesomeIcon icon={faFileDownload} /> CSV
        </button>
      </div>
    </div>
  );
};

export default SellCampaign;
