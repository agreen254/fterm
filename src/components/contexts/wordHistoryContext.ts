import React from "react";
import { Actions } from "../reducers/wordHistoryReducer";
import { WordsHistoryState } from "../../utils/interfaces";

interface wordHistoryContextType {
  state: WordsHistoryState;
  dispatch: React.Dispatch<Actions>;
}

const WordHistoryContext = React.createContext<wordHistoryContextType>(
  {} as wordHistoryContextType
);

export default WordHistoryContext;
