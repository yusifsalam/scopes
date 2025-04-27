import React from "react";
import { afinnMap } from "../afinn";
import Tooltip from "./Tooltip";

const getWordColor = (word: string): string => {
  const cleanedWord = word.toLowerCase().replace(/[.,!?;:]$/, "");
  const score = afinnMap.get(cleanedWord) || 0;
  if (score > 0) return "text-green-600";
  if (score < 0) return "text-red-600";
  return "";
};

const ScopeWithSentiment = ({ scope }: { scope: string }) => {
  const words = scope.split(/(\s+)/);
  return (
    <div>
      {words.map((word, i) => {
        if (/^\s+$/.test(word)) {
          return <React.Fragment key={i}>{word}</React.Fragment>;
        }

        const cleanedWord = word.toLowerCase().replace(/[.,!?;:]$/, "");
        const score = afinnMap.get(cleanedWord) || 0;
        const colorClass = getWordColor(word);
        const tooltipText = `Sentiment: ${score}`;
        const tooltipVariant =
          score < 0 ? "negative" : score > 0 ? "positive" : "neutral";

        if (score === 0) {
          return <React.Fragment key={i}>{word}</React.Fragment>;
        }

        return (
          <Tooltip
            key={i}
            tip={tooltipText}
            content={
              <div key={i} className={colorClass}>
                {word}
              </div>
            }
            variant={tooltipVariant}
          />
        );
      })}
    </div>
  );
};

export default ScopeWithSentiment;
