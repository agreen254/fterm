import { useContext } from "react";
import WordHistoryContext from "./contexts/wordHistoryContext";

const ActionsHistory = () => {
  const {
    state: {
      current: { events, words },
    },
    dispatch,
  } = useContext(WordHistoryContext);

  return (
    <div
      className="relative hidden min-h-[66vh] rounded border-2 border-black bg-stone-800 lg:block"
      hidden={words ? false : true}
    >
      <div className="max-h-[calc(100%-5rem)] overflow-auto">
        <ul className="px-4">
          <li className="pt-2 text-xl">{">> HISTORY"}</li>
          <div className="my-2 h-2 w-full rounded bg-[rgb(255,185,50)]" />
          {events.map((event) => (
            <li key={event.description}>
              <div>
                <p>{`>> ` + event.name}</p>
                <div className="grid grid-cols-[1.75rem,auto]">
                  <p>{`>`}</p>
                  <p>{event.description}</p>
                </div>
              </div>
              <div className="my-2 h-1 w-full bg-[rgb(255,185,50)]" />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 my-4 w-full">
        {events.length > 0 && (
          <div className="grid grid-cols-2 gap-4 px-4">
            <button
              className="w-full rounded-md border-2 border-black px-5 py-3 hover:bg-stone-500"
              onClick={() => dispatch({ type: "UNDO" })}
            >
              UNDO
            </button>
            <button
              className="w-full rounded-md border-2 border-black px-5 py-3 text-red-500 hover:bg-black"
              onClick={() =>
                dispatch({
                  type: "DELETEALL",
                })
              }
            >
              RESET
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsHistory;
