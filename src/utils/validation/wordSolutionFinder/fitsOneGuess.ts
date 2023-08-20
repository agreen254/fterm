import { Guess, CharLocations } from "../../interfaces";
import sumCharMatches from "../../sumCharMatches";

function fitsOneGuess({ guessName: guess, numCorrect }: Guess, word: string) {
  const guessChars = [...guess];

  const matchedChars = guessChars.reduce(
    (matches: CharLocations[], char, idx) => {
      if (char === word[idx]) {
        const charPlacement = matches.find(
          ({ character }) => character === char
        );
        if (charPlacement === undefined) {
          const newMatch = {
            character: char,
            indices: [idx],
          };
          return [...matches, newMatch];
        } else {
          return [
            ...matches.filter((match) => match.character !== char),
            {
              character: char,
              indices: [...charPlacement.indices, idx],
            },
          ];
        }
      } else return matches;
    },
    []
  );

  return sumCharMatches(matchedChars) === numCorrect ? matchedChars : [];
}

export default fitsOneGuess;
