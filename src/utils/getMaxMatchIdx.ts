import { GuessMatch } from "./interfaces";

function getMaxMatchIdx(matches: GuessMatch[]) {
  return matches.reduce((max, match, idx) => {
    const matchedChars = match.correctIndices.length;
    return matchedChars > max ? idx : max;
  }, 0);
}

export default getMaxMatchIdx;
