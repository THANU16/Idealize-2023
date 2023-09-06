import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/User/Login";
import Home from "./pages/User/U_Home";
import FirstAidInstruction from "./pages/User/U_FirstAidInstruction";
import Sidebar from "./pages/User/U_Sidebar";
import Hospital from "./pages/User/U_Hospital";
import Help from "./pages/User/U_Help";
import Logout from "./pages/User/Logout";
import UserSignup from "./pages/User/UserSignup";

const App = () => {
  return (
    // <Search />
    // <Route path="/user/login" element={<Login />}></Route>

    <BrowserRouter>
      {/* <Routes>
        <Route path="/user/signUp" element={<UserSignup />}></Route>
      </Routes> */}

      <Sidebar path="/user/dashboard">
        <Routes>
          <Route path="/user/home" element={<Home />}></Route>
          <Route
            path="/user/firstaid"
            element={<FirstAidInstruction />}
          ></Route>
          <Route path="/user/hospital" element={<Hospital />}></Route>
          <Route path="/user/help" element={<Help />}></Route>
          <Route path="/user/logout" element={<Logout />}></Route>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
