import { CharLocations } from "./interfaces";

function sumCharMatches(placements: CharLocations[]) {
  return placements.reduce((total, place) => {
    return total + place.indices.length;
  }, 0);
}

export default sumCharMatches;
