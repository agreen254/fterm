import { Guess } from "./interfaces";

function sumGuesses(guesses: Guess[]) {
  return guesses.reduce((total: number, guess) => {
    return total + guess.numCorrect;
  }, 0);
}

export default sumGuesses;
