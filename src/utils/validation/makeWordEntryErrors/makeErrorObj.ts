import { ValidationErrors } from "../../interfaces";

import processWordList from "../../processWordList";

import valDiffLengths from "./valDiffLengths";
import valTooLong from "./valTooLong";
import wordTooShort from "./wordTooShort";
import wordTooLong from "./wordTooLong";
import valWrongChar from "./valWrongChar";
import duplicateWords from "./duplicateWord";

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
