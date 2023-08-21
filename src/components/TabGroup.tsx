interface Props {
  tab: string;
}

const TabGroup = ({ tab }: Props) => {
  return (
    <div className="mb-[min(10vh,6rem)] grid w-[90vw] grid-cols-1 gap-1 md:grid-cols-3 lg:w-[min(calc(66vw+15rem-16px)/2,calc(90vw-16px)/2)] lg:translate-x-[calc(-50%-8px)] lg:grid-cols-2 2xl:hidden">
      <button
        className={
          tab === "WORDS"
            ? "rounded border-2 border-black bg-black px-5 py-3 hover:bg-gray-800 lg:hidden"
            : "rounded border-2 border-black bg-stone-800 px-5 py-3 hover:bg-gray-500 lg:hidden"
        }
      >
        SHOW WORDS
      </button>
      <button
        className={
          tab === "HISTORY"
            ? "rounded border-2 border-black bg-black px-5 py-3 hover:bg-gray-800"
            : "rounded border-2 border-black bg-stone-800 px-5 py-3 hover:bg-gray-500"
        }
      >
        SHOW HISTORY
      </button>
      <button
        className={
          tab === "ACTIONS"
            ? "rounded border-2 border-black bg-black px-5 py-3 hover:bg-gray-800"
            : "rounded border-2 border-black bg-stone-800 px-5 py-3 hover:bg-gray-500"
        }
      >
        SHOW ACTIONS
      </button>
    </div>
  );
};

export default TabGroup;
