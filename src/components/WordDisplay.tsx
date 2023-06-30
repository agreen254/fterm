import chunk from "../utils/chunk";

interface Props {
  words: string[] | undefined;
}

const WordDisplay = ({ words }: Props) => {
  return words ? (
    <div>
      <ul>
        {chunk(words, 2).map((chunk, idx) => (
          <li key={idx}>
            {chunk.map((word) => (
              <button
                className="px-5 py-3 bg-black-800 border rounded"
                key={word}
              >
                {word}
              </button>
            ))}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default WordDisplay;
