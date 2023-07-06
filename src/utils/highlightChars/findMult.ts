import { Guess } from "../interfaces";
import { Placement } from "../interfaces";
import findSameLetters from "./findSameLetters";

function findMult(guesses: Guess[], word: string) {
  return guesses.reduce((placements: Placement[], guess) => {
    const places = findSameLetters(guess, word);
    return places ? [...placements, ...places] : placements;
  }, []);
}

export default findMult;
