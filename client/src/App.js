import "./App.css";
import React from "react";
import Login from "./Pages/login";
import OwnerDetailsPage from "./Pages/hospital/Signup/OwnerDetailsPage";
import HospitalDetailsPage from "./Pages/hospital/Signup/HospitalDetailsPage";
import UploadHospitalDocumentsPage from "./Pages/hospital/Signup/UploadHospitalDocumentsPage";
import EmergencyButtonPage from "./Pages/hospital/Signup/Emergencybutton";
import AmbulanceAllocation from "./Pages/hospital/Signup/ambulance";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* code to route login and signup */}
      {/* <Login></Login>
      <OwnerDetailsPage></OwnerDetailsPage>
      <HospitalDetailsPage></HospitalDetailsPage> */}
      <AmbulanceAllocation></AmbulanceAllocation>
      {/* <EmergencyButtonPage></EmergencyButtonPage> */}
      {/* <UploadHospitalDocumentsPage></UploadHospitalDocumentsPage> */}
    </div>
  );
}

export default App;
