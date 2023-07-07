import WordHighlight from "./WordHighlight";

import columnBreakpoints from "../utils/columnBreakpoints";
import findMult from "../utils/highlightChars/findMult";
import { Guess } from "../utils/interfaces";

import "../styles/words-grid.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Props {
  words: string[] | undefined;
  selectedWord: string | undefined;
  setSelectedWord: (word: string) => void;
  guesses: Guess[];
}

const WordsDisplay = ({
  guesses,
  words,
  selectedWord,
  setSelectedWord,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth);
  }, []);

  if (words === undefined || words.length === 0) return null;

  const isGuess = (word: string) => {
    return guesses.filter((guess) => guess.word === word).length > 0;
  };

  const nonGuessWords = words.filter((word) => {
    if (!isGuess(word)) return word;
  });

  const possibleAnswer = (word: string) => {
    return findMult(guesses, word).length > 0;
  };

  return (
    <div
      ref={ref}
      className="px-5 py-5 bg-stone-800 border-2 border-black rounded-md relative h-[66vh] overflow-auto"
    >
      <p className="inline">&gt;&gt; GUESSES</p>
      <div className="w-full mt-1 mb-2 h-1 rounded bg-[rgb(255,185,50)]" />
      <div className="grid grid-cols-1">
        {guesses &&
          guesses.map((guess, idx) => {
            return (
              <div key={"guess" + idx} className="flex flex-row justify-center">
                <button
                  className={
                    "px-5 py-3 text-2xl min-w-[4rem] max-w-[15rem] m-2 hover:bg-stone-600" +
                    (selectedWord === guess.word ? " bg-stone-600" : "")
                  }
                  onClick={() => {
                    if (selectedWord !== guess.word)
                      setSelectedWord(guess.word);
                    else {
                      setSelectedWord("");
                    }
                  }}
                >
                  {guess.word + ":" + guess.numCorrect}
                </button>
              </div>
            );
          })}
      </div>
      <p className="block mt-4">&gt;&gt; OTHER</p>
      <div className="h-1 mt-1 w-full rounded bg-[rgb(255,185,50)]" />
      <div className={"grid grid-cols-[calc("}>
        {nonGuessWords.map((word, idx) => (
          <div
            key={"highlightable" + idx}
            className="flex flex-row justify-center"
          >
            <button
              className={
                "px-5 py-3 text-2xl m-2 max-w-[15rem] " +
                (selectedWord === word && possibleAnswer(word)
                  ? "bg-gray-600 "
                  : "") +
                (possibleAnswer(word) ? "hover:bg-stone-600" : "")
              }
              onClick={() => {
                if (selectedWord !== word) setSelectedWord(word);
                else {
                  setSelectedWord("");
                }
              }}
            >
              {isGuess(word) ? (
                word
              ) : (
                <WordHighlight
                  word={word}
                  sameLetters={findMult(guesses, word)}
                />
              )}
            </button>
          </div>
        ))}
      </div>
      <p className="absolute top-1 right-2">-- WORDS --</p>
    </div>
  );
};

export default WordsDisplay;
