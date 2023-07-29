import { ValidationErrors } from "../../interfaces";

import findShort from "../checkWordEntryErrors/findShort";

function wordTooShort(errors: ValidationErrors, input: string[]) {
  const shorties = findShort(input, 4);
  if (shorties.length > 0) {
    errors = {
      ...errors,
      wordTooShort:
        "WORD(S) TOO SHORT. WORDS HAVE A MINIMUM LENGTH OF FOUR CHARACTERS. INFRACTORS: " +
        shorties.join(" "),
    };
  } else {
    errors = {
      ...errors,
      wordTooShort: "",
    };
  }

  return errors;
}

export default wordTooShort;
