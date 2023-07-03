import { ValidationErrors } from "../../interfaces";
import sameLengthWords from "../sameLengthWords";

function valDiffLengths(
  errors: ValidationErrors,
  input: string[],
  preExistingWords: string[] | undefined
) {
  if (!sameLengthWords([...input, ...(preExistingWords || [])])) {
    errors = {
      ...errors,
      unequalLengthsError: "ALL WORDS MUST BE THE SAME LENGTH.",
    };
  } else {
    errors = {
      ...errors,
      unequalLengthsError: "",
    };
  }

  return errors;
}

export default valDiffLengths;
