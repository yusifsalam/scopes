"use client";

import { useUserPreferencesStore } from "../state/user-preferences-provider";
import { calculateAfinnScore } from "../utils/sentiment";
import ScopeWithSentiment from "./ScopeWithSentiment";

const ScopeToday = ({ scope }: { scope: string }) => {
  const { sentiment: showSentiment } = useUserPreferencesStore(
    (state) => state,
  );

  const totalSentimentScore = calculateAfinnScore(scope);
  const sentiment =
    totalSentimentScore === 0
      ? "neutral"
      : totalSentimentScore < 0
        ? "negative"
        : "positive";

  return (
    <div>
      <h2>Today&apos;s Horoscope</h2>

      {showSentiment ? (
        <>
          <ScopeWithSentiment scope={scope} />
          <p>
            <strong>Overall Sentiment: {sentiment}</strong> (
            {totalSentimentScore})
          </p>
        </>
      ) : (
        <p>{scope}</p>
      )}
    </div>
  );
};

export default ScopeToday;
