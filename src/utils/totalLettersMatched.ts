import { Location } from "./interfaces";

function totalLettersMatched(locations: Location[]) {
  return locations.reduce((count, loc) => count + loc.indices.length, 0);
}

export default totalLettersMatched;
