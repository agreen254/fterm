import { GuessMatch } from "../../interfaces";

function isValidGuess(matches: GuessMatch[]) {
  return (
    matches.filter((match) => match.correctIndices.length === 0).length === 0
  );
}

export default isValidGuess;
