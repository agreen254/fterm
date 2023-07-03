function findShort(input: string[], minLength: number) {
  return input.filter((ele) => ele.length < minLength);
}

export default findShort;
