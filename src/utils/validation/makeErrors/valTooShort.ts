import { ValidationErrors } from "../../interfaces";

import findShort from "../findShort";

function valTooShort(errors: ValidationErrors, input: string[]) {
  const shorties = findShort(input, 4);
  if (shorties.length > 0) {
    errors = {
      ...errors,
      tooShortError:
        "WORD(S) TOO SHORT. WORDS HAVE A MINIMUM LENGTH OF FOUR CHARACTERS. INFRACTORS: " +
        shorties.join(" "),
    };
  } else {
    errors = {
      ...errors,
      tooShortError: "",
    };
  }

  return errors;
}

export default valTooShort;