import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalPaths from "./pages/Hospital/HospitalPaths";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <HospitalPaths></HospitalPaths>
    </BrowserRouter>
  );
};

export default App;
