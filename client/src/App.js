import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalPaths from "./pages/Hospital/HospitalPaths";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
      <HospitalPaths></HospitalPaths>
    </BrowserRouter>
  );
};

export default App;
