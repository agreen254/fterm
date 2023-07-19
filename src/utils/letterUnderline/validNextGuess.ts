import { Guess } from "../interfaces";
import sumPlacement from "../sumPlacement";
import findSameLetters from "./findSameLetters";

function validNextGuess(guesses: Guess[], word: string) {
  // return guesses.reduce((placements: Placement[], guess) => {
  //   const places = findSameLetters(guess, word);
  //   return [...placements, ...places];
  // }, []);
  const potentialMatch = guesses.reduce((isMatch: boolean[], guess) => {
    const places = findSameLetters(guess, word);
    console.log(places, sumPlacement(places), guess.numCorrect);
    return sumPlacement(places) === guess.numCorrect
      ? [...isMatch, true]
      : [...isMatch, false];
  }, []);
  console.log(word, potentialMatch);
  return potentialMatch.filter((m) => m === false).length === 0;
}

export default validNextGuess;
