import { useState } from "react";
import CSVReader from "react-csv-reader";

const CSV_COLUMNS = {
  firstname: { required: true, presentation: "First Name" },
  lastname: { required: true, presentation: "Last Name" },
  address: { required: true, presentation: "Address" },
  phone: { required: true, presentation: "Phone" },
  email: { required: true, presentation: "E-mail" },
  documentid: { required: true, presentation: "DocID" },
  loanpurpose: { required: true, presentation: "Purpose" },
  loanamount: { required: true, presentation: "Requested Amount" },
};

const ROW_STATUS = {
  OK: "OK",
  ERROR: "ERROR",
};

const UploadWizard = (props) => {
  const STATUS = {
    NOT_STARTED: "NOT_STARTED",
    UPLOAD_ERROR: "UPLOAD_ERROR",
    READY_FOR_UPLOAD: "READY_FOR_UPLOAD",
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
      status: ROW_STATUS.OK,
    }));

    setFileContent(processedData);

    if (processedData.find((row) => row.status === ROW_STATUS.OK)) {
      setStatus(STATUS.READY_FOR_UPLOAD);
    } else {
      setStatus(STATUS.UPLOAD_ERROR);
    }
  };

  const onUploadError = () => {
    setFileContent([]);
    setStatus(STATUS.UPLOAD_ERROR);
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
        <div className="mt-3">
          <table className="border w-full">
            <thead>
              <tr>
                {Object.keys(CSV_COLUMNS).map((columnName) => (
                  <td key={columnName}>
                    {CSV_COLUMNS[columnName].presentation}
                  </td>
                ))}
                <td></td>
              </tr>
            </thead>
            <tbody>
              {fileContent.map((row, index) => (
                <tr key={index}>
                  {Object.keys(CSV_COLUMNS).map((columnName) => (
                    <td key={columnName}>{row[columnName]}</td>
                  ))}
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
            onClick={props.close}
            className="text-purple-500 border border-purple-500 rounded px-2 py-2 hover:bg-purple-100"
          >
            Upload
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UploadWizard;
