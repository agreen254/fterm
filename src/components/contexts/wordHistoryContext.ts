import React from "react";
import { Actions } from "../reducers/wordHistoryReducer";
import { WordsHistoryState } from "../../utils/interfaces";

interface globalContextType {
  state: WordsHistoryState;
  dispatch: React.Dispatch<Actions>;
}

const WordHistoryContext = React.createContext<globalContextType>(
  {} as globalContextType
);

export default WordHistoryContext;
