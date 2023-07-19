import { Guess, Placement } from "../interfaces";
import sumPlacement from "../sumPlacement";

function matchesCharLocation({ guess, numCorrect }: Guess, word: string) {
  const guessChars = [...guess];

  const allMatches = guessChars.reduce((matches: Placement[], char, idx) => {
    if (guess[idx] === word[idx]) {
      const charPlacement = matches.find(({ character }) => character === char);
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
  }, []);

  return sumPlacement(allMatches) === numCorrect ? allMatches : [];
}

export default matchesCharLocation;
