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

  if (words === undefined || words.length === 0) return null;

  return (
    <div className="px-5 py-5 bg-gray-800 border-2 border-black rounded-md relative min-h-[35rem]">
      <p className="text-center text-lg">
        {selectedWord ? "SELECTED WORD: " + selectedWord : "NO SELECTED WORD"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center">
          <button
            className="px-5 py-3 my-4 w-full max-w-[12rem] border-2 rounded-md border-black hover:bg-gray-500"
            onClick={deleteWord}
          >
            DELETE WORD
          </button>
        </div>
        <div className="flex justify-center">
          <button className="px-5 py-3 my-4 w-full max-w-[12rem] border-2 rounded-md border-black hover:bg-gray-500">
            DELETE ALL
          </button>
        </div>
        <div className="flex justify-center">
          <button className="px-5 py-3 my-4 w-full max-w-[12rem] border-2 rounded-md border-black hover:bg-gray-500">
            GUESSED
          </button>
        </div>
      </div>
      <p className="text-md absolute bottom-1 left-2">-- WORD ACTIONS --</p>
    </div>
  );
};

export default WordActions;
