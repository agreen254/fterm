import HighlightedWords from "./HighlightedWords";

import chunk from "../utils/chunk";
import findSameLetters from "../utils/highlightChars/findSameLetters";
import { Guess } from "../utils/interfaces";

interface Props {
  words: string[] | undefined;
  selectedWord: string | undefined;
  setSelectedWord: (word: string) => void;
  guesses: Guess[];
}

const WordDisplay = ({
  guesses,
  words,
  selectedWord,
  setSelectedWord,
}: Props) => {
  if (words === undefined || words.length === 0) return null;

  return (
    <div className="px-5 py-5 bg-gray-800 border-2 border-black rounded-md relative min-h-[35rem]">
      <ul>
        {chunk(words, 2).map((chunk, idx) => (
          <li key={idx}>
            <div className="flex flex-row justify-center">
              {chunk.map((word) => (
                <button
                  className={
                    "px-5 py-3 text-2xl min-w-[4rem] m-2 hover:bg-gray-500" +
                    (selectedWord === word ? " bg-gray-500" : "")
                  }
                  key={word}
                  onClick={() => {
                    if (selectedWord !== word) setSelectedWord(word);
                    else {
                      setSelectedWord("");
                    }
                  }}
                >
                  <HighlightedWords
                    word={word}
                    sameLetters={findSameLetters(
                      guesses[0].word,
                      word,
                      guesses[0].numCorrect
                    )}
                  />
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="text-md absolute bottom-1 left-2">-- WORDS --</p>
    </div>
  );
};

export default WordDisplay;
