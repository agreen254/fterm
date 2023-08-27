import { useContext } from "react";
import WordHistoryContext from "./contexts/wordHistoryContext";

const MakeDemo = () => {
  const { dispatch } = useContext(WordHistoryContext);

  const makeDemo = () => {
    dispatch({
      type: "ADDWORD",
      rawInput:
        "SELECTING REMINDING SUMMONING AMERICANS AGREEMENT RELEASING TERRIFIED ASCENSION",
    });
    dispatch({
      type: "ADDGUESS",
      guessToAdd: {
        guessName: "BELONGING",
        numCorrect: 3,
      },
    });
    dispatch({
      type: "ADDGUESS",
      guessToAdd: {
        guessName: "EXPLORING",
        numCorrect: 4,
      },
    });
    dispatch({ type: "CLEARSELECTEDENTRY" });
  };

  return (
    <button className="my-4 w-48 rounded border px-5 py-3" onClick={makeDemo}>
      DEMO
    </button>
  );
};

export default MakeDemo;
