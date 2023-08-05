export interface Guess {
  guess: string;
  numCorrect: number;
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

export interface GlobalState {
  events: string[];
  guesses: Guess[];
  selectedEntry: string;
  words: string[];
}

export interface WordValidity {
  guesses: string[];
  allCharLocations: CharLocations[][];
  areValid: boolean[];
}
