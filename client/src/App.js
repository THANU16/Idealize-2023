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

import UserDetailsPage from "./pages/User/SignUp/UserDetails";

// Login
import Login from "./pages/Login";

const App = () => {
  // const [user, setUser] = useState(null);
  // const [typeID, setTypeID] = useState(null);

  // useEffect(() => {
  //   const sessionToken = localStorage.getItem("sessionToken");
  //   const typeID = localStorage.getItem("type_id");
  //   setUser(sessionToken);
  //   setTypeID(typeID);
  // });

  return (
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

          <Route path="/UserDetails" element={<UserDetailsPage />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
