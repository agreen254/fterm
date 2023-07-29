import { ValidationErrors } from "../../interfaces";

import findLong from "../checkWordEntryErrors/findLong";

function wordTooLong(errors: ValidationErrors, input: string[]) {
  const longWords = findLong(input, 15);
  if (longWords.length > 0) {
    errors = {
      ...errors,
      wordTooLong:
        "WORD(S) TOO LONG. WORDS HAVE A MAXIMUM LENGTH OF FIFTEEN CHARACTERS. INFRACTORS: " +
        longWords.join(" "),
    };
  } else {
    errors = {
      ...errors,
      wordTooLong: "",
    };
  }

  return errors;
}

export default wordTooLong;
