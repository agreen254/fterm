import { useEffect, useReducer, useState } from "react";

import ErrorList from "./components/ErrorList";
import WordsDisplay from "./components/WordsDisplay";
import WordActions from "./components/WordActions";

import { ValidationErrors } from "./utils/interfaces";
import emptyErrors from "./utils/emptyErrors";
import { Guess } from "./utils/interfaces";
import makeErrorObj from "./utils/validation/makeErrors/makeErrorObj";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";
import "./styles/scrollbar.css";
import ActionsHistory from "./components/ActionsHistory";
import columnBreakpoints from "./utils/columnBreakpoints";
import globalReducer from "./components/reducers/globalReducer";
import GlobalContext from "./components/contexts/globalContext";

function App() {
  // const [words, setWordList] = useState<string[]>([]);
  const [state, dispatch] = useReducer(globalReducer, {
    words: [],
    guesses: [],
  });
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>(emptyErrors);
  const [events, setEvents] = useState<string[]>([]);
  const [numCols, setNumCols] = useState(0);
  const [guesses, setGuesses] = useState<Guess[]>([
    {
      word: "BELONGING",
      numCorrect: 1,
    },
    {
      word: "EXPLORING",
      numCorrect: 4,
    },
  ]);

  // enable dynamic column width
  useEffect(() => {
    const handleResize = () => {
      const w = document.getElementById("wordDisplayContainer")?.offsetWidth;
      const bp =
        state.words.length > 0
          ? columnBreakpoints.get(state.words[0].length)
          : 4;
      const bpAssert = bp || 100;
      w ? console.log(w / bpAssert) : console.log("undefined w");
      return w ? setNumCols(Math.floor(w / bpAssert)) : setNumCols(1);
    };

    window.addEventListener("resize", handleResize);
    if (state) handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state]);

  const makeDemo = () => {
    dispatch({
      type: "ADDWORD",
      rawInput:
        "BELONGING EXPLORING SELECTING REMINDING SUMMONING AMERICANS AGREEMENT RELEASING TERRIFIED ASCENSION",
    });
    setSelectedWord("");
  };

  const handleSubmitWordEntries = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawInput: string = e.currentTarget.words.value;
    const clonedErrors = makeErrorObj(errors, rawInput, state.words);
    const hasError = !!Object.values(clonedErrors).find(
      (errMessage) => errMessage !== ""
    );
    setErrors(clonedErrors); // do this AFTER to stop errors slipping through on first click
    if (hasError) return;

    setErrors(emptyErrors);
    setEvents([...events, "Added " + rawInput.split(" ").length + " words"]);
    dispatch({
      type: "ADDWORD",
      rawInput: rawInput,
    });
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="main flexrow scanner z-10 overflow-x-hidden overflow-y-hidden">
        <h1 className="my-4 text-5xl font-bold">VAULTERM</h1>
        <h2 className="absolute bottom-0 left-12 mb-8 font-bold md:text-base lg:text-xl xl:text-3xl">
          Vault-Tec Terminal Solver
        </h2>
        <form
          id="wordEntryForm"
          onSubmit={(e) => handleSubmitWordEntries(e)}
          className="mb-4"
        >
          <label htmlFor="words" className="block text-xl">
            input terminal words, separated by spaces:
          </label>
          <button
            type="reset"
            className={
              "box-content w-16 rounded-bl rounded-tl border-2 border-black bg-stone-800 px-5 py-3 font-bold hover:bg-gray-500"
            }
            onClick={() => setErrors(emptyErrors)}
          >
            CLEAR
          </button>
          <div className="inline border-y-2 border-y-black bg-stone-800 py-[14px] pl-2">
            &gt;&gt;
          </div>
          <input
            type="text"
            id="words"
            autoComplete="off"
            className="w-[66vw] appearance-none border-y-2 border-y-black bg-stone-800 py-3 pl-2 pr-5 shadow focus:outline-none"
          />
          <button
            type="submit"
            className="box-content w-16 rounded-br rounded-tr border-2 border-black bg-stone-800 px-5 py-3 font-bold hover:bg-gray-500"
            // onClick={() => setWordList(words)}
          >
            ADD
          </button>
          <ErrorList errors={errors} />
        </form>
        <div className="grid w-[calc(66vw+15rem)] grid-cols-3 gap-4">
          <ActionsHistory words={state.words} events={events} />
          <div id="wordDisplayContainer">
            <WordsDisplay
              guesses={guesses}
              words={state.words}
              selectedWord={selectedWord}
              setSelectedWord={setSelectedWord}
              numCols={numCols}
            />
          </div>
          <WordActions
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            guesses={guesses}
            setGuesses={setGuesses}
          />
        </div>
        <button
          className="my-4 w-48 rounded border px-5 py-3"
          onClick={makeDemo}
        >
          DEMO
        </button>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
