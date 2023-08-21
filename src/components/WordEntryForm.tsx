import React from "react";
import { useContext, useState } from "react";

import emptyErrors from "../utils/emptyErrors";
import makeErrorObj from "../utils/validation/makeWordEntryErrors/makeErrorObj";
import ErrorList from "./ErrorList";
import WordHistoryContext from "./contexts/wordHistoryContext";
import { ValidationErrors } from "../utils/interfaces";

import "../styles/handle-ios-input.css";

const WordEntryForm = () => {
  const {
    state: {
      current: { words },
    },
    dispatch,
  } = useContext(WordHistoryContext);
  const [errors, setErrors] = useState<ValidationErrors>(emptyErrors);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawInput = e.currentTarget.words.value;

    if (rawInput === "") {
      setErrors({
        ...emptyErrors,
        wordTooShort: "YOU MUST INPUT A WORD",
      });
      return;
    }

    const clonedErrors = makeErrorObj(errors, rawInput, words);
    const hasError = !!Object.values(clonedErrors).find(
      (errMessage) => errMessage !== ""
    );
    setErrors(clonedErrors); // do this AFTER to stop errors slipping through on first click
    if (hasError) return;

    setErrors(emptyErrors);
    dispatch({
      type: "ADDWORD",
      rawInput: rawInput,
    });
  };

  return (
    <>
      {/*   tablet and above layout   */}
      <div className="hidden w-[calc(66vw+15rem)] max-w-[90vw] overflow-hidden md:block">
        <form
          id="wordEntryForm"
          onSubmit={(e) => handleSubmit(e)}
          className="mb-4"
        >
          <label htmlFor="words" className="hidden text-xl">
            input words here:
          </label>
          <button
            type="reset"
            className={
              "box-content w-16 rounded-bl rounded-tl border-2 border-black bg-stone-800 px-5 py-3 font-bold hover:bg-gray-500"
            }
            onClick={() => setErrors(emptyErrors)}
          >
            CLEAR
          </button>
          <input
            type="text"
            id="words"
            autoComplete="off"
            placeholder="> INPUT WORDS HERE"
            className="w-[calc(100%-13.5rem)] border-y-2 border-y-black bg-stone-800 py-3 pl-2 pr-5 shadow focus:border-2 focus:border-stone-300 focus:outline-none"
          />
          <button
            type="submit"
            className="box-content w-16 rounded-br rounded-tr border-2 border-black bg-stone-800 px-5 py-3 font-bold hover:bg-gray-500"
          >
            ADD
          </button>
          <ErrorList errors={errors} />
        </form>
      </div>
      {/*    mobile layout    */}
      <div className="w-[calc(66vw+15rem)] max-w-[90vw] md:hidden">
        <ErrorList errors={errors} />
        <form
          id="wordEntryForm"
          onSubmit={(e) => handleSubmit(e)}
          className="mb-4"
        >
          <label htmlFor="words" className="hidden text-xl">
            input words here:
          </label>
          <input
            type="text"
            id="words"
            autoComplete="off"
            placeholder="> INPUT WORDS HERE"
            className="no-rounded w-[100%] appearance-none rounded-t-md border-2 border-black bg-stone-800 py-3 pl-2 pr-5 shadow focus:border-stone-300 focus:outline-none"
          />
          <div className="grid grid-cols-2 justify-center">
            <div className="flex justify-center">
              <button
                type="reset"
                className="w-full rounded-bl-md border-b-2 border-l-2 border-black bg-stone-800 px-5 py-3 hover:bg-stone-500"
                onClick={() => setErrors(emptyErrors)}
              >
                CLEAR
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full rounded-br-md border-x-2 border-b-2 border-black bg-stone-800 px-5 py-3 hover:bg-stone-500"
              >
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default WordEntryForm;
