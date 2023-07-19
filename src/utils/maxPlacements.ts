import { WordValidity } from "./interfaces";

function maxPlacements(vals: WordValidity, largestGuess: string) {
  const maxGuessIdx = vals.guesses.findIndex((g) => g === largestGuess);
  return vals.placements[maxGuessIdx];
}

export default maxPlacements;
