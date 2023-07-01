interface Props {
  words: string[] | undefined;
  selectedWord: string | undefined;
  setWords: (words: string[]) => void;
}

const WordActions = ({ words, selectedWord, setWords }: Props) => {
  const deleteWord = () => {
    if (words) setWords(words?.filter((word) => word !== selectedWord));
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
      </div>
    )
  );
};

export default WordActions;
