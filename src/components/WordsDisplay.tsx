import WordHighlight from "./WordHighlight";

import findSameLetters from "../utils/highlightChars/findSameLetters";
import { Guess } from "../utils/interfaces";

interface Props {
  words: string[] | undefined;
  selectedWord: string | undefined;
  setSelectedWord: (word: string) => void;
  guesses: Guess[];
}

const WordsDisplay = ({
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
    <div className="px-5 py-5 bg-gray-800 border-2 border-black rounded-md relative h-[66vh] overflow-auto">
      <p className="inline">&gt;&gt; GUESSES</p>
      <div className="inline-block w-full h-1 rounded bg-[rgb(255,185,50)]" />
      <ul className="columns-1">
        {guesses &&
          guesses.map((guess, idx) => {
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
      <p className="inline">&gt;&gt; OTHER</p>
      <div className="inline-block h-1 w-full rounded bg-[rgb(255,185,50)]" />
      <ul className="mb-4">
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
                  <WordHighlight
                    word={word}
                    sameLetters={findSameLetters(guesses[0], word)}
                  />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    // <p className="text-md">-- WORDS --</p>
  );
};

export default WordsDisplay;
