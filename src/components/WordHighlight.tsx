import { GuessMatch } from "../utils/interfaces";
import getMaxMatchIdx from "../utils/getMaxMatchIdx";
import isValidGuess from "../utils/validation/newSolnFinder/isValidGuess";
import isMember from "../utils/isMember";

interface Props {
  matches: GuessMatch[];
  mousedOver: string;
  wordToRender: string;
}

const WordHighlight = ({ mousedOver, matches, wordToRender }: Props) => {
  if (matches.length === 0) return <span>{wordToRender}</span>;

  const maxMatchIdx = getMaxMatchIdx(matches);
  const highlightClass = (idx: number) => {
    if (isValidGuess(matches)) {
      if (
        mousedOver === "" &&
        isMember(matches[maxMatchIdx].correctIndices, idx)
      ) {
        return "underline";
      } else {
        const mousedOverMatches = matches.filter(
          (m) => m.guessName === mousedOver
        )[0]?.correctIndices;
        return mousedOverMatches && isMember(mousedOverMatches, idx)
          ? "underline decoration-green-600 md:"
          : "";
      }
    } else {
      if (mousedOver !== "") {
        const mousedOverMatches = matches.filter(
          (m) => m.guessName === mousedOver
        )[0]?.correctIndices;
        return mousedOverMatches && isMember(mousedOverMatches, idx)
          ? "underline"
          : "";
      }
    }
  };

  const chars = [...wordToRender];
  return chars.map((char, idx) => (
    <span key={"highlight" + idx} className={highlightClass(idx)}>
      {char}
    </span>
  ));
};

export default WordHighlight;
