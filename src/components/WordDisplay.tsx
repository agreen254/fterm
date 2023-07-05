import HighlightedWords from "./WordHighlight";

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

  const isGuess = (word: string) => {
    return guesses.filter((guess) => guess.word === word).length > 0;
  };

  const nonGuessWords = words.filter((word) => {
    if (!isGuess(word)) return word;
  });

  return (
    <div className="px-5 py-5 bg-gray-800 border-2 border-black rounded-md relative min-h-[35rem]">
      <span>
        <p>&gt;&gt; GUESSES</p>
        <div className="inline-block h-12 w-12 bg-[rgb(255,185,50)]" />
      </span>
      <ul className="columns-1">
        {guesses.map((guess, idx) => {
          return (
            <li key={"guess" + idx} className="">
              <div className="flex justify-center">
                <button
                  className={
                    "px-5 py-3 text-2xl min-w-[4rem] m-2 hover:bg-gray-500" +
                    (selectedWord === guess.word ? " bg-gray-500" : "")
                  }
                  onClick={() => {
                    if (selectedWord !== guess.word)
                      setSelectedWord(guess.word);
                    else {
                      setSelectedWord("");
                    }
                  }}
                >
                  {guess.word}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <ul>
        {nonGuessWords.map((word, idx) => (
          <li key={"highlightable" + idx} className="columns-1">
            <div className="flex flex-row justify-center">
              <button
                className={
                  "px-5 py-3 text-2xl min-w-[4rem] m-2 hover:bg-gray-500" +
                  (selectedWord === word ? " bg-gray-500" : "")
                }
                onClick={() => {
                  if (selectedWord !== word) setSelectedWord(word);
                  else {
                    setSelectedWord("");
                  }
                }}
              >
                {isGuess(word) ? (
                  word
                ) : (
                  <HighlightedWords
                    word={word}
                    sameLetters={findSameLetters(
                      guesses[0].word,
                      word,
                      guesses[0].numCorrect
                    )}
                  />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-md absolute bottom-1 left-2">-- WORDS --</p>
    </div>
  );
};

export default WordDisplay;
