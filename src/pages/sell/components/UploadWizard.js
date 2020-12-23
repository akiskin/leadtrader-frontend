import { useState } from "react";
import CSVReader from "react-csv-reader";

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
    console.dir(data, fileInfo);

    setFileContent(data);

    setStatus(STATUS.READY_FOR_UPLOAD);
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
      <div className="text-sm text-gray-500">
        Specify your CSV file with columns as follows:{" "}
        <a href="https://google.com" className="text-purple-500 underline">
          Upload Data Format
        </a>
      </div>
      {fileContent.length > 0 ? (
        <div>
          <table className="border">
            <tbody>
              {fileContent.map((row, index) => (
                <tr key={index}>
                  <td>{row.documentid}</td>
                  <td>{row.name}</td>
                  <td>{row.requestedamount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={startProcessOver}>Start over</button>
        </div>
      ) : (
        <CSVReader
          onFileLoaded={processContent}
          onError={onUploadError}
          parserOptions={{
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.toLowerCase(),
          }}
        />
      )}

      {status === STATUS.UPLOAD_ERROR ? (
        <div className="flex justify-center h-10 items-center">
          We could not process the selected file.
          <button onClick={startProcessOver}>Start over</button>
        </div>
      ) : null}

      {status === STATUS.READY_FOR_UPLOAD ? (
        <div className="flex justify-center h-10 items-center">
          <button>Upload</button>
        </div>
      ) : null}
    </div>
  );
};

export default UploadWizard;
