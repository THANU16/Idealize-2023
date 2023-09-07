import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import Path from "./SideBar/Path";
import Sidebar from "./SideBar/Sidebar";

function DriverPaths() {
  console.log();
  return (
    <Sidebar path="/">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/path" element={<Path />} />
      </Routes>
    </Sidebar>
  );
}

export default DriverPaths;
