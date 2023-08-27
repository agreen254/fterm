import { useEffect } from "react";
import { WordsHistoryState } from "../utils/interfaces";

import {
  columnBreakpoints,
  columnBreakpointsSm,
} from "../utils/columnBreakpoints";

interface Props {
  state: WordsHistoryState;
  selectedTab: string;
  setSelectedTab: (newtab: string) => void;
  setNumCols: (cols: number) => void;
}

const useWordDisplayColumns = ({
  state,
  selectedTab,
  setSelectedTab,
  setNumCols,
}: Props) => {
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
      // so provide large number if get method is unsuccessful
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
  }, [state, selectedTab, setSelectedTab, setNumCols]);
};

export default useWordDisplayColumns;
