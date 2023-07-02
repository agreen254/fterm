function makeUnique<T>(arr: T[]) {
  return [...new Set(arr)];
}

export default makeUnique;
