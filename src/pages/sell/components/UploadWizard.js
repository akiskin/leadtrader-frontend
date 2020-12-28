import { bulkUploadLeads } from "common/requests/sellcampaigns";
import { useState } from "react";
import CSVReader from "react-csv-reader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faCheckDouble,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

const CSV_COLUMNS = {
  first_name: { name: "firstname", required: true, presentation: "First Name" },
  last_name: { name: "lastname", required: true, presentation: "Last Name" },
  address: { name: "address", required: true, presentation: "Address" },
  phone: { name: "phone", required: true, presentation: "Phone" },
  email: { name: "email", required: true, presentation: "E-mail" },
  document_id: { name: "documentid", required: true, presentation: "DocID" },
  loan_purpose: {
    name: "loanpurpose",
    required: true,
    presentation: "Purpose",
  },
  loan_amount: {
    name: "loanamount",
    required: true,
    presentation: "Amount",
  },
};

const ROW_STATUS = {
  VALIDATION_SUCCESS: "VALIDATION_SUCCESS",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UPLOAD_SUCCESS: "UPLOAD_SUCCESS",
  UPLOAD_ERROR: "UPLOAD_ERROR",
};

const UploadWizard = (props) => {
  const STATUS = {
    NOT_STARTED: "NOT_STARTED",
    UPLOAD_ERROR: "UPLOAD_ERROR",
    READY_FOR_UPLOAD: "READY_FOR_UPLOAD",
    UPLOADING: "UPLOADING",
    UPLOAD_SUCCESS: "UPLOAD_SUCCESS",
  };

  const [fileContent, setFileContent] = useState([]);

  const [status, setStatus] = useState(STATUS.NOT_STARTED);

  const startProcessOver = () => {
    setStatus(STATUS.NOT_STARTED);
    setFileContent([]);
  };

  const processContent = (data, fileInfo) => {
    //TODO process data
    const processedData = data.map((row) => ({
      ...row,
      status: ROW_STATUS.VALIDATION_SUCCESS,
    }));

    setFileContent(processedData);

    if (
      processedData.find((row) => row.status === ROW_STATUS.VALIDATION_SUCCESS)
    ) {
      setStatus(STATUS.READY_FOR_UPLOAD);
    } else {
      setStatus(STATUS.UPLOAD_ERROR);
    }
  };

  const onUploadError = () => {
    setFileContent([]);
    setStatus(STATUS.UPLOAD_ERROR);
  };

  const upload = async (e) => {
    setStatus(STATUS.UPLOADING);

    const leadData = fileContent.map((row) =>
      Object.keys(CSV_COLUMNS).reduce((accumulator, columnName) => {
        accumulator[columnName] = row[CSV_COLUMNS[columnName].name];
        return accumulator;
      }, {})
    );

    const [success, data] = await bulkUploadLeads(props.campaignId, leadData);
    console.log(data);

    if (success) {
      setStatus(STATUS.UPLOAD_SUCCESS);
      //TODO show results
    }
    //TODO error
    //props.close(); //Don't need to close?? Display results instead
  };

  return (
    <div className="m-3">
      <div className="text-lg font-semibold uppercase tracking-wide">
        Upload Lead Data
      </div>
      <div className="text-sm text-gray-500 mt-1">
        Specify your CSV file with columns as follows:{" "}
        <a href="https://google.com" className="text-purple-500 underline">
          Upload Data Format
        </a>
      </div>
      {fileContent.length > 0 ? (
        <div className="mt-3 w-auto">
          <TableWithUploadedData data={fileContent} />

          <div className="float-left mt-3">
            <button
              onClick={startProcessOver}
              className="text-red-500 border border-red-500 rounded px-2 py-2 hover:bg-red-100"
            >
              Start over
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <CSVReader
            onFileLoaded={processContent}
            onError={onUploadError}
            parserOptions={{
              header: true,
              skipEmptyLines: true,
              transformHeader: (header) => header.toLowerCase(),
            }}
          />
        </div>
      )}

      {status === STATUS.UPLOAD_ERROR ? (
        <div className="mt-3 flex justify-center h-10 items-center">
          We could not process the selected file.
        </div>
      ) : null}

      {status === STATUS.READY_FOR_UPLOAD ? (
        <div className="mt-3 flex justify-center h-10 items-center">
          <button
            onClick={upload}
            className="text-purple-500 border border-purple-500 rounded px-2 py-2 hover:bg-purple-100"
          >
            Upload
          </button>
        </div>
      ) : null}
    </div>
  );
};

const TableWithUploadedData = (props) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="uppercase border-b-2 border-gray-200 text-gray-400">
        {Object.keys(CSV_COLUMNS).map((columnName) => (
          <th key={columnName} className="pr-2 font-normal text-left">
            {CSV_COLUMNS[columnName].presentation}
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((row, index) => (
        <tr
          key={index}
          className="border-t border-gray-200 cursor-default hover:bg-gray-200"
        >
          {Object.keys(CSV_COLUMNS).map((columnName) => (
            <td key={columnName} className="pr-2">
              {row[CSV_COLUMNS[columnName].name]}
            </td>
          ))}
          <td className="py-3">
            <RowStatus status={row.status} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const RowStatus = (props) => {
  if (props.status === ROW_STATUS.VALIDATION_SUCCESS) {
    return (
      <span>
        <FontAwesomeIcon icon={faCheck} className="mr-1" />
        <span className="italic text-gray-400">Ready for upload</span>
      </span>
    );
  } else if (props.status === ROW_STATUS.VALIDATION_ERROR) {
    return (
      <span>
        <FontAwesomeIcon icon={faBan} className="mr-1" />
        <span className="italic text-gray-400">Can not upload</span>
      </span>
    );
  } else if (props.status === ROW_STATUS.UPLOAD_SUCCESS) {
    return (
      <span>
        <FontAwesomeIcon icon={faCheckDouble} className="mr-1" />
        <span className="italic text-gray-400">Uploaded</span>
      </span>
    );
  } else if (props.status === ROW_STATUS.UPLOAD_ERROR) {
    return (
      <span>
        <FontAwesomeIcon icon={faBan} className="mr-1" />
        <span className="italic text-gray-400">Upload error</span>
      </span>
    );
  }
};

export default UploadWizard;
