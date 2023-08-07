import { Guess, GuessMatch } from "../../interfaces";
import findMatchesOneGuess from "./findMatchesOneGuess";

function findMatchesAllGuesses(guesses: Guess[], wordToCheck: string) {
  return guesses.reduce((matches: GuessMatch[], guess) => {
    const newMatch = {
      guessName: guess.guess,
      correctIndices: findMatchesOneGuess(
        guess.guess,
        guess.numCorrect,
        wordToCheck
      ),
    };
    return [...matches, newMatch];
  }, []);
}

export default findMatchesAllGuesses;
