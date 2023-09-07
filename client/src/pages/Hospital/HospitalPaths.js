import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HospitalDetails from "./Signup/HospitalDetailsPage";
import OwnerDetails from "./Signup/OwnerDetailsPage";
import UploadHospitalDocuments from "./Signup/UploadHospitalDocumentsPage";
import SignupFinished from "./Signup/SignupFinished";
import HospitalSearch from "./Signup/HospitalSearch";

import AmbulanceForm from "./Ambulance/AmbulanceForm";
import DriverForm from "./Driver/DriverDetails";
import Home from "./Home";
import Drivers from "./Driver/Drivers";
import Help from "./Pages/Help.jsx";
import Logut from "./Pages/Logout.jsx";
import Sidebar from "./SideBar/Sidebar";
import Ambulance from "./Ambulance/Ambulance";

function HospitalPaths() {
  console.log();
  return (
    <Sidebar path="/">
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
        <Route path="/ambulanceForm" element={<AmbulanceForm />} />
        <Route path="/driverForm" element={<DriverForm />} />/
      </Routes>
    </Sidebar>
  );
}

export default HospitalPaths;
