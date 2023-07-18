import { useContext } from "react";
import WordHighlight from "./WordHighlight";

import findMult from "../utils/highlightChars/findMult";

import "../styles/words-grid.css";
import GlobalContext from "./contexts/globalContext";

interface Props {
  numCols: number;
}

const WordsDisplay = ({ numCols }: Props) => {
  const { state, dispatch } = useContext(GlobalContext);
  const words = state.words;
  const guesses = state.guesses;
  const selectedEntry = state.selectedEntry;
  if (words === undefined || words.length === 0) return null;

  const isGuess = (word: string) => {
    return guesses.filter((guess) => guess.word === word).length > 0;
  };

  const possibleAnswer = (word: string) => {
    return findMult(guesses, word).length > 0;
  };

  const handleSelection = (selected: string, comparedWord: string) => {
    if (selected !== comparedWord)
      dispatch({ type: "SELECTENTRY", entry: comparedWord });
    else dispatch({ type: "CLEARSELECTEDENTRY" });
  };

  const classString = "grid grid-cols-" + numCols;

  return (
    <div
      className="relative h-[66vh] overflow-auto rounded-md border-2 border-black bg-stone-800 px-5 py-5"
      id="wordDisplayContainer"
    >
      <p className="inline">&gt;&gt; GUESSES</p>
      <div className="mb-2 mt-1 h-1 w-full rounded bg-[rgb(255,185,50)]" />
      <div className="grid grid-cols-1">
        {guesses.map((guess, idx) => {
          return (
            <div key={"guess" + idx} className="flex flex-row justify-center">
              <button
                className={
                  "m-2 min-w-[4rem] max-w-[15rem] px-5 py-3 text-2xl hover:bg-stone-600" +
                  (selectedEntry === guess.word ? " bg-stone-600" : "")
                }
                onClick={() => handleSelection(selectedEntry, guess.word)}
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
        {words.map((word, idx) => (
          <button
            key={"notGuess" + idx}
            className={
              "m-2 py-3 text-2xl " +
              (selectedEntry === word && possibleAnswer(word)
                ? "bg-stone-600 "
                : "") +
              (possibleAnswer(word) ? "hover:bg-stone-600" : "")
            }
            onClick={() => handleSelection(selectedEntry, word)}
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
    </div>
  );
};

export default WordsDisplay;
