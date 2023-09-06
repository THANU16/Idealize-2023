import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./U_Home";
import FirstAidInstruction from "./U_FirstAidInstruction";
import Sidebar from "./U_Sidebar";
import Hospital from "./U_Hospital";
import Help from "./U_Help";
import Logout from "./Logout";
import UserSignup from "./U_Signup";
import U_SignupFinished from "./U_SignupFinished";

const UserPath = () => {
  return (
    // <Search />
    // <Route path="/user/login" element={<Login />}></Route>

    // <Route path="/user/signUp" element={<UserSignup />}></Route>
    //   <Route path="/user/registered" element={<U_SignupFinished />}></Route>

    <Sidebar path="/user/dashboard">
      <Routes>
        <Route path="/user/signUp" element={<UserSignup />}></Route>
        <Route path="/user/registered" element={<U_SignupFinished />}></Route>
        <Route path="/user/home" element={<Home />}></Route>
        <Route path="/user/firstaid" element={<FirstAidInstruction />}></Route>
        <Route path="/user/hospital" element={<Hospital />}></Route>
        <Route path="/user/help" element={<Help />}></Route>
        <Route path="/user/logout" element={<Logout />}></Route>
      </Routes>
    </Sidebar>
  );
};

export default UserPath;
