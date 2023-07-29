import { Placement } from "../utils/interfaces";
import isMember from "../utils/isMember";

interface Props {
  sameLetters: Placement[];
  validWords: string[];
  word: string;
}

//TODO: Underline characters are shown specifically to the hovered guess
//TODO: Make hovered ones underline green, selected ones underline orange

const WordHighlight = ({ sameLetters, word, validWords }: Props) => {
  if (!isMember(validWords, word))
    return <span className="text-stone-600">{word}</span>;

  const shouldHighlight = (char: string, idx: number) => {
    const containsLetter = sameLetters.filter(
      (letter) => char === letter.character
    )[0];
    return (
      containsLetter &&
      containsLetter.indices.filter((index) => index === idx).length === 1
    );
  };

  const highlightClass = (char: string, idx: number) => {
    return shouldHighlight(char, idx)
      ? "text-2xl underline decoration-green-600"
      : "";
  };

  const chars = [...word];
  return chars.map((char, idx) => (
    <span key={"highlight" + idx} className={highlightClass(char, idx)}>
      {char}
    </span>
  ));
};

export default WordHighlight;
