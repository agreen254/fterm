import { useContext } from "react";
import WordHistoryContext from "./contexts/wordHistoryContext";

const ActionsHistory = () => {
  const {
    state: {
      current: { events, words },
    },
    dispatch,
  } = useContext(WordHistoryContext);

  if (words === undefined || words.length === 0) return null;

  return (
    <div
      className="relative hidden h-[66vh] overflow-auto rounded border-2 border-black bg-stone-800 lg:block"
      hidden={words ? false : true}
    >
      <ul className="px-4">
        {events.map((event) => (
          <li key={event.description}>
            <div className="grid grid-cols-[auto,8rem] gap-4 pt-2">
              <div>
                <p>{`>> ` + event.name}</p>
                <div className="grid grid-cols-[1.75rem,auto]">
                  <p>{`>>`}</p>
                  <p>{event.description}</p>
                </div>
              </div>
              <button>RESTORE</button>
            </div>
            <div className="mt-1 h-1 w-full bg-[rgb(255,185,50)]" />
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "UNDO" })}>UNDO</button>
    </div>
  );
};

export default ActionsHistory;
