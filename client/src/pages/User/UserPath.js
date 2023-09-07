import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FirstAidInstruction from "./pages/FirstAidInstruction";
import Sidebar from "./SideBar/Sidebar";
import Hospital from "./pages/Hospital";
import Help from "./pages/Help";
import Logout from "./pages/Logout";
import UserSignup from "./Signup/Signup";
import U_SignupFinished from "./Signup/SignupFinished";
import Requested from "./pages/Home/Requested";
import CancelRequest from "./pages/Home/CancelRequest";
const UserPath = () => {
  return (
    // <Search />
    // <Route path="/user/login" element={<Login />}></Route>

    // <Route path="/user/signUp" element={<UserSignup />}></Route>
    //   <Route path="/user/registered" element={<U_SignupFinished />}></Route>

    <Sidebar path="/dashboard">
      <Routes>
        <Route path="/user/signup" element={<UserSignup />}></Route>
        <Route path="/registered" element={<U_SignupFinished />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/firstaid" element={<FirstAidInstruction />}></Route>
        <Route path="/hospital" element={<Hospital />}></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/requested" element={<Requested />}></Route>
        <Route path="/request/cancel" element={<CancelRequest />}></Route>
      </Routes>
    </Sidebar>
  );
};

export default UserPath;
