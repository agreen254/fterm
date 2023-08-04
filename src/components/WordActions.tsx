import { useContext } from "react";
import WordContext from "./contexts/wordContext";

const WordActions = () => {
  const { state, dispatch } = useContext(WordContext);
  const words = state.words;
  const selectedEntry = state.selectedEntry;

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

  if (words.length === 0) return null;

  return (
    <div className="relative hidden h-[66vh] rounded-md border-2 border-black bg-stone-800 px-5 py-5 2xl:block">
      <p className="text-center text-lg">
        {selectedEntry ? "SELECTED WORD: " + selectedEntry : "NO SELECTED WORD"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center">
          <button
            className="my-4 w-full max-w-[12rem] rounded-md border-2 border-black px-5 py-3 text-red-600 hover:bg-stone-700"
            onClick={handleDelete}
          >
            DELETE WORD
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="my-4 w-full max-w-[12rem] rounded-md border-2 border-black px-5 py-3 text-red-600 hover:bg-stone-700"
            onClick={() =>
              dispatch({
                type: "DELETEALL",
              })
            }
          >
            DELETE ALL
          </button>
        </div>
        <div className="flex justify-center">
          <button className="my-4 w-full max-w-[12rem] rounded-md border-2 border-black px-5 py-3 hover:bg-stone-500">
            GUESSED
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordActions;
