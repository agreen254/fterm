export interface Guess {
  guessName: string;
  numCorrect: number;
}

export interface GuessMatch {
  guessName: string;
  correctIndices: number[];
}

// my original choice for this name was "Location"
// but apparently "Location" is a keyword in MongoDB
// and will throw an error if a custom interface
// bears its name
// https://stackoverflow.com/questions/54254763/missing-the-following-properties-from-type-location-location-ancestororigins
export interface CharLocations {
  character: string;
  indices: number[];
}

export interface Event {
  name: string;
  description: string;
}

export interface ValidationErrors {
  duplicateWord: string;
  inputTooLong: string;
  illegalCharacter: string;
  unequalLengths: string;
  wordTooShort: string;
  wordTooLong: string;
}

export interface WordsState {
  events: Event[];
  guesses: Guess[];
  selectedEntry: string;
  words: string[];
}

export interface WordsHistoryState {
  prevs: WordsState[];
  current: WordsState;
}

export interface WordValidity {
  guesses: string[];
  allCharLocations: CharLocations[][];
  areValid: boolean[];
}
