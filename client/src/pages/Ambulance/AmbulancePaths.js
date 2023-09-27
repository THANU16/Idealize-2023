import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
// import Drivers from "./Driver/Drivers";
import Help from "./Pages/Help.jsx";
import Logut from "./Pages/Logout.jsx";
import Sidebar from "./SideBar/Sidebar";
// import Ambulance from "./Ambulance/Ambulance";

function AmbulancePaths() {
  console.log();
  return (
    <Sidebar path="/">
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/drivers" element={<Drivers />} /> */}
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logut />} />
        {/* signup */}
        {/* <Route path="/SignupFinished" element={<SignupFinished />} />
        <Route path="/HospitalDetails" element={<HospitalDetails />} />
        <Route path="/OwnerDetails" element={<OwnerDetails />} /> */}
        {/* <Route
          path="/UploadHospitalDocuments"
          element={<UploadHospitalDocuments />}
        /> */}
        {/* <Route path="/HospitalSearch" element={<HospitalSearch />} /> */}
        {/* <Route path="/ambulanceForm" element={<AmbulanceForm />} />
        <Route path="/driverForm" element={<DriverForm />} />/ */}
      </Routes>
    </Sidebar>
  );
}

export default AmbulancePaths;
