import { useEffect, useState } from "react";
import PathfindingVisualizer from "./components/Pathfinding/PathfindingVisualizer";
import useDataRef from "./customHooks/useRefCustom";
import Youtube from "./components/Youtube";
import { data } from "./components/data/data";

function App() {
  return (
    <div className="app">
      <div className="containEv">
        <PathfindingVisualizer />
      </div>
      {/* <Youtube data={data} /> */}
    </div>
  );
}

export default App;
