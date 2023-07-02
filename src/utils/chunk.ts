function chunk(arr: string[], chunkSize: number) {
  if (chunkSize > arr.length) return [arr];

  let idx = 0;
  const chunked: string[][] = [];
  while (idx < arr.length) {
    const miniChunk = arr.slice(idx, idx + chunkSize);
    chunked.push(miniChunk);
    idx += chunkSize;
  }
  return chunked;
}

export default chunk;
