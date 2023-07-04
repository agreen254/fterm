import { Location } from "../interfaces";

function generateHighlightSpan(word: string, locations: Location[]) {
  const chars = [...word];
  return chars.reduce((highlightedText, char, idx) => {
    const loc = locations.filter((location) => location.character === char);
    if (loc[0]?.indices.filter((i) => i === idx).length > 0) {
      return (highlightedText +=
        '<span className="text-3xl bg-[#FFDAB9]">' + char + "</span>");
    } else {
      return (highlightedText += char);
    }
  }, "");
}

export default generateHighlightSpan;
