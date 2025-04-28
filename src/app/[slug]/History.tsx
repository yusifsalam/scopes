"use client";

import { useUserPreferencesStore } from "../state/user-preferences-provider";
import { calculateAfinnScore } from "../utils/sentiment";
import ScopeWithSentiment from "./ScopeWithSentiment";

type HistoryProps = {
  date: string;
  scope: string;
}[];

const History = ({ data, sign }: { data: HistoryProps; sign: string }) => {
  return (
    <div>
      <h2>Historical values for {sign}</h2>
      <Table data={data} />
    </div>
  );
};

const Table = ({ data }: { data: HistoryProps }) => {
  const { sentiment: showSentiment } = useUserPreferencesStore(
    (state) => state,
  );
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Scope</th>
            {showSentiment && <th>Sentiment</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => {
            const totalSentimentScore = calculateAfinnScore(r.scope);
            const sentiment =
              totalSentimentScore === 0
                ? "neutral"
                : totalSentimentScore < 0
                  ? "negative"
                  : "positive";
            return (
              <tr key={i} className="hover:bg-base-300">
                <td className="whitespace-nowrap">
                  {new Date(r.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {showSentiment ? (
                    <ScopeWithSentiment scope={r.scope} />
                  ) : (
                    r.scope
                  )}
                </td>
                {showSentiment && (
                  <td>
                    <p>
                      <strong>{sentiment}</strong> ({totalSentimentScore})
                    </p>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default History;
