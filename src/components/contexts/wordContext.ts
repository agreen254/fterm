import React from "react";
import { Actions } from "../reducers/wordReducer";
import { WordsState } from "../../utils/interfaces";

interface globalContextType {
  state: WordsState;
  dispatch: React.Dispatch<Actions>;
}

const WordContext = React.createContext<globalContextType>(
  {} as globalContextType
);

export default WordContext;
