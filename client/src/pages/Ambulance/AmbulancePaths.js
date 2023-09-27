import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
// import Drivers from "./Driver/Drivers";
import Help from "./Pages/Help.jsx";
import Logut from "./Pages/Logout.jsx";
import Sidebar from "./SideBar/Sidebar";
import Direction from "./Pages/Direction";

// import Ambulance from "./Ambulance/Ambulance";

function AmbulancePaths() {
  console.log();
  return (
    <Sidebar path="/">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logut />} />
        <Route path="/show" element={<Direction />} />
      </Routes>
    </Sidebar>
  );
}

export default AmbulancePaths;
