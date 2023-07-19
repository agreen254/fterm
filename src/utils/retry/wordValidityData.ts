import { Guess, WordValidity } from "../interfaces";
import matchedCharLocations from "./matchesCharLocations";

function wordValidityData(guesses: Guess[], word: string) {
  const wordValidity = guesses.reduce(
    (total: WordValidity, g) => {
      const matchedLocations = matchedCharLocations(g, word);
      const isValid = matchedLocations.length > 0 ? true : false;
      return {
        guesses: [...total.guesses, g.guess],
        placements: [...total.placements, matchedLocations],
        areValid: [...total.areValid, isValid],
      };
    },
    {
      guesses: [],
      placements: [],
      areValid: [],
    } as WordValidity
  );

  return wordValidity;
}

export default wordValidityData;
