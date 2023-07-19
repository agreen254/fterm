import { Placement } from "../interfaces";

function totalLettersMatched(locations: Placement[]) {
  return locations.reduce((count, loc) => count + loc.indices.length, 0);
}

export default totalLettersMatched;
