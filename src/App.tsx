import { useEffect, useReducer, useState } from "react";

import ActionsHistory from "./components/ActionsHistory";
import GlobalContext from "./components/contexts/globalContext";
import WordActions from "./components/WordActions";
import WordsDisplay from "./components/WordsDisplay";
import WordEntryForm from "./components/WordEntryForm";
import columnBreakpoints from "./utils/columnBreakpoints";
import globalReducer from "./components/reducers/globalReducer";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";
import "./styles/scrollbar.css";

function App() {
  const [state, dispatch] = useReducer(globalReducer, {
    events: [],
    guesses: [],
    selectedEntry: "",
    words: [],
  });
  const [numCols, setNumCols] = useState(0);

  // enable dynamic column width
  useEffect(() => {
    const handleResize = () => {
      const w = document.getElementById("wordDisplayContainer")?.offsetWidth;
      const bp =
        state.words.length > 0
          ? columnBreakpoints.get(state.words[0].length)
          : 4;
      const bpAssert = bp || 100000;
      return w ? setNumCols(Math.floor(w / bpAssert)) : setNumCols(1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state]);

  const makeDemo = () => {
    dispatch({
      type: "ADDWORD",
      rawInput:
        "SELECTING REMINDING SUMMONING AMERICANS AGREEMENT RELEASING TERRIFIED ASCENSION",
    });
    dispatch({
      type: "ADDGUESS",
      guessToAdd: {
        guess: "BELONGING",
        numCorrect: 3,
      },
    });
    dispatch({
      type: "ADDGUESS",
      guessToAdd: {
        guess: "EXPLORING",
        numCorrect: 4,
      },
    });
    dispatch({ type: "CLEARSELECTEDENTRY" });
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="main flexrow scanner z-10 overflow-x-hidden overflow-y-hidden">
        <h1 className="my-4 text-5xl font-bold">VAULTERM</h1>
        <h2 className="absolute bottom-0 left-12 mb-8 font-bold md:text-base lg:text-xl xl:text-3xl">
          Vault-Tec Terminal Solver
        </h2>
        <WordEntryForm />
        <div className="grid w-[calc(66vw+15rem)] gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
          <ActionsHistory />
          <WordsDisplay numCols={numCols} />
          <WordActions />
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
