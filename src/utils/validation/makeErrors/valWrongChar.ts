import arrayElesOnlyLetters from "../arrayElesOnlyLetters";
import { ValidationErrors } from "../../interfaces";

function valWrongChar(errors: ValidationErrors, input: string[]) {
  const letterInfractors = arrayElesOnlyLetters(input);
  if (letterInfractors.length > 0) {
    errors = {
      ...errors,
      illegalCharError:
        "ILLEGAL CHARACTERS DETECTED. ONLY UPPERCASE OR LOWERCASE LETTERS ARE ALLOWED. INFRACTORS: " +
        letterInfractors.join(" "),
    };
  } else {
    errors = {
      ...errors,
      illegalCharError: "",
    };
  }

  return errors;
}

export default valWrongChar;
