import React, { useState, useContext } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import './Logout.css'
import LifeSaverLogo from "../../../assets/icons/Logo_LS.svg";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("typeID");
    navigate("/login");
  };

  const cancel = () => {
    navigate("/Home");
  };

  return (
    <div className="hospital-logout">
      <div className="hospital-logout-container">
        <h2>are you sure you want to log out?</h2>
        <div className="hospital-logout-btn">
        <button onClickCapture={cancel} className="hospital-logout-cancel">
          Cancel
        </button>
        <button onClickCapture={logout} className="hospital-logout-logout">
          Logout
        </button>
      </div>
      </div>
      
    </div>
  );
}

export default Logout;
