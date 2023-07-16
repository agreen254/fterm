import makeUnique from "../../utils/makeUnique";
import processWordList from "../../utils/processWordList";
import { GlobalState, Guess } from "../../utils/interfaces";

interface AddWord {
  type: "ADDWORD";
  rawInput: string;
}

interface DeleteWord {
  type: "DELETEWORD";
  wordToDelete: string;
}

interface AddGuess {
  type: "ADDGUESS";
  guessToAdd: Guess;
}

interface DeleteGuess {
  type: "DELETEGUESS";
  guessToDelete: Guess;
}

interface DeleteAll {
  type: "DELETEALL";
}

export type Actions = AddWord | DeleteWord | AddGuess | DeleteGuess | DeleteAll;

function globalReducer(state: GlobalState, action: Actions): GlobalState {
  switch (action.type) {
    case "ADDWORD": {
      const processedInput = processWordList(action.rawInput);
      const newWords = [...state.words, ...processedInput];
      return {
        ...state,
        words: makeUnique(newWords),
      };
    }
    case "DELETEWORD": {
      const filteredWords = state.words.filter(
        (w) => w !== action.wordToDelete
      );
      return { ...state, words: filteredWords };
    }
    case "ADDGUESS": {
      const appendedGuesses = [...state.guesses, action.guessToAdd];
      return {
        ...state,
        guesses: appendedGuesses,
      };
    }
    case "DELETEGUESS": {
      const filteredGuesses = state.guesses.filter(
        (g) => g.word !== action.guessToDelete.word
      );
      return {
        ...state,
        guesses: filteredGuesses,
      };
    }
    case "DELETEALL":
      return {
        words: [],
        guesses: [],
      };
    default:
      return state;
  }
}

export default globalReducer;
