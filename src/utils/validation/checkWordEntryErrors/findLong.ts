function findLong(input: string[], maxLength: number) {
  return input.filter((ele) => ele.length > maxLength);
}

export default findLong;
