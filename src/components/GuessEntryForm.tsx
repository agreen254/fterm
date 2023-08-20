import { useContext } from "react";
import WordHistoryContext from "./contexts/wordHistoryContext";

import "../styles/words-grid.css";

const GuessEntryForm = () => {
  const {
    state: {
      current: { guesses, words, selectedEntry },
    },
    dispatch,
  } = useContext(WordHistoryContext);
  const wordLength = words.reduce(
    (n) => {
      return [...n, n.length];
    },
    [0, 1]
  );

  const handleAddGuess = (numCorrect: string) => {
    if (numCorrect === "noGuess")
      dispatch({
        type: "RESTOREGUESSTOWORD",
        guessToRestore: guesses.filter((g) => g.guess === selectedEntry)[0],
      });

    const nc = parseInt(numCorrect);
    if (nc >= 0)
      dispatch({
        type: "ADDGUESS",
        guessToAdd: { guess: selectedEntry, numCorrect: nc },
      });
  };

  return (
    <div className="wordsGrid">
      {wordLength.map((n) => (
        <div key={selectedEntry + n} className="mb-4 flex justify-center">
          <button className="w-full rounded-md border-2 border-black px-5 py-3 hover:bg-stone-500">
            {n}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GuessEntryForm;
