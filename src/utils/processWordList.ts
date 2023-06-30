function processWordList(words: string) {
  return words
    .trim()
    .toUpperCase()
    .split(" ")
    .filter((ele) => ele !== ""); // handle case of extra spaces between words
}

export default processWordList;
