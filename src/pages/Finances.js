import LoadingSpinner from "common/components/LoadingSpinner";
import { readableType } from "common/consts/transactions";
import { getTats } from "common/requests/dashboard";
import { format, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import FileSaver from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const FinancesPage = () => (
  <div className="border rounded border-gray-100 bg-white py-1 mx-6 mt-6">
    <div className="mt-5 mx-6 font-semibold text-2xl">
      Financial Position and History
    </div>
    <div className="my-2">
      <TransactionList />
    </div>
  </div>
);

const TransactionList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [after, setAfter] = useState(
    format(startOfMonth(new Date()), "yyyy-MM-dd")
  );
  const [before, setBefore] = useState("");
  const [tats, setTats] = useState({});

  const getTatsData = async (after, before) => {
    setIsLoading(true);

    const [success, data] = await getTats(after, before);

    if (success) {
      setTats(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getTatsData(after, before);
  }, [before, after]);

  const startDownload = (e) => {
    const csv = tats.transactions
      .map((el) => ({
        period: el.period,
        amount: el.amount,
        reference: el.transaction.reference ?? el.transaction.lead_id ?? "",
      }))
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

  return (
    <div>
      <div className="mx-6 mb-6">
        Showing data from:{" "}
        <input
          type="date"
          value={after}
          onChange={(e) => setAfter(e.target.value)}
          className="border border-gray-400 rounded"
        ></input>{" "}
        before:{" "}
        <input
          type="date"
          value={before}
          onChange={(e) => setBefore(e.target.value)}
          className="border border-gray-400 rounded"
        ></input>
        {isLoading ? null : (
          <button
            onClick={startDownload}
            className="ml-4 w-20 border rounded border-purple-200 hover:bg-purple-200 px-2 h-7"
          >
            <FontAwesomeIcon icon={faFileDownload} /> CSV
          </button>
        )}
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : Object.keys(tats).length > 0 ? (
        <Tats data={tats} />
      ) : null}
    </div>
  );
};

const Tats = (props) => {
  return (
    <>
      <div className="mx-6 mb-2 text-lg">
        Opening balance:{" "}
        <span className="font-semibold">$ {props.data.startBalance}</span>
      </div>
      <div className="mx-6 mb-2 text-lg">
        Closing balance:{" "}
        <span className="font-semibold">$ {props.data.endBalance}</span>
      </div>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pl-6">Date</th>
              <th className="text-left">Type</th>
              <th className="text-left">Details</th>
              <th className="text-right pr-6">Amount</th>
            </tr>
          </thead>
          <tbody>
            {props.data.transactions.map((t) => (
              <tr key={t.transaction_id} className="hover:bg-gray-100">
                <td className="pl-6">{t.period}</td>
                <td>{readableType(t.transaction.type)}</td>
                <td>{t.transaction.lead_id ?? t.transaction.reference}</td>
                <td className="text-right pr-6">{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FinancesPage;
