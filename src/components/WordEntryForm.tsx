import React from "react";
import { useContext, useState } from "react";

import emptyErrors from "../utils/emptyErrors";
import makeErrorObj from "../utils/validation/makeWordEntryErrors/makeErrorObj";
import ErrorList from "./ErrorList";
import WordHistoryContext from "./contexts/wordHistoryContext";
import { ValidationErrors } from "../utils/interfaces";

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
    <div className="w-[calc(66vw+15rem)] max-w-[90vw] overflow-hidden">
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
        <div className="inline border-y-2 border-y-black bg-stone-800 py-[0.85rem] pl-2">
          &gt;&gt;
        </div>
        <input
          type="text"
          id="words"
          autoComplete="off"
          placeholder="INPUT WORDS HERE"
          className="w-[calc(100%-15.25rem)] appearance-none border-y-2 border-y-black bg-stone-800 py-3 pl-2 pr-5 shadow focus:outline-none"
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
  );
};

export default WordEntryForm;
