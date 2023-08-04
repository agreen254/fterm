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
      <ul className="pl-4 pt-2">
        {events.map((event) => (
          <li key={event}>
            <div className="flex flex-row justify-evenly">
              <p>{event}</p>
              <button>RESTORE</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionsHistory;
