import isMember from "./isMember";

function processWordList(words: string) {
  if (isMember([...words], ","))
    return words
      .trim()
      .toUpperCase()
      .split(",")
      .filter((ele) => ele !== "");
  else
    return words
      .trim()
      .toUpperCase()
      .split(" ")
      .filter((ele) => ele !== ""); // handle case of extra spaces between words
}

export default processWordList;
