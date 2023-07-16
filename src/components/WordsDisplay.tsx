import { useContext } from "react";
import WordHighlight from "./WordHighlight";

import findMult from "../utils/highlightChars/findMult";

import "../styles/words-grid.css";
import GlobalContext from "./contexts/globalContext";

interface Props {
  selectedWord: string | undefined;
  setSelectedWord: (word: string) => void;
  numCols: number;
}

const WordsDisplay = ({ selectedWord, setSelectedWord, numCols }: Props) => {
  const { state } = useContext(GlobalContext);
  const words = state.words;
  const guesses = state.guesses;
  if (words === undefined || words.length === 0) return null;

  const isGuess = (word: string) => {
    return guesses.filter((guess) => guess.word === word).length > 0;
  };

  const nonGuessWords = words.filter((word) => {
    if (!isGuess(word)) return word;
  });

  const possibleAnswer = (word: string) => {
    return findMult(guesses, word).length > 0;
  };

  const classString = "grid grid-cols-" + numCols;

  return (
    <div className="relative h-[66vh] overflow-auto rounded-md border-2 border-black bg-stone-800 px-5 py-5">
      <p className="inline">&gt;&gt; GUESSES</p>
      <div className="mb-2 mt-1 h-1 w-full rounded bg-[rgb(255,185,50)]" />
      <div className="grid grid-cols-1">
        {guesses &&
          guesses.map((guess, idx) => {
            return (
              <div key={"guess" + idx} className="flex flex-row justify-center">
                <button
                  className={
                    "m-2 min-w-[4rem] max-w-[15rem] px-5 py-3 text-2xl hover:bg-stone-600" +
                    (selectedWord === guess.word ? " bg-stone-600" : "")
                  }
                  onClick={() => {
                    if (selectedWord !== guess.word)
                      setSelectedWord(guess.word);
                    else {
                      setSelectedWord("");
                    }
                  }}
                >
                  {guess.word + ":" + guess.numCorrect}
                </button>
              </div>
            );
          })}
      </div>
      <p className="mt-4 block">&gt;&gt; OTHER</p>
      <div className="mt-1 h-1 w-full rounded bg-[rgb(255,185,50)]" />
      <div className={classString}>
        {nonGuessWords.map((word, idx) => (
          <button
            key={"notGuess" + idx}
            className={
              "m-2 px-5 py-3 text-2xl " +
              (selectedWord === word && possibleAnswer(word)
                ? "bg-stone-600 "
                : "") +
              (possibleAnswer(word) ? "hover:bg-stone-600" : "")
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
                sameLetters={findMult(guesses, word)}
              />
            )}
          </button>
        ))}
      </div>
      <p className="absolute right-2 top-1">-- WORDS --</p>
    </div>
  );
};

export default WordsDisplay;
