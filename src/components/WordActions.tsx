interface Props {
  words: string[] | undefined;
  setWords: (words: string[]) => void;
  selectedWord: string | undefined;
  setSelectedWord: (word: string) => void;
}

const WordActions = ({
  words,
  setWords,
  selectedWord,
  setSelectedWord,
}: Props) => {
  const deleteWord = () => {
    if (words) setWords(words?.filter((word) => word !== selectedWord));
    setSelectedWord("");
  };

  return (
    selectedWord && (
      <div>
        <button
          className="px-5 py-3 my-4 w-48 border rounded"
          onClick={deleteWord}
        >
          DELETE WORD
        </button>
        <div className="flex flex-row items-center justify-center border bg-gray-800 rounded">
          <input
            type="checkbox"
            id="guessed"
            name="guessed"
            className="w-4 h-4 pl-4 accent-red-500 rounded-full shadow"
          />
          <label htmlFor="guessed" className="py-4 ml-2">
            GUESSED
          </label>
        </div>
      </div>
    )
  );
};

export default WordActions;
