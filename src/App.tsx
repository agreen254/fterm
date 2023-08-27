import { useEffect, useReducer, useState } from "react";

import WordsHistory from "./components/WordsHistory";
import WordHistoryContext from "./components/contexts/wordHistoryContext";
import WordActions from "./components/WordActions";
import WordsDisplay from "./components/WordsDisplay";
import WordEntryForm from "./components/WordEntryForm";
import {
  columnBreakpoints,
  columnBreakpointsSm,
} from "./utils/columnBreakpoints";
import wordHistoryReducer from "./components/reducers/wordHistoryReducer";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";
import "./styles/scrollbar.css";
import TabGroup from "./components/TabGroup";
import MainBody from "./components/layout/MainBody";

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

  // enable dynamic column width for word displays
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.getElementById(
        "wordDisplayContainer"
      )?.offsetWidth;
      const viewportWidth = window.innerWidth;

      // stop the unavailable words tab from staying selected
      // if the viewport is stretched over the breakpoint
      if (viewportWidth > 1024 && selectedTab === "WORDS")
        setSelectedTab("HISTORY");

      if (state.current.words.length === 0) return;

      // no strict null checking for map.get method
      let colLength = 10000;
      if (viewportWidth && containerWidth && viewportWidth >= 768) {
        colLength =
          columnBreakpoints.get(state.current.words[0].length) || 10000;
      } else if (viewportWidth && containerWidth && viewportWidth < 768) {
        colLength =
          columnBreakpointsSm.get(state.current.words[0].length) || 10000;
      }

      return containerWidth
        ? setNumCols(Math.floor(containerWidth / colLength))
        : setNumCols(1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state, selectedTab]);

  return (
    <WordHistoryContext.Provider value={{ state, dispatch }}>
      <div className="main scanner z-10 flex flex-col items-center overflow-x-hidden font-bold">
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
