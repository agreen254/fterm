import { Placement } from "./interfaces";

function sumPlacement(placements: Placement[]) {
  return placements.reduce((total, place) => {
    return total + place.indices.length;
  }, 0);
}

export default sumPlacement;
