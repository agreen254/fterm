import { ValidationErrors } from "../../interfaces";

function findDuplicates(newWords: string[], oldWords: string[]) {
  return oldWords.reduce((duplicates: string[], word) => {
    return [...duplicates, ...newWords.filter((w) => w === word)];
  }, []);
}

function duplicateWords(
  errors: ValidationErrors,
  newWords: string[],
  oldWords: string[]
) {
  const duplicates = findDuplicates(newWords, oldWords);
  if (duplicates.length > 0) {
    errors = {
      ...errors,
      duplicateWord: `NEW WORDS MUST BE UNIQUE. INFRACTORS: ${duplicates}`,
    };
  } else {
    errors = {
      ...errors,
      duplicateWord: "",
    };
  }
  return errors;
}

export default duplicateWords;
