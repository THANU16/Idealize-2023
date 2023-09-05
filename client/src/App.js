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

//signup
import HospitalDetails from "./pages/Hospital/Signup/HospitalDetailsPage";
import OwnerDetails from "./pages/Hospital/Signup/OwnerDetailsPage";
import UploadHospitalDocuments from "./pages/Hospital/Signup/UploadHospitalDocumentsPage";
import SignupFinished from "./pages/Hospital/Signup/SignupFinished";
import Login from "./pages/Login.jsx";

import HospitalSearch from "./pages/Hospital/Signup/HospitalSearch";
import Signup from "./pages/Signup";
// Login
import Login from "./pages/Login";

import Emergency from "./components/Emergencybutton";
import Request from "./components/ambulance";
import AmbulanceForm from "./pages/Hospital/AmbulanceForm";
import DriverForm from "./pages/Hospital/DriverDetails";


const App = () => {
  return (
    // <Search />
    <BrowserRouter>
      <Routes></Routes>
      <Sidebar path="/dashboard">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/help" element={<Help />} />
          <Route path="/logout" element={<Logut />} />

          {/* signup */}
          <Route path="/SignupFinished" element={<SignupFinished />} />
          <Route path="/HospitalDetails" element={<HospitalDetails />} />
          <Route path="/OwnerDetails" element={<OwnerDetails />} />
          <Route
            path="/UploadHospitalDocuments"
            element={<UploadHospitalDocuments />}
          />
          <Route path="/HospitalSearch" element={<HospitalSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />}></Route>
          <Route path="/ambulanceForm" element={<AmbulanceForm />} />
          <Route path="/driverForm" element={<DriverForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ambulanceForm" element={<AmbulanceForm />} />
          <Route path="/driverForm" element={<DriverForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/HospitalSearch" element={<HospitalSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />}></Route>

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
