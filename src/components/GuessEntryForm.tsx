import { useContext } from "react";
import WordHistoryContext from "./contexts/wordHistoryContext";

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
    <div className="flex justify-center">
      <div className="flex flex-col">
        {wordLength.map((n) => (
          <div key={selectedEntry + n}>
            <button>{n + " correct"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuessEntryForm;
