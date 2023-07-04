import { Placement } from "../interfaces";

function findSameLetters(guess: string, other: string, numCorrect: number) {
  if (guess.length !== other.length) return false;

  const guessChars = [...guess];
  const otherChars = [...other];

  const locationData = guessChars.reduce(
    (locations: Placement[], char, idx) => {
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
    },
    []
  );

  if (
    locationData.map((location) => [...location.indices]).join("").length ===
    numCorrect
  )
    return locationData;
  else return false;
}

export default findSameLetters;
