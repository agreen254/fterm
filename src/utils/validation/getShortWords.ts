function getShortWords(words: string[]) {
  return words.filter((word) => word.length < 4);
}

export default getShortWords;
