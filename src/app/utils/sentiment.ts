import { afinnMap } from "../afinn";

export function calculateAfinnScore(text: string): number {
  const words = text.toLowerCase().split(/\s+/);

  return words.reduce((totalScore, word) => {
    const cleanedWord = word.replace(/[.,!?;:]$/, "");
    const wordScore = afinnMap.get(cleanedWord) || 0;
    return totalScore + wordScore;
  }, 0);
}
