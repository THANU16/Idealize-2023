import React, { useEffect, useRef, ReactElement } from "react";
import ReactDOM from "react-dom";
import SearchMap from "./component/map/search";
import DynamicMap from "./component/map/dynamicMap";
import EmergencyMap from "./component/map/CurrentLocation";
import GetPath from "./component/map/GetPath"; // Update the import statement


function App() {
  return (
    // <SearchMap />;
    // <DynamicMap/>
    // <EmergencyMap/>
    <GetPath />
  );
}

export default App;
