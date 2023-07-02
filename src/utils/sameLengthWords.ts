import makeUnique from "./makeUnique";

function sameLengthWords(words: string[]) {
  if (words.length === 0) return true;

  const lengths = words.map((word) => word.length);
  return makeUnique(lengths).length === 1;
}

export default sameLengthWords;
