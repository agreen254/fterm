import { GuessMatch } from "../utils/interfaces";
import getMaxMatchIdx from "../utils/getMaxMatchIdx";
import isValidGuess from "../utils/validation/newSolnFinder/isValidGuess";
import isMember from "../utils/isMember";

interface Props {
  mousedOver: string;
  matches: GuessMatch[];
  wordToRender: string;
}

//TODO: Underline characters are shown specifically to the hovered guess
//TODO: Make hovered ones underline green, selected ones underline orange

const WordHighlight = ({ mousedOver, matches, wordToRender }: Props) => {
  if (matches.length === 0 || !isValidGuess(matches))
    return <span>{wordToRender}</span>;

  const maxMatchIdx = getMaxMatchIdx(matches);
  const highlightClass = (idx: number) => {
    if (mousedOver === "") {
      return isMember(matches[maxMatchIdx].correctIndices, idx)
        ? "text-2xl underline"
        : "";
    }

    const matchesForGuess = matches.filter(
      (m) => m.guessName === mousedOver
    )[0];
    const isValidIdx = isMember(matchesForGuess.correctIndices, idx);
    if (isValidIdx) return "text-2xl underline decoration-green-600";
    else return "";
  };

  const chars = [...wordToRender];
  return chars.map((char, idx) => (
    <span key={"highlight" + idx} className={highlightClass(idx)}>
      {char}
    </span>
  ));
};

export default WordHighlight;
