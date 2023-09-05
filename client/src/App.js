import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalPaths from "./pages/Hospital/HospitalPaths";
import LoginPage from "./pages/Login/LoginPage";
import Signup from "./pages/Signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <HospitalPaths></HospitalPaths>
    </BrowserRouter>
  );
};

export default App;
