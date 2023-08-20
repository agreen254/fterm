import { useContext } from "react";
import GuessEntryForm from "./GuessEntryForm";
import WordHistoryContext from "./contexts/wordHistoryContext";

const WordActions = () => {
  const {
    state: {
      current: { guesses, words, selectedEntry },
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

  if (selectedEntry === "")
    return (
      <div className="relative hidden min-h-[66vh] rounded-md border-2 border-black bg-stone-800 px-5 pt-2 2xl:block">
        <p className="sm:text-lg md:text-xl">{">> NO SELECTED WORD"}</p>
        <div className="my-2 mb-6 h-2 w-full rounded bg-[rgb(255,185,50)]" />
      </div>
    );

  return (
    <div className="relative hidden min-h-[66vh] rounded-md border-2 border-black bg-stone-800 px-5 pt-2 2xl:block">
      <p className="sm:text-lg md:text-xl">
        {">> SELECTED WORD: " + selectedEntry}
      </p>
      <div className="my-2 mb-4 h-2 w-full rounded bg-[rgb(255,185,50)]" />
      <GuessEntryForm />
      <div className="absolute bottom-0 left-0 my-4 w-full">
        {guesses.find((g) => g.guessName === selectedEntry) ? (
          <div className="grid grid-cols-2 gap-4 px-4">
            <button
              className="w-full rounded-md border-2 border-black px-5 py-3 hover:bg-stone-500"
              onClick={() =>
                dispatch({
                  type: "RESTOREGUESSTOWORD",
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  guessToRestore: guesses.find(
                    (g) => g.guessName === selectedEntry
                  )!,
                })
              }
            >
              REVERT GUESS
            </button>
            <button
              className="w-full rounded-md border-2 border-black px-5 py-3 text-red-500 hover:bg-black"
              onClick={handleDelete}
            >
              DELETE WORD
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className="w-[calc(100%-2rem)] rounded-md border-2 border-black py-3 text-red-500 hover:bg-black"
              onClick={handleDelete}
            >
              DELETE WORD
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordActions;
