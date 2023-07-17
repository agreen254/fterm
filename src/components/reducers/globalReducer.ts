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
  guessWordToDelete: string;
}

interface RestoreGuessToWord {
  type: "RESTOREGUESSTOWORD";
  guessToRestore: Guess;
}

interface SelectEntry {
  type: "SELECTENTRY";
  entry: string;
}

interface ClearSelectedEntry {
  type: "CLEARSELECTEDENTRY";
}

interface DeleteAll {
  type: "DELETEALL";
}

export type Actions =
  | AddWord
  | DeleteWord
  | AddGuess
  | DeleteGuess
  | RestoreGuessToWord
  | SelectEntry
  | ClearSelectedEntry
  | DeleteAll;

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
      const appendedEvents = [
        ...state.events,
        `deleted word ${action.wordToDelete}`,
      ];
      return { ...state, words: filteredWords, events: appendedEvents };
    }
    case "ADDGUESS": {
      const appendedGuesses = [...state.guesses, action.guessToAdd];
      // the word should now only display in the guesses column
      const shortenedWords = state.words.filter(
        (w) => w !== action.guessToAdd.word
      );
      const appendedEvents = [
        ...state.events,
        `added guess ${action.guessToAdd.word}:${action.guessToAdd.numCorrect}`,
      ];
      return {
        ...state,
        events: appendedEvents,
        guesses: appendedGuesses,
        words: shortenedWords,
      };
    }
    case "DELETEGUESS": {
      const filteredGuesses = state.guesses.filter(
        (g) => g.word !== action.guessWordToDelete
      );
      const appendedEvents = [
        ...state.events,
        `deleted guess ${action.guessWordToDelete}`,
      ];
      return {
        ...state,
        guesses: filteredGuesses,
        events: appendedEvents,
      };
    }
    case "RESTOREGUESSTOWORD": {
      const filteredGuesses = state.guesses.filter(
        (g) => g.word !== action.guessToRestore.word
      );
      const appendedWords = [...state.words, action.guessToRestore.word];
      const appendedEvents = [
        ...state.events,
        `reverted guess ${action.guessToRestore.word}`,
      ];
      return {
        ...state,
        words: appendedWords,
        guesses: filteredGuesses,
        events: appendedEvents,
      };
    }
    case "SELECTENTRY":
      return {
        ...state,
        selectedEntry: action.entry,
      };
    case "DELETEALL":
      return {
        ...state,
        words: [],
        guesses: [],
        events: [],
      };
    case "CLEARSELECTEDENTRY":
      return {
        ...state,
        selectedEntry: "",
      };
    default:
      return state;
  }
}

export default globalReducer;
