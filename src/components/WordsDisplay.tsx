import { useContext, useState } from "react";

import WordHistoryContext from "./contexts/wordHistoryContext";
import WordHighlight from "./WordHighlight";
import fitsAllGuesses from "../utils/validation/wordSolutionFinder/fitsAllGuesses";
import findMatchesAllGuesses from "../utils/validation/newSolnFinder/findMatchesAllGuesses";
import getColsClassName from "../utils/gridColsClassName";
import isMember from "../utils/isMember";

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

  const validWords = words.reduce((validWords: string[], w) => {
    return fitsAllGuesses(guesses, w).areValid.filter((b) => b === false)
      .length === 0
      ? [...validWords, w]
      : validWords;
  }, []);

  const wordClassName = (word: string) => {
    if (isMember(validWords, word)) {
      return word === selectedEntry
        ? "m-2 py-3 text-lg md:text-2xl text-[rgb(255,185,50)] hover:bg-stone-600 bg-stone-600"
        : "m-2 py-3 text-lg md:text-2xl hover:bg-stone-600";
    } else {
      return "m-2 py-3 text-lg md:text-2xl text-stone-600";
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
      className="relative min-h-[66vh] rounded-md border-2 border-black bg-stone-800 px-5 pb-5 pt-2"
      id="wordDisplayContainer"
    >
      <p className="md:text-xl">{">> GUESSES"}</p>
      <div className="my-2 h-2 w-full rounded bg-[rgb(255,185,50)]" />
      <div>
        <div className="grid grid-cols-1">
          {guesses.map(({ guess, numCorrect }, idx) => {
            return (
              <div key={"guess" + idx} className="flex flex-row justify-center">
                <button
                  className={
                    "m-2 min-w-[4rem] max-w-[15rem] px-5 py-3 text-lg hover:bg-stone-600 md:text-2xl" +
                    (selectedEntry === guess ? " bg-stone-600" : "")
                  }
                  onClick={() => handleSelection(selectedEntry, guess)}
                  onMouseEnter={() => setMousedOverGuess(guess)}
                  onMouseLeave={() => {
                    setMousedOverGuess("");
                  }}
                >
                  {guess + ":" + numCorrect}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-4 block md:text-xl">{">> WORDS"}</p>
      <div className="my-2 h-2 w-full rounded bg-[rgb(255,185,50)]" />
      <div>
        <div className={colsClassName}>
          {words.map((word, idx) => (
            <button
              key={"word" + idx}
              className={wordClassName(word)}
              onClick={() => handleSelection(selectedEntry, word)}
            >
              <WordHighlight
                matches={findMatchesAllGuesses(guesses, word)}
                mousedOver={mousedOverGuess}
                wordToRender={word}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordsDisplay;
