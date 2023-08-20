import { useContext } from "react";
import GuessEntryForm from "./GuessEntryForm";
import WordHistoryContext from "./contexts/wordHistoryContext";

const WordActions = () => {
  const {
    state: {
      current: { words, selectedEntry },
    },
    dispatch,
  } = useContext(WordHistoryContext);

  const handleDelete = () => {
    if (words.filter((w) => w === selectedEntry).length > 0) {
      dispatch({
        type: "DELETEWORD",
        wordToDelete: selectedEntry,
      });
    } else {
      dispatch({
        type: "DELETEGUESS",
        guessWordToDelete: selectedEntry,
      });
    }
    dispatch({ type: "CLEARSELECTEDENTRY" });
  };

  const handleAddGuess = (numCorrect: number) => {
    dispatch({
      type: "ADDGUESS",
      guessToAdd: {
        guess: selectedEntry,
        numCorrect: numCorrect,
      },
    });
  };

  if (selectedEntry === "")
    return (
      <div className="relative hidden min-h-[66vh] rounded-md border-2 border-black bg-stone-800 px-5 py-5 2xl:block">
        <p className="text-center text-lg md:text-2xl">
          {selectedEntry
            ? "SELECTED WORD: " + selectedEntry
            : "NO SELECTED WORD"}
        </p>
      </div>
    );

  return (
    <div className="relative hidden min-h-[66vh] rounded-md border-2 border-black bg-stone-800 px-5 py-5 2xl:block">
      <p className="text-center text-lg md:text-xl">
        {"SELECTED WORD: " + selectedEntry}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center">
          <button
            className="my-4 w-full rounded-md border-2 border-black px-5 py-3 text-red-500 hover:bg-black"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
        <div className="flex justify-center">
          <button className="my-4 w-full rounded-md border-2 border-black px-5 py-3 hover:bg-stone-500">
            GUESSED
          </button>
        </div>
      </div>
      <GuessEntryForm />
    </div>
  );
};

export default WordActions;
