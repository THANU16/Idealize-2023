import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home.jsx";
import Ambulance from "./pages/Amblance";
import Drivers from "./pages/Drivers";
import Help from "./pages/Help";
import Logut from "./pages/Logout";

import Login from "./pages/login";
// import Login from "./pages/LoginBoot";

const App = () => {
  return (
    <BrowserRouter>
      <Routes></Routes>
      <Sidebar path="/dashboard">
        <Routes>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/help" element={<Help />} />
          <Route path="/logout" element={<Logut />} />
        </Routes>
      </Sidebar>
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
