import React from "react";
import { WordsAction } from "../reducers/wordsReducer";

interface wordsContextType {
  words: string[];
  dispatch: React.Dispatch<WordsAction>;
}

const WordsContext = React.createContext<wordsContextType>(
  {} as wordsContextType
);

export default WordsContext;
