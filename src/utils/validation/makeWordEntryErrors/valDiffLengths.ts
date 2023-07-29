import { ValidationErrors } from "../../interfaces";
import sameLengthWords from "../checkWordEntryErrors/sameLengthWords";

function valDiffLengths(
  errors: ValidationErrors,
  input: string[],
  preExistingWords: string[]
) {
  if (!sameLengthWords([...input, ...preExistingWords])) {
    errors = {
      ...errors,
      unequalLengths: "ALL WORDS MUST BE THE SAME LENGTH.",
    };
  } else {
    errors = {
      ...errors,
      unequalLengths: "",
    };
  }

  return errors;
}

export default valDiffLengths;
