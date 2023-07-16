import React from "react";
import { Actions } from "../reducers/globalReducer";
import { GlobalState } from "../../utils/interfaces";

interface globalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<Actions>;
}

const GlobalContext = React.createContext<globalContextType>(
  {} as globalContextType
);

export default GlobalContext;
