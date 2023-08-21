import WordActions from "../WordActions";
import WordsDisplay from "../WordsDisplay";
import WordsHistory from "../WordsHistory";

interface Props {
  numCols: number;
  selectedTab: string;
}

const LayoutMobile = ({ numCols, selectedTab }: Props) => {
  switch (selectedTab) {
    case "ACTIONS":
      return <WordActions />;
    case "HISTORY":
      return <WordsHistory />;
    case "WORDS":
      return <WordsDisplay numCols={numCols} />;
  }
};

export default LayoutMobile;
