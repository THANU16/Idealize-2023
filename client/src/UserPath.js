import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/User/Login";
const App = () => {
  return (
    // <Search />
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
