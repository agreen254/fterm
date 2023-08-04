import { useContext } from "react";
import { WordValidity } from "../utils/interfaces";

import { CharLocations } from "../utils/interfaces";
import isMember from "../utils/isMember";
import maxCharMatches from "../utils/maxCharMatches";
import WordContext from "./contexts/wordContext";

interface Props {
  mousedOver: string;
  matchData: WordValidity;
  wordToRender: string;
}

//TODO: Underline characters are shown specifically to the hovered guess
//TODO: Make hovered ones underline green, selected ones underline orange

const WordHighlight = ({ mousedOver, matchData, wordToRender }: Props) => {
  const {
    state: { guesses },
  } = useContext(WordContext);
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

  const shouldActuallyHighlight = (char: string, idx: number) => {
    return (
      matchData.allCharLocations
        .map((loc) => shouldHighlight(loc, char, idx))
        .filter((b) => b === false).length !== 0
    );
  };

  const highlightClass = (char: string, idx: number) => {
    return shouldActuallyHighlight(char, idx)
      ? // ? "text-2xl underline decoration-green-600"
        "text-2xl underline"
      : "";
  };

  const chars = [...wordToRender];
  return chars.map((char, idx) => (
    <span
      key={"highlight" + idx}
      className={
        shouldHighlight(highestMatches(), char, idx) ? "text-2xl underline" : ""
      }
    >
      {char}
    </span>
  ));
};

export default WordHighlight;
