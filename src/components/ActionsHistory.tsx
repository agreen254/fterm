interface Props {
  events: string[];
  words: string[] | undefined;
}

const ActionsHistory = ({ events, words }: Props) => {
  if (words === undefined || words.length === 0) return null;

  return (
    <div
      className="relative h-[66vh] overflow-auto rounded border-2 border-black bg-stone-800"
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
      <p className="absolute right-2 top-1">-- HISTORY --</p>
    </div>
  );
};

export default ActionsHistory;
