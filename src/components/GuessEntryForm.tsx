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

  const guessAlreadyExists = () =>
    guesses.find((g) => g.guessName === selectedEntry);

  const handleAddGuess = (numCorrect: number) => {
    const existingGuess = guessAlreadyExists();
    if (existingGuess) {
      dispatch({
        type: "UPDATEGUESS",
        guessToUpdate: existingGuess,
        newNumCorrect: numCorrect,
      });
    } else
      dispatch({
        type: "ADDGUESS",
        guessToAdd: { guessName: selectedEntry, numCorrect },
      });
  };

  return (
    <>
      <p className="mt-10 mb-2 text-lg md:text-xl">NUMBER CORRECT</p>
      <div className="wordsGrid">
        {wordLength.map((n) => (
          <div key={selectedEntry + n} className="mb-4 flex justify-center">
            <button
              className="w-full rounded-md border-2 border-black px-5 py-3 hover:bg-stone-500"
              onClick={() => handleAddGuess(n)}
            >
              {n}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default GuessEntryForm;
