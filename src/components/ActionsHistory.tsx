interface Props {
  events: string[];
  words: string[] | undefined;
}

const ActionsHistory = ({ events, words }: Props) => {
  if (words === undefined || words.length === 0) return null;

  return (
    <div
      className="bg-gray-800 border-2 border-black rounded h-[66vh] relative overflow-auto"
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
      <p className="absolute bottom-1 left-2">-- HISTORY --</p>
    </div>
  );
};

export default ActionsHistory;
