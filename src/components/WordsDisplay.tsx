import { useContext } from "react";

import GlobalContext from "./contexts/globalContext";
import WordHighlight from "./WordHighlight";
import isMember from "../utils/isMember";
import wordValidityData from "../utils/retry/wordValidityData";

import "../styles/words-grid.css";
import maxPlacements from "../utils/maxPlacements";
import mostCharsGuess from "../utils/mostCharsGuess";

interface Props {
  numCols: number;
}

const WordsDisplay = ({ numCols }: Props) => {
  const { state, dispatch } = useContext(GlobalContext);
  const words = state.words;
  const guesses = state.guesses;
  const selectedEntry = state.selectedEntry;
  const validWords = words.reduce((validWords: string[], w) => {
    return wordValidityData(guesses, w).areValid.filter((b) => b === false)
      .length === 0
      ? [...validWords, w]
      : validWords;
  }, []);
  const wordClassName = (word: string) => {
    if (isMember(validWords, word)) {
      return word === selectedEntry
        ? "m-2 py-3 text-2xl text-[rgb(255,185,50)] hover:bg-stone-600 bg-stone-600"
        : "m-2 py-3 text-2xl hover:bg-stone-600";
    } else {
      return "m-2 py-3 text-2xl text-stone-600";
    }
  };
  if (words.length === 0) return null;

  const getNumCols = () => {
    switch (numCols) {
      case 1:
        return "grid grid-cols-1";
      case 2:
        return "grid grid-cols-2";
      case 3:
        return "grid grid-cols-3";
      default:
        return "grid grid-cols-4";
    }
  };

  const handleSelection = (selected: string, comparedWord: string) => {
    if (selected !== comparedWord)
      dispatch({ type: "SELECTENTRY", entry: comparedWord });
    else dispatch({ type: "CLEARSELECTEDENTRY" });
  };

  return (
    <div
      className="relative h-[66vh] overflow-auto rounded-md border-2 border-black bg-stone-800 px-5 py-5"
      id="wordDisplayContainer"
    >
      <p className="inline">&gt;&gt; GUESSES</p>
      <div className="mb-2 mt-1 h-1 w-full rounded bg-[rgb(255,185,50)]" />
      <div className="grid grid-cols-1">
        {guesses.map(({ guess, numCorrect }, idx) => {
          return (
            <div key={"guess" + idx} className="flex flex-row justify-center">
              <button
                className={
                  "m-2 min-w-[4rem] max-w-[15rem] px-5 py-3 text-2xl hover:bg-stone-600" +
                  (selectedEntry === guess ? " bg-stone-600" : "")
                }
                onClick={() => handleSelection(selectedEntry, guess)}
              >
                {guess + ":" + numCorrect}
              </button>
            </div>
          );
        })}
      </div>
      <p className="mt-4 block">&gt;&gt; OTHER</p>
      <div className="mt-1 h-1 w-full rounded bg-[rgb(255,185,50)]" />
      <div className={getNumCols()}>
        {words.map((word, idx) => (
          <button
            key={"word" + idx}
            className={wordClassName(word)}
            onClick={() => handleSelection(selectedEntry, word)}
          >
            {/* <WordHighlight
              word={word}
              sameLetters={maxPlacements(
                wordValidityData(guesses, word),
                mostCharsGuess(guesses)
              )}
            /> */}
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordsDisplay;
