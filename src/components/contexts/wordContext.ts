import React from "react";
import { Actions } from "../reducers/wordReducer";
import { GlobalState } from "../../utils/interfaces";

interface globalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<Actions>;
}

const WordContext = React.createContext<globalContextType>(
  {} as globalContextType
);

export default WordContext;
