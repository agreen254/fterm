import { useReducer, useState } from "react";

import MainBody from "./components/layout/MainBody";
import WordHistoryContext from "./components/contexts/wordHistoryContext";
import WordEntryForm from "./components/WordEntryForm";
import useWordDisplayColumns from "./hooks/useWordDisplayColumns";
import wordHistoryReducer from "./components/reducers/wordHistoryReducer";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";
import "./styles/scrollbar.css";

function App() {
  const [state, dispatch] = useReducer(wordHistoryReducer, {
    prevs: [],
    current: {
      events: [],
      guesses: [],
      selectedEntry: "",
      words: [],
    },
  });
  const [numCols, setNumCols] = useState(0);
  const [selectedTab, setSelectedTab] = useState(
    window.innerWidth > 1024 ? "ACTIONS" : "WORDS"
  );

  useWordDisplayColumns({
    state,
    selectedTab,
    setSelectedTab,
    setNumCols,
  });

  return (
    <WordHistoryContext.Provider value={{ state, dispatch }}>
      <div className="main scanner z-10 flex max-w-[1920px] flex-col items-center overflow-x-hidden font-bold mx-auto my-0">
        <h1 className="neon my-4 text-2xl font-bold tracking-wider md:text-5xl">
          VAULTERM
        </h1>
        <h2 className="fixed bottom-0 left-12 z-0 mb-8 hidden font-bold lg:block lg:text-lg">
          {"Vault-Tec Terminal Solver".toUpperCase()}
        </h2>
        <WordEntryForm />
        <MainBody
          numCols={numCols}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </WordHistoryContext.Provider>
  );
}

export default App;
