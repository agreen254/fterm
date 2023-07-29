import { CharLocations } from "./interfaces";
import sumCharMatches from "./sumCharMatches";

function maxCharMatches(vals: CharLocations[][]) {
  return vals.reduce((maxIdx, match, idx) => {
    return sumCharMatches(match) > sumCharMatches(vals[maxIdx]) ? idx : maxIdx;
  }, 0);
}

export default maxCharMatches;
