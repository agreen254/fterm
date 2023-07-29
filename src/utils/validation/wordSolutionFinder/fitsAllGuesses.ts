import { Guess, WordValidity } from "../../interfaces";
import matchedCharLocations from "./fitsOneGuess";

function fitsAllGuesses(guesses: Guess[], word: string) {
  return guesses.reduce(
    (total: WordValidity, guess) => {
      const matchedLocations = matchedCharLocations(guess, word);
      const isValid = matchedLocations.length > 0 ? true : false;
      return {
        guesses: [...total.guesses, guess.guess],
        allCharLocations: [...total.allCharLocations, matchedLocations],
        areValid: [...total.areValid, isValid],
      };
    },
    {
      guesses: [],
      allCharLocations: [],
      areValid: [],
    } as WordValidity
  );
}

export default fitsAllGuesses;
