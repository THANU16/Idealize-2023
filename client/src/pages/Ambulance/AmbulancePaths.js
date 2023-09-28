import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
// import Drivers from "./Driver/Drivers";
import Help from "./Pages/Help.jsx";
import Logut from "./Pages/Logout.jsx";
import Sidebar from "./SideBar/Sidebar";
import Direction from "./Pages/Direction";
import DriverProfile from "./Pages/DriverProfile";
// import Ambulance from "./Ambulance/Ambulance";
import Home1 from "./HomeAfter";

function AmbulancePaths() {
  console.log();
  return (
    <Sidebar path="/">
      <Routes>
        <Route path="/driverProfile" element={<DriverProfile/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logut />} />
        <Route path="/show" element={<Direction />} />
        <Route path="/home1" element={<Home1/>}/>
      </Routes>
    </Sidebar>
  );
}

export default AmbulancePaths;
