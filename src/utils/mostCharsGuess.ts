import { Guess } from "./interfaces";

function mostCharsGuess(guesses: Guess[]) {
  return guesses.reduce((max: Guess, g) => {
    return g.numCorrect > max.numCorrect ? g : max;
  }, {} as Guess).guess;
}

export default mostCharsGuess;
