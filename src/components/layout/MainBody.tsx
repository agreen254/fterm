import TabGroup from "../TabGroup";
import WordActions from "../WordActions";
import WordsDisplay from "../WordsDisplay";
import WordsHistory from "../WordsHistory";

interface Props {
  numCols: number;
  selectedTab: string;
  setSelectedTab: (newTab: string) => void;
}

const MainBody = ({ numCols, selectedTab, setSelectedTab }: Props) => {
  return (
    <>
      <div className="mb-2 grid w-[min(calc(66vw+15rem),90vw)] max-w-[1920px] gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <div className="lg:hidden">
          {selectedTab === "WORDS" && <WordsDisplay numCols={numCols} />}
          {selectedTab === "HISTORY" && <WordsHistory />}
          {selectedTab === "ACTIONS" && <WordActions />}
        </div>
        <div className="hidden min-h-[66vh] lg:block 2xl:hidden">
          {selectedTab === "HISTORY" && <WordsHistory />}
          {selectedTab === "ACTIONS" && <WordActions />}
        </div>
        <div className="hidden 2xl:block">
          <WordsHistory />
        </div>
        <div className="hidden lg:block">
          <WordsDisplay numCols={numCols} />
        </div>
        <div className="hidden 2xl:block">
          <WordActions />
        </div>
      </div>
      <TabGroup selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </>
  );
};

export default MainBody;
