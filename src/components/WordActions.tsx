import { Guess } from "../utils/interfaces";

interface Props {
  words: string[] | undefined;
  setWords: (words: string[]) => void;
  selectedWord: string | undefined;
  setSelectedWord: (word: string) => void;
  guesses: Guess[] | undefined;
  setGuesses: (guesses: Guess[]) => void;
}

const WordActions = ({
  words,
  setWords,
  selectedWord,
  setSelectedWord,
  guesses,
  setGuesses,
}: Props) => {
  const deleteWord = () => {
    if (words) setWords(words.filter((word) => word !== selectedWord));
    if (guesses)
      setGuesses(guesses.filter((guess) => guess.word !== selectedWord));
    setSelectedWord("");
  };

  if (words === undefined || words.length === 0) return null;

  return (
    <div className="relative hidden h-[66vh] rounded-md border-2 border-black bg-stone-800 px-5 py-5 xl:block">
      <p className="text-center text-lg">
        {selectedWord ? "SELECTED WORD: " + selectedWord : "NO SELECTED WORD"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center">
          <button
            className="my-4 w-full max-w-[12rem] rounded-md border-2 border-black px-5 py-3 text-red-600 hover:bg-stone-700"
            onClick={deleteWord}
          >
            DELETE WORD
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="my-4 w-full max-w-[12rem] rounded-md border-2 border-black px-5 py-3 text-red-600 hover:bg-stone-700"
            onClick={() => setWords([])}
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
      <p className="text-md absolute right-2 top-1">-- WORD ACTIONS --</p>
    </div>
  );
};

export default WordActions;
