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

function wordReducer(state: GlobalState, action: Actions): GlobalState {
  switch (action.type) {
    case "ADDWORD": {
      const processedInput = processWordList(action.rawInput);
      const newWords = makeUnique([...state.words, ...processedInput]);
      const appendedEvents = [
        ...state.events,
        `added word(s) ${processedInput}`,
      ];
      return {
        ...state,
        events: appendedEvents,
        words: newWords,
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
        (w) => w !== action.guessToAdd.guess
      );
      const appendedEvents = [
        ...state.events,
        `added guess ${action.guessToAdd.guess}:${action.guessToAdd.numCorrect}`,
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
        (g) => g.guess !== action.guessWordToDelete
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
        (g) => g.guess !== action.guessToRestore.guess
      );
      const appendedWords = [...state.words, action.guessToRestore.guess];
      const appendedEvents = [
        ...state.events,
        `reverted guess ${action.guessToRestore.guess}`,
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

export default wordReducer;