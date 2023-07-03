import { ValidationErrors } from "../../interfaces";

import processWordList from "../../processWordList";

import valDiffLengths from "./valDiffLengths";
import valTooLong from "./valTooLong";
import valTooShort from "./valTooShort";
import valWrongChar from "./valWrongChar";

function makeErrorObj(
  errors: ValidationErrors,
  input: string,
  preExistingWords: string[] | undefined
) {
  const splitInput = processWordList(input);
  let clonedErrors = structuredClone(errors);

  clonedErrors = valTooLong(clonedErrors, input);
  clonedErrors = valTooShort(clonedErrors, splitInput);
  clonedErrors = valDiffLengths(clonedErrors, splitInput, preExistingWords);
  clonedErrors = valWrongChar(clonedErrors, splitInput);

  return clonedErrors;
}

export default makeErrorObj;
