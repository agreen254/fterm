import { Location } from "./interfaces";

function findSameLetters(guess: string, other: string, numCorrect: number) {
  if (guess.length !== other.length) return null;

  const guessChars = [...guess];
  const otherChars = [...other];

  return guessChars.reduce((locations: Location[], char, idx) => {
    if (guessChars[idx] === otherChars[idx]) {
      const current = locations.find(({ character }) => character === char);
      if (current == undefined) {
        locations.push({ character: char, indices: [idx] });
      } else {
        locations = locations.filter((loc) => loc !== current);
        locations.push({
          character: current.character,
          indices: [...current.indices, idx],
        });
      }
    }
    return locations;
  }, []);
}

export default findSameLetters;
