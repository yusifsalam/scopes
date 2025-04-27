import { calculateAfinnScore } from "../utils/sentiment";
import ScopeWithSentiment from "./ScopeWithSentiment";

const ScopeToday = ({ scope }: { scope: string }) => {
  const totalSentimentScore = calculateAfinnScore(scope);

  const sentiment =
    totalSentimentScore === 0
      ? "neutral"
      : totalSentimentScore < 0
        ? "negative"
        : "positive";

  return (
    <div>
      <h2>Today's Horoscope</h2>
      <ScopeWithSentiment scope={scope} />
      <p>
        <strong>Overall Sentiment: {sentiment}</strong> ({totalSentimentScore})
      </p>
    </div>
  );
};

export default ScopeToday;
