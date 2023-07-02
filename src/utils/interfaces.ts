export interface Location {
  character: string;
  indices: number[];
}

export interface Errors {
  tooLongError: string;
  tooShortError: string;
  illegalCharError: string;
  unequalLengthsError: string;
}
