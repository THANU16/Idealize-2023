import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// Paths pages
import HospitalPaths from "./pages/Hospital/HospitalPaths";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserPath from "./pages/User/UserPath";

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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <HospitalPaths></HospitalPaths> */}
      {/* <UserPath></UserPath> */}

      {typeID === "ho" ? (
        <HospitalPaths></HospitalPaths>
      ) : typeID === "us" ? (
        <UserPath></UserPath>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={<p>This page isn't available. Sorry about that.</p>}
          ></Route>
        </Routes>
      )}
    </BrowserRouter>

    // <BrowserRouter>
    //   {!user ? (
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/signup" element={<Signup />} />
    //       <Route
    //         path="*"
    //         element={<p>This page isn't available. Sorry about that.</p>}
    //       ></Route>
    //     </Routes>
    //   ) : (
    //     // : typeID === "ho" ? (
    //     //   <HospitalPaths></HospitalPaths>
    //     // ) : typeID === "dr" ? (
    //     //   <DriverPath></DriverPath>
    //     // ) : typeID === "us" ? (
    //     //   <UserPath></UserPath>
    //     // )
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/signup" element={<Signup />} />
    //       <Route
    //         path="*"
    //         element={<p>This page isn't available. Sorry about that.</p>}
    //       ></Route>
    //     </Routes>
    //   )}
    // </BrowserRouter>
  );
};

export default App;

// <BrowserRouter>
//   <UserContext.Provider value={{ user, setUser }}>
//     {!user ? (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="*"
//           element={<p>This page isn't available. Sorry about that.</p>}
//         ></Route>
//       </Routes>
//     ) : typeID === "ho" ? (
//       <HospitalPaths></HospitalPaths>
//     // ) : typeID === "dr" ? (
//     //   <EmployeePath></EmployeePath>
//     // ) : typeID === "us" ? (
//     //   <EmployeePath></EmployeePath>
//     ): (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="*"
//           element={<p>This page isn't available. Sorry about that.</p>}
//         ></Route>
//       </Routes>

//     )}
//   </UserContext.Provider>
// </BrowserRouter>
