import { useState } from "react";

import WordDisplay from "./components/WordDisplay";
import WordActions from "./components/WordActions";

import { Errors } from "./utils/interfaces";
import arrayElesOnlyLetters from "./utils/arrayElesOnlyLetters";
import emptyErrors from "./utils/emptyErrors";
import makeUnique from "./utils/makeUnique";
import processWordList from "./utils/processWordList";
import sameLengthWords from "./utils/sameLengthWords";

import "@fontsource/ibm-plex-mono";
import "./styles/App.css";
import "./styles/scanner.css";

function App() {
  const [wordList, setWordList] = useState<string[]>();
  const [selectedWord, setSelectedWord] = useState<string>();
  const [errors, setErrors] = useState<Errors>(emptyErrors);

  const makeDemo = () => {
    setWordList([
      "BELONGING",
      "EXPLORING",
      "SELECTING",
      "REMINDING",
      "SUMMONING",
      "AMERICANS",
      "AGREEMENT",
      "RELEASING",
      "TERRIFIED",
      "ASCENSION",
    ]);
    setSelectedWord("");
  };

  const handleSubmitWordEntries = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawInput: string = e.currentTarget.words.value;
    const splitInput: string[] = processWordList(rawInput);

    console.log(rawInput);
    console.log(rawInput.length);

    if (rawInput.length > 450) {
      setErrors((prev) => {
        return {
          ...prev,
          tooLongError: "INPUT TOO LONG. CONDENSE TO 450 CHARACTERS OR LESS.",
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          tooLongError: "",
        };
      });
    }

    if (rawInput.length < 4) {
      setErrors((prev) => {
        return {
          ...prev,
          tooShortError:
            "INPUT TOO SHORT. WORDS MUST START AT A LENGTH OF FOUR CHARACTERS.",
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          tooShortError: "",
        };
      });
    }

    if (!arrayElesOnlyLetters(splitInput)) {
      setErrors((prev) => {
        return {
          ...prev,
          illegalCharError:
            "ILLEGAL CHARACTERS DETECTED. ONLY UPPERCASE OR LOWERCASE LETTERS ARE ALLOWED.",
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          illegalCharError: "",
        };
      });
    }

    if (!sameLengthWords(splitInput)) {
      setErrors((prev) => {
        return {
          ...prev,
          unequalLengthsError: "ALL WORDS MUST BE THE SAME LENGTH.",
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          unequalLengthsError: "",
        };
      });
    }

    const hasError = Object.keys(errors).find((err) => err === "");
    if (hasError) return;

    setErrors(emptyErrors);
    if (wordList)
      setWordList(makeUnique([...wordList, ...processWordList(rawInput)]));
    else setWordList(makeUnique(...[processWordList(rawInput)]));
  };

  return (
    <>
      <div className="main flexrow scanner">
        <h1 className="text-5xl my-6 font-bold">FTERM</h1>
        <form id="wordEntryForm" onSubmit={(e) => handleSubmitWordEntries(e)}>
          <label htmlFor="words" className="text-xl block">
            input terminal words, separated by spaces:
          </label>
          <button
            type="reset"
            className={
              "px-5 py-3 font-bold box-content bg-gray-800 border-2 border-black rounded-tl rounded-bl hover:bg-gray-500"
            }
          >
            CLEAR
          </button>
          <div className="inline py-[14px] pl-2 bg-gray-800 border-y-black border-y-2">
            &gt;&gt;
          </div>
          <input
            type="text"
            id="words"
            autoComplete="off"
            className="pl-2 pr-5 py-3 w-[66vw] shadow appearance-none focus:outline-none bg-gray-800 border-y-black border-y-2"
          />
          <button
            type="submit"
            className="px-5 py-3 font-bold box-content bg-gray-800 border-2 border-black rounded-tr rounded-br hover:bg-gray-500"
          >
            ADD
          </button>
        </form>
        <p className="font-bold">{errors.illegalCharError}</p>
        <p className="font-bold">{errors.unequalLengthsError}</p>
        <p className="font-bold">{errors.tooLongError}</p>
        <p className="font-bold">{errors.tooShortError}</p>
        <WordDisplay
          words={wordList}
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
        />
        <WordActions
          words={wordList}
          setWords={setWordList}
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
        />
        <button
          className="px-5 py-3 my-4 w-48 border rounded"
          onClick={makeDemo}
        >
          DEMO
        </button>
        <button
          className="px-5 py-3 mb-4 w-48 border rounded"
          onClick={() => {
            setWordList(undefined);
            setSelectedWord("");
          }}
        >
          DELETE ALL
        </button>
        <p>Selected Word: {selectedWord}</p>
      </div>
    </>
  );
}

export default App;
