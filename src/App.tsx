import { useState } from "react";

import ErrorList from "./components/ErrorList";
import WordDisplay from "./components/WordDisplay";
import WordActions from "./components/WordActions";

import { ValidationErrors } from "./utils/interfaces";
import emptyErrors from "./utils/emptyErrors";
import { Guess } from "./utils/interfaces";
import makeErrorObj from "./utils/validation/makeErrors/makeErrorObj";
import makeUnique from "./utils/makeUnique";
import processWordList from "./utils/processWordList";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";

function App() {
  const [wordList, setWordList] = useState<string[]>();
  const [selectedWord, setSelectedWord] = useState<string>();
  const [errors, setErrors] = useState<ValidationErrors>(emptyErrors);
  const [events, setEvents] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([
    {
      word: "BELONGING",
      numCorrect: 3,
    },
  ]);

  const makeDemo = () => {
    setWordList([
      "BELONGING",
      "EXPLORING",
      "SELECTING",
      "REMINDING",
      "SUMMONING",
      "AMERICANS",
      "AGREEMENT",
      "RELEASING",
      "TERRIFIED",
      "ASCENSION",
    ]);
    setSelectedWord("");
  };

  const handleSubmitWordEntries = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawInput: string = e.currentTarget.words.value;
    const clonedErrors = makeErrorObj(errors, rawInput, wordList);
    const hasError = !!Object.values(clonedErrors).find(
      (errMessage) => errMessage !== ""
    );
    setErrors(clonedErrors); // do this AFTER to stop errors slipping through on first click
    if (hasError) return;

    setErrors(emptyErrors);
    setEvents([...events, "Added " + rawInput.split(" ").length + " words"]);
    if (wordList) {
      setWordList(makeUnique([...wordList, ...processWordList(rawInput)]));
    } else setWordList(makeUnique(...[processWordList(rawInput)]));
  };

  return (
    <>
      <div className="main flexrow scanner z-10">
        <h1 className="text-5xl my-4 font-bold">VAULTERM</h1>
        <h2 className="md:text-base lg:text-xl xl:text-3xl mb-8 font-bold absolute bottom-0 left-12">
          Vault-Tec Terminal Solver
        </h2>
        <form
          id="wordEntryForm"
          onSubmit={(e) => handleSubmitWordEntries(e)}
          className="mb-4"
        >
          <label htmlFor="words" className="text-xl block">
            input terminal words, separated by spaces:
          </label>
          <button
            type="reset"
            className={
              "px-5 py-3 w-16 font-bold box-content bg-gray-800 border-2 border-black rounded-tl rounded-bl hover:bg-gray-500"
            }
            onClick={() => setErrors(emptyErrors)}
          >
            CLEAR
          </button>
          <div className="inline py-[14px] pl-2 bg-gray-800 border-y-black border-y-2">
            &gt;&gt;
          </div>
          <input
            type="text"
            id="words"
            autoComplete="off"
            className="pl-2 pr-5 py-3 w-[66vw] shadow appearance-none focus:outline-none bg-gray-800 border-y-black border-y-2"
          />
          <button
            type="submit"
            className="px-5 py-3 w-16 font-bold box-content bg-gray-800 border-2 border-black rounded-tr rounded-br hover:bg-gray-500"
          >
            ADD
          </button>
          <ErrorList errors={errors} />
        </form>
        <div className="w-[calc(66vw+15rem)] grid grid-cols-3 gap-4">
          {wordList === undefined || wordList.length === 0 || (
            <div
              className="bg-gray-800 border-2 border-black rounded min-h-[35rem] relative"
              hidden={wordList ? false : true}
            >
              <ul className="pl-4 pt-2">
                {events.map((event) => (
                  <li key={event}>
                    <div className="flex flex-row justify-evenly">
                      <p>{event}</p>
                      <button>RESTORE</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="absolute bottom-1 left-2">-- HISTORY --</p>
            </div>
          )}
          <WordDisplay
            guesses={guesses}
            words={wordList}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
          />
          <WordActions
            words={wordList}
            setWords={setWordList}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
          />
        </div>
        <button
          className="px-5 py-3 my-4 w-48 border rounded"
          onClick={makeDemo}
        >
          DEMO
        </button>
        <button
          className="px-5 py-3 mb-4 w-48 border rounded"
          onClick={() => {
            setWordList(undefined);
            setErrors(emptyErrors);
            setSelectedWord("");
          }}
        >
          DELETE ALL
        </button>
      </div>
    </>
  );
}

export default App;
