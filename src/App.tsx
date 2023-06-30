import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";

function App() {
  const handleWordEntries = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handled words");
  };

  return (
    <>
      <div className="main flexrow scanner">
        <h1 className="text-5xl my-6 font-bold">FTERM</h1>
        <form onSubmit={(e) => handleWordEntries(e)}>
          <label htmlFor="wordLen">Word Length:</label>
          <select
            name="wordLen"
            id="wordLen"
            className="focus:outline-none pl-5 py-3 bg-gray-800"
          >
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
            <option value="9">Nine</option>
            <option value="10">Ten</option>
            <option value="11">Eleven</option>
            <option value="12">Twelve</option>
            <option value="13">Thirteen</option>
            <option value="14">Fourteen</option>
            <option value="15">Fifteen</option>
          </select>
          <label htmlFor="words" className="text-xl block">
            input terminal words separated by a space:
          </label>
          <input
            type="text"
            id="words"
            className="px-5 py-3 w-[66vw] shadow appearance-none focus:outline-none bg-gray-800 border-gray-800 border-2"
          />
          <button
            type="submit"
            className="px-5 py-3 box-content bg-gray-800 border-2 border-gray-800 rounded-tr rounded-br hover:bg-gray-500"
          >
            Enter
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
