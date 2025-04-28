"use client";

import { useUserPreferencesStore } from "../../state/user-preferences-provider";

const SentimentToggle = () => {
  const { sentiment: showSentiment, setSentiment } = useUserPreferencesStore(
    (state) => state,
  );

  const handleToggle = () => {
    setSentiment(!showSentiment);
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-2">
        <span className="label-text text-white">Sentiment analysis</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={showSentiment}
          onChange={handleToggle}
          aria-label="Toggle sentiment analysis visibility"
        />
      </label>
    </div>
  );
};

export default SentimentToggle;
