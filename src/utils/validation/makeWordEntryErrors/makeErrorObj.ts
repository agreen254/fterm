import { ValidationErrors } from "../../interfaces";


import duplicateWords from "./duplicateWord";
import processWordList from "../../processWordList";
import valDiffLengths from "./valDiffLengths";
import valTooLong from "./valTooLong";
import valWrongChar from "./valWrongChar";
import wordTooLong from "./wordTooLong";
import wordTooShort from "./wordTooShort";

function makeErrorObj(
  errors: ValidationErrors,
  rawNewWords: string,
  oldWords: string[]
) {
  const newWords = processWordList(rawNewWords);
  let clonedErrors = structuredClone(errors);

  clonedErrors = valTooLong(clonedErrors, rawNewWords);
  clonedErrors = wordTooShort(clonedErrors, newWords);
  clonedErrors = wordTooLong(clonedErrors, newWords);
  clonedErrors = valDiffLengths(clonedErrors, newWords, oldWords);
  clonedErrors = valWrongChar(clonedErrors, newWords);
  clonedErrors = duplicateWords(clonedErrors, newWords, oldWords);

  return clonedErrors;
}

export default makeErrorObj;
