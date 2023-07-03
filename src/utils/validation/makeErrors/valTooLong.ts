import { ValidationErrors } from "../../interfaces";

function valTooLong(errors: ValidationErrors, input: string) {
  if (input.length > 450) {
    errors = {
      ...errors,
      tooLongError: "INPUT TOO LONG. CONDENSE TO 450 CHARACTERS OR LESS.",
    };
  } else {
    errors = {
      ...errors,
      tooLongError: "",
    };
  }

  return errors;
}

export default valTooLong;
