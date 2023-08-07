function findMatchesOneGuess(
  guess: string,
  numCorrect: number,
  wordToCheck: string
) {
  const guessChars = [...guess];
  const wordChars = [...wordToCheck];
  const matches = guessChars.reduce((indices: number[], char, idx) => {
    return char === wordChars[idx] ? [...indices, idx] : indices;
  }, []);
  return matches.length === numCorrect ? matches : [];
}

export default findMatchesOneGuess;
