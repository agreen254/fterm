import { Placement } from "../utils/interfaces";

interface Props {
  word: string;
  sameLetters: Placement[] | false;
}

const WordHighlight = ({ word, sameLetters }: Props) => {
  if (!sameLetters || sameLetters.length === 0)
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

  const chars = [...word];
  return chars.map((char, idx) => (
    <span
      key={"highlight" + idx}
      className={
        // shouldHighlight(char, idx) ? "text-2xl shadow-sm bg-[#121212]" : ""
        shouldHighlight(char, idx) ? "text-2xl underline" : ""
      }
    >
      {char}
    </span>
  ));
};

export default WordHighlight;
