import { useEffect, useReducer, useState } from "react";

import WordsDisplay from "./components/WordsDisplay";
import WordActions from "./components/WordActions";
import WordEntryForm from "./components/WordEntryForm";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";
import "./styles/scrollbar.css";
import ActionsHistory from "./components/ActionsHistory";
import columnBreakpoints from "./utils/columnBreakpoints";
import globalReducer from "./components/reducers/globalReducer";
import GlobalContext from "./components/contexts/globalContext";

function App() {
  const [state, dispatch] = useReducer(globalReducer, {
    words: [],
    guesses: [
      {
        word: "BELONGING",
        numCorrect: 1,
      },
      {
        word: "EXPLORING",
        numCorrect: 4,
      },
    ],
    events: [],
  });
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [numCols, setNumCols] = useState(0);

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

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="main flexrow scanner z-10 overflow-x-hidden overflow-y-hidden">
        <h1 className="my-4 text-5xl font-bold">VAULTERM</h1>
        <h2 className="absolute bottom-0 left-12 mb-8 font-bold md:text-base lg:text-xl xl:text-3xl">
          Vault-Tec Terminal Solver
        </h2>
        <WordEntryForm />
        <div className="grid w-[calc(66vw+15rem)] grid-cols-3 gap-4">
          <ActionsHistory words={state.words} events={state.events} />
          <div id="wordDisplayContainer">
            <WordsDisplay
              selectedWord={selectedWord}
              setSelectedWord={setSelectedWord}
              numCols={numCols}
            />
          </div>
          <WordActions
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
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
