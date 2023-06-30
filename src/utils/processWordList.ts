function processWordList(words: string) {
  const preProcessed = words
    .trim()
    .toUpperCase()
    .split(" ")
    .filter((ele) => ele !== ""); // handle case of extra spaces between words
  return [...new Set<string>(preProcessed)]; // remove duplicate words
}

export default processWordList;
