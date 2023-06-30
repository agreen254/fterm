import { useState } from "react";
import WordDisplay from "./components/WordDisplay";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";
import processWordList from "./utils/processWordList";
import makeUnique from "./utils/makeUnique";

function App() {
  const [wordList, setWordList] = useState<string[]>();
  const [resetHelper, setResetHelper] = useState<string>();

  const handleWordEntries = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wordList)
      setWordList(
        makeUnique([
          ...wordList,
          ...processWordList(e.currentTarget.words.value),
        ])
      );
    else setWordList(processWordList(e.currentTarget.words.value));
    setResetHelper("");
  };

  return (
    <>
      <div className="main flexrow scanner">
        <h1 className="text-5xl my-6 font-bold">FTERM</h1>
        <form onSubmit={(e) => handleWordEntries(e)}>
          <label htmlFor="words" className="text-xl block">
            input terminal words, separated by spaces:
          </label>
          <button
            type="button"
            onClick={() => {
              setResetHelper("");
            }}
            className="px-5 py-3 box-content bg-gray-800 border-2 border-gray-800 rounded-tl rounded-bl hover:bg-gray-500"
          >
            Clear
          </button>
          <input
            type="text"
            id="words"
            autoComplete="off"
            onChange={(e) => setResetHelper(e.target.value)}
            value={resetHelper}
            className="px-5 py-3 w-[66vw] shadow appearance-none focus:outline-none bg-gray-800 border-gray-800 border-2"
          />
          <button
            type="submit"
            className="px-5 py-3 box-content bg-gray-800 border-2 border-gray-800 rounded-tr rounded-br hover:bg-gray-500"
          >
            Enter
          </button>
        </form>
        <WordDisplay words={wordList} />
      </div>
    </>
  );
}

export default App;
