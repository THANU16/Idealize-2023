import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
// import Drivers from "./Driver/Drivers";
import Help from "./Pages/Help.jsx";
import Logout from "./Pages/Logout.jsx";
import Sidebar from "./SideBar/Sidebar";
import Direction from "./Pages/Direction";
import DriverProfile from "./Pages/DriverProfile";
import HomeAfter from "./HomeAfter";
// import Ambulance from "./Ambulance/Ambulance";

function AmbulancePaths() {
  console.log();
  return (
    <Sidebar path="/">
      <Routes>
        <Route path="/driverProfile" element={<DriverProfile/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/show" element={<Direction />} />
        <Route path="/homeAfter" element={<HomeAfter/>}/>
      </Routes>
    </Sidebar>
  );
}

export default AmbulancePaths;
