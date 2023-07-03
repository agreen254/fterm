import { ValidationErrors } from "./interfaces";

function applyCallbackChain(
  originalErr: ValidationErrors,
  input: string | string[],
  preExistingWords: string[],
  funcs: [
    (
      errors: ValidationErrors,
      input: string | string[],
      preExistingWords?: string[]
    ) => ValidationErrors
  ]
) {
  return funcs.reduce((acc, func) => {
    return func(acc, input, preExistingWords);
  }, originalErr);
}

export default applyCallbackChain;
