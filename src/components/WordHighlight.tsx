import { WordValidity } from "../utils/interfaces";

import { CharLocations } from "../utils/interfaces";
import maxCharMatches from "../utils/maxCharMatches";

interface Props {
  mousedOver: string;
  matchData: WordValidity;
  wordToRender: string;
}

//TODO: Underline characters are shown specifically to the hovered guess
//TODO: Make hovered ones underline green, selected ones underline orange

const WordHighlight = ({ mousedOver, matchData, wordToRender }: Props) => {
  const highestMatches = () => {
    const maxIdx = maxCharMatches(matchData.allCharLocations);
    return matchData.allCharLocations[maxIdx];
  };

  if (!matchData || !highestMatches()) return <span>{wordToRender}</span>;

  const shouldHighlight = (
    locations: CharLocations[],
    char: string,
    idx: number
  ) => {
    const containsLetter = locations.filter(
      (letter) => char === letter.character
    )[0];
    return (
      containsLetter &&
      containsLetter.indices.filter((index) => index === idx).length === 1
    );
  };

  const highlightClass = (char: string, idx: number) => {
    if (shouldHighlight(highestMatches(), char, idx)) {
      const guessIdx = matchData.guesses.findIndex((g) => g === mousedOver);
      if (mousedOver === "") {
        return "text-2xl underline";
      } else if (
        shouldHighlight(matchData.allCharLocations[guessIdx], char, idx)
      ) {
        return "text-2xl underline decoration-green-600";
      }
    } else return "";
  };

  const chars = [...wordToRender];
  return chars.map((char, idx) => (
    <span key={"highlight" + idx} className={highlightClass(char, idx)}>
      {char}
    </span>
  ));
};

export default WordHighlight;
