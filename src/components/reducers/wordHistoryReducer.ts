import { WordsHistoryState, Guess } from "../../utils/interfaces";
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

interface Undo {
  type: "UNDO";
}

export type Actions =
  | AddWord
  | DeleteWord
  | AddGuess
  | DeleteGuess
  | RestoreGuessToWord
  | SelectEntry
  | ClearSelectedEntry
  | DeleteAll
  | Undo;

function wordHistoryReducer(
  state: WordsHistoryState,
  action: Actions
): WordsHistoryState {
  switch (action.type) {
    case "ADDWORD": {
      const processedInput = processWordList(action.rawInput);
      const newWords = makeUnique([...state.current.words, ...processedInput]);
      const appendedEvents = [
        ...state.current.events,
        {
          name: `ADDED ${newWords.length > 1 ? "WORDS" : "WORD"}`,
          description: `${processedInput.join(" ")}`,
        },
      ];
      return {
        ...state,
        prevs: [...state.prevs, state.current],
        current: {
          ...state.current,
          events: appendedEvents,
          words: newWords,
        },
      };
    }
    case "DELETEWORD": {
      const filteredWords = state.current.words.filter(
        (w) => w !== action.wordToDelete
      );
      const appendedEvents = [
        ...state.current.events,
        { name: `DELETED WORD`, description: `${action.wordToDelete}` },
      ];
      return {
        ...state,
        prevs: [...state.prevs, state.current],
        current: {
          ...state.current,
          words: filteredWords,
          events: appendedEvents,
        },
      };
    }
    case "ADDGUESS": {
      const appendedGuesses = [...state.current.guesses, action.guessToAdd];
      // the word should now only display in the guesses column
      const shortenedWords = state.current.words.filter(
        (w) => w !== action.guessToAdd.guess
      );
      const appendedEvents = [
        ...state.current.events,
        {
          name: `ADDED GUESS`,
          description: `${action.guessToAdd.guess}:${action.guessToAdd.numCorrect}`,
        },
      ];
      return {
        ...state,
        prevs: [...state.prevs, state.current],
        current: {
          ...state.current,
          events: appendedEvents,
          guesses: appendedGuesses,
          words: shortenedWords,
        },
      };
    }
    case "DELETEGUESS": {
      const filteredGuesses = state.current.guesses.filter(
        (g) => g.guess !== action.guessWordToDelete
      );
      const appendedEvents = [
        ...state.current.events,
        {
          name: `DELETED GUESS`,
          description: `${action.guessWordToDelete}`,
        },
      ];
      return {
        ...state,
        prevs: [...state.prevs, state.current],
        current: {
          ...state.current,
          guesses: filteredGuesses,
          events: appendedEvents,
        },
      };
    }
    case "RESTOREGUESSTOWORD": {
      const filteredGuesses = state.current.guesses.filter(
        (g) => g.guess !== action.guessToRestore.guess
      );
      const appendedWords = [
        ...state.current.words,
        action.guessToRestore.guess,
      ];
      const appendedEvents = [
        ...state.current.events,
        {
          name: `REVERTED GUESS`,
          description: `${action.guessToRestore.guess}`,
        },
      ];
      return {
        ...state,
        prevs: [...state.prevs, state.current],
        current: {
          ...state.current,
          words: appendedWords,
          guesses: filteredGuesses,
          events: appendedEvents,
        },
      };
    }
    case "SELECTENTRY":
      return {
        ...state,
        current: {
          ...state.current,
          selectedEntry: action.entry,
        },
      };
    case "DELETEALL":
      return {
        ...state,
        prevs: [],
        current: {
          selectedEntry: "",
          words: [],
          guesses: [],
          events: [],
        },
      };
    case "CLEARSELECTEDENTRY":
      return {
        ...state,
        current: {
          ...state.current,
          selectedEntry: "",
        },
      };
    case "UNDO": {
      const prev = state.prevs[state.prevs.length - 1];
      console.log(prev);
      return {
        ...state,
        prevs: state.prevs.slice(0, -1),
        current: prev,
      };
    }
    default:
      return state;
  }
}

export default wordHistoryReducer;
