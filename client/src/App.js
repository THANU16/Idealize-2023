import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Navbar
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Ambulance from "./pages/Amblance.jsx";
import Drivers from "./pages/Drivers.jsx";
import Help from "./pages/Help.jsx";
import Logut from "./pages/Logout.jsx";
import HospitalSearch from "./pages/Hospital/Signup/HospitalSearch";
// Login
// import Login from "./pages/Login";
// import Login from "./pages/LoginBoot";

const App = () => {
  return (
    // <Search />
    <BrowserRouter>
      <Routes>
        <Route path="/hospitalSerch" element={<HospitalSearch />} />
      </Routes>
      {/* <Sidebar path="/dashboard">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/help" element={<Help />} />
          <Route path="/logout" element={<Logut />} />
        </Routes>
      </Sidebar> */}
    </BrowserRouter>
  );
};

export default App;

// import React, { useEffect, useRef, ReactElement } from "react";
// import ReactDOM from "react-dom";
// import SearchMap from "./component/map/search";
// import DynamicMap from "./component/map/dynamicMap";
// import EmergencyMap from "./component/map/CurrentLocation";
// import GetPath from "./component/map/GetPath"; // Update the import statement

// function App() {
//   return (
//     // <SearchMap />;
//     <DynamicMap />
//     // <EmergencyMap/>
//     // <GetPath />
//   );
// }

// export default App;
