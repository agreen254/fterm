import makeUnique from "../../utils/makeUnique";
import processWordList from "../../utils/processWordList";

interface AddWord {
  type: "ADDWORD";
  rawInput: string;
}

interface DeleteWord {
  type: "DELETEWORD";
  wordToDelete: string;
}

interface DeleteAll {
  type: "DELETEALL";
}

export type WordsAction = AddWord | DeleteWord | DeleteAll;

function wordsReducer(state: string[], action: WordsAction): string[] {
  switch (action.type) {
    case "ADDWORD": {
      const processedInput = processWordList(action.rawInput);
      const newWords = [...state, ...processedInput];
      return makeUnique(newWords);
    }
    case "DELETEWORD":
      return state.filter((w) => w !== action.wordToDelete);
    case "DELETEALL":
      return [];
    default:
      return state;
  }
}

export default wordsReducer;
