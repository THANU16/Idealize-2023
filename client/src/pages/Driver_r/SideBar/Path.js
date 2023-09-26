import React from "react";
import GetPath from "../../../component/map/GetPath"; // Update the path to the actual location of your GetPath component

function Path() {
  return (
    <div className="App">
      <h1>Display Path Between Two Locations</h1>
      <GetPath />
    </div>
  );
}

export default Path;
