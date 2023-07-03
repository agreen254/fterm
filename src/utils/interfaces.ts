export interface Location {
  character: string;
  indices: number[];
}

export interface ValidationErrors {
  tooLongError: string;
  tooShortError: string;
  illegalCharError: string;
  unequalLengthsError: string;
}
