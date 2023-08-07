import { useContext, useState } from "react";

import WordHistoryContext from "./contexts/wordHistoryContext";
import WordHighlight from "./WordHighlight";
import fitsAllGuesses from "../utils/validation/wordSolutionFinder/fitsAllGuesses";
import findMatchesAllGuesses from "../utils/validation/newSolnFinder/findMatchesAllGuesses";
import getColsClassName from "../utils/gridColsClassName";
import isMember from "../utils/isMember";

import "../styles/words-grid.css";

interface Props {
  numCols: number;
}

const WordsDisplay = ({ numCols }: Props) => {
  const {
    state: {
      current: { words, guesses, selectedEntry },
    },
    dispatch,
  } = useContext(WordHistoryContext);
  const [mousedOverGuess, setMousedOverGuess] = useState("");

  if (words.length === 0) return null;

  const validWords = words.reduce((validWords: string[], w) => {
    return fitsAllGuesses(guesses, w).areValid.filter((b) => b === false)
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

  const colsClassName = getColsClassName(numCols);

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
      <div className="mb-2 mt-1 h-1 w-full bg-[rgb(255,185,50)]" />
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
                onMouseEnter={() => setMousedOverGuess(guess)}
                onMouseLeave={() => {
                  setMousedOverGuess("");
                  console.log("moused over guess: ", mousedOverGuess);
                }}
              >
                {guess + ":" + numCorrect}
              </button>
            </div>
          );
        })}
      </div>
      <p className="mt-4 block">&gt;&gt; WORDS</p>
      <div className="mt-1 h-1 w-full bg-[rgb(255,185,50)]" />
      <div className={colsClassName}>
        {words.map((word, idx) => (
          <button
            key={"word" + idx}
            className={wordClassName(word)}
            onClick={() => handleSelection(selectedEntry, word)}
          >
            <WordHighlight
              mousedOver={mousedOverGuess}
              matches={findMatchesAllGuesses(guesses, word)}
              wordToRender={word}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordsDisplay;
