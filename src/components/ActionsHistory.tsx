import { useContext } from "react";
import WordContext from "./contexts/wordContext";

const ActionsHistory = () => {
  const { state } = useContext(WordContext);
  const events = state.events;
  const words = state.words;

  if (words === undefined || words.length === 0) return null;

  return (
    <div
      className="relative hidden h-[66vh] overflow-auto rounded border-2 border-black bg-stone-800 lg:block"
      hidden={words ? false : true}
    >
      <ul className="px-4">
        {events.map((event) => (
          <li key={event}>
            <div className="grid grid-cols-[auto,8rem] gap-4 pt-2">
              <p className="break-words">{event}</p>
              <button>RESTORE</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionsHistory;
