import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "./UserContext";
import "./App.css";

import Error404 from "./Error404";

// Paths pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserPath from "./pages/User/UserPath";
import HospitalPaths from "./pages/Hospital/HospitalPaths";
import AmbulancePaths from "./pages/Ambulance/AmbulancePaths";

// Hospital Signup
import HospitalDetails from "./pages/Hospital/Signup/HospitalDetailsPage";
import OwnerDetails from "./pages/Hospital/Signup/OwnerDetailsPage";
import UploadHospitalDocuments from "./pages/Hospital/Signup/UploadHospitalDocumentsPage";
import SignupFinished from "./pages/Hospital/Signup/SignupFinished";
import HospitalSearch from "./pages/Hospital/Signup/HospitalSearch";

// User Signup
import UserSignup from "./pages/User/Signup/Signup";
import U_SignupFinished from "./pages/User/Signup/SignupFinished";

//Driver

const App = () => {
  const [user, setUser] = useState(null);
  const [typeID, setTypeID] = useState(null);

  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    const typeID = JSON.parse(sessionStorage.getItem("typeID"));

    setUser(sessionToken);
    setTypeID(typeID);
    console.log(user);
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        {!user ? (
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />

            {/* Hospital signup */}
            <Route path="/HospitalDetails" element={<HospitalDetails />} />
            <Route path="/OwnerDetails" element={<OwnerDetails />} />
            <Route
              path="/UploadHospitalDocuments"
              element={<UploadHospitalDocuments />}
            />
            <Route path="/HospitalSearch" element={<HospitalSearch />} />
            <Route path="/SignupFinished" element={<SignupFinished />} />

            {/* user signup */}

            <Route path="/user/signup" element={<UserSignup />}></Route>
            <Route path="/registered" element={<U_SignupFinished />}></Route>

            <Route
              path="*"
              element={<Error404/>}
            ></Route>
          </Routes>
        ) : // {/* <HospitalPaths></HospitalPaths> */}
          // {/* <UserPath></UserPath> */}

          // {/* // <DriverPaths></DriverPaths> */}
          typeID === "ho" ? (
            <HospitalPaths></HospitalPaths>
          ) : typeID === "us" ? (
            <UserPath></UserPath>
          ) : typeID === "dr" ? (
            <AmbulancePaths></AmbulancePaths>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Signup />} />
              
              {/* Hospital signup */}
              <Route
                path="/hospital/HospitalDetails"
                element={<HospitalDetails />}
              />
              <Route path="/HospitalSearch" element={<HospitalSearch />} />
              <Route path="/OwnerDetails" element={<OwnerDetails />} />
              <Route
                path="/UploadHospitalDocuments"
                element={<UploadHospitalDocuments />}
              />
              <Route path="/SignupFinished" element={<SignupFinished />} />

              {/* user signup */}

              <Route path="/user/signup" element={<UserSignup />}></Route>
              <Route path="/registered" element={<U_SignupFinished />}></Route>

              <Route
              path="*"
              element={<Error404/>}
            ></Route>
            </Routes>
          )}
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
